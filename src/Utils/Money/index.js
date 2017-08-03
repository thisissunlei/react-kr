//日期格式工具

function Money(props){

    let str = props;
    let canStr = false;
    if(str[0] === '-'){
    	str = str.substr(1);
    	canStr = true;
    }
    let isOk = str.split('').reverse().join('').replace(/(\d{3})/g, '$1    ,').split('').reverse().join('');
    if(isOk[0]===',' ){
    	isOk = isOk.substr(1)
    }
    if(canStr){
    	isOk = '-'+isOk;
    }
   
    return isOk;

}

module.exports = Money;
