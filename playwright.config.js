// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  
  testDir: './src', 
  testMatch: '*.spec.ts', 
  webServer: {
    command: 'npm run dev', 
    url: 'http://localhost:5173', 
    reuseExistingServer: !process.env.CI 
  },
  use: {
    baseURL: 'http://localhost:5173', 
    browserName: 'chromium', 
    headless: false,
    
  }
});