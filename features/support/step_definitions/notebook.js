const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

Then("the notebook page contains the title {string}", async function(
  expectedNotebookTitle
) {
  await this.page.waitForSelector(".notebook-title");
  const actualNotebookTitle = await this.page.evaluate(
    () => document.querySelector(".notebook-title").textContent
  );
  expect(actualNotebookTitle).to.equal(expectedNotebookTitle);
});
