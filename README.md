# fetch-es
search elasticsearch database using AND and suggester via elasticsearch node.js client

---
This package has three modules: `search_es`, `nspell_text` and `suggest_es`

### search_es
`search_es`: searches a phrase or sentence in the elasticsearch node with a given index or indices.

### nspell_text
`nspell_text`: checkes an English sentence and attemps to identify words that do not appear to be English. These words will prevent `search_es` from returning any result and will be replaced with other words (if some nearby words can be found) or removed (if none found).

### suggest_es
`suggest_es`: if the `search_es` does not return any matched result, `suggest_es` will attempts to suggest some closely match result.

Since `suggest_es` takes much longer than `search_es`, the normal procedure to search is: apply `nspell_text` to the query phrase or sentces, use `search_es` first. If `search_es` does not return anything, use `suggest_es`.

### Usage
`search_es` and `suggest_es` are defined as follows.

`async function search_es(query = "", index = "") {...; if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  };...}`

async function suggest_es(query = "", index = "") {...; if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  } ;...}

`search_es` and `suggest_es` return: [str]
```js
let r0;
let res;
client.search({ index: index, body: body, }).then( r => { console.log(r); r0 = r; }).catch(e => {console.log(e);});

res = r0.body.hits.hits.map(el => el.highlight.text[0])
```

Refer to search_es.js, suggest_es.js and files in the `test` directory.

