// import consola from "consola";
const consola = require('consola');
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

// -r esm
// import fetch_es from "../index";
const fetch_es = require("../index");
import { expect } from "chai";

describe("@1 index: sanity test ", () => {
  context(" empty query ", () => {
    it("#1 fetch_es(''): 'empty'", async () => {
      var result = await fetch_es("");
      consola.debug(`debug #1: **${result}**`);
      expect(result.length).to.equal(0);
    });
  });

  let query = "tett";
  context(` query: ${query}`, () => {
    it("#1 fetch_es(tett): ", async () => {
      var result = await fetch_es(query);
      consola.debug(`consola.debug #1: **${result}**`);
      // console.log(`console.debug #1: **${result}**`);
      // expect(result.length).to.equal(10);
      expect(result.length).to.equal(11); // took time
    });
  });

  query = "test";
  context(` query: ${query}`, () => {
    it("#1 fetch_es(tett): ", async () => {
      var result = await fetch_es(query);
      consola.debug(`consola.debug #1: **${result}**`);
      // console.log(`console.debug #1: **${result}**`);
      // expect(result.length).to.equal(10);
      expect(result.length).to.equal(11); // took time
    });
  });

});