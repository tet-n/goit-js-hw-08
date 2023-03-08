import throttle from 'lodash.throttle';

//Вихідні дані
const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input[type="email"]');
const textareaRef = document.querySelector('textarea[name="message"]');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Отримуємо дані та відправляємо до сховища
function onInputChange(e) {
  e.preventDefault();
  const { name, value } = e.target;
  let storageDataExists = localStorage.getItem(LOCAL_STORAGE_KEY);

  storageDataExists = storageDataExists ? JSON.parse(storageDataExists) : {};
  storageDataExists[name] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageDataExists));
}

// Витягуємо дані зі сховища та записуємо в поля форми
function getLatestInputData() {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const formData = JSON.parse(localStorageData);

  if (localStorageData) {
    inputRef.value = formData.email ?? '';
    textareaRef.value = formData.message ?? '';
  }
}

// Відправляємо значення форми та отримуємо результат в консолі
function onFormSubmit(e) {
  e.preventDefault();

  if (inputRef.value === '' || textareaRef.value === '') {
    alert('Заповніть пусті поля');
    return;
  }

  const formData = localStorage.getItem(LOCAL_STORAGE_KEY);
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  console.log(JSON.parse(formData));
}

// Слухачі подій та виклики інших функцій
formRef.addEventListener('input', throttle(onInputChange, 500));
getLatestInputData();
formRef.addEventListener('submit', onFormSubmit);
