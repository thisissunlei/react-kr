

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
//去掉标签
function delHtmlTag(str){
  str = str.replace(/<[^>]+>/g,"");//去掉所有的html标记
  str = str.replace(/&nbsp;/ig, "")
  return str;
}


//数组元素位置移动
function moveArr(arr,index1,index2){
   arr = [].concat(arr);

   arr[index1] = arr.splice(index2, 1, arr[index1])[0];
 
   return arr;
}

//上移
function arrUpMove(arr,index){
    var arr = [].concat(arr);
    if(Object.prototype.toString.call(arr) != '[object Array]'){
       return ;
    }
    if(!arr.length || !numScope(index,arr.length,0) || index==0){
      return;
    }
    var arr = moveArr(arr,index,index-1);
    return arr;
}

//下移
function arrDownMove(arr,index){
    var arr = [].concat(arr);
    if(Object.prototype.toString.call(arr) != '[object Array]'){
       return ;
    }
    
    if(!arr.length || !numScope(index,arr.length,0) || index == arr.length-1) {
          return;
    }
    arr = moveArr(arr, index, index + 1);
    return arr;
}

function numScope(num,upLine,downLine){
  if(isNaN(num) || isNaN(upLine) || isNaN(downLine)){
    new Error("numScope函数的参数存在非数字");
  }
  if(num>=downLine && num <= upLine){
    return true;
  }else{
    return false;
  }
}
//base64转file
function urltoFile(url, filename, mimeType){
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, {type:mimeType});})
  );
}
//判断对象是否为空    true，为空对象
function isEmptyObject(obj) {   

　　for (var name in obj){
　　　　return false;//返回false，不为空对象
　　}　　
　　return true;//返回true，为空对象
}
//删除数组的某一个元素
function arrDelEle (arr,index){
  arr = [].concat(arr);
  arr.splice(index,1)
  return arr;
}
//倒叙排列
function arrReverse (arr){
  arr  = [].concat(arr);
  arr.sort(function(a,b){
    return b-a;
  })
  return arr;
}
//是否是数组
function isArray(arr){
  return Object.prototype.toString.call(arr)=='[object Array]';
}
//判断是否是对象
function isObject(object){
  return Object.prototype.toString.call(object)=='[object Object]';
}
//模板渲染
function dataToTemplate(template, data){
  var t, key, reg;
　　　 //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
  for (key in data) {
      if(typeJudgment(data[key])=="[object Object]"||typeJudgment(data[key])=="[object Array]"){
        t = dataToTemplate(template,data[key]);
      }else{
        reg = new RegExp('{{' + key + '}}', 'ig');
        t = (t || template).replace(reg, data[key]);
      }
     
  }
  return t;
};
//类型判断
function typeJudgment (data){
  return Object.prototype.toString.call(data);
}

module.exports = {
  numberToSign,
  arrUpMove,
  arrDownMove,
  delHtmlTag,
  urltoFile,
  isEmptyObject,
  arrDelEle,
  arrReverse,
  isArray,
  isObject,
  dataToTemplate,
  typeJudgment
}
