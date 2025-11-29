const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  try {
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(2000);
    console.log('Testing all 4 tools...');
    const tools = ['Ceremony Script', 'Social Media Post', 'Vows Generator', 'Contract Builder'];
    for (const tool of tools) {
      await page.click('text=' + tool);
      await page.waitForTimeout(500);
      console.log('Clicked:', tool);
    }
    await page.screenshot({ path: 'test-all-tools-unlocked.png', fullPage: true });
    console.log('All tools accessible\!');
  } catch (e) { console.error('Error:', e.message); }
  await browser.close();
})();
