const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  console.log('1. Navigating to AI Tools page...');
  await page.goto('http://localhost:3000/#/tools');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-screenshots/01-tools-page.png', fullPage: true });

  console.log('2. Checking if Vows Generator is unlocked...');
  const vowsGeneratorButton = page.locator('text=Vows Generator').first();
  await vowsGeneratorButton.waitFor({ state: 'visible', timeout: 5000 });
  
  // Check if there's no lock icon
  const hasLockIcon = await page.locator('text=Vows Generator').locator('..').locator('svg[data-icon="lock"]').count();
  console.log('   Lock icon count:', hasLockIcon);
  await page.screenshot({ path: 'test-screenshots/02-vows-generator-unlocked.png', fullPage: true });

  console.log('3. Clicking Vows Generator button...');
  await vowsGeneratorButton.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-screenshots/03-vows-form-loaded.png', fullPage: true });

  console.log('4. Verifying form fields exist...');
  const yourNameInput = page.locator('input[placeholder*="Your name" i], input[name*="yourName" i], label:has-text("Your Name") + input').first();
  const partnerNameInput = page.locator('input[placeholder*="Partner" i], input[name*="partnerName" i], label:has-text("Partner") + input').first();
  const loveStoryTextarea = page.locator('textarea[placeholder*="story" i], textarea[name*="story" i], label:has-text("Love Story") + textarea').first();
  const toneSelect = page.locator('select[name*="tone" i], select[name*="style" i], label:has-text("Tone") + select, label:has-text("Style") + select').first();
  const lengthSelect = page.locator('select[name*="length" i], label:has-text("Length") + select').first();

  console.log('5. Filling in the form...');
  await yourNameInput.fill('James');
  await partnerNameInput.fill('Sarah');
  await loveStoryTextarea.fill('We met at a coffee shop in 2019. She makes me laugh every day and is my best friend.');
  await toneSelect.selectOption('Romantic');
  await lengthSelect.selectOption('Medium');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-screenshots/04-form-filled.png', fullPage: true });

  console.log('6. Clicking Generate Vows button...');
  const generateButton = page.locator('button:has-text("Generate Vows")').first();
  await generateButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-screenshots/05-loading-state.png', fullPage: true });

  console.log('7. Waiting for vows to be generated...');
  await page.waitForTimeout(8000); // Wait for API response
  await page.screenshot({ path: 'test-screenshots/06-generated-vows.png', fullPage: true });

  console.log('8. Testing Copy button...');
  const copyButton = page.locator('button:has-text("Copy")').first();
  if (await copyButton.isVisible()) {
    await copyButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshots/07-after-copy.png', fullPage: true });
    console.log('   Copy button clicked successfully');
  } else {
    console.log('   Copy button not visible');
  }

  console.log('\n✅ Test completed! Check test-screenshots folder for results.');
  
  await browser.close();
})();
