const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

Given("I am logged in on the homepage", async function() {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto("http://localhost:3000");
  await this.page.waitForSelector("form.login");
  await this.page.focus("form.login .username");
  await this.page.keyboard.type("ioanam");
  await this.page.focus("form.login .password");
  await this.page.keyboard.type("qwerty");
  await this.page.keyboard.press("Enter");
  await this.page.waitForSelector(".page-content");
});
When("I click the new notebook button", async function() {
  await this.page.click(".add-item-container button");
});

Then("I should see the notebook modal", async function() {
  await this.page.waitForSelector(".modal");
});

When("I type {string} into the title field", async function(notebookTitle) {
  await this.page.focus("input.new-notebook-title");
  await this.page.keyboard.type(notebookTitle);
});

When("I submit the new notebook form", async function() {
  await this.page.click(".newnotebook-btn");
});

Then(
  "I should see the new notebook with title {string} on the homepage",
  async function(title) {
    await this.page.waitForXPath(`//a[contains(text(), "${title}")]`);
  }
);
