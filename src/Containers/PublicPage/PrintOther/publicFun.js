var paperHeight = 1120,//整张纸的高
    uselessHeight = 60 + 25,//要减去的高
    markHeight = 160,//章的高
    newDate = parseInt(Math.random()*1000+1000),
    markWidth = 160,
    elemArr= [];//章的宽
    

//字段替换
function codeParse(template, data){
    var t, key, reg;
　　　   //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
    for (key in data) {
        reg = new RegExp('{{' + key + '}}', 'ig');
        t = (t || template).replace(reg, data[key]);
    }
    return t;
}


//标记替换
function templateParse(template){
    var imgReg = new RegExp('#{img}', 'ig');
    //分页标签
    var pageReg = new RegExp('#{pagination}','ig');
    //二维码
    var qrImgReg = new RegExp('#{qrCode}','ig'); 
    //区域划分组件开始
    var includeStart = new RegExp('#{includeStart}','ig')
    //区域划分组件结束
    var includeEnd = new RegExp('#{includeEnd}','ig')
    template= template.replace(imgReg, '<span class="print-other-chapter'+newDate+'" style="position: relative;"><img style="position:absolute;display:inline-block;width:160px;height:160px;left:-80px;top:-80px" src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    template= template.replace(pageReg,'<div class = "print-pagination'+newDate+'"></div>');
    template= template.replace(qrImgReg,'<span class="print-qr-code'+newDate+'"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    template = template.replace(includeStart,'<div class="print-include-start'+newDate+'"></div>');
    template = template.replace(includeEnd,'<div class="print-include-end'+newDate+'"></div>');
    return template;
}

// //所有分页的标记渲染
// function paginations(){
//     let elems = getNode(".print-pagination"+newDate);
//     for(let i=0;i<elems.length;i++){
//         everyPagination(elems[i]);
//     }
// }
//每一个分页标记的渲染
function everyPagination(elem){
    var detail = elem.getBoundingClientRect(),
        top = detail.top-uselessHeight,
        pageNum = Math.ceil(top/paperHeight),
        diffValue = pageNum * paperHeight - top-100,
        height = diffValue > 0 ? diffValue : 0;
    
        elem.style.height = height + "px";
}

// // 所有包围标记的渲染
// function includes(){
//     var elemsStart = getNode('.print-include-start'+newDate);
//     var elemsEnd = getNode('.print-include-end'+newDate);
//     for(let i=0;i<elemsStart.length;i++){
//         everyInclude(elemsStart[i],elemsEnd[i]);
//     }

// }
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
        }      
}

//获取节点
function getNode(elem){
    return document.querySelectorAll(elem);
}

//齐缝章
function checkMark(mainElem){
    var mainDetil = mainElem.getBoundingClientRect(),
        mainHeight = mainDetil.height,
        pageNum = Math.ceil(mainHeight/paperHeight),
        markElem = '';
    if(pageNum>1){
        for(let i = 0; i<pageNum;i++){
            markElem += everyCheckMark(i,pageNum);
        }
        
    }
    mainElem.innerHTML = mainElem.innerHTML + markElem;
    mainElem.style.height = pageNum * paperHeight + 'px';
}
//每一页骑缝章的渲染
function everyCheckMark(num,pageNum){
   var boxWidth = Math.ceil(markWidth/pageNum*1000)/1000;
   var top = num*paperHeight+paperHeight/2-markHeight/2;
   var elemImg = '<div style="height:'+markHeight+'px;width:'+boxWidth+'px;overflow:hidden;position:absolute;right:0px;top:'+top+'px;">'+
                    '<img style="width:'+markWidth+'px;height:'+markHeight+'px;display:inline-block;left:'+(-num*boxWidth)+'px;position:absolute;" src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"/>'+
                 '</div>';
   
   return elemImg;
}
//顺序渲染所有节点
function allElemsRender(){
    console.log("1111111111")
    sortAll();
    for (var i = 0; i < elemArr.length; i++) {
        var elem = elemArr[i];
        console.log("2222222",elem)
        if(elem.type === "include"){
            console.log("000000000")
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
        return b.top-a.top
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


module.exports = {
	templateParse,
    codeParse,
    checkMark,
    allElemsRender
}   
