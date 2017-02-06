import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';

import CreateAccount from './CreateAccount';
import DataPermission from './DataPermission';

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
	ListGroupItem,
	ListGroup,
	Dialog,
} from 'kr-ui';
import './index.less';
class AccountList  extends Component{

	constructor(props,context){
		super(props, context);

		this.state={
			searchParams:'',
			openNewCreate:false,
			openDataPermission:false,
		}
	}
	openNewCreate=()=>{
		this.setState({
			openNewCreate:!this.state.openNewCreate,
		})
	}
	openDataPermission=()=>{
		this.setState({
			openDataPermission:!this.state.openDataPermission,
		})
	}
	render(){
		return(
			<div>

				<Section title="账户列表" >
					<Row>
						<Col md={4}>
							<KrField
									label="登录名："
									style={{marginLeft:10}}
									heightStyle={{height:26,marginLeft:'17px'}}
									name="loginName"
									component="input"
									inline={true}
									placeholder=" "
									type="text"
							/>
						</Col>
						<Col md={4}>
							<KrField
									label="姓名："
									heightStyle={{height:26,marginLeft:'27px'}}
									name="idName"
									component="input"
									inline={true}
									placeholder=" "
									type="text"
							/>
						</Col>
						<Col md={4}>
							<KrField label="手机号："
									heightStyle={{height:26,marginLeft:'17px'}}
									name="mobileNum"
									component="input"
									inline={true}
									placeholder=" "
									type="text"
							/>
						</Col>
				</Row>
				<Row>
					<Col md={4}>
						<KrField label="邮箱："
								style={{marginLeft:10}}
								heightStyle={{height:26,marginLeft:'30px',width: '94.5%'}}
								name="mobileNum"
								component="input"
								inline={true}
								type="text"
								placeholder=" "
						/>
					</Col>
					<Col md={4}>
							<KrField label="锁定状态："
									name="mobileNum"
									type="select"
									heightStyle={{height:26,background:'#fff',width:'195%'}}
									inline={true}
							/>
					</Col>
					<Col md={4}>
						<ListGroup>
								<ListGroupItem style={{padding:'7px 50px 6px 17px'}}>
										<Button
												label="查询"
												type="submit"
												width={70}
												height={26}
												fontSize={14}
										 />
								</ListGroupItem>
								<ListGroupItem style={{paddingTop:7,paddingBottom:6}}>
										<Button
												label="新建"
												type="button"
												onClick={this.openNewCreate}
												width={70}
												height={26}
												fontSize={14}
										/>
								</ListGroupItem>
						</ListGroup>
					</Col>
				</Row>
	        <Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxFieldListName="finaContractMainbillVOList"
							ajaxUrlName='getFinaDataByList'
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
							<TableRowColumn style={{overflow:'hidden'}} name="mainbillname"></TableRowColumn>
							<TableRowColumn name="mainBillTypeName" options={[{label:'工位入驻订单',value:'STATION'}]}></TableRowColumn>
							<TableRowColumn name="stationnum"></TableRowColumn>
							<TableRowColumn name="come"></TableRowColumn>
							<TableRowColumn name="backMount"></TableRowColumn>
							<TableRowColumn name="mount"></TableRowColumn>

							<TableRowColumn>
									<Button label="修改" onTouchTap={this.openNewCreate}  type="operation" operation="view"/>
								  <Button label="重置密码"  type="operation" operation="view"/>
									<Button label="加锁"  type="operation" operation="view"/>
									<Button label="删除"  type="operation" operation="view"/>
									<Button label="数据" onTouchTap={this.openDataPermission} type="operation" operation="view"/>
								  {/*<Button label="生成对账单"  type="operation" operation="edit"/>*/}
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
					<CreateAccount />
				</Dialog>
				<Dialog
						title="编辑登录账号"
						modal={true}
						open={this.state.openNewCreate}
						onClose={this.openNewCreate}
						contentStyle={{width:500}}
				>
					<CreateAccount onCancel={this.openNewCreate}/>
				</Dialog>
				<Dialog
						title="编辑数据权限"
						modal={true}
						open={this.state.openDataPermission}
						onClose={this.openDataPermission}
						contentStyle={{width:500,height:500}}
				>
					<DataPermission onCancel={this.openDataPermission}/>
				</Dialog>
			</div>
		);
	}

}
export default reduxForm({form:'AccountList',enableReinitialize:true,keepDirtyOnReinitialize:true})(AccountList);
