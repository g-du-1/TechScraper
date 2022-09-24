import puppeteer from "puppeteer";
import baseConfig from "./config/baseConfig";
import { buildListingPageLinks } from "./helpers/buildListingPageLinks";
import { buildTerms } from "./helpers/buildTerms";
import { extractJobLinks } from "./helpers/extractJobLinks";
import fs from "fs";

(async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch({ headless: false });
  const page: puppeteer.Page = await browser.newPage();

  const mainLinks = buildListingPageLinks(baseConfig.nOfListingPages);

  for (let i = 0; i < mainLinks.length; i++) {
    const mainLink = mainLinks[i];

    await page.goto(mainLink);

    const links = await extractJobLinks(page, baseConfig.jobLinkSelector);
    const data = await buildTerms(page, links);

    fs.writeFileSync(baseConfig.outFileName, baseConfig.outFileHeaderStr);

    for (const property in data) {
      fs.appendFileSync(baseConfig.outFileName, `${property},${data[property]}\r\n`);
    }
  }

  browser.close();
})();
