import { test, expect } from '@playwright/test';

test('login, add iPhone X to cart, and confirm product in checkout', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in demo credentials
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');

  /* Select the Admin radio button if it is not already selected
  const adminRadio = page.locator('input[value="admin"]');
  if (!(await adminRadio.isChecked())) {
    await adminRadio.check();
  }

  // Accept the terms and conditions checkbox
  const termsCheckbox = page.locator('#terms');
  if (!(await termsCheckbox.isChecked())) {
    await termsCheckbox.check();
  }*/

  // Click Sign in and wait for navigation to the shop page
  await Promise.all([
    page.waitForURL(/.*shop/),
    page.click('#signInBtn'),
  ]);

  // Find the iPhone X product card and add it to the cart
  const cards = await page.locator('.card');
  const cardCount = await cards.count();

  for (let i = 0; i < cardCount; i++) {
    const cardTitle = await cards.nth(i).locator('.card-title a').textContent();
    if (cardTitle && cardTitle.includes('iphone X')) {
      await cards.nth(i).locator('button:has-text("Add")').click();
      break;
    }
  }

  // Go to the checkout page and wait for navigation
  await page.locator('a:has-text("Checkout")').click();

  // Verify the iPhone X product is present in the checkout page
  const checkoutProduct = await page.locator('h4.media-heading').textContent();
  expect(checkoutProduct).toContain('iphone X');

  console.log('Test completed successfully: iPhone X is present in the checkout page.');
  // Close the page (close the browser tab)
  await page.close();
});
