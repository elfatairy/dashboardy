import { chromium, type Browser, type Page } from '@playwright/test';
import { expect as pwExpect } from '@playwright/test';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Payroll', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should have payroll', async () => {
    await page.goto('http://localhost:5173/payroll');
    await pwExpect(page.getByRole('heading', { name: 'Payroll', exact: true })).toBeInViewport();
  });

  describe('Graphs', () => {
    test('should have duration switch', async () => {
      await page.goto('http://localhost:5173/payroll');
      await pwExpect(page.getByRole('button', { name: '30 Days' })).toBeInViewport();
      await pwExpect(page.getByRole('button', { name: '3 Months' })).toBeInViewport();
    });

    test('should have payroll expenses earnings graph', async () => {
      await page.goto('http://localhost:5173/payroll');
      await pwExpect(page.getByRole('heading', { name: 'Payroll Expenses / Earnings', exact: true })).toBeInViewport();
    });

    test('duration switch should change expenses graph', async () => {
      await page.goto('http://localhost:5173/payroll');
      const oldValue = await page.getByTestId('total-expenses').textContent();
      await page.getByRole('button', { name: '3 Months' }).click();
      const newValue = await page.getByTestId('total-expenses').textContent();
      expect(newValue).not.toBe(oldValue);
    });

    test('should have payroll expenses earnings graph', async () => {
      await page.goto('http://localhost:5173/payroll');
      await pwExpect(page.getByRole('heading', { name: 'Payroll Expenses / Earnings', exact: true })).toBeInViewport();
    });

    test('duration switch should change payroll expenses earnings graph', async () => { 
      await page.goto('http://localhost:5173/payroll');
      const oldValue = await page.getByTestId('expenses-earnings-graph-value').textContent(); 
      await page.getByRole('button', { name: '3 Months' }).click();
      const newValue = await page.getByTestId('expenses-earnings-graph-value').textContent();
      expect(newValue).not.toBe(oldValue);
    });
  });

  test('should have payroll table', async () => {
    await page.goto('http://localhost:5173/payroll');
    await pwExpect(page.getByRole('table')).toBeInViewport();
  });

}); 