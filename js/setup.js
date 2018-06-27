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

var setupContainer = document.querySelector('.setup');
var setupSimilarContainer = setupContainer.querySelector('.setup-similar');
var setupUserName = setupContainer.querySelector('.setup-user-name');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupContainer.querySelector('.setup-close');

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
  setupContainer.classList.remove('hidden');
  setupSimilarContainer.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
}

function getDefaultSetupPosition() {
  return {
    top: window.getComputedStyle(setupContainer).top,
    left: window.getComputedStyle(setupContainer).left
  };
}

var defaultSetupPosition = getDefaultSetupPosition();

function closePopup() {
  setupContainer.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);

  setupContainer.style.top = defaultSetupPosition.top;
  setupContainer.style.left = defaultSetupPosition.left;
}

function onEscPress(evt) {
  if (evt.keyCode === KeyCodes.ESC && evt.target !== setupUserName) {
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

// ----------------------------------------------- //

var dialogHandler = setupContainer.querySelector('.upload');

function onClickPreventDefault(evt) {
  evt.preventDefault();
  dialogHandler.removeEventListener('click', onClickPreventDefault);
}

function onDialogMouseDown(evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    document.body.style.overflow = 'hidden';
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupContainer.style.top = (setupContainer.offsetTop - shift.y) + 'px';
    setupContainer.style.left = (setupContainer.offsetLeft - shift.x) + 'px';
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.body.style.overflow = '';

    if (dragged) {
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

dialogHandler.addEventListener('mousedown', onDialogMouseDown);

