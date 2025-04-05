let openedPopup = {};

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_description');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function addKeyListenerToPopup(evt){
  if(evt.key === 'Escape'){
    closePopup();
  }
}

function closePopup(){
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', addKeyListenerToPopup);
}

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    closePopup();
  }
}

function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formEditElement.reset();
  closePopup(formEditElement);
}

function openImagePopup(src, description){
  imagePopupImg.src = src;
  imagePopupImg.alt = description;
  imagePopupCaption.textContent = description;
  openPopup(imagePopup);
}

function openPopup(popup){
  openedPopup = popup;
  const closeBtn = openedPopup.querySelector('.popup__close');

  openedPopup.classList.add('popup_is-opened');

  document.addEventListener('keydown', addKeyListenerToPopup)
  openedPopup.addEventListener('click', closeOnBackDropClick);
  closeBtn.addEventListener('click', ()=>{closePopup();})
}

export {openPopup,
        handleEditProfileFormSubmit,
        // handleNewPlaceFormSubmit, 
        openImagePopup
       };