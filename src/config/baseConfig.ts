interface IBaseConfig {
  baseUrl: string;
  paginationParam: string;
  jobLinkSelector: string;
}

const baseConfig: IBaseConfig = {
  baseUrl: "https://uk.indeed.com/jobs?q=software+engineer",
  paginationParam: "&start=",
  jobLinkSelector: "h2.jobTitle a",
};

export default baseConfig;
