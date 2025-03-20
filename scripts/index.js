// @todo: Темплейт карточки
console.log('1111111111');
const cardTemplate = document.querySelector('#card-template').content;
console.log(cardTemplate);

// @todo: DOM узлы


// @todo: Функция создания карточки

function createCard(){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    // cardElement.querySelector('card__image').src = 'tinyurl.com/v4pfzwy';
    const image = cardElement.querySelector('.card__image');
    image.src = 'sadasdsa';
    console.log(image.src);
    console.log(cardElement);
    // cardElement.querySelector('.card__image').src = 'sdadsadasdasd';
    // console.log(cardElement.querySelector('.card__image').src);
}
createCard();

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
