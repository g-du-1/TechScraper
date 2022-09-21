import { describe, expect, test } from "@jest/globals";
import { randomIntBetween } from "../helpers/randomIntBetween";

describe("randomIntBetween", () => {
  test("Returns a random integer between two values", () => {
    const result: number = randomIntBetween(2, 8);
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(8);
  });
});
