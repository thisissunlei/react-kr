import {
    Notify
} from 'kr-ui';
var componentType = {
    TEXT_TEXT:'input',
    TEXT_INTEGER:'input',
    TEXT_FLOAT:'input',
    TEXT_MONEY_TRANSFER:'input',
    TEXT_MONEY_QUARTILE:'input',
    TEXT_AREA_TEXT:'textarea',
    TEXT_AREA_RICH:'editor',
    SELECT_SELECT:'selectList',
    SELECT_SEARCH:'searchSelect',
    CHECK_RADIO:'radio',
    TIME_DATE:'date',
    TIME_TIME:'selectTime',
    TIME_DATETIME:'date',
    CHECK_CHECK:'moreRadio',
    BUTTON_BROWES:'BUTTON_BROWES'
}
var btnType = {
    btnCity:'county',
    btnAddress:'address'
}
var validation = {
    integral : /^-?\d+$/,
}
//明细表校验
function detailCheck(params, values) {
    //楼层检验 params.tableName;
    let obj = {};
    if (!values[params.tableName] || !values[params.tableName].length) {
        //return 'At least one member must be entered'
    } else {
        const arrErrors = []
        let text = '';
        values[params.tableName].forEach((everyLine, index) => {
            const memberErrors = {}
            if (!everyLine){
                return;
            }
            text = mainCheck(params.fields, everyLine,false)
        })
       return text;
    }
}
function mainCheck(params, values, isMain) {
    var obj = {};
    let text = '';
    params.map((item, index) => {
        let setting = item.setting;
        let name = values[item.name];
        
        switch (item.compType) {
            case 'TEXT_TEXT':
                text =  textCheck(item, name);
                break;
            case 'TEXT_INTEGER':
                text =  integerCheck(item, name);
                break;
            case 'TEXT_FLOAT':
                text =  floatCheck(item, name);
                break;
            case 'TEXT_MONEY_TRANSFER':
                text =  transferCheck(item, name);
                break;
            case 'TEXT_MONEY_QUARTILE':
                text =  quartileCheck(item, name);
                break;
            default:
                text =  otherCheck(item, name);
        }
        if(text){
            obj[item.name] =  text;
        }
       
        
    })
    if(isMain){
        return obj;
    }else{
        return text;
    }
    
}
//文本类型
function textCheck(params, name) {
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }
   var seeting=JSON.parse(params.setting);
   if (name && ("" + name).length > Number(seeting['wstext'])) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }
}
//整型
function integerCheck(params, name) {
    let num = /^-?\d+$/;
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }
    if (name && !num.test(name)) {
        text = '请填写整数'
        return text;
    }
    var seeting = JSON.parse(params.setting);
    if (name && ("" + name).length > Number(seeting['wstext'])) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }
}
//浮点数
function floatCheck(params, name) {
    let num=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }

    if(name&&isNaN(name)){
        text = `${params.label}必须为数字`
        return text;
    }

    var seeting=JSON.parse(params.setting);
    if(name&&num.test(name)){
        if((name.toString().split(".")[1].length) > Number(seeting['wsfloat'])){
            text = `${params.label}为正浮点数且小数位数最大为${seeting['wsfloat']}`
            return text;
        }
    }
   
    if (name && !num.test(name) && ("" + name).length > Number(seeting['wstext'])) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }

    if (name && num.test(name) && ("" + name).length >( Number(seeting['wstext']) + 1)) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }

    
}

//金额转换
function transferCheck(params, name) {
    let num=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }

    if(name&&isNaN(name)){
        text = `${params.label}必须为数字`
        return text;
    }
    
    var seeting=JSON.parse(params.setting);
    if(name&&num.test(name)){
        if((name.toString().split(".")[1].length) > Number(seeting['wsfloat'])){
            text = `${params.label}为正浮点数且小数位数最大为${seeting['wsfloat']}`
            return text;
        }
    }

    if (name && !num.test(name) && ("" + name).length > Number(seeting['wstext'])) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }

    if (name && num.test(name) && ("" + name).length > (Number(seeting['wstext']) + 1)) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }
}

//金额千分位
function quartileCheck(params, name) {
    let num=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }

    if(name&&isNaN(name)){
        text = `${params.label}必须为数字`
        return text;
    }
    
    var seeting=JSON.parse(params.setting);
    if(name&&num.test(name)){
        if((name.toString().split(".")[1].length) > Number(seeting['wsfloat'])){
            text = `${params.label}为正浮点数且小数位数最大为${seeting['wsfloat']}`
            return text;
        }
    }

    if (name && !num.test(name) && ("" + name).length > Number(seeting['wstext'])) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }

    if (name && num.test(name) && ("" + name).length > (Number(seeting['wstext']) + 1)) {
        text = `${params.label}最长为${seeting['wstext']}`
        return text;
    }
}

//其他情况
function otherCheck(params, name) {
    let text = '';
    if (params.required) {
        if (!name && name !== 0) {
            text = `${params.label}必填`
            return text;
        }
    }
}

module.exports = {
    componentType,
    btnType,
    detailCheck,
    mainCheck
}

