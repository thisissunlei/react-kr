//日期格式工具

function Money(props){

    console.log('Money',props);
    let str = props;
    let isOk = str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('');
    if(isOk.length%4==0 ){
    	isOk = isOk.substr(1)
    }
    return isOk;

}

module.exports = Money;
