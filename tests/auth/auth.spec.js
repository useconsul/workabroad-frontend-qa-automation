const { test, expect } = require('../fixtures/base.fixtures');
const { loginData }    = require('../test-data/auth/loginData');

test.describe('Authentication — Login & Password Reset', () => {

  // LOGIN TESTS

  test.only('TC-AUTH-001 | Login with valid credentials',
  async ({ loginPage, page }) => {
    await loginPage.login(
      loginData.valid.email,
      loginData.valid.password
    );
    await expect(page).toHaveURL(loginData.urls.dashboard);
  });

  test('TC-AUTH-002 | Login with invalid password',
  async ({ loginPage, page }) => {
    await loginPage.login(
      loginData.valid.email,
      loginData.invalid.password
    );
    await expect(page).toHaveURL(loginData.urls.login);
    await expect(
      page.getByText(loginData.errorMessages.invalidCredentials)
    ).toBeVisible();
  });

  test('TC-AUTH-003 | Login with invalid email format',
  async ({ loginPage, page }) => {
    await loginPage.login(
      loginData.invalid.emailFormat,
      loginData.invalid.password
    );
    await expect(
      page.getByText(loginData.errorMessages.invalidEmailFormat)
    ).toBeVisible();
  });

  test('TC-AUTH-004 | Login with empty email field',
  async ({ loginPage, page }) => {
    await page.getByPlaceholder(loginData.placeholders.passwordField)
              .fill(loginData.invalid.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginData.urls.login);
  });

  test('TC-AUTH-005 | Login with empty password field',
  async ({ loginPage, page }) => {
    await page.getByPlaceholder(loginData.placeholders.emailField)
              .fill(loginData.valid.email);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginData.urls.login);
  });

  test('TC-AUTH-006 | Login with both fields empty',
  async ({ loginPage, page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginData.urls.login);
  });

  test('TC-AUTH-007 | Password visibility toggle works',
  async ({ loginPage, page }) => {
    await page.getByPlaceholder(loginData.placeholders.passwordField)
              .fill('TestPassword123');
    await expect(
      page.getByPlaceholder(loginData.placeholders.passwordField)
    ).toHaveAttribute('type', 'password');
    await loginPage.togglePasswordVisibility();
    await expect(
      page.getByPlaceholder(loginData.placeholders.passwordField)
    ).toHaveAttribute('type', 'text');
    await loginPage.togglePasswordVisibility();
    await expect(
      page.getByPlaceholder(loginData.placeholders.passwordField)
    ).toHaveAttribute('type', 'password');
  });

  test('TC-AUTH-008 | Forgot Password link navigates correctly',
  async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(loginData.urls.forgotPassword);
    await expect(
      page.getByText(loginData.pageText.forgotPasswordTitle)
    ).toBeVisible();
    await expect(
      page.getByText(loginData.pageText.forgotPasswordSubtitle)
    ).toBeVisible();
  });


  // FORGOT PASSWORD TESTS

  test('TC-AUTH-009 | Submit forgot password with valid email',
  async ({ loginPage, page }) => {
    await loginPage.submitForgotPassword(loginData.valid.email);
    await expect(
      page.getByText(loginData.successMessages.resetLinkSent)
    ).toBeVisible();
  });

  test('TC-AUTH-010 | Submit forgot password with empty email',
  async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('button', { name: 'Send Reset Link' }).click();
    await expect(
      page.getByText(loginData.validationErrors.emailRequired)
    ).toBeVisible();
  });

  test('TC-AUTH-011 | Submit forgot password with invalid email format',
  async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByPlaceholder(loginData.placeholders.emailReset)
              .fill(loginData.invalid.emailFormat);
    await page.getByRole('button', { name: 'Send Reset Link' }).click();
    await expect(
      page.getByText(loginData.errorMessages.invalidEmailFormat)
    ).toBeVisible();
  });

  test('TC-AUTH-012 | Back to login link works from forgot password page',
  async ({ loginPage, page }) => {
    await page.goto('/forgot-password');
    await loginPage.backToLogin();
    await expect(page).toHaveURL(loginData.urls.login);
    await expect(
      page.getByText(loginData.pageText.loginTitle)
    ).toBeVisible();
  });

  // RESET PASSWORD TESTS

  test('TC-AUTH-013 | Reset password page shows all required fields',
  async ({ page }) => {
    await page.goto('/reset-password');
    await expect(
      page.getByPlaceholder(loginData.placeholders.emailReset)
    ).toBeVisible();
    await expect(
      page.getByPlaceholder(loginData.placeholders.confirmationCode)
    ).toBeVisible();
    await expect(
      page.getByPlaceholder(loginData.placeholders.newPassword)
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Reset Password' })
    ).toBeVisible();
  });

  test('TC-AUTH-014 | Submit reset password with all fields empty',
  async ({ page }) => {
    await page.goto('/reset-password');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await expect(
      page.getByText(loginData.validationErrors.emailRequired)
    ).toBeVisible();
    await expect(
      page.getByText(loginData.validationErrors.confirmCodeRequired)
    ).toBeVisible();
    await expect(
      page.getByText(loginData.validationErrors.newPasswordRequired)
    ).toBeVisible();
  });

  test('TC-AUTH-015 | Submit reset password with invalid confirmation code',
  async ({ loginPage, page }) => {
    await loginPage.submitResetPassword(
      loginData.valid.email,
      loginData.resetPassword.invalidCode,
      loginData.resetPassword.newPassword
    );
    await expect(
      page.getByText(loginData.validationErrors.invalidCode)
    ).toBeVisible();
  });

});
