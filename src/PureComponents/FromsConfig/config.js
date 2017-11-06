
var componentType = {
    TEXT_TEXT:'input',
    TEXT_INTEGER:'input',
    TEXT_FLOAT:'input',
    TEXT_MONEY_TRANSFER:'input',
    TEXT_MONEY_QUARTILE:'input',
    TEXT_AREA_TEXT:'textarea',
    TEXT_AREA_RICH:'editor',
    SELECT_SELECT:'select',
    SELECT_SEARCH:'searchSelect',
    CHECK_RADIO:'radio',
    TIME_DATE:'date',
    TIME_TIME:'selectTime',
    TIME_DATETIME:'date',
    CHECK_CHECK:'moreRadio',
    BUTTON_BROWES:'BUTTON_BROWES'
}
var btnType = {
    btnCity:'city',
    btnAddress:'address'
}
//明细表校验
function detailCheck(params) {
    //楼层检验
    if (!values.wherefloors || !values.wherefloors.length) {
        errors.wherefloors = { _error: 'At least one member must be entered' }
    } else {
        const membersArrayErrors = []
        values.wherefloors.forEach((wherefloors, memberIndex) => {
            const memberErrors = {}
            if (!wherefloors || !wherefloors.floor || (wherefloors.floor && regs.test(wherefloors.floor.toString().trim()))) {
                memberErrors.floor = '请输入所在楼层'
                membersArrayErrors[memberIndex] = memberErrors
            }
            if (wherefloors.floor && wherefloors.floor.toString().trim() && !zeroNum.test(wherefloors.floor.toString().trim())) {
                memberErrors.floor = '楼层为整数'
                membersArrayErrors[memberIndex] = memberErrors
            }
            if (!wherefloors || !wherefloors.stationCount || (wherefloors.stationCount && regs.test(wherefloors.stationCount.toString().trim()))) {
                memberErrors.stationCount = '请输入可出租工位数'
                membersArrayErrors[memberIndex] = memberErrors
            }
            if (wherefloors.stationCount && wherefloors.stationCount.toString().trim() && !noMinus.test(wherefloors.stationCount.toString().trim())) {
                memberErrors.stationCount = '可出租工位数为非负整数'
                membersArrayErrors[memberIndex] = memberErrors
            }
        })
        if (membersArrayErrors.length) {
            errors.wherefloors = membersArrayErrors
        }
    }
}
module.exports = {
    componentType,
    btnType,
    detailCheck
}

