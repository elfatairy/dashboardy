import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';
import { afterAll, beforeAll, describe, test } from 'vitest';

describe('Tasks', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should have tasks', async () => {
    await page.goto('http://localhost:5173/tasks');
    await pwExpect(page.getByRole('heading', { name: 'Tasks' })).toBeInViewport();
  });


  test('should have tasks table', async () => {
    await page.goto('http://localhost:5173/tasks');
    await pwExpect(page.getByRole('table')).toBeInViewport();
  });

}); 