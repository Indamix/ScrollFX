# [ScrollFX](https://indamix.github.io/ScrollFX/)
## Lightweight scrolling effects with familiar CSS syntax

+ Creating scrolling and parallax effects has never been so easy
+ Simple API similar to CSS3 animation / keyframes rule
+ Light and fast


Scroll Effects registers itself as CommonJS module, AMD module or jQuery plugin (it depends on your environment).  
If there is no CommonJS, AMD or jQuery, Scroll Effects registers itself in the global namespace.

## Example
```javascript
var options = {
  top: {
    100: '0px',
    250: '150px',
    300: '200px',
    420: '150px',
    500: '0px'
  },
  'background-color': function (t/* px scrolled from top */) {
    return t < 300 ? 'transparent' : t < 400 ? 'rgba(255,255,255,' + (t - 300) / 100 + ')' : '#fff';
  }
};

$(selector).scrollFX(options);
// or
$.fn.scrollFX(options);
```
