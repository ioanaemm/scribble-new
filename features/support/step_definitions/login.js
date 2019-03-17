const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

Given("I navigate to the home page if I am not logged in", async function() {
  await this.page.goto("http://localhost:3000");
});

Then("I should see a login form", async function() {
  const loginForm = await this.page.$$("form.login");
  await expect(loginForm.length).to.equal(1);
});

When("I put my username and password in", async function() {
  await this.page.focus("form.login .username");
  await this.page.keyboard.type("ioanam");
  await this.page.focus("form.login .password");
  await this.page.keyboard.type("qwerty");
});

When("I submit the form", async function() {
  await this.page.keyboard.press("Enter");
});

Then("I see the home page", async function() {
  await this.page.waitForSelector(".page-content");
  const loginForm = await this.page.$$(".page-content");
  await expect(loginForm.length).to.equal(1);
});
