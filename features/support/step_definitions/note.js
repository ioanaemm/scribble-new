const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

When("I go to the note with id {string}", async function(noteId) {
  await this.page.goto(`http://localhost:3000/notes/${noteId}`);
  await this.page.waitForSelector(".note-content");
  await this.page.waitForSelector(".tox-edit-area__iframe");
});

When("I replace the note body with {string}", async function(newNoteBody) {
  await this.page.evaluate(`tinyMCE.activeEditor.setContent('${newNoteBody}')`);
});

When("I save the note", async function() {
  await this.page.click("button.save-note");
  await this.page.waitForSelector("button.is-saving");
  await this.page.waitForSelector("button.is-not-saving");
});

Then("the note body editor says {string}", async function(expectedBodyContent) {
  const actualBodyContent = await this.page.evaluate(
    `tinyMCE.activeEditor.setContent('${expectedBodyContent}')`
  );
  expect(actualBodyContent).to.equal(`<p>${expectedBodyContent}</p>`);
});
