import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store,
} from 'kr/Redux';

import CreateAccount from './CreateAccount';
import DataPermission from './DataPermission';
import SearchForm from './SearchForm';

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
	Section,
	Grid,
	Row,
	Col,
	Message,
	ListGroupItem,
	ListGroup,
	SearchForms,
	Dialog,
} from 'kr-ui';
import './index.less';
class AccountList  extends Component{

	constructor(props,context){
		super(props, context);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.openDataPermission = this.openDataPermission.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.state={
			searchParams: {
				accountName:'',
				page: 1,
				pageSize: 15,
				timer:1,
			},
			openNewCreate:false,
			openDataPermission:false,
			item:{},
			itemDetail:{},
		}

	}
	// componentDidMount() {
	// 	var _this = this;
	// 	Store.dispatch(Actions.callAPI('getSsoUserList')).then(function(response) {
	// 		_this.setState({
	// 			item: response,
	// 		},function(){
	// 			console.log(this.state.item.items);
	// 		});
	// 	}).catch(function(err) {
	// 		Notify.show([{
	// 			message: err.message,
	// 			type: 'danger',
	// 		}]);
	// 	});
	//
	// }
	openNewCreate=()=>{
		this.setState({
			openNewCreate:!this.state.openNewCreate,
			searchParams: {
				page: 1,
				pageSize: '15'
			}
		})
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		let {searchParams} = this.state;
		var _this = this;
		var timer = +new Date();
		this.setState({
			itemDetail
		});
		if (type == 'data') {
			let orderId = itemDetail.id
			console.log(itemDetail);
		} else if (type == 'dele') {
			Store.dispatch(Actions.callAPI('delSsoUser',{id:itemDetail.id})).then(function(response) {
				_this.setState({
					searchParams: {
						page: 1,
						pageSize: '15',
						timer:timer
					}
				},function(){
					Message.success("删除成功");
					console.log(this.state.searchParams);
				})
			}).catch(function(err) {
				Message.error(err.message);
			});
		} else if (type=='reset') {
			Store.dispatch(Actions.callAPI('resetPassword',{},{id:itemDetail.id})).then(function(response) {
				Message.success('重置成功')
			}).catch(function(err) {
				Message.error(err.message);
			});
		} else if (type=='lock') {
			Store.dispatch(Actions.callAPI('lockAccount',{},{id:itemDetail.id})).then(function(response) {
				Message.success('已加锁')
			}).catch(function(err) {
				Message.error(err.message);
			});
		}
	}
	onNewCreateSubmit(searchParams) {
		searchParams = Object.assign({}, this.state.searchParams, searchParams);
		this.setState({
			searchParams,
			openNewCreate: !this.state.openNewCreate
		});

	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}
	openDataPermission=()=>{
		this.setState({
			openDataPermission:!this.state.openDataPermission,
		});
	}
	//搜索
	onSearchSubmit=(value)=>{
		let {searchParams}=this.state;
		console.log(searchParams);
		 if(value.filter=='company'){
			 this.setState({
				searchParams:{
					page:1,
					pageSize:15,
					accountName:value.content
				}
			 })
		}
		 if(value.filter=='city'){
			 this.setState({
				searchParams:{
					page:1,
					pageSize:15,
					realName:value.content
				}
			 })
		}
		 if(value.filter=='community'){
			 this.setState({
				searchParams:{
					page:1,
					pageSize:15,
					mobilePhone:value.content
				}
			 })
		}
		 if(value.filter=='people'){
			 this.setState({
				searchParams:{
					page:1,
					pageSize:15,
					email:value.content
				}
			 })
		}
	}
	render(){
		let {searchParams}=this.state;
		let options=[
		 {label:'登录名',value:'company'},
		 {label:'姓名',value:'city'},
		 {label:'手机号',value:'community'},
		 {label:'电子邮箱',value:'people'},
		]
		return(
			<div>
				<Section title="账户列表" >

	        <Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='getSsoUserList'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onExport={this.onExport}
							  >
						<TableHeader>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>登录名</TableHeaderColumn>
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>手机号</TableHeaderColumn>
						<TableHeaderColumn>电子邮箱</TableHeaderColumn>
						<TableHeaderColumn>锁定标识</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn style={{overflow:'hidden'}} name="id"></TableRowColumn>
							<TableRowColumn name="accountName"></TableRowColumn>
							<TableRowColumn name="realName"></TableRowColumn>
							<TableRowColumn name="mobilePhone"></TableRowColumn>
							<TableRowColumn name="email"></TableRowColumn>
							<TableRowColumn name="accountStatus" options={[{label:'未锁定',value:'NOTLOCK'},{label:'锁定',value:'LOCK'}]}></TableRowColumn>

							<TableRowColumn>
									<Button label="修改" onTouchTap={this.openNewCreate}  type="operation" operation="view"/>
								  <Button label="重置密码"  type="operation" operation="reset"/>

									<Button label="删除" type="operation" operation="dele"/>
									<Button label="数据" onTouchTap={this.openDataPermission} type="operation" operation="data"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>

					<TableFooter></TableFooter>

					</Table>
				</Section>
				<Dialog
						title="新建登录账号"
						modal={true}
						open={this.state.openNewCreate}
						onClose={this.openNewCreate}
						contentStyle={{width:500}}
				>
					<CreateAccount onSubmit={this.onNewCreateSubmit} />
				</Dialog>
				<Dialog
						title="编辑登录账号"
						modal={true}
						open={this.state.openNewCreate}
						onClose={this.openNewCreate}
						contentStyle={{width:500}}
				>
					<CreateAccount detail={this.state.itemDetail} onCancel={this.openNewCreate}/>
				</Dialog>
				<Dialog
						title="编辑数据权限"
						modal={true}
						open={this.state.openDataPermission}
						onClose={this.openDataPermission}
						contentStyle={{width:500,height:500}}
				>
					<DataPermission detail={this.state.itemDetail} onCancel={this.openDataPermission}/>
				</Dialog>
			</div>
		);
	}

}
export default reduxForm({form:'AccountList',enableReinitialize:true,keepDirtyOnReinitialize:true})(AccountList);
