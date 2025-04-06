import '../pages/index.css'
import {initialCards} from "../components/cards.js"
import {createCard, deleteCard, likeCard} from "../components/card.js"
import {openPopup,
        closePopup} from "../components/modal.js"


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

const formEditElement =
 document.forms['edit-profile'];
const nameInput =
 formEditElement.querySelector('.popup__input_type_name');
const jobInput =
 formEditElement.querySelector('.popup__input_type_description');

const profileTitle = 
 document.querySelector('.profile__title');
const profileDescription = 
 document.querySelector('.profile__description');

const imagePopup = 
 document.querySelector('.popup_type_image');
const imagePopupImg =
  imagePopup.querySelector('.popup__image');
const imagePopupCaption =
 imagePopup.querySelector('.popup__caption');

const editPopupСloseBtn =
 profileEditPopup.querySelector('.popup__close');
const addContentСloseBtn =
 addContentToProfilePopup.querySelector('.popup__close');
const imagePopupСloseBtn =
 imagePopup.querySelector('.popup__close');

const formNewPlaceElement =
 document.forms['new-place'];
const descriptionNewPlaceInput =
 formNewPlaceElement['place-name'];
const srcNewPlaceInput =
 formNewPlaceElement['link'];
 
function openImagePopup(src, description){
  imagePopupImg.src = src;
  imagePopupImg.alt = description;
  imagePopupCaption.textContent = description;
  openPopup(imagePopup);
}


function createPageItems(){
    initialCards.forEach(item=>cardsList.append(createCard(item.name,
                                                           item.link,
                                                           deleteCard,
                                                           likeCard,
                                                           openImagePopup)));
}

function handleEditProfileFormSubmit(evt){
  evt.preventDefault();

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

function openEditPopup(){
  openPopup(profileEditPopup);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openAddContentPopup(){
  openPopup(addContentToProfilePopup);
  formNewPlaceElement.reset(); 
}
//--------------------------------------------------------------

createPageItems();

editProfileButton.addEventListener('click',
  openEditPopup);

formEditElement.addEventListener('submit',
  handleEditProfileFormSubmit); 
          
addContentToProfileButton.addEventListener('click',
  openAddContentPopup);

formNewPlaceElement.addEventListener('submit',
  handleNewPlaceFormSubmit);

editPopupСloseBtn.addEventListener('click',
  ()=>{closePopup(profileEditPopup);});
addContentСloseBtn.addEventListener('click',
  ()=>{closePopup(addContentToProfilePopup);});
imagePopupСloseBtn.addEventListener('click',
  ()=>{closePopup(imagePopup);});
 
 