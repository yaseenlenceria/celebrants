const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  try {
    console.log('Testing form interactions...');
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(1500);
    await page.click('text=Contract Builder');
    await page.waitForTimeout(1000);
    await page.selectOption('select', 'funeral');
    await page.fill('input[placeholder*="name"]', 'Jane Smith');
    const inputs = await page.locator('input[placeholder*="name"]').all();
    if (inputs.length > 1) await inputs[1].fill('John and Mary Doe');
    await page.fill('input[type="date"]', '2025-12-15');
    const numberInputs = await page.locator('input[type="number"]').all();
    if (numberInputs.length > 0) await numberInputs[0].fill('750');
    if (numberInputs.length > 1) await numberInputs[1].fill('200');
    await page.fill('textarea', 'Include readings from family members.');
    await page.screenshot({ path: 'test-form-filled.png', fullPage: true });
    console.log('Form filled successfully\!');
    const button = await page.locator('button:has-text("Generate Contract")').isVisible();
    console.log('Generate button visible:', button);
  } catch (e) { console.error('Error:', e.message); }
  await browser.close();
})();
