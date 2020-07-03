/*
based on es-client-suggest.js
*/
// const axios_es = require('./axios_es');
// const expect = require('chai').expect;
// import "core-js/stable";
// import "regenerator-runtime/runtime";  // moach -r esm OK

// jest.setTimeout(30000);
// yarn add nspell dictionary-en

import consola from "consola";
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

import nspell_text from "../nspell_text";  // moach -r esm OK
import { expect } from "chai";

describe("@1 test nspell_text ", () => {
  context(" query: empty ", () => {
    it("nspell_text(''): 'empty '", () => {
      var result = nspell_text("");
      consola.debug("debug #1", result);
      expect(result).to.equal("");
    });
  });

  context(" query: test ", () => {
    it("nspell_text('test') ",  () => {
      var result = nspell_text("test");
      consola.debug(">>>#2:", result);
      expect(result).to.equal("test");
    });
  });

  context(" query: vnglst ", () => {
    it("nspell_text", () => {
      var result = nspell_text("vnglst");
      consola.debug("#3", result);
      expect(result).to.equal("angst");
    });
  });
});

describe("@2 nspell_text('sentence') ", () => {
  context(" sentence 1 ", () => {
    it("#1 nspell_text('developing countries jointl 国'): developing countries jointly 国", () => {
      let query = "developing countries jointl 国";
      let result = nspell_text(query);
      consola.debug("#1", result);
      expect(result).to.equal("developing countries jointly 国");
    });
  });

  context(" sentence 2 ", () => {
    it("#2 nspell_text('this aaaaxxx test'): 'this  test'", () => {
      let query = "this aaaaxxx test";
      let result = nspell_text(query);
      consola.debug("#2", result);
      expect(result).to.equal("this  test");
    });
  });

});

describe("@3 test nspell_text single aaaaxxx ", () => {
  context(" sentence 2 ", () => {
    it(" #1 should remove aaaaxxx ", () => {
      let query = "aaaaxxx ";
      let result = nspell_text(query);
      consola.info(`@3 #1: [${result}]`);
      expect(result).to.equal("");
    });
  });
});

describe("@4 test nspell_text mixed English and Chinese", () => {
  context(" sentence 2 ", () => {
    it(" #1 should fix English text [woo, test] ", () => {
      let query = "wo我好tett";
      let result = nspell_text(query);
      consola.info(`@4 #1: [${result}]`);
      expect(result.trim()).to.equal("woo 我好 test");
    });
  });
});
