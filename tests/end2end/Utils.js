import { By, until} from 'selenium-webdriver';

const waitUntilTime = 80000

async function querySelector(selector, driver) {
  const el = await driver.wait(
    until.elementLocated(By.css(selector)),
    waitUntilTime
  )
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}

module.exports = {
  querySelector
}