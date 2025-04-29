const config = {
  baseUrl : 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: "01fcb8bd-9481-4ba5-a403-3396a8691c9e",
    'Content-Type': 'application/json'
  }
}


function getCards(){
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  })
    .then(res =>{
      if(res.ok){
        return res.json();тз
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function getProfileInfo(){
  return fetch(config.baseUrl + '/users/me',{
    headers: config.headers
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function patchProfileInfo(newName, newDescription){
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function patchProfilePhoto(newURL){
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newURL
    })
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function addNewCard(cardName, imageLink){
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink
    })
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function deleteCardQuery(id){
  return fetch(config.baseUrl + `/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function likeCard(id){
  return fetch(config.baseUrl + '/cards/likes/${id}', {
    method: 'PUT',
    headers: config.headers
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function dislikeCard(id){
  return fetch(config.baseUrl + '/cards/likes/${id}', {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      //отклоняем профис и выводим ошибку если статус не ок
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export {getCards,
        addNewCard,
        deleteCardQuery,
        getProfileInfo,
        patchProfileInfo,
        patchProfilePhoto,
        likeCard,
        dislikeCard
      };