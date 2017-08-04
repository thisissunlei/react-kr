import React from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http,
	DateFormat
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	KrDate,
	Message,
    TabC,
	TabCs,
} from 'kr-ui';
import './index.less';
import CreateDialog from './Createdialog';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import Basic from './Basic';
import InitiatorSetting from './InitiatorSetting';
export default class BasicSetting extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			item:this.props.detail,
			itemDetail:{},
            newPage: 1,
            openDeleteDialog:false,
            openCreateDialog:false,
			openEditDialog:false,
            searchParams: {
				page: 1,
				pageSize: 15,
			},
		}
	}
    componentDidMount() {
		
		
		var _this = this;
		
		
	}
	onSerchSubmit = (form) => {
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.nameAndEmail = form.content;
		this.setState({
			searchParams
		})
	}
    //操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});
		if (type == 'edit') {
			this.openEditDialog();
		} else if (type == 'delete') {
			this.openDeleteDialog();
		}
	}
    openDeleteDialog = () => {
		this.setState({
			openDeleteDialog: !this.state.openDeleteDialog,
		})
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
    openCreateDialog=()=>{
        this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
    }
	onCreatSubmit = (params) => {
		var _this = this;
		Http.request('save-junior', {}, params).then(function (response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
			_this.getTreeData();
			_this.getOrganizationDetail();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
    //返回
    toBack=()=>{
        
    }
    //改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.timer=timer;
		// console.log("changeP",searchParams);
		this.setState({
            searchParams:searchParams,
        })
    }
	onPageChange=(page)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=page;
		this.setState({
            searchParams:searchParams,
        })
    }

	render() {
        let {item,itemDetail} = this.state;
		return (
			<div className="g-basic-setting">
                <div className="center-row">
                    <div className="department">
                        <div className="department-logo">
                            <span>
                                请假
                                {/*{this.props.processName.substr(0,2)}*/}
                            </span>
                        </div>
                        <div className="department-name">
                            {/*{this.props.processName}*/}
                            请假申请
                        </div>
                        <div className="department-tab-list">
                            <div className="department-tab department-tab-active" style={{cursor:"default"}}>
                                流程列表
                            </div>
                            
                        </div>

                    </div>
                        
                    <div className="button-group">
                        <Button
                            label="返回"
                            type="button"
                            onTouchTap={this.toBack}
                            height={30}
                            width={80}
                            labelStyle={{fontWeight:0}}
                            backgroundColor='#fcfcfc'
                            labelColor='#666'
                            shadow="no"
                        />
                    </div>

				</div>
				<TabCs>
                    <TabC label='基本信息'> 
                        <Basic
                        />
                    </TabC> 
                    
                    <TabC label='发起人设置'> 
                        <InitiatorSetting
                        />
                    </TabC> 
                 </TabCs>
            </div>

		);
	}

}
