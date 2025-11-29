import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('=== TEST 1: Navigate to Homepage ===');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('=== TEST 2: Take screenshot of navbar with About link ===');
    await page.screenshot({ 
      path: 'screenshots/01-navbar-with-about.png',
      fullPage: false 
    });
    console.log('Screenshot saved: 01-navbar-with-about.png');

    console.log('=== TEST 3: Verify About link in navbar ===');
    const aboutLink = page.locator('a[href="#/about"]');
    const aboutLinkVisible = await aboutLink.isVisible();
    console.log(aboutLinkVisible ? 'PASS: About link is visible in navbar' : 'FAIL: About link NOT found in navbar');

    console.log('=== TEST 4: Click About link ===');
    await aboutLink.click();
    await page.waitForTimeout(2000);
    await page.waitForURL('**/#/about');
    console.log('PASS: Navigated to About page');

    console.log('=== TEST 5: Take full page screenshot of About page ===');
    await page.screenshot({ 
      path: 'screenshots/02-about-page-full.png',
      fullPage: true 
    });
    console.log('Screenshot saved: 02-about-page-full.png');

    console.log('=== TEST 6: Verify About page sections ===');
    
    const heroHeadline = await page.locator('h1').first().isVisible();
    console.log(heroHeadline ? 'PASS: Hero section found' : 'FAIL: Hero section NOT found');

    const storySection = await page.locator('text=Our Story').first().isVisible();
    console.log(storySection ? 'PASS: Story section found' : 'FAIL: Story section NOT found');

    const missionSection = await page.locator('text=Mission').first().isVisible();
    const visionSection = await page.locator('text=Vision').first().isVisible();
    console.log((missionSection && visionSection) ? 'PASS: Mission and Vision sections found' : 'FAIL: Mission or Vision section NOT found');

    const valuesHeading = await page.locator('text=Our Values').first().isVisible();
    console.log(valuesHeading ? 'PASS: Values section found' : 'FAIL: Values section NOT found');

    console.log('=== TEST 7: Scroll to Team section ===');
    const teamHeading = page.locator('text=Meet Our Team').first();
    await teamHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/03-team-section.png',
      fullPage: false 
    });
    console.log('Screenshot saved: 03-team-section.png');

    console.log('=== TEST 8: Mobile view test ===');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/#/about', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'screenshots/05-mobile-about-page.png',
      fullPage: true 
    });
    console.log('Screenshot saved: 05-mobile-about-page.png');

    console.log('\n=== ALL TESTS COMPLETED ===');
    
  } catch (error) {
    console.error('ERROR during testing:', error);
    await page.screenshot({ 
      path: 'screenshots/error-screenshot.png',
      fullPage: true 
    });
  } finally {
    await browser.close();
  }
})();
