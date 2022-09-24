import { ITermData } from "../types";

export const sumObjectsByKey = (...objs: ITermData[]): ITermData => {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
};
