'use strict';

// setup.js
(function () {
  function createRandomName(names, surnames) {
    var randomName = window.util.getRandomArrValue(names);
    var randomSurname = window.util.getRandomArrValue(surnames);
    return randomName + ' ' + randomSurname;
  }

  function createRandomWizard(wizardOption) {
    return {
      name: createRandomName(wizardOption.NAMES, wizardOption.SURNAMES),
      coatColor: window.util.getRandomArrValue(wizardOption.COAT_COLORS),
      eyesColor: window.util.getRandomArrValue(wizardOption.EYES_COLORS),
      fireballColor: window.util.getRandomArrValue(wizardOption.FIREBALL_COLORS)
    };
  }

  function createWizardsList(wizardOption) {
    var wizards = [];
    for (var i = 0; i < wizardOption.COUNT; i++) {
      wizards.push(createRandomWizard(wizardOption));
    }
    return wizards;
  }

  function createWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    document.querySelector('.setup-fireball-wrap').style.background = wizard.fireballColor;

    return wizardElement;
  }

  function renderWizardList(wizard, wizardCount) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardCount; i++) {
      fragment.appendChild(createWizard(wizard[i]));
    }
    similarListElement.appendChild(fragment);
  }

  renderWizardList(createWizardsList(window.Wizards), window.Wizards.COUNT);
})();

// ---------------------------------------------------- //

// dialog.js


// ----------------------------------------------- //

// dialog-move

