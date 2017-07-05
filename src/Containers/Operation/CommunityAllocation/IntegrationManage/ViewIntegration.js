import React from 'react';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
} from 'kr-ui';
import './index.less';


export default class ViewIntegration extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15,
				customerId:this.props.detail.customerId
			}
			
		}
		
	}
	

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			
			let {
				infoList,
				ifCity,
			}=this.state;
			
		return (
			<div className="g-view-integration">
				<div className="u-create-title">
						<div className="title-text">积分消费记录</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<div style={{paddingLeft:50}}>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-point-detail'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  displayCheckbox={false}
					  >
				            <TableHeader>
				              <TableHeaderColumn>客户名称</TableHeaderColumn>
				              <TableHeaderColumn>社区</TableHeaderColumn>
				              <TableHeaderColumn>记录描述</TableHeaderColumn>
				              <TableHeaderColumn>积分</TableHeaderColumn>
				              <TableHeaderColumn>操作人</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="customerName" ></TableRowColumn>
					                <TableRowColumn name="cmtName"></TableRowColumn>
					                <TableRowColumn name="memberQuantity" ></TableRowColumn>
					                <TableRowColumn name="remainPoint" ></TableRowColumn>
					                <TableRowColumn>
					                	<Button label="消费记录"  type="operation"  operation="view"/>
									  	<Button label="充值"  type="operation"  operation="give"/>
					                </TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
					<Grid style={{marginTop:50,width:'96%',marginBottom:20}}>
					<Row >
					<Col md={12} align="center">
						<ButtonGroup>
							<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
						</ButtonGroup>
					  </Col>
					</Row>
					</Grid>
				</div>
			</div>
		);
	}
}



