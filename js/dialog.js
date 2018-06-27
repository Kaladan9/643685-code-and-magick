'use strict';

(function () {
  var setupContainer = document.querySelector('.setup');
  var setupSimilarContainer = setupContainer.querySelector('.setup-similar');
  var setupUserName = setupContainer.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupContainer.querySelector('.setup-close');

  var coatCounter = window.makeCounter();
  var eyesCounter = window.makeCounter();
  var fireballCounter = window.makeCounter();

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
    if (evt.keyCode === window.KeyCodes.ESC && evt.target !== setupUserName) {
      closePopup();
    }
  }

  function onPopupOpenEnterPress(evt) {
    if (evt.keyCode === window.KeyCodes.ENTER) {
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

  setWizardSetupHandler(window.Wizards);

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', onPopupOpenEnterPress);

  setupClose.addEventListener('click', function () {
    closePopup();
  });
})();
