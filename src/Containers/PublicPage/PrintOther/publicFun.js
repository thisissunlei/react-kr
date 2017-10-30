var paperHeight = 1120,//整张纸的高
    markHeight = 160,//章的高
    markWidth = 160;//章的宽

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
    var imgReg = new RegExp('`img`', 'ig');
    //分页标签
    var pageReg = new RegExp('`pagination`','ig');
    //二维码
    var qrImgReg = new RegExp('`qrCode`','ig'); 
    //区域划分组件开始
    var includeStart = new RegExp('`includeStart`','ig')
    //区域划分组件结束
    var includeEnd = new RegExp('`includeEnd`','ig')
    template= template.replace(imgReg, '<span class="print-other-chapter" style="position: relative;"><img style="position:absolute;display:inline-block;width:160px;height:160px;left:-80px;top:-80px" src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    template= template.replace(pageReg,'<div class = "print-pagination"></div>');
    template= template.replace(qrImgReg,'<span class="print-qr-code"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    template = template.replace(includeStart,'<div class="print-include-start"></div>');
    template = template.replace(includeEnd,'<div class="print-include-end"></div>');
    return template;
}

//所有分页的标记渲染
function paginations(){
    let elems = getNode(".print-pagination");
    for(let i=0;i<elems.length;i++){
        everyPagination(elems[i]);
    }
}
//每一个分页标记的渲染
function everyPagination(elem){
    var detail = elem.getBoundingClientRect(),
        top = detail.top-60,
        pageNum = Math.ceil(top/paperHeight),
        diffValue = pageNum * paperHeight - top,
        height = diffValue > 0 ? diffValue : 0;
    
        elem.style.height = height + "px";
}

// 所有包围标记的渲染
function includes(){
    var elemsStart = getNode('.print-include-start');
    var elemsEnd = getNode('.print-include-end');
    for(let i=0;i<elemsStart.length;i++){
        everyInclude(elemsStart[i],elemsEnd[i]);
    }

}
//每一个包围标记的渲染
function everyInclude(startElem,endElem){
    var startDetail = startElem.getBoundingClientRect(),
        endDetail = endElem.getBoundingClientRect(),
        startTop = endDetail.top - 60,
        endTop = endDetail.top - 60,
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

function everyCheckMark(num,pageNum){
   var boxWidth = Math.ceil(markWidth/pageNum*1000)/1000;
   var top = num*paperHeight+paperHeight/2-markHeight/2;
   var elemImg = '<div style="height:'+markHeight+'px;width:'+boxWidth+'px;overflow:hidden;position:absolute;right:0px;top:'+top+'px;">'+
                    '<img style="width:'+markWidth+'px;height:'+markHeight+'px;display:inline-block;left:'+(-num*boxWidth)+'px;position:absolute;" src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"/>'+
                 '</div>';
   
   return elemImg;
}



module.exports = {
	templateParse,
    codeParse,
    paginations,
    includes,
    checkMark
}   
