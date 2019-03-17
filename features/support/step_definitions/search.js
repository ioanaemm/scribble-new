const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

Given("I am logged in", async function() {
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

When("I search for {string}", async function(searchTerm) {
  await this.page.focus(".search-container input");
  await this.page.keyboard.type(searchTerm);
  await Promise.all([
    this.page.waitForNavigation(),
    this.page.keyboard.press("Enter")
  ]);
});

Then(
  "I should be taken to the search results page for {string}",
  async function(searchTerm) {
    const url = await this.page.url();
    expect(url).to.include(`/search/${searchTerm}`);
  }
);
