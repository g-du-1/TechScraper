interface IBaseConfig {
  baseUrl: string;
  baseSearchUrl: string;
  paginationParam: string;
  jobLinkSelector: string;
  salarySelector: string;
  jobDescSelector: string;
  outFileName: string;
  outFileHeaderStr: string;
  nOfListingPages: number;
}

const baseConfig: IBaseConfig = {
  baseUrl: "https://uk.indeed.com",
  baseSearchUrl: "https://uk.indeed.com/jobs?q=software+engineer",
  paginationParam: "&start=",
  jobLinkSelector: "h2.jobTitle a",
  salarySelector: "#salaryInfoAndJobType",
  jobDescSelector: "#jobDescriptionText",
  outFileName: "out.csv",
  outFileHeaderStr: "term,occurence\r\n",
  nOfListingPages: 5,
};

export default baseConfig;
