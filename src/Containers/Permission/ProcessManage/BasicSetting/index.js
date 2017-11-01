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
import Template from './Template';
import { observer, inject } from 'mobx-react';

@inject("NavModel")
@observer
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
			infoList:{},
		}
	}
    componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		var _this = this;
		Http.request('process-detail', {
                wfId: _this.props.params.processId,
            },{}).then(function(response) {
                _this.setState({infoList: response})
            }).catch(function(err) {});
	}

	onSaveSubmit = (params) => {
		var _this = this;
		var form = Object.assign({},params);
		form.formId = form.formId[0].orgId;
		form.hrmResourceId = form.hrmResourceId[0].orgId;
		Http.request('process-edit', {}, form).then(function (response) {
			Message.success('保存成功');
			// _this.changeP();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
    //返回
    toBack=()=>{
        window.location.href='./#/permission/processManage/processSetting'
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
		console.log(this.state.infoList);
        let {item,itemDetail} = this.state;
		return (
			<div className="g-basic-setting">
                <div className="center-row">
                    <div className="department">
                        {/*<div className="department-logo">
                            <span>
                                {this.state.infoList.name?this.state.infoList.name.substring(0,2):''}
                            </span>
                        </div>
                        <div className="department-name">
                            {this.state.infoList.name}
                        </div>*/}
                        <TabCs
			                 isDetail='iconTab'
			                 label = {this.state.infoList.name}
			                 >
			                    <TabC label='基础设置'>
			                    	<div style={{height:30}}></div>

			                      <TabCs isDetail='process'>
				                    <TabC label='基本信息'> 
				                        <Basic id={this.props.params.processId} onSubmit = {this.onSaveSubmit}/>
				                    </TabC> 
				                    
				                    <TabC label='发起人设置'> 
				                        <InitiatorSetting id={this.props.params.processId} />
				                    </TabC> 
				                 </TabCs>

			                    </TabC>

			                 <TabC label='合同模板'>
			                  	<Template id={this.props.params.processId}/>
			                 </TabC>
			               

			             </TabCs>
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
				
            </div>

		);
	}

}
