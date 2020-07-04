const consola = require("consola");
// import { expect } from "chai";
const expect = require("chai").expect;

// const fetch_es = require("../index");
const fetch_es = require("../");

consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

describe("consola in mocha test ", () => {
  context(" debug ", () => {
    it("should output ddd ", () => {
      consola.debug(" ddd1 ");
      expect(1).to.equal(1);
    });
  });

  context(" fetch_es ", () => {
    it("should output result ", async () => {
      let query = "test测试";
      // fetch_es(query, index="uncor")
      // .then(res => console.log(res))
      // .catch(e => console.log(e.message))
      try {
        let res = await fetch_es(query, "uncor");
        consola.debug(" >>> ", res);
      }
      catch (e) {
        consola.error(e.message);
      }
      expect(1).to.equal(1);
    });
  });

});
