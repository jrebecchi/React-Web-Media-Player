import { Builder, WebDriver } from 'selenium-webdriver';
require('selenium-webdriver/chrome')
require('chromedriver')
import { querySelector, xpathSelector } from './Utils';
import 'babel-polyfill';
import { By, until } from 'selenium-webdriver';
const waitUntilTime = 80000

const port = process.env.PORT || 3000
const rootURL = 'http://localhost:' + port;
let driver;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 30

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    driver.manage().window().maximize();
})

afterAll(async () => driver.quit())

it('initialises the context', async () => {
    await driver.get(rootURL)
})

it('Test - Video player', async () => {
    await testPlayer("video");
})

it('Test - Audio player', async () => {
    driver.executeScript("window.scrollBy(0,325)");
    await testPlayer("audio");
})

it('Test - Vinyl player', async () => {
    driver.executeScript("window.scrollBy(0,320)");
    await testPlayer("vinyl");
})

it('Test - Slideshow player', async () => {
    driver.executeScript("window.scrollBy(0,325)");
    const isSlideshow = true;
    await testPlayer("slideshow", isSlideshow);
})

it('Test - Audioslideshow player', async () => {
    driver.executeScript("window.scrollBy(0,325)");
    await testPlayer("audioslideshow");
})

const testPlayer = async (id, isSlideshow) => {
    await testBasicPlayerFunctions(id, false, isSlideshow);
    await reinitComponentProps(id);
    await testBasicPlayerFunctions(id, false, isSlideshow);
    await reinitComponentProps(id);
    await testBasicPlayerFunctions(id, true, isSlideshow);
    await reinitComponentProps(id);
}

const testBasicPlayerFunctions = async (id, autoplay = false, isSlideshow = false) => {
    if (!autoplay) {
        await testLaunchPlayer(id);
    }
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

const reinitComponentProps = async (id, restart) => {
    const reinitComponentPropsButton = await xpathSelector('//button[text()[contains(., \'Change ' + id + ' props\')]]', driver);
    reinitComponentPropsButton.click();
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
    //   const actions = driver.actions();
    //   await actions.mouseMove(replayButton).click().perform();
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
    for (let i = 0; i < 6; ++i)
        nextButton.click();
    await querySelector('div#' + id + ' [class=\'replay-logo\']', driver);
    for (let i = 0; i < 6; ++i)
        previousButton.click();
    const playButton = await querySelector('div#' + id + ' [class=\'play-logo\']', driver);
    playButton.click();
    await driver.wait(until.elementTextContains(timer, "0:01"), waitUntilTime);
}

