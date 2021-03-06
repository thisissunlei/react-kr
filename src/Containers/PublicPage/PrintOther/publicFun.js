import { systemJudge, js_getDPI} from 'kr/Utils';



var dpi = js_getDPI(),
    paperHeight = Math.ceil((dpi[1]/25.4*297)*100)/100,//整张纸的高
    uselessHeight = 60 + 25 ,//要减去的高
    markHeight = 160,//章的高
    newDate = parseInt(Math.random()*1000+1000),
    markWidth = 160,
    elemArr = [],//章的宽
    allData = {};
//字段替换
function codeParse(template, data){
    if (!template){
        return '';
    }
    var t = removeSpace(template), key, reg;
　　　 //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
    for (key in data) {
       t = keyParse(t ,key ,data[key]);
    }
    for(key in data){
        t = noKeyParse(t, key, data[key])
    }
    return t;
}
//去掉所有空格
function removeSpace(template){

    
    return template;
    
}
//替换掉属性的写法
function keyParse(template,paramName,data) {
    var t = template, reg;
    for(var key in data){   
        reg = new RegExp('{{' + paramName+'\\$'+ key + '}}', 'g'); 
        t = t.replace(reg,data[key]||'')
    }  
    return t; 
}
//
function noKeyParse(template, paramName, data) {
    var t = template, reg;
    for (var key in data) {
       
        reg = new RegExp('{{' + paramName + '}}', 'g');
        t = t.replace(reg, data.showValue||'')
    }
    return t; 
}

//标记替换
function templateParse(template,data){
    allData = Object.assign({}, data)
    var imgReg = new RegExp('#{img}', 'ig');
    //分页标签
    var pageReg = new RegExp('#{pagination}','ig');
    //二维码
    var qrImgReg = new RegExp('#{qrCode}','ig'); 
    //区域划分组件开始
    var includeStart = new RegExp('#{includeStart}','ig')
    //区域划分组件结束
    var includeEnd = new RegExp('#{includeEnd}', 'ig')
    //文章结束
    var allEnd = new RegExp('#{allEnd}','ig');
    //附件内容开始
    var attachmentStart = new RegExp('#{attachmentStart}', 'ig');
    //附件内容结束
    var attachmentEnd = new RegExp('#{attachmentEnd}','ig');
    
    var imgLabelling =allData.cachetUrl ? '<img style="position:absolute;display:inline-block;width:160px;height:160px;left:-80px;top:-80px" src = "'+allData.cachetUrl+'">' : '';
    template = template.replace(imgReg, '<span class="print-other-chapter' + newDate + '" style="position: relative;">'+imgLabelling+'</span>');
    template= template.replace(pageReg,'<div class = "print-pagination'+newDate+'"></div>');
    template = template.replace(qrImgReg, '<span class="print-qr-code' + newDate + '"><img src = "' + allData.cachetUrl+'"></span>');
    template = template.replace(includeStart,'<div class="print-include-start'+newDate+'"></div>');
    template = template.replace(includeEnd, '<div class="print-include-end' + newDate + '"></div>');
    template = template.replace(allEnd,'<div class="print-all-end'+newDate+'"></div>');
    template = template.replace(attachmentStart, '<div class="print-attachment-start' + newDate + '"></div>');
    template = template.replace(attachmentEnd, '<div class="print-attachment-end' + newDate + '"></div>');
    return template;
}
//每一个分页标记的渲染
function everyPagination(elem){
    var detail = elem.getBoundingClientRect(),
        top = detail.top-uselessHeight,
        pageNum = Math.ceil(top/paperHeight),
        diffValue = pageNum * paperHeight - top,
        height = diffValue > 0 ? diffValue : 0;
        elem.style.height = height + "px";
        elem.style.marginTop = 50 + "px";
}
//每一个包围标记的渲染
function everyInclude(startElem,endElem){
    var startDetail = startElem.getBoundingClientRect(),
        endDetail = endElem.getBoundingClientRect(),
        startTop = startDetail.top - uselessHeight,
        endTop = endDetail.top - uselessHeight,
       
        startPageNum =  Math.ceil(startTop/paperHeight),
        endPageNum = Math.ceil(endTop/paperHeight);
        if(endPageNum>startPageNum){
            var diffValue = startPageNum * paperHeight - startTop,
                height = diffValue > 0 ? diffValue : 0;
                startElem.style.height = height + "px";
                startElem.style.marginTop = 50 + "px";
        }      
}

//获取节点
function getNode(elem){
    return document.querySelectorAll(elem);
}

//齐缝章
function checkMark(mainElem){
    /**
     * startElem 指的是附件部分的开始标识
     * endElem 指的是附件部分的结束标识
     */
    var startElem = getNode('.print-attachment-start' + newDate)[0];
    var endElem = getNode('.print-attachment-end' + newDate)[0];
    var startDetail = "",
        endDetail = '',
        startTop =0,
        endTop = 0,
        startNum =0,
        endNum = 0; 

    var mainDetil = mainElem.getBoundingClientRect(),
        mainHeight = mainDetil.height,
        pageNum = Math.ceil(mainHeight/paperHeight),
        markElem = '';
    var isHave = false;
    
    if(startElem && endElem){
        
        isHave = true;
        startDetail = startElem.getBoundingClientRect();
        endDetail = endElem.getBoundingClientRect();
        startTop = startDetail.top;
        endTop = endDetail.top;
        startNum = Math.floor(startTop / paperHeight);
        endNum = Math.floor(endTop / paperHeight);
    }
    console.log(pageNum, "++++++++", startNum, endNum)
    if (isHave && pageNum-1 <=1 ){
        return;
    }else if(pageNum>1){
        for(let i = 0; i<pageNum;i++){
            if (isHave) {
                if (i < startNum || i > endNum) {
                
                        var diffValue = endNum - startNum + 1;
                        markElem += everyCheckMark(i, pageNum - diffValue, i > endNum ? endNum : 0)
                
                }
            }else {
                markElem += everyCheckMark(i, pageNum, 0)
            }
        }
        
    }
    mainElem.innerHTML = mainElem.innerHTML + markElem;
}
//每一页骑缝章的渲染
function everyCheckMark(num, pageNum,endNum){
   var boxWidth = Math.ceil(markWidth/pageNum*1000)/1000;
   var top = num*paperHeight+paperHeight/2-markHeight/2;
   var elemImg = '<div style="height:'+markHeight+'px;width:'+boxWidth+'px;overflow:hidden;position:absolute;right:0px;top:'+top+'px;">'+
       '<img style="width:' + markWidth + 'px;height:' + markHeight + 'px;display:inline-block;left:' + ((-num + endNum) * boxWidth)+'px;position:absolute;" src = "'+allData.cachetUrl+'"/>'+
                 '</div>';
   
   return elemImg;
}
//顺序渲染所有节点
function allElemsRender(){
    sortAll();
    for (var i = 0; i < elemArr.length; i++) {
        var elem = elemArr[i];
        if(elem.type === "include"){
            everyInclude(elem.start,elem.end);
        }else{
            everyPagination(elem.elem);   
        }
    }
}
//所有替换元素进行排序
function sortAll(){
    produceElemArr(".print-pagination",'page')
    produceElemArr('.print-include','include')
    elemArr.sort(function(a,b){
        return b.top-a.top<0
    });
}
//获取每一个渲染的元素
function produceElemArr(className,type){
    var elems = getNode(className+newDate);
    var detail = {};
    if(type === "include"){
        var start = getNode(className+'-start'+newDate);
        var end = getNode(className+'-end'+newDate);
        for(let i=0;i<start.length;i++){
            detail = start[i].getBoundingClientRect();
            elemArr.push({type:type,start:start[i],end:end[i],top:detail.top});
        }
    }else{
        for(let i=0;i<elems.length;i++){
            detail = elems[i].getBoundingClientRect();
            elemArr.push({type:type,elem:elems[i],top:detail.top});
        }
    }
}
//印章位置调整
function chaptersMove(params) {
    var elems = getNode(".print-other-chapter" + newDate +" img");
    for(let i = 0; i<elems.length;i++ ){
        everyChapter(elems[i]);
    }
}
//每一个章的位置调整
function everyChapter(elem) {
    var detail = elem.getBoundingClientRect(),
        topTop = detail.top - uselessHeight,
        bottomTop = topTop + detail.height, 
        numTop = Math.ceil(topTop / paperHeight),
        numBottom = Math.ceil(bottomTop / paperHeight),
        distanceTop = Math.abs(numTop * paperHeight - topTop),
        distanceBottom = Math.abs(numBottom * paperHeight- bottomTop);
    if (numTop!= numBottom){
        let elemTop = parseInt(elem.style.top)
        if(distanceTop < distanceBottom){
            elem.style.top = elemTop + distanceTop +50+ 'px';
        }else{
            elem.style.top = elemTop - distanceBottom -50+ "px"
        }
    }else{
        let elemTop = parseInt(elem.style.top)
        let newTop = Math.abs((numTop - 1) * paperHeight - topTop);
        let newBottom = Math.abs((numTop) * paperHeight - bottomTop);
        if (newTop<20){
            elem.style.top = elemTop + 20 + 'px';
        }
        if (newBottom<20){
            elem.style.top = elemTop  - 20 + 'px';
        }
        
    }
    
}
//去掉尾部无用节点
function delEndFutility(elem) {
    elem= elem || getNode(".print-all-end"+newDate)[0];
    if(!elem){
        return;
    }
    let nextElem = elem.nextSibling;
    if(nextElem){
        delEndFutility(nextElem);
        delNowElem(nextElem);
    }
}
//删除该元素
function delNowElem(elem) {
    elem.parentNode.removeChild(elem)
}
//控制页面的高度
function controlHeight(elem){
    var detail = elem.getBoundingClientRect();
    var endHeight = '';
    elem.style.height = detail.height - 30 + 'px';
    elem.style.overflow = "hidden";
    detail = elem.getBoundingClientRect();
    endHeight = Math.ceil(detail.height/paperHeight)*paperHeight;
    elem.style.height = endHeight - 30 + "px";
}
//合同两列对其
function floatRender() {
    
}
module.exports = {
	templateParse,
    codeParse,
    checkMark,
    allElemsRender,
    chaptersMove,
    delEndFutility,
    controlHeight
}   
