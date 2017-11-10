
module.exports = {
    //非工位合同模板新建
    'other-contract-formwork-new':{
        url: '/api/krspace-erp-web/sys/print-template',
        method: 'post'
    }, 
    //编辑时获取非工位合同打印模板
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
    'post-config-detail-edit': {
        url: '/api/krspace-erp-web/wf/request/edit',
        method: 'post'
    },
    'post-config-detail-new': {
        url: '/api/krspace-erp-web/wf/request/add',
        method: 'post'
    },
    //打印室获取合同打印模板
    'get-other-print-formwork': {
        url: '/api/krspace-erp-web/sys/print/template/type/wf-request?requestId={requestId}',
        method: 'get'
    },
    //打印室获取合同打印的数据
    'get-other-print-data': {
        url: '/api/krspace-erp-web/wf/request/info/type/print?requestId={requestId}',
        method: 'get'
    },
    //获取地址模板
    'get-address-formwork': {
        url: '/api/krspace-finance-web/cmt/register-address/select/type/list?communityId={communityId}',
        method: 'get'
    },
    //获取地址编码
    'get-address-num': {
        url: '/api/krspace-finance-web/cmt/register-address/detail/select/type/list?addressId={addressId}&allWhenNull={allWhenNull}&searchKey={searchKey}',
        method: 'get'
    }
}
    