const urls = require("./urls");

module.exports = class Mint {
  constructor(page, selectors, secrets) {
    this.page = page;
    this.selectors = selectors;
    this.secrets = secrets;
  }

  async login() {
    await this.enterUsername();
    await this.enterPassword();
    await this.page.click(this.selectors.login);
  }

  async enterUsername() {
    await this.page.click(this.selectors.username);
    await this.page.keyboard.type(this.secrets.username);
  }

  async enterPassword() {
    await this.page.click(this.selectors.password);
    await this.page.keyboard.type(this.secrets.password);
  }

  async updateAccount(ubtFundTotal) {
    await this.page.goto(urls.mintAccounts, { waitUntil: "networkidle0" });
    await this.page.click(this.selectors.account);
    await this.page.click(this.selectors.value);
    await this.clearCurrentValue();
    await this.page.keyboard.type(ubtFundTotal);
    await this.saveChanges();
  }

  async clearCurrentValue() {
    await this.page.click(this.selectors.value, { clickCount: 3 });
    await this.page.keyboard.press("Backspace");
  }

  async saveChanges() {
    return await this.page.evaluate(() => {
      const accounts = document.getElementsByClassName("accountDetailsFooter");
      const button = accounts[0].children[1];
      button.click();
    });
  }
};
