
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
    //表单编辑获取流程表单模板
    'get-config-template-edit':{
        url: '/api/krspace-erp-web/wf/request/template/type/form?wfId={wfId}',
        method: 'get'
    },
    //表单编辑获取流程表单
    'get-config-detail-edit': {
        url: '/api/krspace-erp-web/wf/request/info/type/edit?requestId={requestId}',
        method: 'get'
    },
}
    