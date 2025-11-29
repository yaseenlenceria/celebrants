import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('=== DIRECTORY PAGE TESTING ===');
  
  console.log('1. Navigating to directory page...');
  await page.goto('http://localhost:3000/#/directory');
  await page.waitForTimeout(3000);
  
  console.log('2. Taking initial full page screenshot...');
  await page.screenshot({ path: 'screenshots/directory-full-view.png', fullPage: true });
  
  console.log('3. Verifying counter text...');
  const bodyText = await page.textContent('body');
  const counterMatch = bodyText.match(/Showing (\d+) of (\d+)/);
  if (counterMatch) {
    console.log('   Counter found:', counterMatch[0]);
    console.log('   Showing:', counterMatch[1], 'celebrants');
    console.log('   Total:', counterMatch[2], 'celebrants');
  } else {
    console.log('   Counter not found');
  }
  
  console.log('4. Counting celebrant cards...');
  const cardCount = await page.evaluate(() => {
    const articles = document.querySelectorAll('article');
    return articles.length;
  });
  console.log('   Found', cardCount, 'celebrant cards');
  
  console.log('5. Checking for filter elements...');
  const filterInfo = await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"], input[type="search"]');
    
    return {
      selectCount: selects.length,
      inputCount: inputs.length,
      selectLabels: Array.from(selects).map(s => s.previousElementSibling?.textContent || 'no label'),
      inputPlaceholders: Array.from(inputs).map(i => i.placeholder || 'no placeholder')
    };
  });
  
  console.log('   Found', filterInfo.selectCount, 'select dropdowns');
  console.log('   Found', filterInfo.inputCount, 'text inputs');
  if (filterInfo.selectCount > 0) {
    console.log('   Select labels:', filterInfo.selectLabels);
  }
  if (filterInfo.inputCount > 0) {
    console.log('   Input placeholders:', filterInfo.inputPlaceholders);
  }
  
  if (filterInfo.inputCount > 0) {
    console.log('6. Testing search functionality...');
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    
    console.log('   Searching for Sarah...');
    await searchInput.fill('Sarah');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/search-sarah.png', fullPage: true });
    
    const sarahCount = await page.evaluate(() => {
      return document.querySelectorAll('article').length;
    });
    console.log('   Results for Sarah:', sarahCount, 'celebrants');
    
    await searchInput.clear();
    await page.waitForTimeout(500);
    console.log('   Searching for James...');
    await searchInput.fill('James');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/search-james.png', fullPage: true });
    
    const jamesCount = await page.evaluate(() => {
      return document.querySelectorAll('article').length;
    });
    console.log('   Results for James:', jamesCount, 'celebrants');
    
    await searchInput.clear();
    await page.waitForTimeout(1000);
  }
  
  if (filterInfo.selectCount > 0) {
    console.log('7. Testing type filter dropdown...');
    const typeSelect = page.locator('select').first();
    
    const options = await typeSelect.locator('option').allTextContents();
    console.log('   Type filter has', options.length, 'options');
    
    await typeSelect.focus();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/filters-view.png' });
  }
  
  console.log('8. Taking viewport screenshots at different scroll positions...');
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mid-scroll.png', fullPage: false });
  
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/bottom-scroll.png', fullPage: false });
  
  console.log('=== TEST COMPLETE ===');
  console.log('All screenshots saved successfully');
  
  await browser.close();
})();
