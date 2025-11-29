import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Testing Homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-homepage.png', fullPage: true });
  console.log('Homepage screenshot saved');

  console.log('Testing About page...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-about.png', fullPage: true });
  console.log('About page screenshot saved');

  console.log('Testing Services page...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-services.png', fullPage: true });
  console.log('Services page screenshot saved');

  console.log('Testing Directory page...');
  await page.goto('http://localhost:3000/directory', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-directory.png', fullPage: true });
  console.log('Directory page screenshot saved');

  // Test interactive elements
  console.log('Testing navbar interaction...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-navbar.png', clip: { x: 0, y: 0, width: 1920, height: 200 } });
  
  console.log('Testing footer...');
  const footerElement = await page.locator('footer');
  await footerElement.screenshot({ path: 'screenshot-footer.png' });

  console.log('All screenshots captured successfully!');
  await browser.close();
})();
