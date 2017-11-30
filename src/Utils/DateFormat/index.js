//日期格式工具
import dateFormat from 'dateformat';

function DateFormat(value,format){
    console.log(dateFormat(0, "hh:MM"), "777777")
    if(value === 0){
        return '8:00';
    }
    if(!value && value!==0){
        return ;
    }
    if(format==24){
         return dateFormat(value);
    }
    format = format || 'yyyy-mm-dd hh:MM:ss';
   
    return dateFormat(value,format);
}


module.exports = DateFormat;
