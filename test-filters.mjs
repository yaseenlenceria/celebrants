import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('=== TESTING FILTERS ===');
  
  await page.goto('http://localhost:3000/#/directory');
  await page.waitForTimeout(2000);
  
  console.log('1. Checking TYPE filter options...');
  const typeSelect = page.locator('select').first();
  const typeOptions = await typeSelect.locator('option').allTextContents();
  console.log('   Total type options:', typeOptions.length);
  console.log('   Options:', typeOptions.slice(0, 15).join(', '));
  if (typeOptions.length > 15) {
    console.log('   ... and', typeOptions.length - 15, 'more options');
  }
  
  console.log('\n2. Checking LOCATION filter options...');
  const locationSelect = page.locator('select').nth(1);
  const locationOptions = await locationSelect.locator('option').allTextContents();
  console.log('   Total location options:', locationOptions.length);
  console.log('   Locations:', locationOptions.slice(0, 15).join(', '));
  if (locationOptions.length > 15) {
    console.log('   ... and', locationOptions.length - 15, 'more locations');
  }
  
  console.log('\n3. Testing TYPE filter selection...');
  await typeSelect.selectOption({ index: 5 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/filter-type-selected.png', fullPage: true });
  
  const filteredCount1 = await page.textContent('body');
  const match1 = filteredCount1.match(/Showing (\d+) of (\d+)/);
  if (match1) {
    console.log('   After type filter:', match1[0]);
  }
  
  console.log('\n4. Resetting filters...');
  await typeSelect.selectOption({ index: 0 });
  await page.waitForTimeout(1500);
  
  console.log('\n5. Testing LOCATION filter selection...');
  await locationSelect.selectOption({ index: 5 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/filter-location-selected.png', fullPage: true });
  
  const filteredCount2 = await page.textContent('body');
  const match2 = filteredCount2.match(/Showing (\d+) of (\d+)/);
  if (match2) {
    console.log('   After location filter:', match2[0]);
  }
  
  console.log('\n=== FILTER TEST COMPLETE ===');
  
  await browser.close();
})();
