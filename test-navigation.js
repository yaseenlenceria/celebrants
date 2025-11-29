import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Testing Homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const homeTitle = await page.textContent('h1');
  console.log('Homepage H1:', homeTitle);
  await page.screenshot({ path: 'test-homepage.png', fullPage: true });

  console.log('\nTesting About page navigation...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const aboutTitle = await page.textContent('h1');
  console.log('About page H1:', aboutTitle);
  const aboutUrl = page.url();
  console.log('Current URL:', aboutUrl);
  await page.screenshot({ path: 'test-about.png', fullPage: true });

  console.log('\nTesting Services page navigation...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const servicesTitle = await page.textContent('h1');
  console.log('Services page H1:', servicesTitle);
  const servicesUrl = page.url();
  console.log('Current URL:', servicesUrl);
  await page.screenshot({ path: 'test-services.png', fullPage: true });

  console.log('\nTesting Directory page navigation...');
  await page.goto('http://localhost:3000/directory', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const directoryTitle = await page.textContent('h1');
  console.log('Directory page H1:', directoryTitle);
  const directoryUrl = page.url();
  console.log('Current URL:', directoryUrl);
  await page.screenshot({ path: 'test-directory.png', fullPage: true });

  console.log('\nTesting navbar links...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  
  // Click About link
  console.log('Clicking About link...');
  await page.click('a[href="/about"]');
  await page.waitForTimeout(1000);
  console.log('After clicking About, URL:', page.url());
  console.log('After clicking About, H1:', await page.textContent('h1'));

  await browser.close();
})();
