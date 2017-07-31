

var  strSubstr = function(str,start,length){
    var nowStr = ""
    if(length || length == 0){
         nowStr =  str.substr(start,length);
    }else{
         nowStr =  str.substr(start);
    }

    return nowStr;
}

function numberToSign(code){
    if(isNaN(code)){
        retrun ;
    }
    code = ""+code;
    let bir = strSubstr(code,10,4);
    let month = strSubstr(bir,0,2);
    let day = strSubstr(bir,2);
    let strValue = {};
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      strValue={
         value:"AQUARIUS",
         label:"水瓶座"
      }
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      strValue={
         value:"PISCES",
         label:"双鱼座"
      }
    } else if ((month == 3 && day > 20) || (month == 4 && day <= 19)) {
      strValue={
         value:"ARIES",
         label:"白羊座"
      }
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      strValue={
         value:"TAURUS",
         label:"金牛座"
      }
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
      strValue={
         value:"GEMINI",
         label:"双子座"
      }
    } else if ((month == 6 && day > 21) || (month == 7 && day <= 22)) {
      strValue={
         value:"CANCER",
         label:"巨蟹座"
      }
    } else if ((month == 7 && day > 22) || (month == 8 && day <= 22)) {
      strValue={
         value:"LEO",
         label:"狮子座"
      }
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      strValue={
         value:"VIRGO",
         label:"处女座"
      }
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) {
      strValue={
         value:"LIBRA",
         label:"天秤座"
      }
    } else if ((month == 10 && day > 23) || (month == 11 && day <= 22)) {
      strValue={
         value:"SCORPIO",
         label:"天蝎座"
      }
    } else if ((month == 11 && day > 22) || (month == 12 && day <= 21)) {
      strValue={
         value:"SAGITTARIUS",
         label:"射手座"
      }
    } else if ((month == 12 && day > 21) || (month == 1 && day <= 19)) {
      strValue={
         value:"CAPRICORN",
         label:"魔羯座"
      }
    }

    return strValue;
}




module.exports = {
  numberToSign
}
