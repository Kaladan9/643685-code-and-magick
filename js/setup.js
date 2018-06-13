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
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  COUNT: 4
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
    eyesColor: getRandomArrValue(wizardOption.EYES_COLORS),
    fireballColor: getRandomArrValue(wizardOption.FIREBALL_COLORS)
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

function onPopupEscPress(evt) {
  var setupUserName = document.querySelector('.setup-user-name');
  if ((evt.keyCode === ESC_KEYCODE) && !(setupUserName === document.activeElement)) {
    closePopup();
  }
}

function onPopupEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}

function openPopup() {
  var setupContainer = document.querySelector('.setup');
  var setupSimilarContainer = setupContainer.querySelector('.setup-similar');

  setupContainer.classList.remove('hidden');
  setupSimilarContainer.classList.remove(('hidden'));
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  var setupContainer = document.querySelector('.setup');

  setupContainer.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function showSetup(wizardOption) {
  var wizardsList = createWizardsList(wizardOption);
  var setupOpen = document.querySelector('.setup-open');

  renderWizardList(wizardsList, wizardOption.COUNT);

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    onPopupEnterPress(evt);
  });
}

function hideSetup() {
  var setupClose = document.querySelector('.setup-close');

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    onPopupEscPress(evt);
  });
}

function changeWizardColors(coatColors, element) {
  element.style.fill = getRandomArrValue(coatColors);
}

function changeFireballColor(fireballColors, element) {
  element.style.background = getRandomArrValue(fireballColors);
}

function changeWizardSetup(wizardOptions) {
  var setupContainer = document.querySelector('.setup');
  var wizardCoat = setupContainer.querySelector('.wizard-coat');
  var wizardEyes = setupContainer.querySelector('.wizard-eyes');
  var fireball = setupContainer.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', function () {
    changeWizardColors(wizardOptions.COAT_COLORS, wizardCoat);
  });

  wizardEyes.addEventListener('click', function () {
    changeWizardColors(wizardOptions.EYES_COLORS, wizardEyes);
  });

  fireball.addEventListener('click', function () {
    changeFireballColor(wizardOptions.FIREBALL_COLORS, fireball);
  });
}

showSetup(Wizards);
hideSetup();
changeWizardSetup(Wizards);
