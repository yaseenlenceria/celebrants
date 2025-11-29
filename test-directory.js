const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    console.log('[BROWSER ' + type + '] ' + text);
  });
  
  page.on('request', request => {
    console.log('REQUEST: ' + request.method() + ' ' + request.url());
  });
  
  page.on('response', async response => {
    console.log('RESPONSE: ' + response.status() + ' ' + response.url());
  });
  
  console.log('Navigating to directory page...');
  await page.goto('http://localhost:3000/directory');
  
  console.log('Waiting 15 seconds for API calls...');
  await page.waitForTimeout(15000);
  
  await page.screenshot({ path: 'directory-debug.png', fullPage: true });
  console.log('Screenshot saved');
  
  console.log('Total console messages: ' + consoleLogs.length);
  
  await browser.close();
})();
