'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_COLOR_YOUR = 'rgba(255, 0, 0, 1)';
var TEXT_HEADING_Y = 40;
var TEXT_HEADING_X = 30;
var TEXT_HEADING_GAP = 20;
var TEXT_HEADING_FIRST_LINE = 'Ура, вы победили!';
var TEXT_HEADING_SECOND_LINE = 'Список результатов:';
var TEXT_HEIGHT = 10;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInteger = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, CLOUD_X + TEXT_HEADING_X, TEXT_HEADING_Y, TEXT_HEADING_FIRST_LINE, TEXT_FONT, TEXT_COLOR);
  renderText(ctx, CLOUD_X + TEXT_HEADING_X, TEXT_HEADING_Y + TEXT_HEADING_GAP, TEXT_HEADING_SECOND_LINE, TEXT_FONT, TEXT_COLOR);

  var maxTime = getMaxElement(times);
  var playerNameY = CLOUD_HEIGHT - TEXT_HEIGHT + CLOUD_Y;

  for (var i = 0; i < players.length; i++) {
    var playerBarColor = 'hsl(240, ' + getRandomInteger() + '%, 50%)';
    var playerX = CLOUD_X + BAR_MARGIN + (BAR_MARGIN + BAR_WIDTH) * i;
    var playerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var playerBarY = BAR_HEIGHT - playerBarHeight + TEXT_HEIGHT + TEXT_HEADING_Y + TEXT_HEADING_GAP * 2 + CLOUD_Y;
    var playerTimeValue = Math.floor(times[i]);
    var playerTimeY = playerBarY - TEXT_HEIGHT;

    if (players[i] === 'Вы') {
      playerBarColor = BAR_COLOR_YOUR;
    }

    renderText(ctx, playerX, playerTimeY, playerTimeValue, TEXT_FONT, TEXT_COLOR);
    renderText(ctx, playerX, playerNameY, players[i], TEXT_FONT, TEXT_COLOR);
    renderBar(ctx, playerX, playerBarY, BAR_WIDTH, playerBarHeight, playerBarColor);
  }
};