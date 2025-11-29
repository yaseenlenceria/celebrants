const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  try {
    await page.goto('http://localhost:3000/#/tools');
    await page.waitForTimeout(2000);
    const sidebar = page.locator('.bg-slate-900, [class*="sidebar"], aside').first();
    await sidebar.screenshot({ path: 'test-sidebar-closeup.png' });
    console.log('Sidebar screenshot captured');
    const lockCount = await page.locator('svg.lucide-lock').count();
    console.log('Lock icons in sidebar:', lockCount);
  } catch (e) { console.error('Error:', e.message); }
  await browser.close();
})();
