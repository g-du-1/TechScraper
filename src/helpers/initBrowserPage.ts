import puppeteer from "puppeteer";

export const initBrowserPage = async (browser: puppeteer.Browser): Promise<puppeteer.Page> => {
  const page: puppeteer.Page = await browser.newPage();
  return page;
};
