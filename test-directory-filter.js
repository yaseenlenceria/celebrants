import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  console.log('Test 1: Navigate to Directory page...');
  await page.goto('http://localhost:3008/#/directory');
  await page.waitForTimeout(2000);
  
  console.log('Test 2: Verify initial state - All Countries selected...');
  const initialCount = await page.locator('.celebrant-card').count();
  console.log(`Found ${initialCount} celebrant cards`);
  await page.screenshot({ path: 'test-1-initial-all-countries.png', fullPage: true });
  
  console.log('Test 3: Select Ireland from Country dropdown...');
  await page.selectOption('select[placeholder="All Countries"]', 'Ireland');
  await page.waitForTimeout(1000);
  
  console.log('Test 4: Verify Location dropdown shows ONLY Irish cities...');
  const locationSelect = page.locator('select').nth(1);
  const locationOptions = await locationSelect.locator('option').allTextContents();
  console.log('Location options after selecting Ireland:', locationOptions);
  await page.screenshot({ path: 'test-2-ireland-locations.png', fullPage: true });
  
  // Verify Irish cities only
  const hasIrishCities = locationOptions.some(opt => opt.includes('Dublin, Ireland') || opt.includes('Cork, Ireland'));
  const hasUKCities = locationOptions.some(opt => opt.includes('London, UK') || opt.includes('Manchester, UK'));
  console.log('Has Irish cities:', hasIrishCities);
  console.log('Has UK cities:', hasUKCities);
  
  console.log('Test 5: Select UK from Country dropdown...');
  await page.selectOption('select[placeholder="All Countries"]', 'UK');
  await page.waitForTimeout(1000);
  
  console.log('Test 6: Verify Location dropdown shows ONLY UK cities...');
  const ukLocationOptions = await locationSelect.locator('option').allTextContents();
  console.log('Location options after selecting UK:', ukLocationOptions);
  await page.screenshot({ path: 'test-3-uk-locations.png', fullPage: true });
  
  // Verify UK cities only
  const hasUKCitiesNow = ukLocationOptions.some(opt => opt.includes('London, UK') || opt.includes('Manchester, UK'));
  const hasIrishCitiesNow = ukLocationOptions.some(opt => opt.includes('Dublin, Ireland') || opt.includes('Cork, Ireland'));
  console.log('Has UK cities:', hasUKCitiesNow);
  console.log('Has Irish cities:', hasIrishCitiesNow);
  
  console.log('Test 7: Select a UK city and verify filtering...');
  if (ukLocationOptions.includes('London, UK')) {
    await page.selectOption(locationSelect, 'London, UK');
    await page.waitForTimeout(1000);
    const londonCount = await page.locator('.celebrant-card').count();
    console.log(`Celebrants in London: ${londonCount}`);
    await page.screenshot({ path: 'test-4-london-filter.png', fullPage: true });
  }
  
  console.log('Test 8: Switch back to Ireland and verify location reset...');
  await page.selectOption('select[placeholder="All Countries"]', 'Ireland');
  await page.waitForTimeout(1000);
  const resetLocationOptions = await locationSelect.locator('option').allTextContents();
  console.log('Location options after switching back to Ireland:', resetLocationOptions);
  await page.screenshot({ path: 'test-5-ireland-reset.png', fullPage: true });
  
  console.log('All tests completed!');
  await browser.close();
})();
