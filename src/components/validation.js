// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 
// // очистка ошибок валидации вызовом clearValidation
// clearValidation(profileForm, validationConfig); 

function showInputError(formElement, inputElement, validationConfig){
  const errorElement =
   formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(validationConfig.inputErrorClass)
   errorElement.textContent = inputElement.validationMessage;
   errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig){
  const errorElement =
   formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(validationConfig.inputErrorClass)
   errorElement.textContent = "";
   errorElement.classList.remove(validationConfig.errorClass);
}

function toggleButtonState(inputList, buttonElement, validationConfig){
  // console.log(buttonElement, inputList);
  if(hasInvalidInput(inputList)){
    // console.log("toggleButtonState invalid");
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }else{
    // console.log("toggleButtonState valid");
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement)=>{return !inputElement.validity.valid;});
}

function checkInputValidity(formElement, inputElement, validationConfig){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }else{
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, validationConfig)
  }else{
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig){
  const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input', function(){
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  });
}

function enableValidation(validationConfig){
  const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );

  formList.forEach((formElement)=>{
    formElement.addEventListener('submit', function(evt){
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

function clearValidation(formElement, validationConfig){
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

  inputList.forEach((inputElement)=>{
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
} 


export {enableValidation, clearValidation};