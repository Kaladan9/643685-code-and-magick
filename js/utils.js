'use strict';

(function () {

  window.utils = {
    Wizards: {
      NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лопита', 'Вашингтон'],
      SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
      COAT_COLORS: ['rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)'],
      EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
      FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
      COUNT: 4
    },

    KeyCodes: {
      ESC: 27,
      ENTER: 13
    },

    makeCounter: function () {
      var currentCount = 1;

      return function (arr) {
        if (currentCount === arr.length) {
          currentCount = 0;
        }
        return currentCount++;
      };
    },

    getRandomArrValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

})();
