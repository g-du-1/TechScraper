import { describe, expect, test } from "@jest/globals";
import { ITermData } from "../types";
import { sumObjectsByKey } from "../helpers/sumObjectsByKey";

describe("sumObjectsByKey", () => {
  test("Adds two values together for the same key in two objects", () => {
    const obj1: ITermData = {
      main: 9,
      obj: 3,
      testTerm: 7,
    };

    const obj2: ITermData = {
      secondary: 3,
      obj: 1,
      testTerm: 2,
    };

    const merged: ITermData = sumObjectsByKey(obj2, obj1);
    expect(merged["testTerm"]).toBe(9);
  });
});
