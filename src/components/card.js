const cardTemplate = document.querySelector('#card-template').content;


function createCard(description, link, deleteFunc, likeFunc, openPopupFunc){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = link;
  cardImage.alt = description;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = description;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', ()=>deleteFunc(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', ()=>likeFunc(likeButton));

  cardImage.addEventListener("click", ()=>openPopupFunc(link, description));

  return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

function likeCard(likeButton){
  likeButton.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, likeCard};