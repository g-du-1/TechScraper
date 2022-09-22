import { describe, expect, test } from "@jest/globals";
import puppeteer from "puppeteer";
import { initBrowserPage } from "../helpers/initBrowserPage";

describe("initBrowserPage", () => {
  test("Returns a page instance when given a browser instance", async () => {
    const browser: puppeteer.Browser = await puppeteer.launch({ headless: true });
    const page: puppeteer.Page = await initBrowserPage(browser);
    expect(page).toBeDefined;
    browser.close();
  });
});
