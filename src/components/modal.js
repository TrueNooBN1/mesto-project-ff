function addKeyListenerToPopup(evt){
  if(evt.key === 'Escape'){
    closePopup(document['opened-popup']);
  }
}

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', addKeyListenerToPopup);
  popup.removeEventListener('click', closeOnBackDropClick);
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

function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document['opened-popup'] = popup;
  document.addEventListener('keydown', addKeyListenerToPopup)
  popup.addEventListener('click', closeOnBackDropClick);
}

export {openPopup,
        closePopup
       };