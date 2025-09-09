## 1) Difference between `var`, `let`, and `const`?

- `var`: Function-scoped, can be redeclared and updated, hoisted.
- `let`: Block-scoped, cannot be redeclared in the same scope, can be updated.
- `const`: Block-scoped, cannot be redeclared or updated (value stays constant).

---

## 2) Difference between `map()`, `forEach()`, and `filter()`?

- `map()`: Returns a new array by transforming each element.
- `forEach()`: Runs a function on each element but returns nothing.
- `filter()`: Returns a new array with elements that pass a test.

---

## 3) What are arrow functions in ES6?

- Shorter syntax for writing functions.
- Use `=>` instead of `function`.
- Do not have their own `this` value.

Example:

```JS
const add = (a, b) => a + b;
```

---

## 4) How does destructuring assignment work in ES6?

- Extracts values from arrays or objects into variables easily.
- Uses `{}` for objects and `[]` for arrays.

Example:

```JS
const [x, y] = [23, 2]; // x = 23, y = 2
const {name, age} = {name: "Roman", age: 20}; // name = "Roman", age = 20
```

---

## 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals use backticks `` ` ``.
- They allow embedding variables directly using `${}`.
- Support multiline strings without extra characters.

Example:

```JS
const name = "Purnota";
const greeting = `Hello, ${name}!`; // Hello, Purnota!
```

---
