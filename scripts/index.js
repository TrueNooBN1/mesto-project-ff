// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(description, link, deleteFunc){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    // cardElement.querySelector('card__image').src = 'tinyurl.com/v4pfzwy';
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = description;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = description;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', ()=>deleteCard(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement){
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function createPageItems(){
    initialCards.forEach(item=>cardsList.append(createCard(item.name, item.link, deleteCard)));
}

createPageItems();
