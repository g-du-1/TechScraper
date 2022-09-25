import puppeteer from "puppeteer";
import baseConfig from "./config/baseConfig";
import { IPageData, ITermData } from "./types";
import { buildListingPageLinks } from "./helpers/buildListingPageLinks";
import { extractJobLinks } from "./helpers/extractJobLinks";
import fs from "fs";
import { sumObjectsByKey } from "./helpers/sumObjectsByKey";
import { randomIntBetween } from "./helpers/randomIntBetween";

/*

1. Go through x amount of listing pages
2. Get every job ad link on listing page
3. Visit every job link
4. Extract data 
6. Count terms
7. Save data to csv

*/

// TODO Check if terms are counted properly by restricting to two pages and two ads
// TODO Skip visited job links
// TODO Split and use terms from title

(async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch({ headless: false });
  const page: puppeteer.Page = await browser.newPage();

  fs.writeFileSync(baseConfig.outFileName, baseConfig.outFileHeaderStr);
  fs.writeFileSync("visitedjobs.csv", "Title,Salary,Link\r\n");
  fs.writeFileSync("visitedpages.csv", "Link\r\n");

  const listingPageLinks = buildListingPageLinks(baseConfig.nOfListingPages);
  const visitedJobs: string[] = [];

  let allTerms: ITermData = {};

  for (let i = 0; i < listingPageLinks.length; i++) {
    const pageLink = listingPageLinks[i];

    fs.appendFileSync("visitedpages.csv", `${pageLink}\n`);

    await page.goto(pageLink);

    const links = await extractJobLinks(page, baseConfig.jobLinkSelector);

    const allAdsOnPageTerms: ITermData = {};

    for (let i: number = 0; i < links.length; i++) {
      const currLink = baseConfig.baseUrl + links[i];

      await page.goto(currLink);

      const pageData: IPageData = await page.evaluate((baseConfig): IPageData => {
        return {
          salary: document.querySelector(baseConfig.salarySelector)?.textContent,
          body: document.querySelector(baseConfig.jobDescSelector)?.textContent,
          title: document.querySelector(baseConfig.jobTitleSelector)?.textContent,
          company: document.querySelector(baseConfig.jobCompanySelector)?.textContent,
        };
      }, baseConfig);

      const jobString: string = `${pageData.title}${pageData.company}${pageData.salary}${pageData.body}`;

      if (visitedJobs.includes(jobString)) continue;

      fs.appendFileSync(
        "visitedjobs.csv",
        `${pageData.title?.replace(/[,()\n\r?;]/g, "")} - ${pageData.company?.replace(/[,()\n\r?;]/g, "")} - ${pageData.salary?.replace(
          /[,()\n\r?;]/g,
          ""
        )},${pageData.salary?.replace(/[,()\n\r?;]/g, "")},${currLink}\n`
      );

      const terms = pageData.body?.split(" ");

      if (terms) {
        for (let i = 0; i < terms.length; i++) {
          let term = terms[i].toLowerCase().replace(/[,()\n\r?;]/g, "");
          if (term !== "" && term !== " " && allAdsOnPageTerms[term]) {
            allAdsOnPageTerms[term]++;
          } else {
            allAdsOnPageTerms[term] = 1;
          }
        }
      }

      visitedJobs.push(jobString);

      await page.waitForTimeout(randomIntBetween(2, 8) * 1000);
    }

    allTerms = sumObjectsByKey(allTerms, allAdsOnPageTerms);
  }

  for (const property in allTerms) {
    fs.appendFileSync(baseConfig.outFileName, `${property},${allTerms[property]}\n`);
  }

  browser.close();
})();
