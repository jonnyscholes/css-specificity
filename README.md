css-specificity
===========

css-specificity takes a string and tells you the CSS specificity of each selector within it.

Install
-------

``` npm install css-specificity ```

Usage
-----

``` 
var cssspecificity = require('css-specificity');
var s = cssspecificity('#id .class:hover a, .nav:hover a');
console.log(s); 
// [121, 21]
```

License
-------

MIT