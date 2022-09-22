import puppeteer from "puppeteer";

export const initBrowser = async (isHeadless: boolean = true): Promise<puppeteer.Browser> => {
  const browser: puppeteer.Browser = await puppeteer.launch({ headless: isHeadless });
  return browser;
};
