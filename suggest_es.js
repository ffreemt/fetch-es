/* @elastic/elasticsearch@6 based on es-client-suggest.js */
// es	"6.6.1"
// yarn add/npm install @elastic/elasticsearch@<major>
// npm install @elastic/elasticsearch@6
// log4js log4js-extend
// based on the same named file in myapps\es-stuff
// 20200702

const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename));
const log4js_extend = require("log4js-extend");
log4js_extend(log4js, { path: __dirname, format: "(ln-@line:@column)" });
logger.level = process.env.LOG4JS_DEBUG || "info";
// logger.level = process.env.LOG4JS_DEBUG || "trace";

// const nspell_text = require("./nspell_text")
// const search_es = require("./search_es")

const { Client } = require("@elastic/elasticsearch");
// const { nspell_text } = require("./nspell_text");

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

// export default async function suggest_es(query = "", index = "") {
module.exports = suggest_es;
async function suggest_es(query = "", index = "") {
// async function suggest_es(query = "", index = "") {
  if (!query) {
    return [];
  }

  // default index HERE
  if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  }

  let res; // needed later anyway
  // process query
  // query = nspell_text(query)

  // use search_es first
  // res = search_es(query, index)
  // if (res !== undefined && res.length)
    // return res

  // search all english indices
  // if (!index) { index=["de-en"];} // search only earoparl-de-en aliase
  // if (!index) { index=["earoparl-de-en"];} // search only earoparl-de-en
  // if (!index) { index=["dictcor"];} // search dictcor
  // if (!index) { index=["aligner"];}

  // let default_operator = "AND";

  // logger.info("trying suggester highlight...");
  // suggester highlight
  let body = {
    query: {
      match: {
        text: {
          query: query,
        },
      },
    },
    suggest: {
      "my-suggestion": {
        text: query,
        phrase: {
          field: "text",
        },
      },
    },
    highlight: {
      require_field_match: false,
      order: "score",
      type: "unified",
      number_of_fragments: 0,
      fields: {
        text: {},
      },
    },
  };

  // let res;
  try {
    const result = await client.search({
      index: index,
      body: body,
    });
    logger.trace("suggester res:", result.body);
    // res = result.body.hits.hits;
    res = result.body.hits.hits.map(el => el.highlight.text[0]);
    logger.debug(">>> res: ", res);
  } catch (e) {
    logger.error("suggester error: ", e.message);
    res = [];
  }

  return res;
}

/*  comment out this line to run the following
(async ()=>{
  let query = "test positive";
  query = "liquidity release";
  query = "developing countries jointly 各国";
  query = "developing countries jointly 发展中";

  query = "developing countries jointl 各国";
  // best score 23

  let res;
  try{
    res = await suggest_es(query);
  }
  catch (e){
    logger.error(e.message);
    res = [];
  }
  logger.trace("query: ", query);
  logger.trace("res:", res);
  // logger.info("res:", res);
  logger.trace("res.length:", res.length);

  try{
    // res.forEach( el => { logger.debug( el, "++"); });
    // res.forEach( el => { logger.trace( el.highlight.text[0], "++"); });
    res.forEach( el => { logger.trace( el, "++"); });

    return res;
  }
  catch (e){
    logger.error(e.message);
  }
})();

// logger.debug("res: ", result)

// */

// module.exports = suggest_es