'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MESSAGE_GAP = 20;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_SPACE = 52;
var BAR_X = 152;
var BAR_Y = 100;
var TEXT_PLAYERS_Y = 260;
var MIN_SATURATION = 0;
var MAX_SATURATION = 100;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + MESSAGE_GAP, CLOUD_Y + MESSAGE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + MESSAGE_GAP, CLOUD_Y + MESSAGE_GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], BAR_X + ((BAR_SPACE + BAR_WIDTH) * i), TEXT_PLAYERS_Y);
    ctx.fillText(String(Math.round(times[i])), BAR_X + ((BAR_SPACE + BAR_WIDTH) * i), BAR_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) - MESSAGE_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(255,' + getRandomSaturation(MIN_SATURATION, MAX_SATURATION) + '% , 50%)';
    }

    ctx.fillRect(BAR_X + ((BAR_SPACE + BAR_WIDTH) * i), BAR_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
