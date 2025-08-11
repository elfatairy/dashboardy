import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';

describe('Header', () => {
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
    await pwExpect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
  });

  test('should show correct title', async () => {
    await page.goto('http://localhost:5173/projects');
    await pwExpect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  });

  test('should show menu button on mobile', async () => {
    const menuButton = page.getByRole('button', { name: 'Open menu' });
    await pwExpect(menuButton).not.toBeVisible();

    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto('http://localhost:5173');
    
    await pwExpect(menuButton).toBeVisible();

    await pwExpect(page.getByText('Dashboardy')).not.toBeInViewport();
    await menuButton.click();
    await pwExpect(page.getByText('Dashboardy')).toBeInViewport();
  }, 10000);
}); 