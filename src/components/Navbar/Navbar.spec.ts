import { afterAll, beforeAll, describe, onTestFinished, test } from "vitest";
import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';

describe('Navbar', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should render', async () => {
    await page.goto('http://localhost:5173');
    await pwExpect(page.getByText('Dashboardy')).toBeInViewport();
  });

  test('show not appear on mobile', async () => {
    await page.setViewportSize({ width: 600, height: 800 });
    onTestFinished(async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
    })
    await page.goto('http://localhost:5173');
    await pwExpect(page.getByText('Dashboardy')).not.toBeInViewport();
  });
  
  describe('Search bar', () => {
    test('should have search bar', async () => {
      await page.goto('http://localhost:5173');
      await pwExpect(page.getByText('Search')).toBeInViewport();
    });

    test('search bar should open search overlay', async () => {
      await page.goto('http://localhost:5173');
      let opacity = await page.getByTestId('search-overlay').evaluate((el) => getComputedStyle(el).opacity);
      pwExpect(opacity).toBe('0');
      await page.getByTestId('search-button').click();
      await new Promise(resolve => setTimeout(resolve, 200));
      opacity = await page.getByTestId('search-overlay').evaluate((el) => getComputedStyle(el).opacity);
      pwExpect(opacity).toBe('1');
    });
  });

  describe('Navbar items', () => {
    test('should have navbar items', async () => {
      await page.goto('http://localhost:5173');
      await pwExpect(page.getByRole('menuitem').first()).toBeInViewport();
      await pwExpect(page.getByRole('menuitem').nth(1)).toBeInViewport();
      await pwExpect(page.getByRole('menuitem').nth(2)).toBeInViewport();
    });

    test('should have active navbar item', async () => {
      await page.goto('http://localhost:5173');
      await pwExpect(page.getByRole('menuitem').getByRole('link').first()).toHaveAttribute('data-active', 'true');
    });

    test("should navigate to the correct page when navbar item is clicked", async () => {
      await page.goto('http://localhost:5173');
      await page.getByRole('menuitem').getByText('Projects').click();
      await pwExpect(page).toHaveURL('http://localhost:5173/projects');
    });
  });
  
  describe('Profile Details', () => {
    test('should have logout button', async () => {
      await page.goto('http://localhost:5173');
      await pwExpect(page.getByRole('button', { name: 'Logout' })).toBeInViewport();
    });
  });
}); 