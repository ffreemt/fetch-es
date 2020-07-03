// const axios_es = require('./axios_es');
// const expect = require('chai').expect;
// import "core-js/stable";
// import "regenerator-runtime/runtime"; // mocha -r esm OK

// from myapps\es-stauff\test\ same name
// yarn add consola esm chai
// mocha -r esm test\suggest_es.test.js

// jest.setTimeout(30000);

import consola from "consola";
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

// -r esm
import suggest_es from "../suggest_es";
import { expect } from "chai";

describe("@1 suggest_es: AND returns results ", () => {
  context(" empty query ", () => {
    it("#1 suggest_es(''): 'empty'", async () => {
      var result = await suggest_es("");
      consola.debug("debug #1", result);
      expect(result.length).to.equal(0);
    });
  });

  context(" query: test ", () => {
    it("#2 suggest_es('test') ", async () => {
      var result = await suggest_es("test");
      consola.debug(">>>#2:", result);
      expect(result.length).to.equal(10);
    });
  });

  let query = "developing countries jointly 国";
  context(` query: ${query} `, () => {
    it("#3 suggest_es: jointly " + query, async () => {
      var result = await suggest_es(query);
      consola.debug("#3", result);
      expect(result.length).to.equal(10);
    });
  });
});

describe("@2 suggest_es: 0 length", () => {
  let query = "developing countries jointl 国";
  context(` query: ${query} `, () => {
    it("#1 suggest_es: " + query, async () => {
      let result = await suggest_es(query);
      consola.debug("#1", result);
      expect(result.length).to.equal(10);
    });
  });
});
