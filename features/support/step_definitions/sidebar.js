const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

When("I click the {string} button on the sidebar", async function(
  buttonSelector
) {
  await Promise.all([
    this.page.waitForNavigation(),
    this.page.click(`.sidebar ${buttonSelector}`)
  ]);
});

Then("I am taken to the {string} page", async function(page) {
  const url = await this.page.url();
  expect(url).to.include(page);
});
