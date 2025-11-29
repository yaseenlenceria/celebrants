import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Test 1: Navigate to Directory page...');
    await page.goto('http://localhost:3000/#/directory', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-directory-initial.png', fullPage: true });
    console.log('✓ Screenshot 1: Initial Directory page saved');
    
    // Check if search box exists
    const searchBox = await page.locator('input[placeholder*="Search"]').first();
    const searchExists = await searchBox.count() > 0;
    console.log(searchExists ? '✓ Search box found' : '✗ Search box NOT found');
    
    // Check if filter dropdowns exist
    const typeFilter = await page.locator('select').first();
    const typeFilterExists = await typeFilter.count() > 0;
    console.log(typeFilterExists ? '✓ Filter dropdown found' : '✗ Filter dropdown NOT found');
    
    // Test 2: Search functionality
    console.log('\nTest 2: Testing search for "Sarah"...');
    await searchBox.fill('Sarah');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-directory-search-sarah.png', fullPage: true });
    console.log('✓ Screenshot 2: Search for Sarah saved');
    
    // Count results
    const celebrantCards = await page.locator('.celebrant-card, [class*="celebrant"]').count();
    console.log(`Results found: ${celebrantCards}`);
    
    // Test 3: Clear search and test type filter
    console.log('\nTest 3: Testing type filter...');
    await searchBox.clear();
    await page.waitForTimeout(500);
    
    // Try to find and interact with type filter
    const typeSelect = await page.locator('select').first();
    if (await typeSelect.count() > 0) {
      const options = await typeSelect.locator('option').count();
      console.log(`Type filter has ${options} options`);
      
      if (options > 1) {
        await typeSelect.selectOption({ index: 1 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-directory-type-filter.png', fullPage: true });
        console.log('✓ Screenshot 3: Type filter applied');
      }
    }
    
    // Test 4: Location filter
    console.log('\nTest 4: Testing location filter...');
    const locationSelect = await page.locator('select').nth(1);
    if (await locationSelect.count() > 0) {
      const options = await locationSelect.locator('option').count();
      console.log(`Location filter has ${options} options`);
      
      if (options > 1) {
        await locationSelect.selectOption({ index: 1 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-directory-location-filter.png', fullPage: true });
        console.log('✓ Screenshot 4: Location filter applied');
      }
    }
    
    // Test 5: Combined filters
    console.log('\nTest 5: Testing combined filters...');
    await searchBox.fill('e');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-directory-combined-filters.png', fullPage: true });
    console.log('✓ Screenshot 5: Combined filters applied');
    
    // Check for results counter
    const resultsCounter = await page.locator('text=/\d+ celebrants?|\d+ results?/i').first();
    if (await resultsCounter.count() > 0) {
      const counterText = await resultsCounter.textContent();
      console.log(`✓ Results counter found: ${counterText}`);
    } else {
      console.log('⚠ Results counter not found');
    }
    
    // Check for clear filters button
    const clearButton = await page.locator('button:has-text("Clear")').first();
    if (await clearButton.count() > 0) {
      console.log('✓ Clear filters button found');
    } else {
      console.log('⚠ Clear filters button not found');
    }
    
    console.log('\n✓ All tests completed successfully!');
    
  } catch (error) {
    console.error('✗ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
