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
    Chip,
    Drawer
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import EditDialog from './EditDialog';
import CreateDrawer from './CreateDrawer';
import HighSearchForm from './HighSearchForm';
export default class SingleType extends React.Component {

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			item:this.props.detail,
			editState:false,
			itemDetail:{},
            newPage: 1,
            openCreateDrawer:false,
			openEditDialog:false,
			openHighSearch:false,
			processName:this.props.processName,
            searchParams: {
				page: 1,
				pageSize: 15,
				typeId:this.props.typeId,
			},
		}
	}
    componentDidMount() {
		
		
		var _this = this;
		
		
	}
	componentWillReceiveProps(nextProps){
		let {searchParams}=this.state;
		let {typeId,processName} = this.props;
		// console.log("nextProps",nextProps);
        if(nextProps.processName!==this.state.processName){
			// console.log("进入props");
		    this.setState({
				searchParams: {
					page: 1,
					pageSize: 15,
					typeId:nextProps.typeId,
				},
				processName:nextProps.processName,
			})
	    }
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
		},function(){
			if (type == 'set') {
				this.openSetDialog();
			}
		});
		
	}
	openSetDialog = () => {
		var processId =  this.state.itemDetail.wfId;
		window.open(`./#/permission/processManage/${processId}/basicSetting`);
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
    openCreateDrawer=()=>{
        this.setState({
			openCreateDrawer: !this.state.openCreateDrawer
		})
    }
	onCreatSubmit = (params) => {
        const {onSubmit} = this.props;
        var params = Object.assign({},params);
        params.hrmResourceId = params.hrmResourceId[0].orgId;
		var _this = this;
		Http.request('process-add', {}, params).then(function (response) {
			_this.openCreateDrawer();
			Message.success('新建成功');
			_this.changeP();
            onSubmit();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
	toBasicSetting=(form)=>{
        const {onSubmit} = this.props;
		var params = Object.assign({},form);
        params.hrmResourceId = params.hrmResourceId[0].orgId;
        var _this = this;
        Http.request('process-add', {}, params).then(function (response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
            let processId = response.wfId;
            window.location.href = `./#/permission/processManage/${processId}/basicSetting`;
            onSubmit();
		}).catch(function (err) {
			Message.error(err.message)
		});
    }
	onEditSubmit = (params) => {
        const {onSubmit} = this.props;
        var params = Object.assign({},params);
        params.typeId = this.props.typeId;
		var _this = this;
		Http.request('process-edit-type', {}, params).then(function (response) {
			_this.openEditDialog();
			Message.success('修改成功');
			_this.changeP();
            onSubmit();
		}).catch(function (err) {
			Message.error(err.message)
		});
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
	onSearchSubmit = (form) => {
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.wfName = form.content;
		this.setState({
			searchParams
		})
	}
	//高级查询
	openHighSearch = () => {
		this.setState({
		openHighSearch: !this.state.openHighSearch
		})
	}

	onHighSearchSubmit = (form) => {
		var form = Object.assign({},this.state.searchParams);
		form.typeId=this.state.searchParams.typeId;
		this.setState({
			searchParams:form
		})
		this.openHighSearch();
	}
	render() {
        let {item,itemDetail} = this.state;
		// console.log(this.state.processName);
		return (
			<div>
                <div className="center-row">
                        
                            <div className="department">
                                <div className="department-logo">
                                    <span>
                                        {this.state.processName.substr(0,2)}
                                    </span>
                                </div>
                                <div className="department-name">
                                    {this.state.processName}
                                </div>
                                <div className="department-tab-list">
                                    <div className="department-tab" style={{cursor:"default"}}>
                                        流程列表
                                    </div>
                                   
                                </div>

                            </div>
                        
							<div className="button-group">
                                <Button
                                    label="编辑"
                                    type="button"
                                    onTouchTap={this.openEditDialog}
                                    height={30}
                                    width={80}
                                    labelStyle={{fontWeight:0}}
                                    backgroundColor='#fcfcfc'
                                    labelColor='#666'
                                    shadow="no"
                                />
							</div>

					</div>
						<div>
							<Grid style={{ marginBottom: 20, marginTop: 20 }}>
								<Row>
									<Col md={4} align="left" >
										<Button label="新建" type="button" onClick={this.openCreateDrawer} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
											<SearchForm onSubmit={this.onSearchSubmit}  openSearch={this.openHighSearch}/>
										</div>
									</Col>
								</Row>
							</Grid>
							<Table
								style={{ marginTop: 10 }}
								displayCheckbox={false}
								onLoaded={this.onLoaded}
								ajax={true}
								ajaxUrlName='process-list'
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
								onPageChange={this.onPageChange}
							>
								<TableHeader>
									<TableHeaderColumn>流程名称</TableHeaderColumn>
									<TableHeaderColumn>流程编码</TableHeaderColumn>
									<TableHeaderColumn>流程类型</TableHeaderColumn>
									<TableHeaderColumn>顺序</TableHeaderColumn>
									<TableHeaderColumn>发起流程请求</TableHeaderColumn>
									<TableHeaderColumn>新办是否显示</TableHeaderColumn>
                                    <TableHeaderColumn>慧正流程唯一标识</TableHeaderColumn>
									<TableHeaderColumn>描述</TableHeaderColumn>
                                    <TableHeaderColumn>操作人</TableHeaderColumn>
									<TableHeaderColumn>操作时间</TableHeaderColumn>
									<TableHeaderColumn>操作</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow>
                                    <TableRowColumn name="wfName"></TableRowColumn>
                                    <TableRowColumn name="wfCode"></TableRowColumn>
                                    <TableRowColumn name="wfTypeName"></TableRowColumn>
                                    <TableRowColumn name="wfOrderNum"></TableRowColumn>
                                    <TableRowColumn name="allowRequest"
                                        component={(value, oldValue) => {
											var style = {};
                                            if (value == '不允许') {
                                                style = { 'color': '#FF5B52' }
                                            }
                                            return (
                                                <div style={style}>{value}</div>
                                            )
                                        }}
                                    ></TableRowColumn>
                                    <TableRowColumn name="newRequestShow"
                                        component={(value, oldValue) => {
											var styleTwo = {};
                                            if (value == '不显示') {
                                                styleTwo = { 'color': '#FF5B52' }
                                            }
                                            return (
                                                <div style={styleTwo}>{value}</div>
                                            )
                                        }}
                                    ></TableRowColumn>
                                    <TableRowColumn name="hzCode"></TableRowColumn>
                                    <TableRowColumn name="descr"></TableRowColumn>
                                    <TableRowColumn name="operator"></TableRowColumn>
                                    <TableRowColumn type="date" name="operatorTime" component={(value) => {
                                        return (
                                            <KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
                                        )
                                    }}> </TableRowColumn>
                                    <TableRowColumn>
                                        <Button label="配置" type="operation" operation="set" />
									</TableRowColumn>
                                </TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						</div>
                    <Drawer
							open={this.state.openCreateDrawer}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.openCreateDrawer}
					 >
						<CreateDrawer detail={this.state.searchParams} toBasicSetting={this.toBasicSetting} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDrawer} />
					</Drawer>
					<Dialog
						title="编辑流程类型"
						modal={true}
						open={this.state.openEditDialog}
						onClose={this.openEditDialog}
						contentStyle={{
							width: 685
						}}
					>
						<EditDialog type="single" detail={this.state.searchParams} onSubmit={this.onEditSubmit}  onCancel={this.openEditDialog} />
					</Dialog>
					{/*高级查询*/}
					<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openHighSearch}
						onClose={this.openHighSearch}
						contentStyle={{width:685}}
					>
						<HighSearchForm
							onSubmit={this.onHighSearchSubmit}
							onCancel={this.openHighSearch}
							detail={this.state.searchParams}
						/>
					</Dialog>
			</div>
		);
	}

}
