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
        dislikeCardQuery,
        checkImg
        } from "./api.js"
//------------------------------------------------------
const validationConfigObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//------------------------------------------------------
let myId = undefined;
//------------------------------------------------------
const cardsList =
 document.querySelector('.places__list');
//------------------------------------------------------
const profileTitle = 
 document.querySelector('.profile__title');
const profileDescription = 
 document.querySelector('.profile__description');
const avatarElement = 
 document.querySelector('.profile__image');
//------------------------------------------------------
const editAvatarPopup = 
 document.querySelector('.popup_type_edit-avatar');
const formEditAvatar =
 document.forms['edit-profile_avatar'];
const editAvatarInput = 
  editAvatarPopup.querySelector('.popup__input_type_url');
const avatarEditPopupСloseBtn =
 editAvatarPopup.querySelector('.popup__close');
const formEditAvatarSaveButton = 
 editAvatarPopup.querySelector('.popup__button');
//------------------------------------------------------
const editProfileButton =
 document.querySelector('.profile__edit-button');
const formEditElement =
 document.forms['edit-profile'];
const nameInput =
 formEditElement.querySelector('.popup__input_type_name');
const jobInput =
 formEditElement.querySelector('.popup__input_type_description');
const formEditSaveButton = 
 formEditElement.querySelector('.popup__button');
const profileEditPopup =
 document.querySelector('.popup_type_edit');
const editPopupСloseBtn =
 profileEditPopup.querySelector('.popup__close');
//------------------------------------------------------
const imagePopup = 
 document.querySelector('.popup_type_image');
const imagePopupImg =
 imagePopup.querySelector('.popup__image');
const imagePopupCaption =
 imagePopup.querySelector('.popup__caption');
const imagePopupСloseBtn =
 imagePopup.querySelector('.popup__close');
//------------------------------------------------------
const addContentToProfilePopup = 
 document.querySelector('.popup_type_new-card');
const addContentToProfileButton =
 document.querySelector('.profile__add-button');
const addContentСloseBtn =
 addContentToProfilePopup.querySelector('.popup__close');
const formNewPlaceElement =
 document.forms['new-place'];
const descriptionNewPlaceInput =
 formNewPlaceElement['place-name'];
const srcNewPlaceInput =
 formNewPlaceElement['link'];
const formNewPlaceSaveButton = 
 formNewPlaceElement.querySelector('.popup__button');
//------------------------------------------------------
const cardDeleteForm =
 document.forms['delete-card'];
const cardDeleteDialog =
 document.querySelector('.popup_type_delete-card');
const cardDeleteDialogСloseBtn =
 cardDeleteDialog.querySelector('.popup__close');
const cardDeleteDialogAcceptBtn =
 cardDeleteDialog.querySelector('.popup__button');
//-------------------HANDLERS-------------------------------- 
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  formEditSaveButton.textContent = "Сохранение...";
  patchProfileInfo(nameInput.value, jobInput.value)
    .then((result)=>{
      profileTitle.textContent =
        result.name;

      profileDescription.textContent =
        result.about;

      formEditSaveButton.textContent = "Сохранить";
      formEditElement.reset();
      closePopup(profileEditPopup);  
    })
    .catch(err=>console.log(err))
}
//------------------------------------------------------
function handleEditAvatarFormSubmit(evt){
  evt.preventDefault();
  formEditAvatarSaveButton.textContent = "Сохранение...";
  const newUrl = editAvatarInput.value;
  checkImg(newUrl)
  .then(res=>{
    const contentType = res.headers.get('Content-Type');
    if(contentType.includes('image') && res.ok){
      patchProfilePhoto(newUrl)
      .then(result=>{
        updateAvatar(result.avatar);
        formEditAvatarSaveButton.textContent = "Сохранить";
        formEditAvatar.reset();
        closePopup(editAvatarPopup);
      })
      .catch(err=>console.log(err))
    }
  })
}
//------------------------------------------------------
function handleNewPlaceFormSubmit(evt){
  evt.preventDefault();
  formNewPlaceSaveButton.textContent = "Сохранение...";
  addNewCard(descriptionNewPlaceInput.value, srcNewPlaceInput.value)
    .then(result=>{
      cardsList.prepend(createCard(getCardInitObj(result),
        // deleteCardFromServer,
        openDeleteDialog,
        likeFunc,
        openImagePopup)
      )
      formNewPlaceSaveButton.textContent = "Сохранить";
      formNewPlaceElement.reset();
      closePopup(addContentToProfilePopup);
    })
    .catch(err=>console.log(err))
}
//------------------------------------------------------
function handleDeleteCardForm(evt){
  evt.preventDefault();
  cardDeleteForm.removeEventListener('submit',
    handleDeleteCardForm);  
  deleteCardFromServer(cardDeleteForm.cardElement)
}
//--------------OPEN_POPUP_FUNCS------------------------------
function openEditPopup(){
  openPopup(profileEditPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;  
  clearValidation(profileEditPopup, validationConfigObject);
}
//------------------------------------------------------
function openAddContentPopup(){
  openPopup(addContentToProfilePopup);
  formNewPlaceElement.reset(); 
  clearValidation(addContentToProfilePopup, validationConfigObject);
}
//------------------------------------------------------
function openImagePopup(src, description){
  imagePopupImg.src = src;
  imagePopupImg.alt = description;
  imagePopupCaption.textContent = description;
  openPopup(imagePopup);
}
//------------------------------------------------------
function openAvatarEditPopup(){
  openPopup(editAvatarPopup);
  formEditAvatar.reset(); 
  clearValidation(editAvatarPopup, validationConfigObject);
}
//------------------------------------------------------
function openDeleteDialog(cardElement){
  cardDeleteForm.cardElement = cardElement;
  cardDeleteForm.addEventListener('submit',
    handleDeleteCardForm);  
  openPopup(cardDeleteDialog);
}
//-----------------FUNCS_DEFINITION----------------------------
function deleteCardFromServer(cardElement){
  // console.log(cardElement);
  cardDeleteDialogAcceptBtn.textContent = "Удаление..."
  deleteCardQuery(cardElement['cardId'])
  .then(result=>{
    deleteCard(cardElement);
    closePopup(cardDeleteDialog);
    cardDeleteDialogAcceptBtn.textContent = "Да"
  })
  .catch(err=>{console.log(err);cardDeleteDialogAcceptBtn.textContent = "Да";})
}
//------------------------------------------------------
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
//------------------------------------------------------
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
//------------------------------------------------------
function updateAvatar(newUrl){
  avatarElement.style.backgroundImage = `url('${newUrl}')`;;
}
//------------------------------------------------------
function loadPage(){
  Promise.all([getProfileInfo(), getCards()])
    .then((result) => {
      //--> load profileInfo block
      // console.log(result[0]);
      profileTitle.textContent = 
        result[0].name;
      profileDescription.textContent =
        result[0].about;
      updateAvatar(result[0].avatar);
      myId = result[0]._id;
      //--> end load profileInfo block
      //--> load card block
      // console.log(result[1]);
      result[1].forEach(item=>{
        cardsList.append(createCard(getCardInitObj(item),
          // deleteCardFromServer,
          openDeleteDialog,
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

formEditAvatar.addEventListener('submit',
    handleEditAvatarFormSubmit);
  
editPopupСloseBtn.addEventListener('click',
  ()=>{closePopup(profileEditPopup);});
addContentСloseBtn.addEventListener('click',
  ()=>{closePopup(addContentToProfilePopup);});
imagePopupСloseBtn.addEventListener('click',
  ()=>{closePopup(imagePopup);});
avatarEditPopupСloseBtn.addEventListener('click',
  ()=>{closePopup(editAvatarPopup);});
cardDeleteDialogСloseBtn.addEventListener('click',
  ()=>{closePopup(cardDeleteDialog);});
    
enableValidation(validationConfigObject);