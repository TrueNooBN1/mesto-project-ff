const cardTemplate = document.querySelector('#card-template').content;

/*
initObj = {
  link: responseItem.link,
  description: responseItem.name,
  cardId: responseItem._id,
  autorId: responseItem.owner._id,
  deleteAllowed: (responseItem.owner._id == myId),
  likesCount: responseItem.likes.length, 
  liked: responseItem.likes.some((item)=>{return item._id === myId})
}
*/

function createCard(initObj, deleteFunc, likeFunc, openPopupFunc){
  console.log(initObj);
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = initObj.link;
  cardImage.alt = initObj.description;
  cardElement['cardId'] = initObj.cardId;
  cardElement['autoId'] = initObj.autorId;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = initObj.description;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if(initObj.deleteAllowed){
    deleteButton.addEventListener('click', ()=>deleteFunc(cardElement));
  }else{
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', ()=>likeFunc(likeButton));

  cardImage.addEventListener("click", ()=>openPopupFunc(initObj.link, initObj.description));

  return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

function likeCard(likeButton){
  likeButton.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, likeCard};