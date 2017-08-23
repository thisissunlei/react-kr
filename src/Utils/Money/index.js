//日期格式工具

function Money(props,minus){
    //minus 是否有负号；true不带，false带
    let logo = minus || true;
    

    let str = props;
    if(!!!str){
        return false;
    }
    if(typeof str == 'number'){
        str +='';
    }
    
    let canStr = false;
    if(str[0] === '-'){
    	str = str.substr(1);
    	canStr = true;
    }
    let isOk = str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('');
    if(isOk[0]===',' ){
    	isOk = isOk.substr(1)
    }
    if(canStr){
    	isOk = '-'+isOk;
    }
    if(minus){
        isOk = isOk.substr(1);
    }
   
    return isOk;

}

module.exports = Money;
