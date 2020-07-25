# fetch-es ![Node.js CI](https://github.com/ffreemt/fetch-es/workflows/Node.js%20CI/badge.svg)[![CodeFactor](https://www.codefactor.io/repository/github/ffreemt/fetch-es/badge)](https://www.codefactor.io/repository/github/ffreemt/fetch-es)[![npm version](https://badge.fury.io/js/%40mikeie%2Ffetch-es.svg)](https://badge.fury.io/js/%40mikeie%2Ffetch-es)
search the elasticsearch database using AND and suggester via elasticsearch node.js client

The elasticsearch node (a petite VPS) currently hosts some corpora (united nations copurs, examples sentences from some bilingual dictionaries and the European-Parliament German-English corpus). The elasticsearch node is open to the public for read-only access.

## Installation
`npm i @mikeie/fetch-es`

## Usage

```js
const fetch_es = require("@mikeie/fetch-es");

let query = "test测试";
fetch_es(query, index="uncor")
.then(res => console.log(res))
.catch(e => console.log(e.message))

```
will result in the following output
```bash
[
  '(g) Established policies and procedures for the testing of the plan, including <em>test</em> schedules, <em>test</em> objectives and <em>test</em> review procedures;→(g) 规定<em>测</em><em>试</em>计划
的政策和程序，包括<em>测</em><em>试</em>时间表、<em>测</em><em>试</em>目标及<em>测</em><em>试</em>审查
程序；',
  'The evaluation process includes an aptitude <em>test</em>, a physical <em>test</em> and an interview.→评价过程包括能力倾向<em>测</em><em>试</em>、体能<em>测</em><em>试</em>和面<em>试</em>。',
  'When mobile phones are to be tested the <em>test</em> should utilize at minimum an "air" or "ping" <em>test</em>, loop-back <em>test</em>, a screen and keypad <em>test</em>, and a battery <em>test</em> to determine to what extent they are suitable for reuse with or without repair, refurbishment or upgrading.→移动电话进行<em>测</em><em>试</em>时，该<em>测</em><em>试</em>应至少进行"空气"或"声脉冲"<em>测<
/em><em>试</em>、环回<em>测</em><em>试</em>、屏幕和键盘<em>测</em><em>试</em>，并进行电池<em>测</em><em>
试</em>以确定其在多大程度上不需修理、翻新或更新便适合再利用。',
  'These field tests should be completely documented, indicating the type of <em>test</em>, equipment utilized, <em>test</em> results and the name of the individual conducting the <em>test</em>.→这些实地<
em>测</em><em>试</em>应当全部作出文件记录，标明<em>测</em><em>试</em>类别所用设备，<em>测</em><em>试</
em>结果以及进行<em>测</em><em>试</em>者的姓名。',
  'When mobile phones are to be tested the <em>test</em> should utilize at minimum an "air" or "ping" <em>test</em>, loop-back <em>test</em>, a screen and keypad <em>test</em>, and a battery <em>test</em> to determine to what extent they are suitable for reuse with or without repair, refurbishment or upgrading.→移动电话进行<em>测</em><em>试</em>时，该<em>测</em><em>试</em>应至少进行"空气"或"声脉冲"<em>测<
/em><em>试</em>、环回<em>测</em><em>试</em>、屏幕和键盘<em>测</em><em>试</em>，并进行电池<em>测</em><em>
试</em>以确定其在多大程度上不需修理、翻新或更新便适合再利用。',
  '100 = Pressure <em>test</em> in kilo pacals (hydrostatic <em>test</em>);→对以公斤计算的货物进行拉力
<em>测</em><em>试</em>（静水压<em>测</em><em>试</em>）；',
  'Acceptance <em>Test</em> (Production Lot testing)→验收<em>测</em><em>试</em>(生产批次<em>测</em><em
>试</em>)',
  'BIT: Built in <em>test</em> [<em>test</em> integré]→BIT： 内置<em>测</em><em>试</em>',
  '(ii) Modified annex H <em>test</em> cases, <em>test</em> scripts and <em>test</em> manuals have been developed and evaluated in order to prepare for functional CSEUR tests;→为了准备对合并的欧洲登记册系
统进行功能<em>测</em><em>试</em>，已对附件H的<em>测</em><em>试</em>用例、<em>测</em><em>试</em>脚本和<e
m>测</em><em>试</em>手册进行调整和评估；',
  '<em>Test</em> Objective→<em>测</em><em>试</em>物'
]
```

---
This package has three modules: `search_es`, `nspell_text` and `suggest_es`

### search_es
`search_es`: searches a phrase or sentence in the elasticsearch node with a given index or indices.

### nspell_text
`nspell_text`: checkes an English sentence and attemps to identify words that do not appear to be English. These words will prevent `search_es` from returning any result and will be replaced with other words (if some nearby words can be found) or removed (if none found).

### suggest_es
`suggest_es`: if `search_es` does not return any matched result, `suggest_es` will attempt to suggest some closely matched result.

Since `suggest_es` takes much longer than `search_es` (especially for long sentences), the normal procedure to search is: apply `nspell_text` to the query phrase or sentence, use `search_es` first. If `search_es` does not return anything, use `suggest_es`.

### Miscellany
`search_es` and `suggest_es` are defined as follows.

`async function search_es(query = "", index = "") {...; if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  };...}`

`async function suggest_es(query = "", index = "") {...; if (!index) {
    index = ["yhdcd", "dictcor", "uncor"];
  } ;...}`

`search_es` and `suggest_es` return: [str]

The essencce of implementation:
```js
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: ES_NODE,
  maxRetries: 8,
  requestTimeout: 60000,
  sniffOnStart: true,
});
let r0, res;
client.search({ index: index, body: body, }).then( r => { console.log(r); r0 = r; }).catch(e => {console.log(e);});

res = r0.body.hits.hits.map(el => el.highlight.text[0])
```

Refer to search_es.js, suggest_es.js and files in the `test` directory.
