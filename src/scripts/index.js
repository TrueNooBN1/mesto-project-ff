import '../pages/index.css'
import {initialCards} from "./cards.js"
import {createCard, deleteCard, likeCard} from "../components/card.js"
import {openPopup, 
        handleEditProfileFormSubmit, 
        // handleNewPlaceFormSubmit, 
        openImagePopup} from "../components/modal.js"

// @todo: DOM узлы
const cardsList =
 document.querySelector('.places__list');
const profileEditPopup =
 document.querySelector('.popup_type_edit');
const editProfileButton =
 document.querySelector('.profile__edit-button');

const addContentToProfilePopup = 
 document.querySelector('.popup_type_new-card');
const addContentToProfileButton =
 document.querySelector('.profile__add-button');

const formNewPlaceElement =
 document.forms['new-place'];
const descriptionNewPlaceInput =
 formNewPlaceElement['place-name'];
const srcNewPlaceInput =
 formNewPlaceElement['link'];

// @todo: Вывести карточки на страницу
function createPageItems(){
    initialCards.forEach(item=>cardsList.append(createCard(item.name,
                                                           item.link,
                                                           deleteCard,
                                                           likeCard,
                                                           openImagePopup)));
}

function handleNewPlaceFormSubmit(evt){
  evt.preventDefault();
  cardsList.prepend(createCard(descriptionNewPlaceInput.value,
                                srcNewPlaceInput.value,
                                deleteCard,
                                likeCard,
                                openImagePopup))  
  formNewPlaceElement.reset();
//   closePopup(formNewPlaceElement);
}



createPageItems();

editProfileButton.addEventListener('click',
     ()=>{openPopup(profileEditPopup);});
profileEditPopup.addEventListener('submit',
     handleEditProfileFormSubmit); 

addContentToProfileButton.addEventListener('click',
     ()=>{openPopup(addContentToProfilePopup);});
addContentToProfilePopup.addEventListener('submit',
     handleNewPlaceFormSubmit); 


