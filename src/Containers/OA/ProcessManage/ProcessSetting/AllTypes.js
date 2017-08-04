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
import CreateDialog from './Createdialog';
import CreateDrawer from './CreateDrawer';
export default class AllTypes extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			item:this.props.detail,
            openEditDialog:false,
			itemDetail:{},
            tabSelect: 1,
            openCreateDrawer:false,
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
    checkTab = (item) => {
		this.setState({
			tabSelect: item,
		})
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
    openCreateDrawer=()=>{
        this.setState({
			openCreateDrawer: !this.state.openCreateDrawer
		})
    }
	onCreatSubmit = (params) => {
		var _this = this;
		Http.request('process-add-type', {}, params).then(function (response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
			_this.getTreeData();
			_this.getOrganizationDetail();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
    onEditSubmit = (params) => {
		var _this = this;
		Http.request('process-edit-type', {}, params).then(function (response) {
			_this.openCreateDialog();
			Message.success('修改成功');
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
                                    <div className={`department-tab ${this.state.tabSelect == 1 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 1)}>
                                        类型列表
                                    </div>
                                    <div className={`department-tab ${this.state.tabSelect == 2 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 2)}>
                                        流程列表
                                    </div>
                                </div>

                            </div>
                </div>
                {this.state.tabSelect == 1 &&
                    <div>
                        <Grid style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col md={4} align="left" >
                                    <Button label="新建下级" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
                                </Col>
                                <Col md={8} align="right">

                                </Col>
                            </Row>
                        </Grid>
                        {/*<Table
                            style={{ marginTop: 10 }}
                            displayCheckbox={false}
                            onLoaded={this.onLoaded}
                            ajax={true}
                            ajaxUrlName='op-code-list'
                            ajaxParams={this.state.searchParams}
                            onOperation={this.onOperation}
                            onPageChange={this.onPageChange}
                        >
                            <TableHeader>
                                <TableHeaderColumn>流程类型</TableHeaderColumn>
                                <TableHeaderColumn>排序号</TableHeaderColumn>
                                <TableHeaderColumn>描述</TableHeaderColumn>
                                <TableHeaderColumn>操作人</TableHeaderColumn>
                                <TableHeaderColumn>创建日期</TableHeaderColumn>
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
                                    <TableRowColumn type="operation" name="status"
                                        component={(value, oldValue, itemDetail) => {
                                            if (logFlag) {

                                                return (
                                                    <Button onClick={this.openUnCancelDialog.bind(this, itemDetail)} label="解封" type="operation" operation="unCancle" />
                                                )
                                            } else {
                                                return (
                                                    <Button label="编辑" onClick={this.openCancelDialog.bind(this, itemDetail)} type="operation" operation="cancle" />
                                                )
                                            }
                                        }}
                                    >
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                            <TableFooter></TableFooter>
                        </Table>*/}
                    </div>
                }
                {
                    this.state.tabSelect == 2 &&
                    <div>
                        <Grid style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col md={4} align="left" >
                                    <Button label="新建" type="button" onClick={this.openCreateDrawer} width={80} height={30} fontSize={14} labelStyle={{fontWeight:400,padding:0}} />
                                </Col>
                                <Col md={8} align="right">
                                    <div className="u-search">
                                        <SearchForm onSubmit={this.onSerchSubmit} />
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                        {/*<Table
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
                                    <TableRowColumn name="hrmId"></TableRowColumn>
                                    <TableRowColumn name="departName"></TableRowColumn>
                                    <TableRowColumn name="userName"></TableRowColumn>
                                    <TableRowColumn name="email"></TableRowColumn>
                                    <TableRowColumn type="date" name="entryTime" component={(value) => {
                                        return (
                                            <KrDate value={value} format="yyyy-mm-dd" />
                                        )
                                    }}> </TableRowColumn>
                                    <TableRowColumn name="status"
                                        component={(value, oldValue) => {
                                            if (value == '未开通') {
                                                style = { 'color': '#FF5B52' }
                                            }else{
                                                style = {}
                                            }
                                            return (
                                                <div style={style}>{value}</div>
                                            )
                                        }}
                                    ></TableRowColumn>
                                </TableRow>
                            </TableBody>
                            <TableFooter></TableFooter>
                        </Table>*/}
                    </div>
                }
                <Dialog
					title="新建流程类型"
					modal={true}
					open={this.state.openCreateDialog}
					onClose={this.openCreateDialog}
					contentStyle={{
						width: 685
					}}
				>
					{/*<CreateDialog detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDialog} />*/}
				</Dialog>
                <Dialog
					title="编辑流程类型"
					modal={true}
					open={this.state.openEditDialog}
					onClose={this.openEditDialog}
					contentStyle={{
						width: 685
					}}
				>
					{/*<EditDialog detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDialog} />*/}
				</Dialog>
                <Drawer
                    open={this.state.openCreateDrawer}
                    width={750}
                    openSecondary={true}
                    containerStyle={{top:60,paddingBottom:228,zIndex:20}}
                    onClose={this.state.openCreateDrawer}
				>
					<CreateDrawer detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDrawer} />
				</Drawer>
			</div>
		);
	}

}
