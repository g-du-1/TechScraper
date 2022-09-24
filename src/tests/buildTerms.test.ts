import { describe, expect, test } from "@jest/globals";
import puppeteer from "puppeteer";
import { buildTerms } from "../helpers/buildTerms";
import baseConfig from "../config/baseConfig";
import { randomIntBetween } from "../helpers/randomIntBetween";

describe("buildTerms", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let terms: {};

  beforeAll(async () => {
    const randomLinkNum: number = randomIntBetween(0, 15);
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(baseConfig.baseSearchUrl);
    const links: (string | null)[] = await page.evaluate(
      (baseConfig, randomLinkNum) => {
        return [document.querySelectorAll(baseConfig.jobLinkSelector)[randomLinkNum].getAttribute("href")];
      },
      baseConfig,
      randomLinkNum
    );
    terms = await buildTerms(page, links, false);
  });

  afterAll(() => {
    browser.close();
  });

  test("Returns a non empty object", async () => {
    expect(Object.keys(terms).length).toBeGreaterThan(0);
  });
});
