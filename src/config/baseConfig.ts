interface IBaseConfig {
  baseUrl: string;
  baseSearchUrl: string;
  paginationParam: string;
  jobLinkSelector: string;
  salarySelector: string;
  jobDescSelector: string;
  outFileName: string;
}

const baseConfig: IBaseConfig = {
  baseUrl: "https://uk.indeed.com",
  baseSearchUrl: "https://uk.indeed.com/jobs?q=software+engineer",
  paginationParam: "&start=",
  jobLinkSelector: "h2.jobTitle a",
  salarySelector: "#salaryInfoAndJobType",
  jobDescSelector: "#jobDescriptionText",
  outFileName: "out.csv",
};

export default baseConfig;
