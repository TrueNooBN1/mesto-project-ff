import '../pages/index.css'
import {initialCards} from "../components/cards.js"
import {createCard, deleteCard, likeCard} from "../components/card.js"
import {openPopup,
        closePopup, 
        openImagePopup} from "../components/modal.js"


const cardsList =
 document.querySelector('.places__list');
const profileEditPopup =
 document.querySelector('.popup_type_edit');
const editProfileButton =
 document.querySelector('.profile__edit-button');
profileEditPopup['form-reset'] = true;

const addContentToProfilePopup = 
 document.querySelector('.popup_type_new-card');
const addContentToProfileButton =
 document.querySelector('.profile__add-button');
addContentToProfilePopup['form-reset'] = true;

const formEditElement =
 document.forms['edit-profile'];
const nameInput =
 formEditElement.querySelector('.popup__input_type_name');
const jobInput =
 formEditElement.querySelector('.popup__input_type_description');

const formNewPlaceElement =
 document.forms['new-place'];
const descriptionNewPlaceInput =
 formNewPlaceElement['place-name'];
const srcNewPlaceInput =
 formNewPlaceElement['link'];


function createPageItems(){
    initialCards.forEach(item=>cardsList.append(createCard(item.name,
                                                           item.link,
                                                           deleteCard,
                                                           likeCard,
                                                           openImagePopup)));
}

function handleEditProfileFormSubmit(evt){
  evt.preventDefault();

  const profileTitle = 
   document.querySelector('.profile__title');

  const profileDescription = 
   document.querySelector('.profile__description');

  profileTitle.textContent =
   nameInput.value;

  profileDescription.textContent =
   jobInput.value;
  
  formEditElement.reset();
  closePopup(profileEditPopup);
}

function handleNewPlaceFormSubmit(evt){
  evt.preventDefault();

  cardsList.prepend(createCard(descriptionNewPlaceInput.value,
                                srcNewPlaceInput.value,
                                deleteCard,
                                likeCard,
                                openImagePopup))  
  formNewPlaceElement.reset();
  closePopup(addContentToProfilePopup);
}
//--------------------------------------------------------------

createPageItems();

editProfileButton.addEventListener('click',
     ()=>{openPopup(profileEditPopup, formEditElement);});
formEditElement.addEventListener('submit',
    handleEditProfileFormSubmit); 
          
addContentToProfileButton.addEventListener('click',
    ()=>{openPopup(addContentToProfilePopup, formNewPlaceElement);});
formNewPlaceElement.addEventListener('submit',
    handleNewPlaceFormSubmit); 


