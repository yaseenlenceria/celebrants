const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  try {
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(1500);
    await page.click('text=Contract Builder');
    await page.waitForTimeout(1000);
    const options = await page.locator('select option').allTextContents();
    console.log('Available options:', options);
    await page.fill('input[placeholder*="name"]', 'Jane Smith');
    await page.fill('input[type="date"]', '2025-12-15');
    await page.fill('textarea', 'Include readings from family members.');
    await page.screenshot({ path: 'test-form-partial-fill.png', fullPage: true });
    console.log('Test completed\!');
  } catch (e) { console.error('Error:', e.message); }
  await browser.close();
})();
