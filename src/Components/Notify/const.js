
const defaultConfig = {
  localPath: '/node_modules/react-nowtify/',
  containerID: 'nowtify-wrapper',
  displayTimeout: 4000,
  transition: 'growl',
  sound: true,
  dismissible: true,
  keepHistory: false,
};

const defaultNotificationSound = require('file!./notification-sound.mp3');

export { 
  defaultConfig,
  defaultNotificationSound
};
