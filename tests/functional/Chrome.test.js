import { Builder } from 'selenium-webdriver';
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
import { querySelector } from './Utils';
import 'babel-polyfill';
import { By, until} from 'selenium-webdriver';
const waitUntilTime = 80000

const rootURL = 'http://localhost:3000/'
let driver
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 30

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build()
})

afterAll(async () => driver.quit())

it('initialises the context', async () => {
  await driver.get(rootURL)
})

it('test the video player', async () => {
  const player = await querySelector('[id="video"]', driver);
  //const timer = await querySelector('[class=\'wmp-tool-button button-time wmp-time-display\']', driver);
  const timer = await querySelector('div#video [class=\'wmp-tool-button button-time wmp-time-display\']', driver);
  const progressBar = await querySelector('div#video [class=\'wmp-progress-bar-wrapper\']', driver);
  //Test player launch 
  player.click();
  await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);
  
  //Test change time by clicking on progress
  progressBar.click();
  const actions = driver.actions();
  await actions.mouseMove({x: 265, y: 0}).click().perform();
  
  //Test player reach reading terminated state
  //await driver.wait(until.elementTextContains(timer, "9:55"), waitUntilTime);
  const replayButton = await querySelector('div#video [class=\'replay-logo\']', driver);
  
  //Test relaunch player
  replayButton.click();
  await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);

  //Test enter fullscreen
  const fullscreenButton = await querySelector('div#video [class=\'fullscreen-logo\']', driver);
  fullscreenButton.click();

  //Test leave fullscreen
  const fullscreenExitButton = await querySelector('div#video [class=\'fullscreen-exit-logo\']', driver);
  fullscreenExitButton.click();

  //Test mute
  let volumeButton = await querySelector('div#video [class=\'volume-up-logo\']', driver);
  volumeButton.click();

  //Test unmute
  volumeButton = await querySelector('div#video [class=\'volume-off-logo\']', driver);
  volumeButton.click();
})