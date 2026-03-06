// pages/TalentPoolPage.js
const { createBasePage } = require('./BasePage').default;

function createTalentPoolPage(page) {
  const base = createBasePage(page);

  // Locators
  const addCandidateBtn = page.getByRole('button', { name: 'Add Candidate' });
  const createOption    = page.getByText('Create');
  const inviteOption    = page.getByText('Invite');
  const searchInput     = page.getByPlaceholder('Search applicants');
  const candidateRows   = page.locator('table tbody tr');

  // Actions
  async function goto() {
    await base.navigate('/dashboard/company-pool');
    await base.waitForPageLoad();
  }

  async function clickAddCandidate() {
    await base.click(addCandidateBtn);
    await base.click(createOption);
  }

  async function searchCandidate(name) {
    await base.fill(searchInput, name);
    await base.waitForPageLoad();
  }

  async function openCandidateByName(name) {
    await page.getByText(name).first().click();
  }

  async function getCandidateCount() {
    return await candidateRows.count();
  }

  async function candidateExists(name) {
    return await page.getByText(name).isVisible();
  }

  return {
    addCandidateBtn,
    createOption,
    inviteOption,
    searchInput,
    candidateRows,
    goto,
    clickAddCandidate,
    searchCandidate,
    openCandidateByName,
    getCandidateCount,
    candidateExists,
  };
}

module.exports = { createTalentPoolPage };