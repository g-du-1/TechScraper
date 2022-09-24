import { IBaseConfig } from "../types";

const baseConfig: IBaseConfig = {
  baseUrl: "https://uk.indeed.com",
  baseSearchUrl: "https://uk.indeed.com/jobs?q=software+engineer",
  paginationParam: "&start=",
  jobLinkSelector: "h2.jobTitle a",
  salarySelector: "#salaryInfoAndJobType",
  jobDescSelector: "#jobDescriptionText",
  jobTitleSelector: "h1",
  jobCompanySelector: ".jobsearch-CompanyInfoContainer a",
  outFileName: "out.csv",
  outFileHeaderStr: "term,occurence\r\n",
  nOfListingPages: 2,
};

export default baseConfig;
