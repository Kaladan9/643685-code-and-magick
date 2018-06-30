'use strict';

(function () {

  var Wizards = window.utils.Wizards;
  var load = window.backend.load;
  var showError = window.utils.showError;
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  function createWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    document.querySelector('.setup-fireball-wrap').style.background = wizard.colorFireball;

    return wizardElement;
  }

  function renderWizardList(wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < Wizards.COUNT; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  }

  load(renderWizardList, showError);

})();


