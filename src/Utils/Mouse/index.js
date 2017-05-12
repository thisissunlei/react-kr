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
function getCurrent(elem){
  let off = getOffset(elem.target);
  let tmp = {};
  return tmp = {
    x:elem.pageX - off.x,
    y:elem.pageY - off.y
  }
}
module.exports = {
  getCurrent,
  getOffset
}