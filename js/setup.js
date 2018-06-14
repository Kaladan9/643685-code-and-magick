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
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  COUNT: 4
};

var KeyCodes = {
  ESC: 27,
  ENTER: 13
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

renderWizardList(createWizardsList(Wizards), Wizards.COUNT);

// ---------------------------------------------------- //

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupContainer = document.querySelector('.setup');

function makeCounter() {
  var currentCount = 1;

  return function (arr) {
    if (currentCount === arr.length) {
      currentCount = 0;
    }
    return currentCount++;
  };
}

var coatCounter = makeCounter();
var eyesCounter = makeCounter();
var fireballCounter = makeCounter();

function openPopup() {
  var setupSimilarContainer = setupContainer.querySelector('.setup-similar');

  setupContainer.classList.remove('hidden');
  setupSimilarContainer.classList.remove(('hidden'));
  document.addEventListener('keydown', onEscPress);
}

function closePopup() {
  setupContainer.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
  var setupUserName = document.querySelector('.setup-user-name');
  if (evt.keyCode === KeyCodes.ESC && evt.currentTarget !== setupUserName) {
    closePopup();
  }
}

function onPopupOpenEnterPress(evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    openPopup();
  }
}

function changeCoatColor(Colors, element) {
  element.style.fill = Colors[coatCounter(Colors)];
}

function changeEyesColor(Colors, element) {
  element.style.fill = Colors[eyesCounter(Colors)];
}

function changeFireballColor(Colors, element) {
  element.style.background = Colors[fireballCounter(Colors)];
}

function setWizardSetupHandler(wizardOptions) {
  var wizardCoat = setupContainer.querySelector('.wizard-coat');
  var wizardEyes = setupContainer.querySelector('.wizard-eyes');
  var fireball = setupContainer.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', function () {
    changeCoatColor(wizardOptions.COAT_COLORS, wizardCoat);
  });

  wizardEyes.addEventListener('click', function () {
    changeEyesColor(wizardOptions.EYES_COLORS, wizardEyes);
  });

  fireball.addEventListener('click', function () {
    changeFireballColor(wizardOptions.FIREBALL_COLORS, fireball);
  });
}

setWizardSetupHandler(Wizards);

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', onPopupOpenEnterPress);

setupClose.addEventListener('click', function () {
  closePopup();
});
