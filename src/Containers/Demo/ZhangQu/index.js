import React, {Component, PropTypes} from 'react';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	Dialog
} from 'kr-ui';

import {
  observer,
  inject
} from 'mobx-react';


import {reduxForm,Field}  from 'kr/Utils/ReduxForm';


 class Demo extends Component{

	constructor(props){
		super(props);
		this.state={
			requestURI:'/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
			treeAll :[
					    {
					        "createip": "127.0.0.1",
					        "sort": 20,
					        "operater": 2,
					        "createrName": "",
					        "createdate": "2016-09-30 15:00:00",
					        "children": [
					            {
					                "id": 101,
					                "children": [
					                    {
					                        "id": 109,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "主题壁纸",
					                        "codeNo": "code_109",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 110,
					                        "children": [
					                            {
					                                "id": 146,
					                                "children": [],
					                                "sort": 1,
					                                "delflag": "0",
					                                "pid": 110,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "杀毒软件",
					                                "codeNo": "code_146",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            }
					                        ],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "安全软件",
					                        "codeNo": "code_110",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 111,
					                        "children": [
					                            {
					                                "id": 147,
					                                "children": [],
					                                "sort": 1,
					                                "delflag": "0",
					                                "pid": 111,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "视频播放器",
					                                "codeNo": "code_147",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            },
					                            {
					                                "id": 148,
					                                "children": [],
					                                "sort": 2,
					                                "delflag": "0",
					                                "pid": 111,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "音频播放器",
					                                "codeNo": "code_148",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            }
					                        ],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "播放器",
					                        "codeNo": "code_111",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 112,
					                        "children": [
					                            {
					                                "id": 149,
					                                "children": [],
					                                "sort": 1,
					                                "delflag": "0",
					                                "pid": 112,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "PC浏览器",
					                                "codeNo": "code_149",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            },
					                            {
					                                "id": 150,
					                                "children": [],
					                                "sort": 2,
					                                "delflag": "0",
					                                "pid": 112,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "移动浏览器",
					                                "codeNo": "code_150",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            }
					                        ],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "浏览器",
					                        "codeNo": "code_112",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 113,
					                        "children": [],
					                        "sort": 5,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "传输工具",
					                        "codeNo": "code_113",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 114,
					                        "children": [],
					                        "sort": 6,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "下载工具",
					                        "codeNo": "code_114",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 115,
					                        "children": [],
					                        "sort": 7,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "加速软件",
					                        "codeNo": "code_115",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 116,
					                        "children": [],
					                        "sort": 8,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "输入法",
					                        "codeNo": "code_116",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 117,
					                        "children": [],
					                        "sort": 9,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "网络工具",
					                        "codeNo": "code_117",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 118,
					                        "children": [],
					                        "sort": 10,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "越狱软件",
					                        "codeNo": "code_118",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 119,
					                        "children": [],
					                        "sort": 11,
					                        "delflag": "0",
					                        "pid": 101,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "刷机软件",
					                        "codeNo": "code_119",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 1,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "系统工具",
					                "codeNo": "code_101",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 102,
					                "children": [
					                    {
					                        "id": 120,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "闹钟",
					                        "codeNo": "code_120",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 121,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "天气",
					                        "codeNo": "code_121",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 122,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "计算器",
					                        "codeNo": "code_122",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 123,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "录音机",
					                        "codeNo": "code_123",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 124,
					                        "children": [],
					                        "sort": 5,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "日历",
					                        "codeNo": "code_124",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 125,
					                        "children": [],
					                        "sort": 6,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "记事本",
					                        "codeNo": "code_125",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 126,
					                        "children": [],
					                        "sort": 7,
					                        "delflag": "0",
					                        "pid": 102,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "语音助手",
					                        "codeNo": "code_126",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 2,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "日常应用",
					                "codeNo": "code_102",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 103,
					                "children": [
					                    {
					                        "id": 127,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 103,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "图像处理",
					                        "codeNo": "code_127",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 128,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 103,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "相机应用",
					                        "codeNo": "code_128",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 129,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 103,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "图片素材",
					                        "codeNo": "code_129",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 130,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 103,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "图像浏览",
					                        "codeNo": "code_130",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 3,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "图片摄影",
					                "codeNo": "code_103",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 104,
					                "children": [
					                    {
					                        "id": 131,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 104,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "任务管理",
					                        "codeNo": "code_131",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 132,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 104,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "云笔记",
					                        "codeNo": "code_132",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 133,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 104,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "文档编辑",
					                        "codeNo": "code_133",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 134,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 104,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "邮件",
					                        "codeNo": "code_134",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 135,
					                        "children": [],
					                        "sort": 5,
					                        "delflag": "0",
					                        "pid": 104,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "云打印",
					                        "codeNo": "code_135",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 4,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "个人办公",
					                "codeNo": "code_104",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 105,
					                "children": [
					                    {
					                        "id": 136,
					                        "children": [
					                            {
					                                "id": 151,
					                                "children": [],
					                                "sort": 1,
					                                "delflag": "0",
					                                "pid": 136,
					                                "enableflag": "1",
					                                "pkfieldName": "id",
					                                "enableflagName": "启用",
					                                "operatedate": "2016-09-30 15:00:00",
					                                "creater": 2,
					                                "codeName": "代码托管平台",
					                                "codeNo": "code_151",
					                                "createdate": "2016-09-30 15:00:00",
					                                "operater": 2,
					                                "createip": "127.0.0.1",
					                                "operateip": "127.0.0.1"
					                            }
					                        ],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 105,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "开发工具",
					                        "codeNo": "code_136",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 137,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 105,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "设计工具",
					                        "codeNo": "code_137",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 5,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "开发者服务",
					                "codeNo": "code_105",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 106,
					                "children": [
					                    {
					                        "id": 138,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 106,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "应用下载",
					                        "codeNo": "code_138",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 139,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 106,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "软件下载",
					                        "codeNo": "code_139",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 140,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 106,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "应用软件推荐",
					                        "codeNo": "code_140",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 6,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "应用软件下载",
					                "codeNo": "code_106",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 107,
					                "children": [
					                    {
					                        "id": 141,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 107,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "文字识别",
					                        "codeNo": "code_141",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 142,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 107,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "图像识别",
					                        "codeNo": "code_142",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 143,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 107,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "指纹识别",
					                        "codeNo": "code_143",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 144,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 107,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "语音识别",
					                        "codeNo": "code_144",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 145,
					                        "children": [],
					                        "sort": 5,
					                        "delflag": "0",
					                        "pid": 107,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "人脸识别",
					                        "codeNo": "code_145",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 7,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "网络云盘",
					                "codeNo": "code_107",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 108,
					                "children": [],
					                "sort": 8,
					                "delflag": "0",
					                "pid": 100,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "计算机识别",
					                "codeNo": "code_108",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            }
					        ],
					        "enableflag": "1",
					        "pid": 687,
					        "creater": 2,
					        "id": 100,
					        "operateip": "127.0.0.1",
					        "codeName": "工具软件",
					        "operatedate": "2016-09-30 15:00:00",
					        "pname": "",
					        "serialVersionUID": "",
					        "codeNo": "code_100",
					        "delflag": "0",
					        "enableflagName": "启用"
					    },
					    {
					        "createip": "127.0.0.1",
					        "sort": 34,
					        "operater": 2,
					        "createrName": "",
					        "createdate": "2016-09-30 15:00:00",
					        "children": [
					            {
					                "id": 653,
					                "children": [
					                    {
					                        "id": 659,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 653,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "众包配送",
					                        "codeNo": "659",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 660,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 653,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "食品配送",
					                        "codeNo": "660",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 661,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 653,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "普通快递",
					                        "codeNo": "661",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 662,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 653,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "收发货物",
					                        "codeNo": "662",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 663,
					                        "children": [],
					                        "sort": 5,
					                        "delflag": "0",
					                        "pid": 653,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "冷链运输",
					                        "codeNo": "663",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 1,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "快捷配送",
					                "codeNo": "code_653",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 654,
					                "children": [
					                    {
					                        "id": 664,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 654,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "物流查询",
					                        "codeNo": "664",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 665,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 654,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "物流调度",
					                        "codeNo": "665",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 2,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "物流平台",
					                "codeNo": "code_654",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 655,
					                "children": [
					                    {
					                        "id": 666,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 655,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "长途货运",
					                        "codeNo": "666",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 667,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 655,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "同城货运",
					                        "codeNo": "667",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 668,
					                        "children": [],
					                        "sort": 3,
					                        "delflag": "0",
					                        "pid": 655,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "航海货运",
					                        "codeNo": "668",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 669,
					                        "children": [],
					                        "sort": 4,
					                        "delflag": "0",
					                        "pid": 655,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "航空货运",
					                        "codeNo": "669",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 3,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "货运物流",
					                "codeNo": "code_655",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 656,
					                "children": [
					                    {
					                        "id": 670,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 656,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "境内直邮",
					                        "codeNo": "670",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 671,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 656,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "海淘转运",
					                        "codeNo": "671",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 4,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "跨境物流",
					                "codeNo": "code_656",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 657,
					                "children": [
					                    {
					                        "id": 672,
					                        "children": [],
					                        "sort": 1,
					                        "delflag": "0",
					                        "pid": 657,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "危险品",
					                        "codeNo": "672",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    },
					                    {
					                        "id": 673,
					                        "children": [],
					                        "sort": 2,
					                        "delflag": "0",
					                        "pid": 657,
					                        "enableflag": "1",
					                        "pkfieldName": "id",
					                        "enableflagName": "启用",
					                        "operatedate": "2016-09-30 15:00:00",
					                        "creater": 2,
					                        "codeName": "特殊材料",
					                        "codeNo": "673",
					                        "createdate": "2016-09-30 15:00:00",
					                        "operater": 2,
					                        "createip": "127.0.0.1",
					                        "operateip": "127.0.0.1"
					                    }
					                ],
					                "sort": 5,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "特殊物流",
					                "codeNo": "code_657",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            },
					            {
					                "id": 658,
					                "children": [],
					                "sort": 6,
					                "delflag": "0",
					                "pid": 652,
					                "enableflag": "1",
					                "pkfieldName": "id",
					                "enableflagName": "启用",
					                "operatedate": "2016-09-30 15:00:00",
					                "creater": 2,
					                "codeName": "仓储服务",
					                "codeNo": "code_658",
					                "createdate": "2016-09-30 15:00:00",
					                "operater": 2,
					                "createip": "127.0.0.1",
					                "operateip": "127.0.0.1"
					            }
					        ],
					        "enableflag": "1",
					        "pid": 687,
					        "creater": 2,
					        "id": 652,
					        "operateip": "127.0.0.1",
					        "codeName": "物流",
					        "operatedate": "2016-09-30 15:00:00",
					        "pname": "",
					        "serialVersionUID": "",
					        "codeNo": "code_652",
					        "delflag": "0",
					        "enableflagName": "启用"
					    },
					    {
					        "createip": "100.109.222.28",
					        "sort": 2,
					        "operater": 6,
					        "createrName": "",
					        "createdate": "2016-11-02 16:18:42",
					        "children": [],
					        "enableflag": "1",
					        "pid": 687,
					        "creater": 6,
					        "id": 689,
					        "operateip": "100.109.222.28",
					        "codeName": "写字楼",
					        "operatedate": "2016-11-02 16:18:42",
					        "pname": "",
					        "serialVersionUID": "",
					        "codeNo": "XieZiLou",
					        "delflag": "0",
					        "enableflagName": "启用"
					    }
					]
		}	
	}

	componentWillMount() {

	}

	componentDidMount(){

		const {$form} = this.props;

		var values = {
					username:'yyyyaa',
					textarea:'bbbb'
		}
		$form.initialize(values);
	}

	onSubmit = (values)=>{
		Debug.log(values);
	}

	onClick = ()=>{
		const {$form} = this.props;
		$form.submit();
	}

	change=(form)=>{
		const {$form} = this.props;
		Debug.log("form",form);
		$form.change('editLabelText',form);
	}

	onReset = ()=>{
		const {$form} = this.props;
		$form.reset();
	}

	selectOldUser=(value)=>{
		const {$form} = this.props;
		$form.change('SearchList',value);
	}
	changeSearch=(value)=>{
		const {$form} = this.props;
		$form.change('search',value);
	}
	cityValue=(value)=>{
		const {$form} = this.props;
		$form.change('city',value);
	}
	chooseYes=(value)=>{
		Debug.log("value------>",value)
		const {$form} = this.props;
		$form.change('radio',value);
	}
	chooseNo=(value)=>{
		const {$form} = this.props;
		$form.change('radio',value);
	}

	render(){
		let {treeAll} = this.state;
		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField label="用户名称" type="text" component="input" name="username" mobx={true} />
					<KrField label="用户名称" type="text" component="textarea" name="textarea" mobx={true} />
					<KrField label="uploadImageList" component="uploadImageList" name="file" mobx={true} />
					<KrField label="searchCustomer" component="searchCustomer" name="searchCustomer" mobx={true} />
					<KrField label="select"  component="select" name="select" options={[{label:'ddd',value:'yy'}]} mobx={true} />
					<KrField label="editor"  component="editor"  name="editor" mobx={true}  />
					{/*<KrField label="groupCheckbox" component="groupCheckbox"  name="groupCheckbox"  defaultValue=={[{label:'ddd',value:'yy'}]} />*/}
					<KrField label="editLabelText"  component="editLabelText"  name="editLabelText" save={this.change} mobx={true}/>
					<KrField label="file"  component="file"  name="file" mobx={true}/>
					<KrField label="doorCard"  component="doorCard"  name="doorCard" mobx={true}/>
					{/*上传图片有问题*/}

					<KrField
			              		label="电脑端轮播图newuploadImage"
			              		name="newuploadImage"
								component="newuploadImage"
								innerstyle={{width:524,height:159,padding:10}}
								photoSize={'1920*520'}
								pictureFormat={'JPG,PNG,GIF'}
								pictureMemory={'500'}
								requestURI = {this.state.requestURI}
								inline={false}
								mobx={true}
							/>
					<KrField label="searchPayment"  component="searchPayment"  name="searchPayment" mobx={true}/>
					<KrField label="searchCustomer"  component="searchCustomer"  name="searchCustomer" mobx={true}/>
					<KrField label="searchMainbill"  component="searchMainbill"  name="searchMainbill" mobx={true} customerId='1'/>
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchCommunitys"  component="searchCommunitys"  name="searchCommunitys" mobx={true} />
					<KrField label="searchCorporation"  component="searchCorporation"  name="searchCorporation" mobx={true} />
					<KrField label="searchPersonel"  component="searchPersonel"  name="searchPersonel" mobx={true} />
					<KrField label="selectTime"  component="selectTime"  name="selectTime" mobx={true} />
					<KrField label="SearchList"  component="SearchList"  name="SearchList" mobx={true} onSubmit={this.selectOldUser}/>
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchCommunity"  component="searchCommunity"  name="searchCommunity" mobx={true} />
					<KrField label="searchLeader"  component="searchLeader"  name="searchLeader" mobx={true} />
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchIntend"  component="searchIntend"  name="searchIntend" mobx={true} />
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchSign"  component="searchSign"  name="searchSign" mobx={true} />
					<KrField label="searchCompany"  component="searchCompany"  name="searchCompany" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchCity"  component="searchCity"  name="searchCity" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchSource"  component="searchSource"  name="searchSource" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchSourceAdd"  component="searchSourceAdd"  name="searchSourceAdd" mobx={true} />
					<KrField label="companyName"  component="companyName"  name="companyName" mobx={true} />
					<KrField label="search填写1"  component="search"  name="search" mobx={true} onChange={this.changeSearch}/>
					<KrField label="city"  component="city"  name="city" mobx={true} onSubmit={this.cityValue}/>
					<KrField label="tree"  component="tree"  name="tree" mobx={true} treeAll={treeAll}/>
					<KrField label="textarea"  component="textarea"  name="textarea" mobx={true} />
   					{/*有问题*/}
   					<KrField grid={1/2} component="group"  name="enableflag"  label="是否启用" requireLabel={true} mobx={true}>
						<KrField name="enableflag" grid={1/2} label="是" component="radio" type="radio" mobx={true} value="yes" />
						<KrField name="enableflag" grid={1/2} label="否" component="radio" type="radio"  mobx={true} value="no" />
              		</KrField>

						



					<Button type="submit" label="提交"/>
					<Button type="button" label="暂存" onClick={this.onClick}/>
					<Button type="button" label="重置" onClick={this.onReset}/>

				</form>

		</div>
	 );

		}

}


const validate = (values)=>{

	const errors = {};


	if(!values.username){
		errors.username = '请输入用户名称'
	}

	return errors;

}

export default reduxForm({
	form:'dForm',
	validate,
})(Demo);
