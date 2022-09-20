import puppeteer from "puppeteer";
import * as constants from "./constants";
import rndInt from "./helpers/randInt";
import writeToCSV from "./helpers/writeToCSV";

interface IPageData {
  salary: string | null | undefined;
  body: string | null | undefined;
}

const getLinks = async (page: puppeteer.Page): Promise<(string | null)[]> => {
  return await page.evaluate((): Array<string | null> => {
    const links: Array<string | null> = [];
    const linkElems: NodeListOf<HTMLElement> = document.querySelectorAll("h2.jobTitle a");

    linkElems.forEach((linkElem) => {
      const link: string | null = linkElem.getAttribute("href");
      links.push(link);
    });

    return links;
  });
};

const buildData = async (page: puppeteer.Page, links: (string | null)[]): Promise<{}> => {
  const data = {};

  for (let i: number = 0; i < links.length; i++) {
    await page.goto(constants.LINK_BASE_URL + links[i]);
    const pageData: IPageData = await page.evaluate((): IPageData => {
      return {
        salary: document.querySelector("#salaryInfoAndJobType")?.textContent,
        body: document.querySelector("#jobDescriptionText")?.textContent,
      };
    });

    const terms = pageData.body?.split(" ");

    if (terms) {
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i].toLowerCase().replace(",", "");
        if (data[term]) {
          data[term]++;
        } else {
          data[term] = 1;
        }
      }
    }

    await page.waitForTimeout(rndInt(2, 8) * 1000);
  }

  return data;
};

const buildMainLinks = (pages: number): string[] => {
  const mainLinks: string[] = [];
  let pagination: number = 0;

  for (let i: number = 0; i < pages; i++) {
    const splitBaseUrl: string[] = constants.BASE_URL.split("&start=");
    const paginatedUrl: string = splitBaseUrl[0] + "&start=" + pagination;
    mainLinks.push(paginatedUrl);
    pagination += 10;
  }

  return mainLinks;
};

const init = async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch({ headless: false });
  const page: puppeteer.Page = await browser.newPage();

  const mainLinks = buildMainLinks(5);

  for (let i = 0; i < mainLinks.length; i++) {
    const mainLink = mainLinks[i];

    await page.goto(mainLink);

    const links = await getLinks(page);
    const data = await buildData(page, links);

    writeToCSV("term,occurence\r\n", "write");

    for (const property in data) {
      writeToCSV(`${property},${data[property]}\r\n`, "append");
    }
  }

  browser.close();
};

init();
