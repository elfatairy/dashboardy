import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';
import { afterAll, beforeAll, describe, test } from 'vitest';

describe('Projects', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should have projects', async () => {
    await page.goto('http://localhost:5173/projects');
    await pwExpect(page.getByRole('heading', { name: 'Projects' })).toBeInViewport();
  });

  describe('Stats', () => {
    test('should have total projects', async () => {
      await page.goto('http://localhost:5173/projects');
      await pwExpect(page.getByText('Total Projects', { exact: true })).toBeInViewport();
    });

    test('should have total projects', async () => {
      await page.goto('http://localhost:5173/projects');
      await pwExpect(page.getByText('Over Due Projects')).toBeInViewport();
    });

    test('should have total projects', async () => {
      await page.goto('http://localhost:5173/projects');
      await pwExpect(page.getByText('Active Projects')).toBeInViewport();
    });
    
    test('should habe total projects budget', async () => {
      await page.goto('http://localhost:5173/projects');
      await pwExpect(page.getByText('Total Projects Budgets')).toBeInViewport();
    });
  });

  test('should have projects table', async () => {
    await page.goto('http://localhost:5173/projects');
    await pwExpect(page.getByRole('table')).toBeInViewport();
  });

}); 