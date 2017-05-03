import Notify from 'kr/Components/Notify';
import {DateFormat} from 'kr/Utils/DateFormat';


var logCounter = 1;
/**
* @param  string message
* @return null
*/
function log(){

  var now = DateFormat(Date.now(),'hh:MM:ss');
  var prevStr = `%c${logCounter}%c[${now}]`;
  //Notify.error(message);
  var messages = [].slice.apply(arguments);
  messages.unshift(prevStr,'background:#499df1;color:#fff;font-size:12px;padding:2px;','color:#333;');
  logCounter++;
}

/**
* @param  string message
* @return null
*/
function warn(message){
  Notify.error(message);
}


module.exports = {
  log,
  warn
}
