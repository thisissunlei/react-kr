import Notify from 'kr/Components/Notify';

/**
* @param  string message
* @return null
*/
function log(message,type){
  Notify.error(message);
  console.log(message);
}

/**
* @param  string message
* @return null
*/
function warn(message){
  Notify.error(message);
  console.log(message);
}


module.exports = {
  log,
  warn
}
