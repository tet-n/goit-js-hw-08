import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

var iframe = document.querySelector('iframe');

// Створюємо екземпляр Класу
var player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

// Записуємо поточний час у сховище
const onPlayPlayer = function (e) {
  console.log(e);
  const timeWasPlayed = e.seconds;
  localStorage.setItem(STORAGE_TIME_KEY, timeWasPlayed);

  // Реалізація від себе. Якщо дійшло до кінця, то у разі перезавантаження відтворення відео почнеться спочатку.
  // e.seconds === e.duration && localStorage.setItem(STORAGE_TIME_KEY, '0');
};

player.on('timeupdate', throttle(onPlayPlayer, 1000));

// Відтворення відео під час перезавантаження з поточного часу
const playFromPoint = function () {
  const currentTime = localStorage.getItem(STORAGE_TIME_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
};

playFromPoint();
