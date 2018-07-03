'use strict';

(function () {

  var Wizards = window.utils.Wizards;
  var load = window.backend.load;
  var showError = window.utils.showError;
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardSetup = document.querySelector('.setup');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');

  function createWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function renderWizardList(wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    similarListElement.innerHTML = '';

    for (var i = 0; i < Wizards.COUNT; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  }

  function updateWizards() {
    var coatColor = wizardCoat.style.fill || Wizards.COAT_COLORS[0];
    var eyesColor = wizardEyes.style.fill || Wizards.EYES_COLORS[0];

    function getRank(wizard) {
      var rank = 0;

      if (wizard.colorCoat === coatColor) {
        rank += 2;
      }
      if (wizard.colorEyes === eyesColor) {
        rank += 1;
      }

      return rank;
    }

    window.wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    renderWizardList(window.wizards);
  }

  function successHandler(data) {
    window.wizards = data;
    updateWizards(window.wizards);
  }

  load(successHandler, showError);

  window.updateWizards = updateWizards;

})();


