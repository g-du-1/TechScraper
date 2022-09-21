import { describe, expect, test } from "@jest/globals";
import { buildListingPageLinks } from "../helpers/buildListingPageLinks";
import baseConfig from "../config/baseConfig";

describe("buildListingPageLinks", () => {
  const result: string[] = buildListingPageLinks(5);

  test("Returns the same number of links as specified", () => {
    expect(result).toHaveLength(5);
  });

  test("Returns an array of strings", () => {
    expect(Array.isArray(result)).toEqual(true);
    expect(typeof result[0]).toBe("string");
    expect(typeof result[result.length - 1]).toBe("string");
  });

  test("Pagination parameter increases by 10 for each link", () => {
    let expectedPagination: number = 0;
    for (let i: number = 0; i < result.length; i++) {
      const link: string = result[i];
      const paginationParam: number = parseInt(link.split("&start=")[1]);
      expect(paginationParam).toEqual(expectedPagination);
      expectedPagination += 10;
    }
  });

  test("Links contain the base url", () => {
    for (let i: number = 0; i < result.length; i++) {
      const link: string = result[i];
      expect(link).toContain(baseConfig.baseUrl);
    }
  });
});
