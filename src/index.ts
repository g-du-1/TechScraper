import puppeteer from "puppeteer";
import baseConfig from "./config/baseConfig";
import { ITermData } from "./types";
import { buildListingPageLinks } from "./helpers/buildListingPageLinks";
import { buildTerms } from "./helpers/buildTerms";
import { extractJobLinks } from "./helpers/extractJobLinks";
import fs from "fs";
import { sumObjectsByKey } from "./helpers/sumObjectsByKey";

// TODO Check if link has been visited before
// TODO Split and use terms from title

(async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch({ headless: false });
  const page: puppeteer.Page = await browser.newPage();

  let allTerms: ITermData = {};
  const listingPageLinks = buildListingPageLinks(baseConfig.nOfListingPages);

  fs.writeFileSync(baseConfig.outFileName, baseConfig.outFileHeaderStr);

  for (let i = 0; i < listingPageLinks.length; i++) {
    const pageLink = listingPageLinks[i];

    await page.goto(pageLink);

    const links = await extractJobLinks(page, baseConfig.jobLinkSelector);
    const allPageAdTerms = await buildTerms(page, links);

    allTerms = sumObjectsByKey(allTerms, allPageAdTerms);
  }

  for (const property in allTerms) {
    fs.appendFileSync(baseConfig.outFileName, `${property},${allTerms[property]}\n`);
  }

  browser.close();
})();
