## Changing a Method Signature

The repo with the examples for the [Article](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by  Jeremy Greer is here [reergymerej/jscodeshift-article](https://github.com/reergymerej/jscodeshift-article)

In this scenario, we’ve got a method signature that’s gotten out of control with individual arguments as the software has grown, and so it has been decided it would be better to accept an object containing those arguments instead.

Instead of 

```js
car.factory('white', 'Kia', 'Sorento', 2010, 50000, null, true);
```

we’d like to see

```js
const suv = car.factory({
  color: 'white',
  make: 'Kia',
  model: 'Sorento',
  year: 2010,
  miles: 50000,
  bedliner: null,
  alarm: true,
});
```
