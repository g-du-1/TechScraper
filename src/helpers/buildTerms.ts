import puppeteer from "puppeteer";
import baseConfig from "../config/baseConfig";
import { ITermData } from "../types";
import { IPageData } from "../types";
import { randomIntBetween } from "./randomIntBetween";

export const buildTerms = async (page: puppeteer.Page, links: (string | null)[], throttle: boolean = true): Promise<ITermData> => {
  const data: ITermData = {};

  for (let i: number = 0; i < links.length; i++) {
    await page.goto(baseConfig.baseUrl + links[i]);
    const pageData: IPageData = await page.evaluate((baseConfig): IPageData => {
      return {
        salary: document.querySelector(baseConfig.salarySelector)?.textContent,
        body: document.querySelector(baseConfig.jobDescSelector)?.textContent,
        title: document.querySelector(baseConfig.jobTitleSelector)?.textContent,
        company: document.querySelector(baseConfig.jobCompanySelector)?.textContent,
      };
    }, baseConfig);

    const terms = pageData.body?.split(" ");

    if (terms) {
      for (let i = 0; i < terms.length; i++) {
        let term = terms[i].toLowerCase().replace(/[,()\n\r?;]/g, "");
        if (term !== "" && term !== " " && data[term]) {
          data[term]++;
        } else {
          data[term] = 1;
        }
      }
    }

    throttle && (await page.waitForTimeout(randomIntBetween(2, 8) * 1000));
  }

  return data;
};
