import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const screenshotsDir = path.join(__dirname, 'test-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('\n=== CELEBRANT PROFILE PAGE TESTING ===\n');

  try {
    // Step 1: Navigate to directory
    console.log('1. Navigating to directory page...');
    await page.goto('http://localhost:3000/#/directory', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '01-directory-page.png'), fullPage: true });
    console.log('   ✓ Directory page loaded');

    // Step 2: Find and click first "View Profile" button
    console.log('\n2. Clicking first "View Profile" button...');
    
    // Wait for profile buttons to be visible
    await page.waitForSelector('a:has-text("View Profile")', { timeout: 10000 });
    
    const firstProfileButton = page.locator('a:has-text("View Profile")').first();
    await firstProfileButton.waitFor({ state: 'visible' });
    
    console.log('   View Profile button found, clicking...');
    await firstProfileButton.click();
    await page.waitForTimeout(3000); // Give page time to load
    
    // Step 3: Verify profile page elements
    console.log('\n3. Verifying profile page elements...');
    
    const currentUrl = page.url();
    console.log(`   Current URL: ${currentUrl}`);
    
    // Take screenshot first to see what we're working with
    await page.screenshot({ path: path.join(screenshotsDir, '02-first-profile-full.png'), fullPage: true });
    console.log('   ✓ Screenshot saved: 02-first-profile-full.png');
    
    // Get page content for analysis
    const pageContent = await page.content();
    
    // Check for key profile elements
    const checks = {
      hasH1: await page.locator('h1').count() > 0,
      hasH2: await page.locator('h2').count() > 0,
      hasImage: await page.locator('img').count() > 0,
      hasAbout: pageContent.toLowerCase().includes('about'),
      hasSpecialties: pageContent.toLowerCase().includes('specialt'),
      hasContact: pageContent.toLowerCase().includes('contact'),
      hasLocation: pageContent.toLowerCase().includes('location'),
      hasBackButton: pageContent.toLowerCase().includes('back'),
      hasCelebrantRoute: currentUrl.includes('celebrant/')
    };
    
    console.log('   Profile page verification:');
    console.log(`     - Has H1/H2 heading: ${checks.hasH1 || checks.hasH2 ? '✓' : '✗'}`);
    console.log(`     - Has images: ${checks.hasImage ? '✓' : '✗'}`);
    console.log(`     - Has About section: ${checks.hasAbout ? '✓' : '✗'}`);
    console.log(`     - Has Specialties: ${checks.hasSpecialties ? '✓' : '✗'}`);
    console.log(`     - Has Contact info: ${checks.hasContact ? '✓' : '✗'}`);
    console.log(`     - Has Location: ${checks.hasLocation ? '✓' : '✗'}`);
    console.log(`     - Has Back button: ${checks.hasBackButton ? '✓' : '✗'}`);
    console.log(`     - Correct route: ${checks.hasCelebrantRoute ? '✓' : '✗'}`);
    
    // Step 4: Test Back to Directory navigation
    console.log('\n4. Testing "Back to Directory" navigation...');
    
    const backButton = page.locator('a:has-text("Back")').first();
    if (await backButton.count() > 0) {
      console.log('   Back button found, clicking...');
      await backButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, '03-back-to-directory.png'), fullPage: true });
      
      const newUrl = page.url();
      if (newUrl.includes('directory')) {
        console.log('   ✓ Successfully returned to directory page');
      } else {
        console.log('   ✗ URL does not show directory:', newUrl);
      }
    } else {
      console.log('   ✗ Back button not found');
    }
    
    // Step 5: Test second celebrant profile
    console.log('\n5. Testing second celebrant profile...');
    await page.waitForSelector('a:has-text("View Profile")', { timeout: 10000 });
    const secondProfileButton = page.locator('a:has-text("View Profile")').nth(1);
    
    if (await secondProfileButton.count() > 0) {
      console.log('   Clicking second profile...');
      await secondProfileButton.click();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(screenshotsDir, '04-second-profile-full.png'), fullPage: true });
      console.log('   ✓ Second profile loaded and screenshot saved');
    } else {
      console.log('   ✗ Second profile button not found');
    }
    
    // Step 6: Test 404 page for non-existent celebrant
    console.log('\n6. Testing 404 page for non-existent celebrant...');
    await page.goto('http://localhost:3000/#/celebrant/999', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const notFoundContent = await page.content();
    const has404 = notFoundContent.includes('404') || 
                   notFoundContent.includes('Not Found') || 
                   notFoundContent.includes('not found');
    
    console.log(`   404 handling: ${has404 ? '✓ Shows 404 message' : '✗ No 404 message detected'}`);
    
    await page.screenshot({ path: path.join(screenshotsDir, '05-404-page.png'), fullPage: true });
    console.log('   ✓ Screenshot saved: 05-404-page.png');
    
    // Step 7: Test direct URL navigation to a valid profile
    console.log('\n7. Testing direct URL navigation to profile...');
    await page.goto('http://localhost:3000/#/celebrant/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const directNavUrl = page.url();
    console.log(`   Direct navigation URL: ${directNavUrl}`);
    
    await page.screenshot({ path: path.join(screenshotsDir, '06-direct-url-navigation.png'), fullPage: true });
    console.log('   ✓ Screenshot saved: 06-direct-url-navigation.png');
    
    // Step 8: Test responsive layout at mobile size
    console.log('\n8. Testing responsive layout (mobile view)...');
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X size
    await page.goto('http://localhost:3000/#/celebrant/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '07-mobile-profile.png'), fullPage: true });
    console.log('   ✓ Mobile screenshot saved');
    
    console.log('\n=== TEST COMPLETED ===');
    console.log(`\nAll screenshots saved to: ${screenshotsDir}`);
    
  } catch (error) {
    console.error('\n✗ ERROR during testing:', error.message);
    console.error('   Stack:', error.stack);
    await page.screenshot({ path: path.join(screenshotsDir, 'error-screenshot.png'), fullPage: true });
    throw error;
  } finally {
    await browser.close();
  }
})();
