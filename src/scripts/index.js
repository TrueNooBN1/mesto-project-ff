import '../pages/index.css';
// import initialCards from "./../scripts/cards.js";
import {initialCards} from "./cards.js"
import {createCard, deleteCard} from "../components/card.js"
import {openPopup} from "../components/modal.js"

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const profileEditPopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const addContentToProfilePopup = document.querySelector('.popup_type_new-card');
const addContentToProfileButton = document.querySelector('.profile__add-button');


// @todo: Вывести карточки на страницу
function createPageItems(){
    initialCards.forEach(item=>cardsList.append(createCard(item.name, item.link, deleteCard)));
}

createPageItems();

editProfileButton.addEventListener('click', ()=>{openPopup(profileEditPopup);});

addContentToProfileButton.addEventListener('click', ()=>{openPopup(addContentToProfilePopup);});


