// pages/LoginPage.js
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators — all in one place, easy to update if UI changes
    this.emailInput    = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.errorMessage  = page.getByText('Invalid credentials');
  }

  // Full login action
  async login(email, password) {
    await this.navigate('/login');
    await this.waitForPageLoad();
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForPageLoad();
  }

  // Login with credentials from .env file
  async loginWithEnvCredentials() {
    await this.login(
      process.env.QA_EMAIL,
      process.env.QA_PASSWORD
    );
  }
}

module.exports = { LoginPage };