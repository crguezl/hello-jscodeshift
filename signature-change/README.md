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

## Steps

1. Find the local name for the imported module

   ```js
    const importDeclaration = root.find(j.ImportDeclaration, {
      source: { type: 'Literal', value: 'car', },
    });

    const localName = importDeclaration.find(j.Identifier).get(0).node.name;
   ```
2. Find all call sites to the `.factory` method

   ```js
   let factoryCalls = root.find(j.CallExpression, {
        callee: {
          type: 'MemberExpression',
          object: {
            name: localName,
          },
          property: {
            name: 'factory',
          },
        }
      })
   ```
3. Read all arguments being passed in
   * For all `nodepath` in the collection `factoryCalls` the corresponding AST `node` in `nodepath.node` has the arguments of the call in its `arguments` property 
4. Replace that call with a single argument which contains an object with the original values
   * We have to build the AST for an `objectExpression`. Assuming `node` is `nodepath.node` and `argKeys` is a constant with the names of the object keys:

     ```js
     const argumentsAsObject = j.objectExpression(
          node.arguments.map((arg, i) =>
            j.property(
              'init',
              j.identifier(argKeys[i]),
              j.literal(arg.value)
            )
          )
        );
    ```
   Try Rajasegar [ast-builder](https://rajasegar.github.io/ast-builder/) website to play on how to build this expression using ast-types builders.

## AST `import car from 'car';`

```js
{
    "type": "ImportDeclaration",
    "specifiers": [
    {
        "type": "ImportDefaultSpecifier",
        "local": {
        "type": "Identifier",
        "name": "car",
        "range": [
            7,
            10
        ]
        },
        "range": [
        7,
        10
        ]
    }
    ],
    "source": {
    "type": "Literal",
    "value": "car",
    "raw": "'car'",
    "range": [
        16,
        21
    ]
    },
    "range": [
    0,
    22
    ]
}
```

## AST for `car.factory('white', 'Kia', 'Sorento', 2010, 50000, null, true)`

```js
 {
    "type": "ExpressionStatement",
    "expression": {
    "type": "CallExpression",
    "callee": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
        "type": "Identifier",
        "name": "car",
        "range": [
            0,
            3
        ]
        },
        "property": {
        "type": "Identifier",
        "name": "factory",
        "range": [
            4,
            11
        ]
        },
        "range": [
        0,
        11
        ]
    },
    "arguments": [
        {
        "type": "Literal",
        "value": "white",
        "raw": "'white'",
        "range": [
            12,
            19
        ]
        },
        {
        "type": "Literal",
        "value": "Kia",
        "raw": "'Kia'",
        "range": [
            21,
            26
        ]
        },
        {
        "type": "Literal",
        "value": "Sorento",
        "raw": "'Sorento'",
        "range": [
            28,
            37
        ]
        },
        {
        "type": "Literal",
        "value": 2010,
        "raw": "2010",
        "range": [
            39,
            43
        ]
        },
        {
        "type": "Literal",
        "value": 50000,
        "raw": "50000",
        "range": [
            45,
            50
        ]
        },
        {
        "type": "Literal",
        "value": null,
        "raw": "null",
        "range": [
            52,
            56
        ]
        },
        {
        "type": "Literal",
        "value": true,
        "raw": "true",
        "range": [
            58,
            62
        ]
        }
    ],
    "range": [
        0,
        63
    ]
    },
    "range": [
    0,
    63
    ]
}
```

## AST for an ObjectExpression

The AST for the expression:

```js
({ color: 'white',  make: 'Kia', model: 'Sorento', year: 2010, miles: 50000, bedliner: null, alarm: true, })
```

is: 

```js
{
        "type": "ObjectExpression",
        "properties": [
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "color",
              "range": [
                5,
                10
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": "white",
              "raw": "'white'",
              "range": [
                12,
                19
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              5,
              19
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "make",
              "range": [
                23,
                27
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": "Kia",
              "raw": "'Kia'",
              "range": [
                29,
                34
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              23,
              34
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "model",
              "range": [
                38,
                43
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": "Sorento",
              "raw": "'Sorento'",
              "range": [
                45,
                54
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              38,
              54
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "year",
              "range": [
                58,
                62
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": 2010,
              "raw": "2010",
              "range": [
                64,
                68
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              58,
              68
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "miles",
              "range": [
                72,
                77
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": 50000,
              "raw": "50000",
              "range": [
                79,
                84
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              72,
              84
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "bedliner",
              "range": [
                88,
                96
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": null,
              "raw": "null",
              "range": [
                98,
                102
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              88,
              102
            ]
          },
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "alarm",
              "range": [
                106,
                111
              ]
            },
            "computed": false,
            "value": {
              "type": "Literal",
              "value": true,
              "raw": "true",
              "range": [
                113,
                117
              ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false,
            "range": [
              106,
              117
            ]
          }
        ],
        "range": [
          1,
          120
        ]
      }
```