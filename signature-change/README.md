## Changing a Method Signature

The repo with the examples for the [Article](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by  Jeremy Greer is here [reergymerej/jscodeshift-article](https://github.com/reergymerej/jscodeshift-article)

In this scenario, we’ve got a method signature that’s gotten out of control with individual arguments as the software has grown, and so it has been decided it would be better to accept an object containing those arguments instead.

Instead of 

```js
import car from 'car';

const suv = car.factory('white', 'Kia', 'Sorento', 2010, 50000, null, true);
const truck = car.factory('silver', 'Toyota', 'Tacoma', 2006, 100000, true, true);
```

we’d like to see

```js
import car from 'car';

const suv = car.factory({
  color: 'white',
  make: 'Kia',
  model: 'Sorento',
  year: 2010,
  miles: 50000,
  bedliner: null,
  alarm: true,
});
const truck = car.factory({
  color: 'silver',
  make: 'Toyota',
  model: 'Tacoma',
  year: 2006,
  miles: 100000,
  bedliner: true,
  alarm: true,
});
```

## Run 

```js
signature-change git:(master) ✗ npm run signature

> jscodeshift-learning@1.0.0 signature
> jscodeshift -t signature-change/signature-change.js signature-change/signature-change-input.js -d -p

Processing 1 files... 
Spawning 1 workers...
Running in dry mode, no files will be written! 
Sending 1 files to free worker...
import car from 'car';

const suv = car.factory({
  color: 'white',
  make: 'Kia',
  model: 'Sorento',
  year: 2010,
  miles: 50000,
  bedliner: null,
  alarm: true,
});
const truck = car.factory({
  color: 'silver',
  make: 'Toyota',
  model: 'Tacoma',
  year: 2006,
  miles: 100000,
  bedliner: true,
  alarm: true,
});
All done. 
Results: 
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 0.912seconds
```