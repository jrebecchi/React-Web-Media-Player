import { Builder } from 'selenium-webdriver';
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
import { querySelector } from './Utils';
import 'babel-polyfill';
import { By, until } from 'selenium-webdriver';
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
  await testBasicPlayerFunctions("video");

})

it('test the audio player', async () => {
  await testBasicPlayerFunctions("audio");

})

it('test the vinyl player', async () => {
  await testBasicPlayerFunctions("vinyl");
})

it('test the slideshow player', async () => {
  const isSlideshow = true;
  await testBasicPlayerFunctions("slideshow", isSlideshow);
})

it('test the audioslideshow player', async () => {
  await testBasicPlayerFunctions("audioslideshow");
})

const testBasicPlayerFunctions = async (id, isSlideshow = false) => {
  await testLaunchPlayer(id);
  await testReadingTerminated(id);
  await testRelaunchPlayer(id);
  await testEnterFullScreen(id);
  await testLeaveFullScreen(id);
  if (isSlideshow) {
    await testNextAndPreviousNavigation(id)
  } else {
    await testMute(id);
    await testUnmute(id);
  }
  await testPausePlayer(id);
}

const testLaunchPlayer = async (id) => {
  const player = await querySelector('[id="' + id + '"]', driver);
  const timer = await querySelector('div#' + id + ' [class=\'wmp-tool-button button-time wmp-time-display\']', driver);
  player.click();
  await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);
}

const testReadingTerminated = async (id) => {
  const progressBar = await querySelector('div#' + id + ' [class=\'wmp-progress-bar-wrapper\']', driver);
  progressBar.click();
  const actions = driver.actions();
  await actions.mouseMove({ x: 265, y: 0 }).click().perform();
}

const testRelaunchPlayer = async (id) => {
  const replayButton = await querySelector('div#' + id + ' [class=\'replay-logo\']', driver);
  const timer = await querySelector('div#' + id + ' [class=\'wmp-tool-button button-time wmp-time-display\']', driver);
  replayButton.click();
  await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);
}

const testEnterFullScreen = async (id) => {
  const fullscreenButton = await querySelector('div#' + id + ' [class=\'fullscreen-logo\']', driver);
  fullscreenButton.click();
}

const testLeaveFullScreen = async (id) => {
  const fullscreenExitButton = await querySelector('div#' + id + ' [class=\'fullscreen-exit-logo\']', driver);
  fullscreenExitButton.click();
}

const testMute = async (id) => {
  const volumeButton = await querySelector('div#' + id + ' [class=\'volume-up-logo\']', driver);
  volumeButton.click();
}

const testUnmute = async (id) => {
  const volumeButton = await querySelector('div#' + id + ' [class=\'volume-off-logo\']', driver);
  volumeButton.click();
}

const testPausePlayer = async (id) => {
  const pauseButton = await querySelector('div#' + id + ' [class=\'pause-logo\']', driver);
  pauseButton.click();
}

const testNextAndPreviousNavigation = async (id) => {
  const nextButton = await querySelector('div#' + id + ' [class=\'next-logo\']', driver);
  const previousButton = await querySelector('div#' + id + ' [class=\'previous-logo\']', driver);
  const timer = await querySelector('div#' + id + ' [class=\'wmp-tool-button button-time wmp-time-display\']', driver);
  for (let i = 0; i < 8; ++i)
    nextButton.click();
  await querySelector('div#' + id + ' [class=\'replay-logo\']', driver);
  for (let i = 0; i < 8; ++i)
    previousButton.click();
  const playButton = await querySelector('div#' + id + ' [class=\'play-logo\']', driver);
  playButton.click();
  await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);
}

