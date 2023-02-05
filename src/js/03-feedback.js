import throttle from 'lodash.throttle';

//Вихідні дані
const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input[type="email"]');
const textareaRef = document.querySelector('textarea[name="message"]');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const localStorageObj = {
  email: '',
  message: '',
};
const labelsRef = document.querySelectorAll('label');

// Відправляємо дані в локальне сховище
const onInputChange = function (e) {
  e.preventDefault();

  if (e.target === inputRef) {
    localStorageObj.email = e.target.value;
  } else {
    localStorageObj.message = e.target.value;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageObj));
};

formRef.addEventListener('input', throttle(onInputChange, 500));

// Вертаємо останні дані зі сховища в поля форми при перезавантаженні сторінки
const getLatestInputData = function () {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const formData = JSON.parse(localStorageData);

  if (localStorageData) {
    inputRef.value = formData.email;
    textareaRef.value = formData.message;
  }
};
getLatestInputData();

// Відправка форми. Очищення полів та виведення в консоль даних форми у вигляді об'єкта.
const onFormSubmit = e => {
  e.preventDefault();
  console.log(labelsRef);

  // Перевіряння, чи заповнені усі поля
  if ([...labelsRef].some(e => e.firstElementChild.value === '')) {
    alert('Заповніть пусті поля');
  }

  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  console.log(localStorageObj);
};

formRef.addEventListener('submit', onFormSubmit);
