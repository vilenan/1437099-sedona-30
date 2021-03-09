
const popupShowButton = document.querySelector('.form-appearance-button');
const popup = document.querySelector('.modal-search'); //найдем попап
const formSearchHotel = popup.querySelector('.search-hotel-form'); //найдем форму

const formDateIn = popup.querySelector('[id=date-in_field]'); //найдем поля формы
const formDateOut = popup.querySelector('[id=date-out_field]');
const formAdults = popup.querySelector('[id=adults_group_field]');
const formChildren = popup.querySelector('[id=children_group_field]');

const formSendButton = document.querySelector('.modal-button');

let isStorageSupport = true;
formAdults.value = 2;
formChildren.value = 0;

try {
  formAdults.value = localStorage.getItem('adults');
  formChildren.value = localStorage.getItem('children');
} catch (err){
  isStorageSupport = false;
}


//появление попапа и фокусировка
popupShowButton.addEventListener('click', function (evt) {
  if (popup.classList.contains('modal-show')) {
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');
  } else {
    popup.classList.add('modal-show');
    formDateIn.focus();
    formAdults.value = localStorage.getItem('adults');
    formChildren.value = localStorage.getItem('children');
  }
  evt.preventDefault();
});

formSearchHotel.addEventListener('submit', function (evt) {
  if (!formDateIn.value || !formDateOut.value) {
    evt.preventDefault();
    popup.classList.remove('modal-error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('adults', formAdults.value);
      localStorage.setItem('children', formChildren.value);
    }
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
