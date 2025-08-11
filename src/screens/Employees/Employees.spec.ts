import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';
import { afterAll, beforeAll, describe, test } from 'vitest';

describe('Employees', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should have employees', async () => {
    await page.goto('http://localhost:5173/employees');
    await pwExpect(page.getByRole('heading', { name: 'Employees', exact: true })).toBeInViewport();
  });

  describe('Employees Graphs', () => {
    test('should have employees departments graph', async () => {
      await page.goto('http://localhost:5173/employees');
      await pwExpect(page.getByRole('heading', { name: 'Employees / Department', exact: true })).toBeInViewport();
    });

    test('should have employees employment types graph', async () => {
      await page.goto('http://localhost:5173/employees');
      await pwExpect(page.getByRole('heading', { name: 'Employees / Employment Type', exact: true })).toBeInViewport();
    });
  });

  test('should have employees table', async () => {
    await page.goto('http://localhost:5173/employees');
    await pwExpect(page.getByRole('table')).toBeInViewport();
  });
}); 