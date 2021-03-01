'use strict';
const popupShowButton = document.querySelector('.form-appearance-button');
const popup = document.querySelector('.modal-search'); //найдем попап
const formSearchHotel = popup.querySelector('.search-hotel-form'); //найдем форму

const formaDateIn = popup.querySelector('[id=date-in_field]'); //найдем поля формы
const formaDateOut = popup.querySelector('[id=date-out_field]');
const formSendButton = document.querySelector('.modal-button');



popupShowButton.addEventListener('click', function () {
  if (popup.classList.contains('modal-show')) {
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');
  } else {
    popup.classList.add('modal-show');
    formaDateIn.focus();
  }

});

formSearchHotel.addEventListener('submit', function (evt) {
  if (!formaDateIn.value || !formaDateOut.value) {
    evt.preventDefault();
    // popup.classList.remove('modal-error');
    // popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('modal-error');
  }

});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      evt.preventDefault();
      popup.classList.remove('modal-show');
      popup.classList.remove('modal-error');
    }
  }
});
