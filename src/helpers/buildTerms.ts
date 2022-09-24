import puppeteer from "puppeteer";
import baseConfig from "../config/baseConfig";
import { randomIntBetween } from "./randomIntBetween";

interface IPageData {
  salary: string | null | undefined;
  body: string | null | undefined;
}

interface ITermData {
  [key: string]: number;
}

export const buildTerms = async (page: puppeteer.Page, links: (string | null)[], throttle: boolean = true): Promise<{}> => {
  const data: ITermData = {};

  for (let i: number = 0; i < links.length; i++) {
    await page.goto(baseConfig.baseUrl + links[i]);
    const pageData: IPageData = await page.evaluate((baseConfig): IPageData => {
      return {
        salary: document.querySelector(baseConfig.salarySelector)?.textContent,
        body: document.querySelector(baseConfig.jobDescSelector)?.textContent,
      };
    }, baseConfig);

    const terms = pageData.body?.split(" ");

    if (terms) {
      for (let i = 0; i < terms.length; i++) {
        let term = terms[i].toLowerCase().replace(/[,()\n\r?]/g, "");
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
