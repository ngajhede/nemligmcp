import { test } from "node:test";
import assert from "node:assert/strict";
import { productDetailsUrl } from "../src/api/search.js";

test("accepts nemlig paths and URLs", () => {
  assert.equal(productDetailsUrl("/5012345/oekologisk-letmaelk"), "https://www.nemlig.com/5012345/oekologisk-letmaelk");
  assert.equal(productDetailsUrl("5012345/x"), "https://www.nemlig.com/5012345/x");
  assert.equal(productDetailsUrl("https://www.nemlig.com/5012345/x?a=1#b"), "https://www.nemlig.com/5012345/x");
});

test("refuses other origins", () => {
  for (const bad of [
    "https://evil.example/x",
    "//evil.example/x",
    "http://www.nemlig.com/x",
    "https://www.nemlig.com.evil.example/x",
    "https://user@evil.example/x",
    "\\\\evil.example/x",
  ]) {
    assert.throws(() => productDetailsUrl(bad), /Only www.nemlig.com/, bad);
  }
});
