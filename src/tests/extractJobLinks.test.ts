import { describe, expect, test } from "@jest/globals";
import puppeteer from "puppeteer";
import { extractJobLinks } from "../helpers/extractJobLinks";
import baseConfig from "../config/baseConfig";

describe("extractJobLinks", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let jobLinks: Array<string | null>;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(baseConfig.baseUrl);
    jobLinks = await extractJobLinks(page, baseConfig.jobLinkSelector);
  });

  afterAll(() => {
    browser.close();
  });

  test("Returns 15 job links from a listing page", async () => {
    expect(jobLinks.length).toEqual(15);
  });

  test("Doesn't include the base URL in the links", async () => {
    jobLinks.forEach((jobLink) => {
      expect(jobLink).not.toContain(baseConfig.baseUrl);
    });
  });
});
