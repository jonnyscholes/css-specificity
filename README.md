[Use this instead](https://www.npmjs.org/package/css-specificity)
==========
Made this module, then found one exists on npm already. Use it instead.

css-specificity
===========

css-specificity takes a string and tells you the CSS specificity of each selector within it.


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