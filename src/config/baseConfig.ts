interface IBaseConfig {
  baseUrl: string;
  paginationParam: string;
}

const baseConfig: IBaseConfig = {
  baseUrl: "https://uk.indeed.com/jobs?q=software+engineer",
  paginationParam: "&start=",
};

export default baseConfig;
