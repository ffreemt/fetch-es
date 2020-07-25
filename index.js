// query = nspell_text(query)
// r = search_es(q, index)
// if

// import consola from "consola";
const consola = require('consola');
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

const search_es = require("./search_es");
const nspell_text = require("./nspell_text");
const suggest_es = require("./suggest_es");


module.exports = fetch_es;
async function fetch_es(query, index="") {
  query = nspell_text(query);
  if (!query) {
    return [];
  }

  // default indices
  if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  }

  let res;
  try {
    res = search_es(query, index);
  } catch (e) {
    consola.error("search_es e:", e);
    res = [e.message];
    return res;
  }

  // if (res.length)
  if (res.length > 1)
    return res;

  try {
    res = suggest_es(query, index);
  } catch (e) {
    consola.error(`suggest_es e: ${e}`);
    res = [e.message];
  }

  return res;

}