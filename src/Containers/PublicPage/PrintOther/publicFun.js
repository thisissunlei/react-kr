
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
    var t;
    var imgReg = new RegExp('`img`', 'ig');
    //分页标签
    var pageReg = new RegExp('`pagination`','ig');
    var qrImgReg = new RegExp('`qrCode`','ig'); 
    var includeStart = new RegExp('`includeStart`','ig')
    var includeEnd = new RegExp('`includeEnd`','ig')
    t = template.replace(imgReg, '<span class="print-other-chapter"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    t = template.replace(pageReg,'<div class = "print-pagination"><div>');
    t = template.replace(qrImgReg,'<span class="print-qr-code"><img src = "http://krspace-upload.oss-cn-qingdao.aliyuncs.com/activity_unzip/201707/Y/131233886_443.png"></span>');
    t = template.replace(includeStart,'<div class="print-include-start"></div>');
    t = template.replace(includeEnd,'<div class="print-include-end"></div>');
    return t;
}

function getClassName(data){

}
module.exports = {
	templateParse,
    codeParse,
    getClassName,
}   
