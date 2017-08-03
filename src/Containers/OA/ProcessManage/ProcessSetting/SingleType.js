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
    Chip
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import CreateDialog from './Createdialog';
export default class SingleType extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			item:this.props.detail,
			editState:false,
			itemDetail:{},
            newPage: 1,
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

		if (type == 'cancle') {
			this.openCancelDialog();
		} else if (type == 'unCancle') {
			this.openUnCancelDialog();
		}
	}

	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
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
			<div>
                <div className="center-row">
                        
                            <div className="department">
                                <div className="department-logo">
                                    <span>
                                        {this.props.processName.substr(0,2)}
                                    </span>
                                </div>
                                <div className="department-name">
                                    {this.props.processName}
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
										<Button label="新建" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
									</Col>
									<Col md={8} align="right">

									</Col>
								</Row>
							</Grid>
							<Table
								style={{ marginTop: 10 }}
								displayCheckbox={false}
								onLoaded={this.onLoaded}
								ajax={true}
								ajaxUrlName='findUserByRoleId'
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
								onPageChange={this.onPageChange}
							>
								<TableHeader>
									<TableHeaderColumn>流程名称</TableHeaderColumn>
									<TableHeaderColumn>流程编码</TableHeaderColumn>
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
										<TableRowColumn name="juniorId" ></TableRowColumn>

										<TableRowColumn name="juniorName"></TableRowColumn>
										<TableRowColumn name="juniorType"></TableRowColumn>
										<TableRowColumn name="status"
											component={(value, oldValue) => {

												if (value == '已封存') {
													logFlag = true;
													return (
														<div style={{ color: '#FF5B52' }}>{value}</div>
													)
												} else {
													logFlag = false;
													return (
														<div>{value}</div>
													)
												}
											}}
										></TableRowColumn>

										<TableRowColumn type="date" name="createTime" component={(value) => {
											return (
												<KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
											)
										}}> </TableRowColumn>
										<TableRowColumn>
                                            <Button label="配置" type="operation" operation="cancle" />
										</TableRowColumn>
									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						</div>
                <Dialog
					title="新建下级"
					modal={true}
					open={this.state.openCreateDialog}
					onClose={this.openCreateDialog}
					contentStyle={{
						width: 685
					}}
				>
					{/*<CreateDialog detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDialog} />*/}
				</Dialog>
			</div>
		);
	}

}
