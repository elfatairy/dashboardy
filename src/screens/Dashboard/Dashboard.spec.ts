import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';
import { afterAll, beforeAll, describe, test } from 'vitest';

describe('Dashboard', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should have dashboard', async () => {
    await page.goto('http://localhost:5173/dashboard');
    await pwExpect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeInViewport();
  });

  describe("Stats", () => {
    test("should have active projects stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Active Projects', exact: true })).toBeInViewport();
    });
    test("should have tasks in progress stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Tasks in Progress', exact: true })).toBeInViewport();
    });
    test("should have active departments stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Active Departments', exact: true })).toBeInViewport();
    });
    test("should have total payroll this month stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Total Payroll this month', exact: true })).toBeInViewport();
    });
    test("should have total employees stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Total Employees', exact: true })).toBeInViewport();
    });
    test("should have total tasks stats", async () => {
      await page.goto('http://localhost:5173/dashboard');
      await pwExpect(page.getByRole('heading', { name: 'Total Tasks', exact: true })).toBeInViewport();
    });
  });
}); 