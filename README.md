# Mint Account Updater

A Node.js-powered service to take a total from an IRA website and update
the correlated account in Mint.

## Current Interactions

> - Open and sign into UBT
> - Extract "grand total" number
> - Open and sign into Mint
> - Update IRA account with new total

## Usage

> - Create file `src/secrets.json` similar to the following:

```json
{
  "ubt": {
    "username": "",
    "securityQuestions": [
      { "question": "", "answer": "" },
      { "question": "", "answer": "" },
      { "question": "", "answer": "" }
    ],
    "password": ""
  },
  "mint": {
    "username": "",
    "password": ""
  }
}
```

> - Install requirements by executing `npm install`
> - Invoke program with `npm run start-headed` or `npm run start-headless`
>   depending on if you want the browser to be headless or not

## Screenshots

The utility will take a screenshot of both the UBT and Mint page as a final
step on each page.
