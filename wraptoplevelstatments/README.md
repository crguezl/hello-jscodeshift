See

* <https://stackoverflow.com/questions/65947941/how-to-wrap-all-toplevel-statements-and-declarations-except-imports-in-jscodeshi>
* <https://ull-esit-gradoii-pl.github.io/temas/tree-transformations/jscodeshift.html>


See `package.json` entry:

```js
    "wraptop": "git restore wraptoplevelstatments/input*.js; jscodeshift -d -p -t wraptoplevelstatments/transform.js wraptoplevelstatments/input*.js --main mainProgram"
```