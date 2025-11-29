import { chromium } from 'playwright';

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    
    // Collect console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    console.log('\n=== STEP 1: Navigate to Directory ===');
    await page.goto('http://localhost:3000/directory', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'test-1-directory-page.png', fullPage: true });
    console.log('✓ Screenshot saved: test-1-directory-page.png');

    console.log('\n=== STEP 2: Check for Live Listings Section ===');
    const liveSectionExists = await page.locator('h2:has-text("Live maps listings")').isVisible().catch(() => false);
    console.log('Live maps listings section visible:', liveSectionExists);

    console.log('\n=== STEP 3: Find and Click Live Celebrant Card ===');
    const liveCards = await page.locator('.celebrant-card').count();
    console.log('Total celebrant cards found:', liveCards);
    
    if (liveCards > 0) {
      // Take screenshot before clicking
      await page.screenshot({ path: 'test-2-before-click-live.png', fullPage: true });
      console.log('✓ Screenshot saved: test-2-before-click-live.png');
      
      // Try clicking the first card
      const firstCard = page.locator('.celebrant-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.click();
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      await page.waitForTimeout(1500);
      
      // Verify URL changed to profile page
      const currentUrl = page.url();
      console.log('Current URL after click:', currentUrl);
      const isProfilePage = currentUrl.includes('/celebrants/');
      console.log('✓ Navigated to profile page:', isProfilePage);
      
      // Take screenshot of profile page
      await page.screenshot({ path: 'test-3-live-celebrant-profile.png', fullPage: true });
      console.log('✓ Screenshot saved: test-3-live-celebrant-profile.png');
      
      // Check for profile elements
      const profileName = await page.locator('h1').first().textContent().catch(() => 'Not found');
      console.log('Profile name:', profileName);
      
      const liveBadge = await page.locator('text=/Live listing/i').isVisible().catch(() => false);
      console.log('Live listing badge visible:', liveBadge);
      
      const photoGallery = await page.locator('img').count();
      console.log('Number of images on profile:', photoGallery);
      
    } else {
      console.log('⚠ No celebrant cards found on directory page');
    }

    console.log('\n=== STEP 4: Go Back to Directory ===');
    await page.goto('http://localhost:3000/directory', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    console.log('✓ Back on directory page');

    console.log('\n=== STEP 5: Check for Curated Profiles Section ===');
    const curatedSectionExists = await page.locator('h2:has-text("Curated profiles")').isVisible().catch(() => false);
    console.log('Curated profiles section visible:', curatedSectionExists);

    if (curatedSectionExists) {
      console.log('\n=== STEP 6: Click on a Curated Celebrant Card ===');
      
      // Scroll to curated section
      await page.locator('h2:has-text("Curated profiles")').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Take screenshot before clicking
      await page.screenshot({ path: 'test-4-before-click-curated.png', fullPage: true });
      console.log('✓ Screenshot saved: test-4-before-click-curated.png');
      
      // Find and click a card after the curated heading
      const allCards = page.locator('.celebrant-card');
      const cardCount = await allCards.count();
      
      if (cardCount > 1) {
        // Click the second card (assuming first was live, second might be curated)
        await allCards.nth(1).scrollIntoViewIfNeeded();
        await allCards.nth(1).click();
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        await page.waitForTimeout(1500);
        
        // Verify URL changed to profile page
        const currentUrl = page.url();
        console.log('Current URL after click:', currentUrl);
        const isProfilePage = currentUrl.includes('/celebrants/');
        console.log('✓ Navigated to profile page:', isProfilePage);
        
        // Take screenshot of profile page
        await page.screenshot({ path: 'test-5-curated-celebrant-profile.png', fullPage: true });
        console.log('✓ Screenshot saved: test-5-curated-celebrant-profile.png');
        
        // Check for profile elements
        const profileName = await page.locator('h1').first().textContent().catch(() => 'Not found');
        console.log('Profile name:', profileName);
        
        const photoGallery = await page.locator('img').count();
        console.log('Number of images on profile:', photoGallery);
      }
    }

    console.log('\n=== STEP 7: Console Errors Check ===');
    if (errors.length > 0) {
      console.log('Console errors found:');
      errors.forEach(err => console.log(' -', err));
    } else {
      console.log('✓ No console errors detected');
    }

    console.log('\n=== TEST COMPLETE ===\n');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(error.message);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
