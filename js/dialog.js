'use strict';

(function () {

  var Wizards = window.utils.Wizards;
  var makeCounter = window.utils.makeCounter;

  var setupContainer = document.querySelector('.setup');
  var setupSimilarContainer = setupContainer.querySelector('.setup-similar');
  var setupUserName = setupContainer.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupContainer.querySelector('.setup-close');
  var userForm = setupContainer.querySelector('.setup-wizard-form');

  var coatCounter = makeCounter();
  var eyesCounter = makeCounter();
  var fireballCounter = makeCounter();

  function openPopup() {
    setupContainer.classList.remove('hidden');
    setupSimilarContainer.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    userForm.addEventListener('submit', submitForm);
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
    if (evt.keyCode === window.utils.KeyCodes.ESC && evt.target !== setupUserName) {
      closePopup();
    }
  }

  function onPopupOpenEnterPress(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ENTER) {
      openPopup();
    }
  }

  function setWizardSetupHandler(wizardOptions) {
    var wizardCoat = setupContainer.querySelector('.wizard-coat');
    var wizardEyes = setupContainer.querySelector('.wizard-eyes');
    var fireball = setupContainer.querySelector('.setup-fireball-wrap');

    wizardCoat.addEventListener('click', function () {
      wizardCoat.style.fill = wizardOptions.COAT_COLORS[coatCounter(wizardOptions.COAT_COLORS)];
    });

    wizardEyes.addEventListener('click', function () {
      wizardEyes.style.fill = wizardOptions.EYES_COLORS[eyesCounter(wizardOptions.EYES_COLORS)];
    });

    fireball.addEventListener('click', function () {
      fireball.style.background = wizardOptions.FIREBALL_COLORS[fireballCounter(wizardOptions.FIREBALL_COLORS)];
    });
  }

  function submitForm(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), closePopup, window.utils.showError);
  }

  setWizardSetupHandler(Wizards);

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', onPopupOpenEnterPress);

  setupClose.addEventListener('click', function () {
    closePopup();
  });

})();
