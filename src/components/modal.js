const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function addKeyListenerToPopup(evt){
  if(evt.key === 'Escape'){
    closePopup(document['opened-popup']);
  }
}

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', addKeyListenerToPopup);
  if('popupHasForm' in document){
    document['popupHasForm'].reset();
  }
  delete document['opened-popup'];
  delete document['popupHasForm'];
}

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    closePopup(dialog);
  }
}


function openImagePopup(src, description){
  imagePopupImg.src = src;
  imagePopupImg.alt = description;
  imagePopupCaption.textContent = description;
  openPopup(imagePopup);
}

function openPopup(popup, form = undefined){
  const closeBtn = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-opened');
  document['opened-popup'] = popup;
  if(form !== undefined)
    document['popupHasForm'] = form;
  document.addEventListener('keydown', addKeyListenerToPopup)
  popup.addEventListener('click', closeOnBackDropClick);
  closeBtn.addEventListener('click', ()=>{closePopup(popup);})
}

export {openPopup,
        closePopup,
        openImagePopup
       };