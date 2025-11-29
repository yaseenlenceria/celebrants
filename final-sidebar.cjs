const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  try {
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-full-page-tools.png', fullPage: false });
    console.log('Full page screenshot captured');
    await page.click('text=Contract Builder');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-contract-active.png', fullPage: false });
    console.log('Contract Builder active screenshot captured');
  } catch (e) { console.error('Error:', e.message); }
  await browser.close();
})();
