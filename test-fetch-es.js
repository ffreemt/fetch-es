// node
// eslint test-fetch-se.js  // need babel-eslint
// const fetch_es = require("@mikeie/fetch-es");
const fetch_es = require("./index");
// const fetch_es = require("./search_es");

var res;
let query = "test测试tst";
// query = "test测试";

// fetch_es(query, index="earoparl-de-en") // index = ["yhdcd", "dictcor", "uncor"]; // earoparl-de-en xinhua
fetch_es(query).then(r => {res = r; console.log(r); }).catch(e => console.log("catche: ", e.message));

console.log(res)
