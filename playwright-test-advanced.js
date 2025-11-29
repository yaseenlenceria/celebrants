import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/#/directory', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Test for zero results scenario
    console.log('\nTest: Zero results scenario...');
    const searchBox = await page.locator('input[placeholder*="Search"]').first();
    await searchBox.fill('XYZNONEXISTENT123');
    await page.waitForTimeout(1000);
    
    // Check for "no results" message
    const noResults = await page.locator('text=/no.*celebrants?.*found|no.*results/i').first();
    const noResultsExists = await noResults.count() > 0;
    console.log(noResultsExists ? '✓ No results message found' : '⚠ No results message not found');
    
    // Check for clear filters button
    const clearButton = await page.locator('button:has-text("Clear"), button:has-text("Reset")').first();
    const clearExists = await clearButton.count() > 0;
    console.log(clearExists ? '✓ Clear filters button found' : '⚠ Clear filters button not found');
    
    if (clearExists) {
      await page.screenshot({ path: 'test-directory-no-results.png', fullPage: true });
      console.log('✓ Screenshot: No results with clear button');
      
      // Test clicking clear button
      await clearButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-directory-cleared.png', fullPage: true });
      console.log('✓ Screenshot: After clearing filters');
      
      // Check if results returned
      const resultsAfterClear = await page.locator('.celebrant-card, [class*="celebrant"]').count();
      console.log(`Results after clearing: ${resultsAfterClear}`);
    }
    
    // Test results counter accuracy
    console.log('\nTest: Results counter accuracy...');
    await searchBox.clear();
    await page.waitForTimeout(500);
    
    const totalResults = await page.locator('.celebrant-card, [class*="CelebrantCard"]').count();
    console.log(`Total celebrant cards visible: ${totalResults}`);
    
    const counterText = await page.locator('text=/showing.*\d+.*of.*\d+|\d+.*celebrants?/i').first();
    if (await counterText.count() > 0) {
      const text = await counterText.textContent();
      console.log(`Counter text: "${text}"`);
    }
    
    // Test clicking View Profile button
    console.log('\nTest: View Profile button...');
    const viewProfileBtn = await page.locator('button:has-text("View Profile")').first();
    if (await viewProfileBtn.count() > 0) {
      console.log('✓ View Profile button found');
      await viewProfileBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'test-celebrant-profile.png', fullPage: true });
      console.log('✓ Screenshot: Celebrant profile page');
      
      // Check if we navigated to a profile page
      const url = page.url();
      console.log(`Current URL: ${url}`);
    }
    
  } catch (error) {
    console.error('✗ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
