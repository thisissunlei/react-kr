import Notify from 'kr/Components/Notify';
import {DateFormat} from 'kr/Utils/DateFormat';

/**
* @param  string message
* @return null
*/
function log(){
  var now = DateFormat(Date.now(),'yyyy-mm-dd hh:MM:ss');
  //Notify.error(message);
  var messages = [].slice.apply(arguments);
  messages.unshift('['+now+']');
  console.log.apply(this,messages);
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
