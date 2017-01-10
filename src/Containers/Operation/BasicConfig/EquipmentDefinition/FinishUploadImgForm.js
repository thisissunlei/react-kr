
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import isRight from "./images/isRight.svg";
import './index.less';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  	ListGroup,
  	ListGroupItem,
	SearchForm,
	Message,
} from 'kr-ui';
class FinishUploadImgForm extends Component{
	constructor(props){
		super(props);
		// this.state={
		// 	searchForm: false
		// }
	}
	onLoaded(response) {
		let list = response;
		this.setState({
			list
		})
	}
	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		ids = String(ids);
		var url = `/api/krspace-finance-web/member/member-list-excel?ids=${ids}`
		window.location.href = url;
	}
	render(){
		// let {list}=this.state;
		let list = [{
						"community":"节点的社区",
						"doorNum":"CYN0001",
						"hardCardID":"000001"
					},{
						"community":"节点的社区",
						"doorNum":"CYN0002",
						"hardCardID":"000002"
					}]
		return (
			<div className="upload-img-box">
				<div className="upload-img-title">
					<img className="upload-img-right" src={isRight}/>
					<span className="upload-img-tip">50台设备图片上传完成</span>
				</div>
				<div className="upload-img-body">
					<Table className="member-list-table"
						style={{marginTop:10,position:'inherit'}}
						onLoaded={this.onLoaded}
						ajax={true}
						onProcessData={(state)=>{
							return state;
							}}
						exportSwitch={true}
						onExport={this.onExport}
						ajaxFieldListName='items'
						ajaxUrlName='membersList'
						ajaxParams={this.state.searchParams}
					>
						<TableHeader>
							<TableHeaderColumn>社区</TableHeaderColumn>
							<TableHeaderColumn>门编号</TableHeaderColumn>
							<TableHeaderColumn>智能硬件ID</TableHeaderColumn>
						</TableHeader>
						<TableBody style={{position:'inherit'}}>
							<TableRow>
								<TableRowColumn name="wechatNick"></TableRowColumn>
								<TableRowColumn name="email"></TableRowColumn>
								<TableRowColumn name="email"></TableRowColumn>
							</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
				</div>
				<div className="upload-img-footer"></div>
			</div>
		);
	}
}
export default FinishUploadImgForm = reduxForm({
	form: 'FinishUploadImgForm',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(FinishUploadImgForm);
