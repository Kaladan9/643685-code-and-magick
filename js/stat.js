'use strict';

(function () {

  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    GAP: 10,
    COLOR: '#fff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };

  var Text = {
    MESSAGE_GAP: 20,
    BAR_TEXT_GAP: 5,
    HEIGHT: 20
  };

  var Bar = {
    WIDTH: 40,
    HEIGHT: 150,
    SPACE: 52,
    X: 152,
    Y: 250
  };

  var MIN_SATURATION = 0;
  var MAX_SATURATION = 100;

  function renderCloud(ctx, options) {
    ctx.fillStyle = options.SHADOW_COLOR;
    ctx.fillRect(options.X + options.GAP, options.Y + options.GAP, options.WIDTH, options.HEIGHT);
    ctx.fillStyle = options.COLOR;
    ctx.fillRect(options.X, options.Y, options.WIDTH, options.HEIGHT);
  }

  function renderText(ctx, message, x, y, baseline) {
    ctx.font = '16px PT Mono';
    ctx.textBaseline = baseline;
    ctx.fillStyle = '#000';
    ctx.fillText(message, x, y);
  }

  function getMaxElement(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }

  function getBarSpace(arr, cloudWidth, barWidth) {
    return ((cloudWidth - (barWidth * arr.length)) / (arr.length + 1));
  }

  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function renderTimeBar(ctx, names, times, textOptions, barOptions) {
    var maxTime = getMaxElement(times);
    var barSpace = getBarSpace(times, Cloud.WIDTH, Bar.WIDTH);
    var barSpaceTotal = (barSpace + barOptions.WIDTH);

    for (var i = 0; i < names.length; i++) {
      var propBarHeight = barOptions.HEIGHT * times[i] / maxTime;
      var coordX = barOptions.X + (barSpaceTotal * i);
      var scoreCoordY = barOptions.Y - propBarHeight;
      var saturation = getRandomValue(MIN_SATURATION, MAX_SATURATION);

      renderText(ctx, names[i], coordX, barOptions.Y + textOptions.BAR_TEXT_GAP, 'top');
      renderText(ctx, Math.round(times[i]).toString(), coordX, scoreCoordY - textOptions.BAR_TEXT_GAP, 'bottom');

      ctx.fillStyle = (names[i] === 'Вы')
        ? 'rgba(255, 0, 0, 1)'
        : 'hsl(255,' + saturation + '% , 50%)';

      ctx.fillRect(coordX, barOptions.Y, barOptions.WIDTH, -propBarHeight);
    }
  }

  window.renderStatistics = function (ctx, names, times) {
    var coordX = Cloud.X + Text.MESSAGE_GAP;
    var coordY = Cloud.Y + Text.MESSAGE_GAP;

    renderCloud(ctx, Cloud);

    renderText(ctx, 'Ура вы победили!', coordX, coordY, 'top');
    renderText(ctx, 'Список Результатов:', coordX, coordY + Text.HEIGHT, 'top');

    renderTimeBar(ctx, names, times, Text, Bar);
  };

})();
