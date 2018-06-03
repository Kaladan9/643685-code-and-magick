'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  COLOR: 'rgba(0, 0, 0, 0.7)',
  SHADOW_COLOR: '#fff'
};

var Text = {
  GAP: 20,
  HEIGHT: 20,
  NAMES_Y: 260
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

function renderCloud(ctx) {
  ctx.fillStyle = Cloud.COLOR;
  ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.fillStyle = Cloud.SHADOW_COLOR;
  ctx.fillRect(Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Cloud.WIDTH, Cloud.HEIGHT);
}

function renderText(ctx, message, x, y) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
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

function getRandomSaturation(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function renderTimeBar(ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var propBarHeight = Bar.HEIGHT * times[i] / maxTime;
    var barSpaceTotal = (Bar.SPACE + Bar.WIDTH);
    var coordX = Bar.X + (barSpaceTotal * i);
    var coordY = Bar.Y - propBarHeight - Text.GAP;
    var saturation = getRandomSaturation(MIN_SATURATION, MAX_SATURATION);

    renderText(ctx, names[i], coordX, Text.NAMES_Y);
    renderText(ctx, Math.round(times[i]).toString(), coordX, coordY);

    ctx.fillStyle = (names[i] === 'Вы')
      ? 'rgba(255, 0, 0, 1)'
      : 'hsl(255,' + saturation + '% , 50%)';

    ctx.fillRect(coordX, Bar.Y, Bar.WIDTH, -propBarHeight);
  }
}

window.renderStatistics = function (ctx, names, times) {
  var coordX = Cloud.X + Text.GAP;
  var coordY = Cloud.Y + Text.GAP;

  renderCloud(ctx);

  renderText(ctx, 'Ура вы победили!', coordX, coordY);
  renderText(ctx, 'Список Результатов', coordX, coordY + Text.HEIGHT);

  renderTimeBar(ctx, names, times);
};
