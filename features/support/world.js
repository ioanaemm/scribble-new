const puppeteer = require("puppeteer");

var {
  setWorldConstructor,
  Before,
  BeforeAll,
  After,
  AfterAll,
  setDefaultTimeout
} = require("cucumber");
setDefaultTimeout(20 * 1000);

function CustomWorld(callback) {
  this.driver = puppeteer;
}

Before(async function(testCase) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(function() {
  return this.browser.close();
});

setWorldConstructor(CustomWorld);
