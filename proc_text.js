// npm i -D typo-js

// dictionary.check("jointl"); // false
// dictionary.suggest("jointl");

// const Typo = require("typo-js");
// const dictionary = new Typo("en_US");
//X const dictionary = new require("typo-js")("en_US");
//X const dictionary = (new require("typo-js"))("en_US");

// new Typo("aaa")
const dictionary = new (require("typo-js"))("en_US");

// export default function proc_text(query){
function proc_text(query){
  if (!query){ return "";}
  let _ = query.split(/\s+/);
  let res = _.map(function callback(elm) {
    // all ascii: 0, else -1
    if (elm.search(/^\w+$/) === -1){ return elm; }

    if (dictionary.check(elm)) { return elm; }

    let sugg = dictionary.suggest(elm);

    if (sugg.length > 0) { return sugg[0]; }

    return "";
  });

  return res.join(" ");
}

// export { proc_text };

// console.log(proc_text(query));

module.exports = proc_text;
