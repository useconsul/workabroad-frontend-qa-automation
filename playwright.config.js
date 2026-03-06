require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 2 : 4,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  // Global settings applied to every test
  use: {
    baseURL: process.env.BASE_URL || 'https://app.useconsul.com',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    viewport: { width: 1280, height: 720 },

    actionTimeout: 15000,

    navigationTimeout: 30000,
  },

  timeout: 60000,

  expect: {
    timeout: 10000
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  outputDir: 'test-results/',
});