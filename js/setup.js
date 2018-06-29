'use strict';

(function () {

  var Wizards = window.utils.Wizards;

  function createWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    document.querySelector('.setup-fireball-wrap').style.background = wizard.colorFireball;

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

  var wizardList = [];

  function onLoad(data) {
    wizardList = data;
    renderWizardList(wizardList, Wizards.COUNT);
  }

  window.backend.load(onLoad, window.utils.showError);

})();


