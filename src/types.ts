export interface IBaseConfig {
  baseUrl: string;
  baseSearchUrl: string;
  paginationParam: string;
  jobLinkSelector: string;
  salarySelector: string;
  jobDescSelector: string;
  jobTitleSelector: string;
  jobCompanySelector: string;
  outFileName: string;
  outFileHeaderStr: string;
  nOfListingPages: number;
}

export interface IPageData {
  salary: string | null | undefined;
  body: string | null | undefined;
  title: string | null | undefined;
  company: string | null | undefined;
}

export interface ITermData {
  [key: string]: number;
}
