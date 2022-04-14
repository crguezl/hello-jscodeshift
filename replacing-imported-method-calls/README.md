## Deprecated Method Calls

The repo with the examples for the [Article](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by  Jeremy Greer is here [reergymerej/jscodeshift-article](https://github.com/reergymerej/jscodeshift-article)


For this scenario, we’ve got a `geometry` module with a method named `circleArea` that we’ve deprecated in favor of `getCircleArea.` We could easily find and replace these with `/geometry\.circleArea/g`, but what if the user has imported the module and assigned it a different name? For example:

```js
import g from 'geometry';
const area = g.circleArea(radius);
```

How would we know to replace `g.circleArea` instead of `geometry.circleArea`? 



