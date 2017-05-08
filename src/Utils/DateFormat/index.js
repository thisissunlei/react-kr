//日期格式工具
import dateFormat from 'dateformat';

function DateFormat(value,format){
    if(format==24){
         return dateFormat(value);
    }
    format = format || 'yyyy-mm-dd hh:MM:ss';
    return dateFormat(value,format);
}


module.exports = DateFormat;
