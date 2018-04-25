var $ = document.body.querySelector.bind(document.body);

var setBG = (function() {
  var canvas;

  function main(options) {
    if (!canvas) canvas = document.createElement('canvas');
    canvas.width = options.width;
    canvas.height = options.height;
    options.generator(canvas.getContext('2d'));
    options.elm.style.backgroundImage =
      'url(' + canvas.toDataURL('image/png') + ')';
  }

  return main;
})();

function wood(c) {
  c.fillStyle = '#fc6';
  c.fillRect(0, 0, 100, 100);
  c.fillStyle = '#f60';
  for (var i = 1e3; i--; ) {
    c.fillRect((Math.random() * 100) | 0, (Math.random() * 100) | 0, 1, 1);
  }
}

function sand(c) {
  var width = c.canvas.width,
    height = c.canvas.height;
  c.fillStyle = '#ccc';
  c.fillRect(0, 0, width, height);
  for (var i = (width * height) >> 1; i--; ) {
    var x = (Math.random() * width) | 0,
      y = (Math.random() * height) | 0,
      o = Math.random() * 0.5;
    c.fillStyle = 'rgba(0,0,0,' + o * 0.7 + ')';
    c.fillRect(x, y, 1, 1);
    c.fillStyle = 'rgba(255,255,255,' + o + ')';
    c.fillRect(x, y + 1 >= height ? 0 : y + 1, 1, 1);
  }
}

function tilesFactory(r1, g1, b1, r2, g2, b2) {
  return function(c) {
    var width = c.canvas.width,
      height = c.canvas.height,
      n = 25,
      stepX = width / n,
      stepY = height / n;
    c.fillStyle = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
    c.fillRect(0, 0, width, height);
    for (var x = 0; x < width; x += stepX) {
      for (var y = 0; y < height; y += stepY) {
        var color = Math.random();
        c.fillStyle =
          'rgb(' +
          ((r1 + color * (r2 - r1)) | 0) +
          ',' +
          ((g1 + color * (g2 - g1)) | 0) +
          ',' +
          ((b1 + color * (b2 - b1)) | 0) +
          ')';
        c.fillRect(x, y, stepX - 1, stepY - 1);
      }
    }
  };
}

var tilesG = tilesFactory(220, 220, 220, 255, 255, 255);
var tilesB = tilesFactory(200, 200, 255, 255, 240, 255);

var blocks = [tilesG, tilesB, tilesG, tilesB, tilesG, tilesB, tilesG, tilesB];

var blockSize = 400;

var s = '';
for (var i = 0; i < blocks.length; ++i) {
  s += '<div class="bg bg' + i + '">' + blocks[i] + '</div>';
}

$('#container').innerHTML = s;

blocks.forEach(function(block, i) {
  var elm = $('.bg' + i);

  setBG({
    elm: elm,
    width: blockSize,
    height: blockSize,
    generator: block
  });

  scrollFX({
    elm: elm,
    transform: function(t) {
      return `translateX(${Math.sin((t - i * 300) / 500) * 500}px)`;
    }
  });
});

setBG({
  elm: document.body,
  width: 200,
  height: 200,
  generator: tilesFactory(180, 180, 180, 200, 200, 200)
});

scrollFX({
  elm: document.body,
  'background-position': function(t) {
    return '0 ' + t / 2 + 'px';
  }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3667863-10']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src =
    ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
    '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
