const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  try {
    console.log('Testing Contract Builder Implementation...');
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(2000);
    const lockIcons = await page.locator('svg.lucide-lock').count();
    console.log('Lock icons found:', lockIcons);
    await page.screenshot({ path: 'test-sidebar-unlocked.png' });
    await page.click('text=Contract Builder');
    await page.waitForTimeout(1000);
    const serviceType = await page.locator('select').first().isVisible();
    const celebrantName = await page.locator('input[placeholder*="name"]').first().isVisible();
    const serviceDate = await page.locator('input[type="date"]').isVisible();
    const textarea = await page.locator('textarea').isVisible();
    console.log('Service Type dropdown:', serviceType);
    console.log('Celebrant Name input:', celebrantName);
    console.log('Service Date input:', serviceDate);
    console.log('Textarea:', textarea);
    await page.screenshot({ path: 'test-contract-form-full.png', fullPage: true });
  } catch (e) { console.error(e); }
  await browser.close();
})();
