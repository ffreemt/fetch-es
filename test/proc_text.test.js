// const axios_es = require('./axios_es');
// const expect = require('chai').expect;
// import "core-js/stable";
// import "regenerator-runtime/runtime";  // moach -r esm OK

// jest.setTimeout(30000);

import consola from "consola";
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

import proc_text from "../proc_text";  // moach -r esm OK
import { expect } from "chai";

describe("@1 test proc_text(''/test/vnglst')", () => {

  it("proc_text(''): 'empty '", () => {
    var result = proc_text("");
    consola.debug("debug #1", result);
    expect(result).to.equal("");
  }
  );

  it("proc_text('test') ", async () => {
    var result = await proc_text("test");
    consola.debug(">>>#2:", result);
    expect(result).to.equal("test");
  });

  it("proc_text('vnglst'): \"angst\"", async () => {
    var result = await proc_text("vnglst");
    consola.debug("#3", result);
    expect(result).to.equal("angst");
  });

});


describe("@2 proc_text('sentence') ", () => {
  it("#1 proc_text('vnglst'): \"angst\"", async () => {
    let query = "developing countries jointl 国";
    let result = await proc_text(query);
    consola.debug("#1", result);
    expect(result).to.equal("developing countries joint 国");
  });
});


// describe("#test proc_text('vnglst') ", () => {
// });
