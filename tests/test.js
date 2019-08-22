/**
 * dependency modules
 */
const assert = require('assert').strict;
const webdriver = require('selenium-webdriver');
require('geckodriver');
require('chromedriver')

//app server 
const serverUri = 'http://localhost:3000/';
const appTitle = 'React Selenium App';

/**
 * config for chrome browser
 * @type {webdriver}
 */
const browser = new webdriver.Builder()
.forBrowser('chrome')
.build();


/**
 * function to get title and resolve it in promise
 * @type {[type]} [description]
 */
const logTitle = () => {
  return new Promise((resolve, reject) => {
    browser.getTitle().then((title) => {
      resolve(title);
    });
  });
}

/**
 * sample test case
 * to check whether the given value is present in array
 */
describe('load page succesfully', () => {
  /**
   * test case to load our application and check title
   */
  it('should load home page and get title', () => {
    return new Promise((resolve, reject) => {
      browser
      .get(serverUri)
      .then(logTitle)
      .then(title => {
        assert.strictEqual(title, appTitle);
        resolve();
      })
      .catch(err => reject(err));
    });
  });

  it('should check whether the given element is loaded', () => {
    return new Promise((resolve, reject) => {
      browser
      .findElement({ id: 'sel-button' })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
  });

  // eslint-disable-next-line no-undef
  after(() => {
    browser.quit()
  });
});
