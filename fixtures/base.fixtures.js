const { test: base } = require('@playwright/test');
const { createLoginPage } = require('../pages/LoginPage');
const { loginData } = require('../tests/test-data/auth/loginData');

const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = createLoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      loginData.valid.email,
      loginData.valid.password
    );
    await page.waitForURL(loginData.urls.dashboard);
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = createLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

});

const { expect } = require('@playwright/test');
module.exports = { test, expect };