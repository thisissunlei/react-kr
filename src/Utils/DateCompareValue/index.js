import dateFormat from 'dateformat';

function DateCompareValue(start,end){
    start=Date.parse(dateFormat(start,"yyyy-mm-dd hh:MM:ss"));
    end=Date.parse(dateFormat(end,"yyyy-mm-dd hh:MM:ss"));
    if(start>=end){
      return false;
    }
    return true;
}


module.exports = DateCompareValue;