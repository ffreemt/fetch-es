const consola = require("consola");
// import { expect } from "chai";
const expect = require("chai").expect;

// consola.level = process.env.CONSOLA_DEBUG || 3;
consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

describe("consola in mocha test ", () => {
  context(" debug ", () => {
    it("should output ddd ", () => {
      consola.debug(" ddd1 ");
      expect(1).to.equal(1);
    });
  });

});
