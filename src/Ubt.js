module.exports = class Ubt {
  constructor(page, selectors, secrets) {
    this.page = page;
    this.selectors = selectors;
    this.secrets = secrets;
  }

  async login() {
    await this.enterUsername();
    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
    await this.answerSecurityQuestion();
    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
    await this.enterPassword();
  }

  async enterUsername() {
    await this.page.click(this.selectors.username);
    await this.page.keyboard.type(this.secrets.username);
    await this.page.click(this.selectors.usernameNext);
  }

  async answerSecurityQuestion() {
    const questionText = await this.getSecurityQuestion();
    const answerText = this.getSecurityQuestionAnswer(questionText);
    await this.page.click(this.selectors.securityQuestionInput);
    await this.page.keyboard.type(answerText);
    await this.page.click(this.selectors.securityQuestionNext);
  }

  async getSecurityQuestion() {
    return await this.page.evaluate(() => {
      return document.getElementsByClassName("inputLabel")[0].innerText;
    });
  }

  getSecurityQuestionAnswer(questionText) {
    const questionObject = this.secrets.securityQuestions.filter(
      individualQuestion => {
        return individualQuestion.question == questionText;
      }
    );

    return questionObject[0].answer;
  }

  async enterPassword() {
    await this.page.click(this.selectors.password);
    await this.page.keyboard.type(this.secrets.password);
    await this.page.click(this.selectors.passwordNext);
  }

  async getFundTotal() {
    await sleep(2000);
    return await this.page.evaluate(() => {
      const table = document.getElementsByClassName("OnlineReport")[0];
      return table.rows[5].cells[2].innerText;
    });
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
