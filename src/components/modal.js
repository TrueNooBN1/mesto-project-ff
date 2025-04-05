let openedPopup = {};
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

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

function handleFormSubmit(evt){
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formElement.reset();
  closePopup(formElement);
}


function openPopup(popup){
  openedPopup = popup;
  const closeBtn = openedPopup.querySelector('.popup__close');

  openedPopup.classList.add('popup_is-opened');

  document.addEventListener('keydown', addKeyListenerToPopup)
  openedPopup.addEventListener('click', closeOnBackDropClick);
  closeBtn.addEventListener('click', ()=>{closePopup();})

  popup.addEventListener('submit', handleFormSubmit); 
}

export {openPopup};