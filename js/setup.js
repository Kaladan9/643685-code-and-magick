'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лопита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue,', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

function removeSelector(findSelector, selectorToDel) {
  var element = document.querySelector(findSelector);
  element.classList.remove(selectorToDel);
}

function getRandomArrValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomName(namesArr, surnamesArr) {
  var randomName = getRandomArrValue(namesArr);
  var randomSurname = getRandomArrValue(surnamesArr);
  return randomName + ' ' + randomSurname;
}

function createRandomWizard(namesArr, surnamesArr, coatsArr, eyesArr) {
  return {
    name: createRandomName(namesArr, surnamesArr),
    coatColor: getRandomArrValue(coatsArr),
    eyesColor: getRandomArrValue(eyesArr)
  };
}

removeSelector('.setup', 'hidden');
removeSelector('.setup-similar', 'hidden');

function createWizardsList(namesArr, surnamesArr, coatsArr, eyesArr, wizardCount) {
  var wizards = [];
  for (var i = 0; i < wizardCount; i++) {
    wizards.push(createRandomWizard(namesArr, surnamesArr, coatsArr, eyesArr));
  }
  return wizards;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderWizardList(wizard, wizardCount) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardCount; i++) {
    fragment.appendChild(renderWizard(wizard[i]));
  }
  similarListElement.appendChild(fragment);
}

var wizards = createWizardsList(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS, WIZARDS_COUNT);

renderWizardList(wizards, WIZARDS_COUNT);
