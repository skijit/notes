YAML Syntax
============

- optionally, all yaml docs can begin with `---` and end with `...`
- All lines at the same level of indention, and starting with a `-` are items in the same collection

```(yaml)
---
- item 1
- item 2
- item 3 (and last)
...
```

- hash symbol for commenting
- dictionary is a collection of key/value pairs:

```(yaml)
- A Dictionary
  key1: value1
  key2: value2
  key3-list:
    - item 1
    - item 2
```

- dictionaries and arrays can also noted in abbreviated form:

```
martin: {name: Martin D'vloper, job: Developer, skill: Elite}
['Apple', 'Orange', 'Strawberry', 'Mango']
```

- yaml is supposedly a superset of json.  though I find that surprising.