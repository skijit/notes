Puppeteer Notes
==============

- Scraping library based on Chrome
- [API documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)
- [blog circa 2017/8/25 - using puppeteer and mongodb](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)
- [another blog circa 2017/10/25 - using puppeteer](https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921)
- [repo of puppeteer examples](https://github.com/checkly/puppeteer-examples)

## General
- requires node version 8
- for visual debugging:
  
  ```(javascript)
  const browser = await puppeteer.launch({headless: false});

  //also this is not necessary, but it makes sure everything has loaded
  //and probably makes the visual debugging a little easier to follow
  //await page.waitFor(1000);  //put this wherever

  ```

- Example zoomed out structure

```(javascript)
const puppeteer = require('puppeteer');

let scrape = async () => {
  // Actual Scraping goes Here...
  
  // Return a value
};

scrape().then((value) => {
    console.log(value); // Success!
});
```

- `page.evaluate()` lets you use built-in DOM selectors.
  - first parm: callback
  - second parm: selector to parse (otherwise it will parse the entire page)

- Hiearchry: `Browser` -> `BroswerContext` (session, execution) -> `Page`
- `Page` has at least one frame: main frame, but ther might be other frames depending on site
- You can create an incognito browser session too
- `page.emulate()` will let you emulate device metrics and user agent


## Example - Taking a Screenshot

```(javascript)
const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');

  //also probably a good idea to set screensize:
  //await page.setViewport({width: 1000, height: 500})

  await page.screenshot({path: 'google.png'});

  await browser.close();
}

getPic();
```

## Example - Logging into GitHub and Scraping Search Data

```(javascript)
/* ----
   This is going to log into github and get info on users named 'John'
   I've removed the stuff involving persisting to mongodb for now
*/

const puppeteer = require('puppeteer');
const CREDS = require('./creds');

/* --
  creds looks like this:
  module.exports = {
    username: '<GITHUB_USERNAME>',
    password: '<GITHUB_PASSWORD>'
  }  
*/

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // ASIDE: here's how to make a screenshot
  // await page.goto('https://github.com');
  // await page.screenshot({ path: 'screenshots/github.png' });

  await page.goto('https://github.com/login');

  // dom element selectors
  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
  
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);
  await page.waitForNavigation();

  const userToSearch = 'john';
  const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
  // let searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=bashua&type=Users';

  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  //NOTE: Enumeration of search results uses a loop counter and the css selector 'nth-child()'
  // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
  const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
  // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > ul > li:nth-child(2) > a';
  const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';
  const LENGTH_SELECTOR_CLASS = 'user-list-item';
  
  const numPages = await getNumPages(page);
  console.log('Numpages: ', numPages);

  //iterate for each page of search results
  for (let h = 1; h <= numPages; h++) {
    let pageUrl = searchUrl + '&p=' + h;  //search url with page selector
    await page.goto(pageUrl);

    //count how many search result item divs there are
    let listLength = await page.evaluate((sel) => {
      return document.getElementsByClassName(sel).length;
    }, LENGTH_SELECTOR_CLASS);

    //get username and email from each search result item -
    //use the nth-child() for selecting successive items
    for (let i = 1; i <= listLength; i++) {
      // change the index to the next child
      let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
      let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

      let username = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('href').replace('/', '');
      }, usernameSelector);

      let email = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML : null;
      }, emailSelector);

      // not all users have emails visible
      if (!email)
        continue;

      console.log(username, ' -> ', email);

      upsertUser({
        username: username,
        email: email,
        dateCrawled: new Date()
      });
    }
  }

  browser.close();
}

async function getNumPages(page) {
  const NUM_USER_SELECTOR = '#js-pjax-container > div > div.columns > div.column.three-fourths.codesearch-results > div > div.d-flex.flex-justify-between.border-bottom.pb-3 > h3';

  let inner = await page.evaluate((sel) => {
    let html = document.querySelector(sel).innerHTML;

    // format is: "69,803 users"
    return html.replace(',', '').replace('users', '').trim();
  }, NUM_USER_SELECTOR);

  const numUsers = parseInt(inner);
  console.log('numUsers: ', numUsers);

  /**
   * GitHub shows 10 resuls per page, so
   */
  return Math.ceil(numUsers / 10);
}

function upsertUser(userObj) {
  //persist to db
}

run();
```
