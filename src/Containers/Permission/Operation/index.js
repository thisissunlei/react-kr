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
class AccountList extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: '',
			openNewCreate: false,
			openDataPermission: false,
		}
	}
	openNewCreate = () => {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
		})
	}
	openDataPermission = () => {
		this.setState({
			openDataPermission: !this.state.openDataPermission,
		})
	}
	render() {
		return (
			<div>

				<Section title="操作项" >
					
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
				
			</div>
		);
	}

}
export default reduxForm({
	form: 'AccountList',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(AccountList);