const { test, expect } = require('@playwright/test');

test.describe('Dogsitter Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3041/findsitter'); // Updated to /findsitter
  });

  test('loads the search page', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Press paws on pet stress');
    await expect(page.locator('#searchdogsitter')).toBeVisible();
  });

  test('displays loading message when search is initiated', async ({ page }) => {
    await page.fill('#searchLocation', 'Sydney');
    await page.click('#searchdogsitter');
    await expect(page.locator('#results')).toHaveText('Loading...');
  });

  test('fetches search results and displays them', async ({ page }) => {
    // Mock the API response for /api/search
    await page.route(/\/api\/search\?location=.*/, async route => {
      const url = route.request().url();
      if (url.includes('Sydney')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              firstName: 'John',
              lastName: 'Doe',
              address: '123 Street',
              suburb: 'Sydney',
              postalCode: '2000',
              email: 'john@example.com',
              phone: '123456789',
              _id: '1',
            },
          ]),
        });
      } else if (url.includes('Unknown')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      }
    });

    await page.fill('#searchLocation', 'Sydney');
    await page.click('#searchdogsitter');

    // Wait for results to load and check content
    await expect(page.locator('#results')).toContainText('John Doe', { timeout: 10000 });
    await expect(page.locator('#results')).toContainText('123 Street');
  });

  test('displays "no results found" when no data is returned', async ({ page }) => {
    // Mock the API response to return an empty array
    await page.route(/\/api\/search\?location=.*/, async route => {
      if (route.request().url().includes('Unknown')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      }
    });

    await page.fill('#searchLocation', 'Unknown');
    await page.click('#searchdogsitter');
    
    await expect(page.locator('#results')).toHaveText('No results found.', { timeout: 10000 });
  });

  test('displays error message on server error', async ({ page }) => {
    // Mock the API response with a server error
    await page.route(/\/api\/search\?location=.*/, async route => {
      if (route.request().url().includes('Sydney')) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to fetch search results' }),
        });
      }
    });

    await page.fill('#searchLocation', 'Sydney');
    await page.click('#searchdogsitter');

    await expect(page.locator('#results')).toHaveText(
      'An error occurred while fetching results. Please try again later.',
      { timeout: 10000 }
    );
  });

  test('redirects to walker profile when contact button is clicked', async ({ page }) => {
    // Mock the API response for /api/search
    await page.route(/\/api\/search\?location=.*/, async route => {
      if (route.request().url().includes('Sydney')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              firstName: 'John',
              lastName: 'Doe',
              address: '123 Street',
              suburb: 'Sydney',
              postalCode: '2000',
              email: 'john@example.com',
              phone: '123456789',
              _id: '1',
            },
          ]),
        });
      }
    });

    await page.fill('#searchLocation', 'Sydney');
    await page.click('#searchdogsitter');

    // Wait for the contact button to appear and click it
    await page.click('.contact-button', { timeout: 10000 });

    // Assert that the URL changes to the walker profile page
    await expect(page).toHaveURL(/.*walkerProfile.html/);
  });
});
