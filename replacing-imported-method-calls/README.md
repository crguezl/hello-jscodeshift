## Deprecated Method Calls

The repo with the examples for the [Article](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by  Jeremy Greer is here [reergymerej/jscodeshift-article](https://github.com/reergymerej/jscodeshift-article)


For this scenario, we’ve got a `geometry` module with a method named `circleArea` that we’ve deprecated in favor of `getCircleArea.` We could easily find and replace these with `/geometry\.circleArea/g`, but what if the user has imported the module and assigned it a different name? For example:

```js
import g from 'geometry';
const area = g.circleArea(radius);
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