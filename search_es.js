/*
stright search
@elastic/elasticsearch@6
based on es-client-suggest.js
*/
// es	"6.6.1"
// npm install @elastic/elasticsearch@<major>
// npm install @elastic/elasticsearch@6

const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename));
const log4js_extend = require("log4js-extend");
log4js_extend(log4js, { path: __dirname, format: "(ln-@line:@column)" });
logger.level = process.env.LOG4JS_DEBUG || "info";
// logger.level = process.env.LOG4JS_DEBUG || "trace";

const { Client } = require("@elastic/elasticsearch");
// const { nspell_text } = require("./nspell_text");
// import nspell_text from "./nspell_text";

// const client6 = new Client6({ node: 'http://localhost:9200' })
const client = new Client({
  // node: "http://localhost:9200",
  // node: "http://173.82.212.65:1337/173.82.212.65:9200",
  // node: "http://173.82.240.230:1337/173.82.240.230:9200",
  node: "http://216.24.255.63:1337/216.24.255.63:9200",
  maxRetries: 8,
  requestTimeout: 60000,
  sniffOnStart: true,
});

// client.info(console.log);

// export default async function search_es(query = "", index = "") {
module.exports = search_es;
async function search_es(query = "", index = "") {
  if (!query.trim()) {
    return [];
  }

  // default index HERE
  if (!index) {
    index = ["yhdcd", "dictcor", "uncor"]; // earoparl-de-en xinhua
  }

  let default_operator = "AND";

  let body = {
    query: {
      query_string: {
        default_field: "text",
        default_operator: default_operator,
        query: query,
      },
    },
    highlight: {
      require_field_match: false,
      order: "score",
      type: "unified",
      number_of_fragments: 0, // show all frag
      fields: { text: {} },
    },
  };

  let res;
  try {
    const result = await client.search({
      index: index,
      body: body,
    });
    logger.trace(result.body);
    logger.trace(result.body.hits.hits);
    // res = result.body.hits.hits;
    // res = result.body.hits.hits[0].highlight.text
    // res = result.body.hits.hits.map((el) => el.highlight.text);
    res = result.body.hits.hits.map(el => ({text: el.highlight.text[0]}));
    // res = result.body.hits.hits.map(el => el.highlight.text[0]);
    logger.debug(">>> res: ", res);
  } catch (e) {
    logger.error(e.message);
    res = [];
  }

  return res;
}

// set LOG4JS_DEBUG=trace
// node -r esm search_es.js
/* comment out this line to run the following
(async ()=>{
  let query = "test positive";

  query = "developing countries jointly 各国";
  query = "developing countries jointly 发展中";

  query = "developing countries jointl 各国";
  query = "test positive";

  let res;
  try{
    res = await search_es(query);
  }
  catch (e){
    logger.error(e.message);
    res = [];
  }
  logger.trace("query: ", query);
  logger.trace("res:", res);
  // logger.info("res:", res);

  try {
    logger.info("res.length:", res.length);
  }
  catch (e){
    logger.error(e.message);
  }

  try{
    // res.forEach( el => { logger.debug( el, "++"); });
    // res.forEach( el => { logger.trace( el.highlight.text[0], "++"); });
    res.forEach( el => { logger.trace( el, "*++"); });

    return res;
  }
  catch (e){
    logger.error(e.message);
  }
})();
// */

// module.exports = search_es;