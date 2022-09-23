import puppeteer from "puppeteer";

export const extractJobLinks = async (page: puppeteer.Page, linkSelector: string): Promise<Array<string | null>> => {
  return await page.evaluate((linkSelector): Array<string | null> => {
    const links: Array<string | null> = [];
    const linkElems: NodeListOf<HTMLElement> = document.querySelectorAll(linkSelector);

    linkElems.forEach((linkElem) => {
      const link: string | null = linkElem.getAttribute("href");
      links.push(link);
    });

    return links;
  }, linkSelector);
};
