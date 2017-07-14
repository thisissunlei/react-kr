

//去前后空格
function getOffset(obj){
   var tmp={
      val:obj.offsetParent,
      x:obj.offsetLeft,
      y:obj.offsetTop,
   }

   while(tmp.val != null){
    tmp.x += tmp.val.offsetLeft;
    tmp.y += tmp.val.offsetTop;
    tmp.val = tmp.val.offsetParent;
   }
   return tmp;
}
//去掉所有空格
function clearSpace(str){

  var noStr = str.toString().replace(/[ /d]/g, '')
  return noStr
}
//判断小数是否符合要求
function decimal (num){
  

  return num;
}


module.exports = {
  getCurrent,
  getOffset
}
