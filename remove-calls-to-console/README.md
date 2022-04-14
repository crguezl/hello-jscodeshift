## Removing console.* 

Run:

```
npm run console
```

or     

```
jscodeshift -t remove-consoles.js remove-consoles-input.js -d -p
```

to make a dry-run 

## Exercise 

Write a transformation `remove-console-logs.js` that only removes `console.logs` but not `console.warn` and others