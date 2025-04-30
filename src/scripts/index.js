import '../pages/index.css'
import {initialCards} from "../components/cards.js"
import {createCard, deleteCard, likeCard} from "../components/card.js"
import {openPopup, closePopup} from "../components/modal.js"
import {enableValidation, clearValidation} from "../components/validation.js"
import {getCards,
        addNewCard,
        deleteCardQuery,
        getProfileInfo,
        patchProfileInfo,
        patchProfilePhoto,
        likeCardQuery,
        dislikeCardQuery
        } from "./api.js"
  
const validationConfigObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let myId = undefined;

const cardsList =
 document.querySelector('.places__list');

const avatarElement = 
 document.querySelector('.profile__image');
const editAvatarPopup = 
 document.querySelector('.popup_type_avatar_edit');
const formNewAvatar =
 document.forms['edit-profile_avatar'];
const avatarEditPopupСloseBtn =
 editAvatarPopup.querySelector('.popup__close');

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
const formEditSaveButton = 
 formEditElement.querySelector('.popup__button');

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
const formNewPlaceSaveButton = 
 formNewPlaceElement.querySelector('.popup__button');

function deleteCardFromServer(cardElement){
  console.log(cardElement['cardId']);
  deleteCardQuery(cardElement['cardId'])
  .then(result=>{
    deleteCard(cardElement);
  })
  .catch(err=>console.log(err))
}

function likeFunc(likeButton, likeCounter, cardId){
  likeButton.liked = !likeButton.liked;
  if(!likeButton.liked){
    dislikeCardQuery(cardId)
      .then((result)=>{
        likeCard(likeButton, likeCounter, result.likes.length);
      })
      .catch(err=>console.log(err))
  }else{
    likeCardQuery(cardId)
      .then((result)=>{
        likeCard(likeButton, likeCounter, result.likes.length);
      })
      .catch(err=>console.log(err))
  }
}
 
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  formEditSaveButton.textContent = "Сохранение...";
  patchProfileInfo(nameInput.value, jobInput.value)
    .then((result)=>{
      console.log(result);
      profileTitle.textContent =
        result.name;

      profileDescription.textContent =
        result.about;

      formEditSaveButton.textContent = "Сохранение";
      formEditElement.reset();
      closePopup(profileEditPopup);  
    })
    .catch(err=>console.log(err))
}

function handleNewPlaceFormSubmit(evt){
  evt.preventDefault();
  formNewPlaceSaveButton.textContent = "Сохранение...";
  addNewCard(descriptionNewPlaceInput.value, srcNewPlaceInput.value)
    .then(result=>{
      cardsList.prepend(createCard(getCardInitObj(result),
        deleteCardFromServer,
        likeFunc,
        openImagePopup)
      )
      formNewPlaceSaveButton.textContent = "Сохранение";
      formNewPlaceElement.reset();
      closePopup(addContentToProfilePopup);
    })
    .catch(err=>console.log(err))

}

function openEditPopup(){
  openPopup(profileEditPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  clearValidation(profileEditPopup, validationConfigObject);
}

function openAddContentPopup(){
  openPopup(addContentToProfilePopup);
  formNewPlaceElement.reset(); 
  clearValidation(addContentToProfilePopup, validationConfigObject);
}

function openImagePopup(src, description){
  imagePopupImg.src = src;
  imagePopupImg.alt = description;
  imagePopupCaption.textContent = description;
  openPopup(imagePopup);
}

function openAvatarEditPopup(){
  console.log(editAvatarPopup);
  openPopup(editAvatarPopup);
  formNewAvatar.reset(); 
  clearValidation(editAvatarPopup, validationConfigObject);
}

function getCardInitObj(responseItem){
  return {
    link: responseItem.link,
    description: responseItem.name,
    cardId: responseItem._id,
    autorId: responseItem.owner._id,
    deleteAllowed: (responseItem.owner._id == myId),
    likesCount: responseItem.likes.length, 
    liked: responseItem.likes.some((item)=>{return item._id === myId})
  };
}

function loadPage(){
  Promise.all([getProfileInfo(), getCards()])
    .then((result) => {
      //--> load profileInfo block
      profileTitle.textContent = 
        result[0].name;
      profileDescription.textContent =
        result[0].about;
      myId = result[0]._id;
      //--> end load profileInfo block
      //--> load card block
      // console.log(result[1]);
      result[1].forEach(item=>{
        cardsList.append(createCard(getCardInitObj(item),
          deleteCardFromServer,
          likeFunc,
          openImagePopup)
        )
      })      
      //--> end load card block
    })
    .catch(err=>console.log(err))
}
    
//-------------------END_DEFINITION-----------------------------

loadPage();

editProfileButton.addEventListener('click',
  openEditPopup);

formEditElement.addEventListener('submit',
  handleEditProfileFormSubmit); 
          
addContentToProfileButton.addEventListener('click',
  openAddContentPopup);

formNewPlaceElement.addEventListener('submit',
  handleNewPlaceFormSubmit);

avatarElement.addEventListener('click',
  openAvatarEditPopup); 

editPopupСloseBtn.addEventListener('click',
  ()=>{closePopup(profileEditPopup);});
addContentСloseBtn.addEventListener('click',
  ()=>{closePopup(addContentToProfilePopup);});
imagePopupСloseBtn.addEventListener('click',
  ()=>{closePopup(imagePopup);});
avatarEditPopupСloseBtn.addEventListener('click',
  ()=>{closePopup(editAvatarPopup);});
  
enableValidation(validationConfigObject);