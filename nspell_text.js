/*
https://www.npmjs.com/package/dictionary-en
https://github.com/wooorm/dictionaries/tree/master/dictionaries/en

var en = require('dictionary-en')

var path = require('path')
var base = require.resolve('dictionary-en')

let dic = fs.readFileSync(path.join(path.dirname(base), 'index.dic'), 'utf-8')
let aff = fs.readFileSync(path.join(path.dirname(base), 'index.aff'), 'utf-8')

// var spell = nspell(dict);
// var spell = nspell(fs.readFileSync(path.join(path.dirname(base), 'index.dic'), 'utf-8'), path.join(path.dirname(base), 'index.aff'));

var spell = nspell(aff, dic) // OK
spell.correct("me")  // true


var en = require('dictionary-en');
dic_aff = en(function (err, result) {
  console.log(err || result)
});
var spell = nspell(en(function (err, result) {
  console.log(err || result)
}))

*/

let nspell = require("nspell");

// let dictionary = require("dictionary-en");
// let en = require("dictionary-en");

let path = require("path");
let base = require.resolve("dictionary-en");

let fs = require("fs");
let dic = fs.readFileSync(path.join(path.dirname(base), "index.dic"), "utf-8");
let aff = fs.readFileSync(path.join(path.dirname(base), "index.aff"), "utf-8");

const spell = nspell(aff, dic);

const consola = require("consola");
// consola.level = process.env.consola_debug || 5; // show debug
consola.level = process.env.consola_debug || 3;

// export default function nspell_text(query){
module.exports = nspell_text
function nspell_text(query){
  if (!query){ return "";}

  // let _ = query.split(/\s+/);

  // insert space between English and Chinese
  let re = /(?<=[a-zA-Z])(?![a-zA-Z])|(?<![a-zA-Z])(?=[a-zA-Z])/gm;
  let _ = query.replace(re, " ").trim().split(/\s+/);

  let  res = _.map( (elm) => {
    // all ascii: 0, else -1
    if (elm.search(/^\w+$/) === -1){
      consola.debug("nonascii", elm);
      return elm; }

    if (spell.correct(elm)) {
      consola.debug("correct", elm);
      return elm; }

    let sugg = spell.suggest(elm);
    consola.debug("suggest:", sugg);
    if (sugg.length > 0)
      return sugg[0];
    return "";
    // return null;
  });

  consola.debug("res:", res);
  return res.join(" ");
}

// module.exports = nspell_text
