import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('Step 1: Navigate to directory page...');
  await page.goto('http://localhost:3000/#/directory');
  await page.waitForTimeout(2000);
  
  console.log('Step 2: Taking initial screenshot...');
  await page.screenshot({ path: 'screenshots/directory-initial.png', fullPage: true });
  
  console.log('Step 3: Checking celebrant counter...');
  const counterText = await page.textContent('body').catch(() => '');
  const counterMatch = counterText.match(/Showing (\d+) of (\d+)/);
  if (counterMatch) {
    console.log('Counter shows:', counterMatch[0]);
  }
  
  console.log('Step 4: Counting visible celebrant cards...');
  await page.waitForSelector('.celebrant-card, [class*="celebrant"]', { timeout: 5000 }).catch(() => {});
  const cards = await page.evaluate(() => {
    const elements = document.querySelectorAll('.celebrant-card, [class*="CelebrantCard"], [class*="celebrant-card"]');
    return elements.length;
  });
  console.log('Visible celebrant cards:', cards);
  
  console.log('Step 5: Taking screenshot after scrolling...');
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/directory-scrolled-mid.png', fullPage: true });
  
  console.log('Step 6: Checking filters...');
  const selects = await page.locator('select').count();
  console.log('Number of select dropdowns:', selects);
  
  if (selects > 0) {
    console.log('Step 7: Clicking type filter...');
    await page.locator('select').first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/directory-type-filter.png' });
    
    const options = await page.locator('select').first().locator('option').count();
    console.log('Type filter options:', options);
  }
  
  console.log('Step 8: Testing search functionality...');
  const searchInput = await page.locator('input[type="text"], input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]').first();
  const searchExists = await searchInput.count();
  
  if (searchExists > 0) {
    await searchInput.fill('Sarah');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/directory-search-sarah.png', fullPage: true });
    
    const searchResults = await page.evaluate(() => {
      const elements = document.querySelectorAll('.celebrant-card, [class*="CelebrantCard"], [class*="celebrant-card"]');
      return elements.length;
    });
    console.log('Search results for "Sarah":', searchResults);
    
    await searchInput.clear();
    await searchInput.fill('James');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/directory-search-james.png', fullPage: true });
    
    const searchResults2 = await page.evaluate(() => {
      const elements = document.querySelectorAll('.celebrant-card, [class*="CelebrantCard"], [class*="celebrant-card"]');
      return elements.length;
    });
    console.log('Search results for "James":', searchResults2);
    
    await searchInput.clear();
    await page.waitForTimeout(1000);
  }
  
  console.log('Step 9: Final full page screenshot...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/directory-final.png', fullPage: true });
  
  console.log('All tests completed successfully!');
  await browser.close();
})();
