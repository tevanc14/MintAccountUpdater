// Third party
const puppeteer = require("puppeteer");

// Local
const Mint = require("./Mint");
const secrets = require("./secrets.json");
const selectors = require("./selectors.json");
const Ubt = require("./Ubt");
const urls = require("./urls");

let browser;

async function updateAccount(isHeadless) {
  browser = await puppeteer.launch({ headless: isHeadless });
  const ubtFundTotal = await getUbtFundTotal();
  await updateMintAccount(ubtFundTotal);
  browser.close();
}

async function getUbtFundTotal() {
  const ubtPage = await getPage(urls.ubt);
  const ubt = new Ubt(ubtPage, selectors.ubt, secrets.ubt);
  await ubt.login();
  await ubtPage.waitForNavigation({ waitUntil: "networkidle2" });
  const fundTotal = await ubt.getFundTotal();
  await takeScreenshot(ubtPage, "ubt");
  return fundTotal;
}

async function updateMintAccount(ubtFundTotal) {
  const mintPage = await getPage(urls.mintLogin);
  const mint = new Mint(mintPage, selectors.mint, secrets.mint);
  await mint.login();
  await mintPage.waitForNavigation({ waitUntil: "networkidle2" });
  await mint.updateAccount(ubtFundTotal);
  await takeScreenshot(mintPage, "mint");
}

async function getPage(url) {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  return page;
}

async function takeScreenshot(page, pageName) {
  const time = new Date().getTime();

  await page.screenshot({
    path: "screenshots/" + pageName + "-finishedRequest-" + time + ".png",
    fullPage: true
  });
}

module.exports = { updateAccount };
