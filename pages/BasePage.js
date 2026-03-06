function createBasePage(page) {

  async function navigate(path) {
    await page.goto(path);
  }

  async function waitForPageLoad() {
    await page.waitForLoadState('domcontentloaded');
  }

  async function click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async function fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  async function selectOption(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  async function getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return await locator.innerText();
  }

  async function isVisible(locator) {
    return await locator.isVisible();
  }

  async function waitForElement(locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async function waitForToast(message) {
    await page.getByText(message).waitFor({ state: 'visible', timeout: 10000 });
  }

  async function takeScreenshot(name) {
    await page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true
    });
  }

  async function scrollTo(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async function pressKey(key) {
    await page.keyboard.press(key);
  }

  async function wait(ms) {
    await page.waitForTimeout(ms);
  }

  return {
    navigate,
    waitForPageLoad,
    click,
    fill,
    selectOption,
    getText,
    isVisible,
    waitForElement,
    waitForToast,
    takeScreenshot,
    scrollTo,
    pressKey,
    wait,
    page
  };
}

module.exports = { createBasePage };