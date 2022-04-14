## Deprecated Method Calls

The repo with the examples for the [Article](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by  Jeremy Greer is here [reergymerej/jscodeshift-article](https://github.com/reergymerej/jscodeshift-article)


For this scenario, we’ve got a `geometry` module with a method named `circleArea` that we’ve deprecated in favor of `getCircleArea.` We could easily find and replace these with `/geometry\.circleArea/g`, but what if the user has imported the module and assigned it a different name? For example:

```js
import g from 'geometry';
import otherModule from 'otherModule';
const radius = 20;
const area = g.circleArea(radius);

console.log(area === Math.pow(g.getPi(), 2) * radius);
console.log(area === otherModule.circleArea(radius));
```

How would we know to replace `g.circleArea` instead of `geometry.circleArea`? 


run: 

```
➜  replacing-imported-method-calls git:(master) npm run deprecated

> jscodeshift-learning@1.0.0 deprecated
> jscodeshift -t replacing-imported-method-calls/deprecated.js replacing-imported-method-calls/deprecated-input.js -d -p

Processing 1 files... 
Spawning 1 workers...
Running in dry mode, no files will be written! 
Sending 1 files to free worker...
import g from 'geometry';
import otherModule from 'otherModule';
const radius = 20;
const area = g.getCircleArea(radius);

console.log(area === Math.pow(g.getPi(), 2) * radius);
console.log(area === otherModule.circleArea(radius));
All done. 
Results: 
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 0.921seconds 
```

or simply `jscodeshift -t deprecated.js deprecated-input.js -d -p`

## AST of an import Declaration

This is the AST for the import declaration `import g from 'geometry';`

```js
{
  "type": "Program",
  "start": 0,
  "end": 25,
  "body": [
    {
      "type": "ImportDeclaration",
      "start": 0,
      "end": 25,
      "specifiers": [
        {
          "type": "ImportDefaultSpecifier",
          "start": 7,
          "end": 8,
          "local": {
            "type": "Identifier",
            "start": 7,
            "end": 8,
            "name": "g"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 14,
        "end": 24,
        "value": "geometry",
        "raw": "'geometry'"
      }
    }
  ],
  "sourceType": "module"
}
```

## replaceswith method

<https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#replacewith>

Simply replaces the selected nodes with the provided node. If a function is provided it is executed for every node and the node is replaced with the functions return value.

## get

get in collections simply proxies to `NodePath#get` of the first path.

get for NodePath gives the first NodePath from the Collection.

Child NodePath objects are created lazily, by calling the `.get` method of a parent NodePath object
