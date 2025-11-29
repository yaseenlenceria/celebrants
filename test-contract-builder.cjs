const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  try {
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot-1-tools.png', fullPage: true });
    console.log('Screenshot 1 saved');
    await page.click('text=Contract Builder');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot-2-form.png', fullPage: true });
    console.log('Screenshot 2 saved');
  } catch (e) { console.error(e); }
  await browser.close();
})();
