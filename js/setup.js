'use strict';

var Wizards = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лопита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue,', 'yellow', 'green'],
  COUNT: 4
};

function getRandomArrValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomName(names, surnames) {
  var randomName = getRandomArrValue(names);
  var randomSurname = getRandomArrValue(surnames);
  return randomName + ' ' + randomSurname;
}

function createRandomWizard(wizardOption) {
  return {
    name: createRandomName(wizardOption.NAMES, wizardOption.SURNAMES),
    coatColor: getRandomArrValue(wizardOption.COAT_COLORS),
    eyesColor: getRandomArrValue(wizardOption.EYES_COLORS)
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

function showSetup(wizardOption) {
  var wizardsList = createWizardsList(wizardOption);

  renderWizardList(wizardsList, wizardOption.COUNT);

  var setupContainer = document.querySelector('.setup');
  var setupSimilarContainer = setupContainer.querySelector('.setup-similar');

  setupContainer.classList.remove('hidden');
  setupSimilarContainer.classList.remove(('hidden'));
}

showSetup(Wizards);
