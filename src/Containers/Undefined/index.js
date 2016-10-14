import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter,
	Button,
} from 'kr-ui';

import Section from 'kr-ui/Section';

import LocationMap from 'kr-ui/Global/LocationMap';




import {List, ListItem} from 'material-ui/List';

import './index.less';



import {Form,Field} from 'kr-ui/MyForm';


class Undefined extends Component{

	constructor(props,context){
		super(props, context);

		this.submit = this.submit.bind(this);
		this.setGet = this.setGet.bind(this);

		this.state={
			get:false
		}

	}

	componentDidMount() {

	}

	submit(values){
		console.log('---values',values);
	}

	setGet(){
		console.log('click setGet');
		this.setState({
			get:true
		})
	}

	render(){



		return(

			<div>
					<Section title="出错了" description="" >

				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='fnaCorporationList' ajaxParams={{
					corporationName:'',
					page:'',
					pageSize:''
				}} >
					<TableHeader>
					<TableHeaderColumn>ID</TableHeaderColumn>
					<TableHeaderColumn>出租方名称</TableHeaderColumn>
					<TableHeaderColumn>是否启用</TableHeaderColumn>
					<TableHeaderColumn>地址</TableHeaderColumn>
					<TableHeaderColumn>创建人</TableHeaderColumn>
					<TableHeaderColumn>创建时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						  <TableRow displayCheckbox={true}>
							<TableRowColumn name="id" ></TableRowColumn>
							<TableRowColumn name="corporationName"></TableRowColumn>
							<TableRowColumn name="enableflag"></TableRowColumn>
							<TableRowColumn name="corporationAddress"></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
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
			</div>		

		);

	}

}




function mapStateToProps(state){


	return {
		items:state.notify.items,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Undefined);


