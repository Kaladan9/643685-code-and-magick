'use strict';

(function () {
  var setupContainer = document.querySelector('.setup');
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
})();
