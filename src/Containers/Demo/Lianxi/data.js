var data = {
    code: 1,
    data: {
        formId: 9,
        tables: [
            {
                fields: [
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 1,
                        inputTyp: "TEXT",
                        labe: "主键",
                        nam: "id",
                        require: false,
                        settin: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceTyp: "NONE",
                        wholeLin: false
                    },
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 2,
                        inputType: "TEXT",
                        label: "所属流程",
                        name: "wf_id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 3,
                        inputType: "TEXT",
                        label: "流程请求ID",
                        name: "request_id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_TEXT",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 4,
                        inputType: "TEXT",
                        label: "记录名称",
                        name: "name",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 50 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_AREA_TEXT",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 5,
                        inputType: "TEXT_AREA",
                        label: "描述",
                        name: "descr",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "BUTTON_BROWES",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 6,
                        inputType: "BUTTON",
                        label: "创建人",
                        name: "creator",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: false, wsradio: "btnStaff"},
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TIME_DATE",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 7,
                        inputType: "TIME",
                        label: "创建时间",
                        name: "c_time",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "BUTTON_BROWES",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 8,
                        inputType: "BUTTON",
                        label: "操作人",
                        name: "updator",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: false, wsradio: "btnStaff" },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TIME_TIME",
                        detailId: 17,
                        display: true,
                        editable: false,
                        id: 9,
                        inputType: "TIME",
                        label: "操作时间",
                        name: "u_time",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    }
                ],
                hasEditButton: false,
                id: 58,
                isMain: true,
                lineNum: 2,
                name: "解析表单",
                tableName: "wf_test_main"
            },
            {
                fields: [
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 10,
                        inputType: "TEXT",
                        label: "明细表主键",
                        name: "id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 11,
                        inputType: "TEXT",
                        label: "主表ID",
                        name: "main_id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 12,
                        inputType: "TEXT",
                        label: "所属流程",
                        name: "wf_id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_INTEGER",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 13,
                        inputType: "TEXT",
                        label: "流程请求ID",
                        name: "request_id",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 11 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_TEXT",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 14,
                        inputType: "TEXT",
                        label: "明细表名称",
                        name: "name",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true, wstext: 50 },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TEXT_AREA_TEXT",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 15,
                        inputType: "TEXT_AREA",
                        label: "明细表内容",
                        name: "content",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "BUTTON_BROWES",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 16,
                        inputType: "BUTTON",
                        label: "创建人",
                        name: "creator",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: false, wsradio: "btnStaff" },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TIME_DATE",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 17,
                        inputType: "TIME",
                        label: "创建时间",
                        name: "c_time",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "BUTTON_BROWES",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 18,
                        inputType: "BUTTON",
                        label: "操作人",
                        name: "updator",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: false, wsradio: "btnStaff" },
                        sourceType: "NONE",
                        wholeLine: false
                    },
                    {
                        compType: "TIME_TIME",
                        detailId: 18,
                        display: true,
                        editable: false,
                        id: 19,
                        inputType: "TIME",
                        label: "操作时间",
                        name: "u_time",
                        required: false,
                        setting: { wsenabled: true, wsPicEnabled: true, wsbtnEnabled: true },
                        sourceType: "NONE",
                        wholeLine: false
                    }
                ],
                hasEditButton: true,
                id: 59,
                isMain: false,
                lineNum: 2,
                name: "解析明细表",
                tableName: "wf_test_detail_1"
            }
        ]
    },
    message: "ok"
}
module.exports = {
    data
}