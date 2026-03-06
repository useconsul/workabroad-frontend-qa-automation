// pages/LoginPage.js
const { createBasePage } = require('./BasePage');

function createLoginPage(page) {
  const base = createBasePage(page);

  // ---- Locators ----
  const emailInput            = page.getByPlaceholder('example@email.com');
  const passwordInput         = page.getByPlaceholder('············');
  const loginButton           = page.getByRole('button', { name: 'Login' });
  const forgotPasswordLink    = page.getByText('Forgot Password?');
  const passwordToggleBtn     = page.locator('button[aria-label="toggle password"]');
  const forgotEmailInput      = page.getByPlaceholder('Email').first();
  const sendResetLinkBtn      = page.getByRole('button', { name: 'Send Reset Link' });
  const backToLoginLink       = page.getByRole('link', { name: 'Login' });
  const confirmationCodeInput = page.getByPlaceholder('Confirmation Code');
  const newPasswordInput      = page.getByPlaceholder('New Password');
  const resetPasswordBtn      = page.getByRole('button', { name: 'Reset Password' });

  // ---- Actions ----
  async function goto() {
    await base.navigate('/login');
    await base.waitForPageLoad();
  }

  // email and password injected from test — no hardcoding
  async function login(email, password) {
    await base.fill(emailInput, email);
    await base.fill(passwordInput, password);
    await base.click(loginButton);
    await base.waitForPageLoad();
  }

  async function clickForgotPassword() {
    await base.click(forgotPasswordLink);
    await base.waitForPageLoad();
  }

  async function submitForgotPassword(email) {
    await base.navigate('/forgot-password');
    await base.waitForPageLoad();
    await base.fill(forgotEmailInput, email);
    await base.click(sendResetLinkBtn);
  }

  async function submitResetPassword(email, code, newPassword) {
    await base.navigate('/reset-password');
    await base.waitForPageLoad();
    await base.fill(forgotEmailInput, email);
    await base.fill(confirmationCodeInput, code);
    await base.fill(newPasswordInput, newPassword);
    await base.click(resetPasswordBtn);
    await base.waitForPageLoad();
  }

  async function togglePasswordVisibility() {
    await base.click(passwordToggleBtn);
  }

  async function backToLogin() {
    await base.click(backToLoginLink);
    await base.waitForPageLoad();
  }

  return {
    // Locators
    emailInput,
    passwordInput,
    loginButton,
    forgotPasswordLink,
    passwordToggleBtn,
    forgotEmailInput,
    sendResetLinkBtn,
    backToLoginLink,
    confirmationCodeInput,
    newPasswordInput,
    resetPasswordBtn,
    // Actions
    goto,
    login,
    clickForgotPassword,
    submitForgotPassword,
    submitResetPassword,
    togglePasswordVisibility,
    backToLogin,
  };
}

module.exports = { createLoginPage };