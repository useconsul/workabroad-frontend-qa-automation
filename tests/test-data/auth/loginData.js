require('dotenv').config();
const loginData = {

  valid: {
    email: process.env.QA_EMAIL,
    password: process.env.QA_PASSWORD,
  },

  invalid: {
    email: 'wrong@email.com',
    password: 'WrongPassword123!',
    emailFormat: 'notanemail',
    empty: '',
  },

  placeholders: {
    emailField: 'example@email.com',
    passwordField: '············',
    emailReset: 'Email',
    confirmationCode: 'Confirmation Code',
    newPassword: 'New Password',
  },

  errorMessages: {
    invalidCredentials:  /incorrect username or password/i,
    invalidEmailFormat:  /Must be a valid email/i,
  },

  validationErrors: {
    emailRequired:        'Email is required.',
    confirmCodeRequired:  'Confirmation code is required.',
    newPasswordRequired:  'New password is required.',
    invalidCode:          'Invalid verification code provided, please try again.',
  },

  successMessages: {
    resetLinkSent: 'Password reset link sent to your email.',
  },

  pageText: {
    loginTitle:        'Login to your account',
    forgotPasswordTitle: 'Forgot Password?',
    forgotPasswordSubtitle: 'Enter your email to reset your password.',
    resetPasswordTitle: 'Reset Password',
  },

  resetPassword: {
    invalidCode: '000000',
    newPassword: 'NewPassword123!',
  },

  urls: {
    login:          /login/,
    forgotPassword: /forgot-password/,
    resetPassword:  /reset-password/,
    dashboard:      /dashboard/,
  },
};

module.exports = { loginData };