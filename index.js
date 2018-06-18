const accountUpdater = require("./src/accountUpdater");

try {
  const isHeadless = process.argv[2] ? process.argv[2] : false;
  accountUpdater.updateAccount(isHeadless);
} catch (error) {
  console.log(
    "Something went wrong.",
    "Probably UBT's crappy page.",
    "I would guess to just try again.",
    "ERROR:",
    error
  );
}
