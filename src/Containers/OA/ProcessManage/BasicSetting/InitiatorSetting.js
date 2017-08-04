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
import CreateDialog from './Createdialog';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
export default class SingleType extends React.Component {

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
			<div style={{marginTop:30}}>
                <Grid style={{ marginBottom: 20, marginTop: 20 }}>
                    <Row>
                        <Col md={4} align="left" >
                            <Button label="新建权限" type="button" onClick={this.openCreateDrawer} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
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
            <Dialog
                title="新建权限"
                modal={true}
                open={this.state.openCreateDialog}
                onClose={this.openCreateDialog}
                contentStyle={{
                    width: 685
                }}
            >
                <CreateDialog detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDialog} />
            </Dialog>
            <Dialog
                title="编辑权限"
                modal={true}
                open={this.state.openEditDialog}
                onClose={this.openEditDialog}
                contentStyle={{
                    width: 685
                }}
            >
                <EditDialog detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDialog} />
            </Dialog>
            <Dialog
                title="提示"
                modal={true}
                open={this.state.openDeleteDialog}
                onClose={this.openDeleteDialog}
                contentStyle={{
                    width: 374
                }}
            >
                <DeleteDialog  onCancel={this.openDeleteDialog} />
            </Dialog>
        
        </div>

		);
	}

}
