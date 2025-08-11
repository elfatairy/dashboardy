// @vitest-environment jsdom
import { describe, expect, test } from 'vitest'
import { generateHash, getColor, getMonthName } from "../helpers";

describe('Helper Functions, Unit Tests', () => {
  test("hash is random", () => {
    const hash1 = generateHash();
    const hash2 = generateHash();
    expect(hash1).not.toBe(hash2);
  });

  test("getting a month by index returns the correct month", () => {
    const month = getMonthName(0);
    expect(month).toBe("January");
    const month2 = getMonthName(11);
    expect(month2).toBe("December");
  });

  test("getColor returns a mix between two colors based on the percentage", () => {
    const color = getColor(["#000000", "#ffffff"], 0.5);
    expect(color).toBe("#808080");
    const color2 = getColor(["#000000", "#ffffff"], 0);
    expect(color2).toBe("#000000");
    const color3 = getColor(["#000000", "#ffffff"], 1);
    expect(color3).toBe("#ffffff");
  });
});