import baseConfig from "../config/baseConfig";

export const buildListingPageLinks = (pages: number): string[] => {
  const listingPageLinks: string[] = [];
  let offset: number = 0;

  for (let i: number = 0; i < pages; i++) {
    const paginatedUrl: string = baseConfig.baseUrl + baseConfig.paginationParam + offset;
    listingPageLinks.push(paginatedUrl);
    offset += 10;
  }

  return listingPageLinks;
};
