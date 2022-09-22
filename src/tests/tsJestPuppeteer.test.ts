import puppeteer from "puppeteer";

describe("Google", () => {
  it('should be titled "Google"', async () => {
    const browser: puppeteer.Browser = await puppeteer.launch({ headless: true });
    const page: puppeteer.Page = await browser.newPage();
    await page.goto("https://google.com");
    await expect(page.title()).resolves.toMatch("Google");
    browser.close();
  });
});
