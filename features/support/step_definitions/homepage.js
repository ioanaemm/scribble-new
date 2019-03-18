const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

When("I click the {string} button", async function(buttonSelector) {
  await this.page.click(`${buttonSelector}`);
});

Then("I should see the {string} element", async function(elementSelector) {
  await this.page.waitForSelector(elementSelector);
});

When(
  "I type {string} into the title field of the notebook modal",
  async function(notebookTitle) {
    await this.page.focus("input.new-notebook-title");
    await this.page.keyboard.type(notebookTitle);
  }
);

When("I submit the new notebook form", async function() {
  await this.page.click(".newnotebook-btn");
});

Then(
  "I should see the new notebook with title {string} on the homepage",
  async function(title) {
    await this.page.waitForXPath(`//a[contains(text(), "${title}")]`);
  }
);
