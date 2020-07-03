# fetch-es
search elasticsearch database using AND and suggester via elasticsearch node.js client

---
This packages supplies three modules: search_es, nspell_text and suggest_es.

`search_es`: searches a phrase or sentence in the elasticsearch node with a given index or indices.

`nspell_text`: checkes an English sentence and attemps to identify words that do not appear to be English. These words will prevent `search_es` from returning any result and will be replaced with other words (if some nearby words can be found) or removed (if none found).

`suggest_es`: if the `search_es` does not return any matched result, suggest_es will attempts to suggest closely match result.

Since `suggest_es` will take much longer than `search_es`, the normal procedure to search is: apply nspell_text to the query phrase or sentces, use search_es first. If search_es does not return anything, use suggest_es.

## test
