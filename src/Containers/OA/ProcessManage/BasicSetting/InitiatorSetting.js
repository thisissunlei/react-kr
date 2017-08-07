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
	onCreateSubmit = (params) => {
		var form = Object.assign({},params);
        let limitId = this.state.itemDetail.limitId;
		form.limitId=limitId;
        form.wfId=this.props.params.processId;
		var _this = this;
		Http.request('process-authority-add', {}, form).then(function (response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
    onEditSubmit = (params) => {
        var form = Object.assign({},params);
        let limitId = this.state.itemDetail.limitId;
		form.limitId=limitId;
        form.wfId=this.props.params.processId;
		var _this = this;
		Http.request('process-authority-edit', {}, form).then(function (response) {
			_this.openCreateDialog();
			Message.success('编辑成功');
			_this.changeP();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
    onDeleteSubmit = () => {
        let limitId = this.state.itemDetail.limitId;
		var _this = this;
		Http.request('process-authority-detail', {}, {limitId:limitId}).then(function (response) {
			_this.openDeleteDialog();
			Message.success('删除成功');
			_this.changeP();
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
			<div style={{marginTop:30,paddingLeft:45}}>
                <Grid style={{ marginBottom: 20, marginTop: 20 }}>
                    <Row>
                        <Col md={4} align="left" >
                            <Button label="新建权限" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
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
                        <TableHeaderColumn>类型</TableHeaderColumn>
                        <TableHeaderColumn>选择范围</TableHeaderColumn>
                        <TableHeaderColumn>限定条件</TableHeaderColumn>
                        <TableHeaderColumn>是否启用</TableHeaderColumn>
                        <TableHeaderColumn>操作</TableHeaderColumn>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableRowColumn name="juniorId" ></TableRowColumn>
                            <TableRowColumn name="juniorName"></TableRowColumn>
                            <TableRowColumn name="juniorName"></TableRowColumn>
                            <TableRowColumn name="juniorType"></TableRowColumn>
                            <TableRowColumn>
                                <Button label="编辑" type="operation" operation="edit" />
                                <Button label="删除" type="operation" operation="delete" />
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
                <CreateDialog detail={this.state.searchParams} onSubmit={this.onCreateSubmit} onCancel={this.openCreateDialog} />
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
