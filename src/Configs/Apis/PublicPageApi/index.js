
module.exports = {
    //非工位合同模板新建
    'other-contract-formwork-new':{
        url: '/api/krspace-erp-web/sys/print-template',
        method: 'post'
    }, 
    //获取非工位合同模板
    'get-other-contract-formwork':{
        url: '/api/krspace-erp-web/sys/print-template?id={id}',
        method: 'get'
    },
}
    