import { describe, expect, test } from "@jest/globals";
import puppeteer from "puppeteer";
import { initBrowser } from "../helpers/initBrowser";

describe("initBrowser", () => {
  test("Starts a browser instance", async () => {
    const browser: puppeteer.Browser = await initBrowser();
    expect(browser).toBeDefined;
    browser.close();
  });
});
