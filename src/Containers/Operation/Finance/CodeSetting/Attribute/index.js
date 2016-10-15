import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
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
		Dialog,
} from 'kr-ui';


import NewCreateForm from './NewCreateForm';


export default class AttributeSetting  extends Component{

	constructor(props,context){
		super(props, context);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onNewCreateCancel = this.onNewCreateCancel.bind(this);


		this.state = {
			openNewCreate:false,
		}
	}

	componentDidMount() {

	}

	openNewCreateDialog(){
		this.setState({
			openNewCreate:!this.state.openNewCreate
		});
	}

	onSubmit(form){
		console.log('---',form);
	}

	render(){

		return(

			<div>
					<Section title="属性配置" description="" >

					<Grid>
						<Row>
							<Col md={8}> <Button label="新建" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
							<Col md={4} align="right"> 
							</Col> 
						</Row>
					</Grid>


				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='findFinaFinaflowPropertyList' ajaxParams={{
					page:'',
					pageSize:''
				}} >
					<TableHeader>
					<TableHeaderColumn>属性编码</TableHeaderColumn>
					<TableHeaderColumn>属性名称</TableHeaderColumn>
					<TableHeaderColumn>是否启用</TableHeaderColumn>
					<TableHeaderColumn>属性类别</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>创建人</TableHeaderColumn>
					<TableHeaderColumn>创建时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn name="propdesc" ></TableRowColumn>
						<TableRowColumn name="propname" ></TableRowColumn>
						<TableRowColumn name="enableflag"></TableRowColumn>
						<TableRowColumn name="proptype"></TableRowColumn>
						<TableRowColumn name="ordernum"></TableRowColumn>
						<TableRowColumn name="creatername"></TableRowColumn>
						<TableRowColumn name="createdate"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="link" />
							  <Button label="编辑"  type="link" />
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="新建"
						modal={true}
						open={this.state.openNewCreate}
					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.onNewCreateCancel} />

				  </Dialog>
			</div>		

		);

	}

}

