
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


function createCard(description, link, deleteFunc){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = description;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = description;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', ()=>deleteCard(cardElement));

  return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

export {createCard, deleteCard};