import React, {Component, PropTypes} from 'react';

import {KrField,LabelText} from 'kr-ui/Form';

import {Button} from 'kr-ui/Button';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


export default class RenderTable extends Component {

  constructor(props,context){
    super(props, context);

  }

	render() {

		if(!this.props.items.length){
			return (


			<div>
				<Table  style={{marginTop:10}} displayCheckbox={true}>
					<TableHeader>
					<TableHeaderColumn>ID</TableHeaderColumn>
					<TableHeaderColumn>出租方名称</TableHeaderColumn>
					<TableHeaderColumn>是否启用</TableHeaderColumn>
					<TableHeaderColumn>地址</TableHeaderColumn>
					<TableHeaderColumn>创建人</TableHeaderColumn>
					<TableHeaderColumn>创建时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>


				

				<TableBody style={{paddingTop:10}}>
					<TableRow displayCheckbox={false}>
								<TableRowColumn colSpan={8} >
									<div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
									暂无数据
									</div>
								</TableRowColumn>
					</TableRow>
				</TableBody>

			

				</Table>
   			</div>
				);
		}

		return (

			<div>
				<Table  style={{marginTop:10}} displayCheckbox={true}>
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
					  {this.props.items.map((item,index)=> <TableRow key={index} displayCheckbox={true}>
							<TableRowColumn >{item.corporationName}</TableRowColumn>
							<TableRowColumn>{item.enableflag}</TableRowColumn>
							<TableRowColumn>{item.corporationAddress}</TableRowColumn>
							<TableRowColumn>{item.creater}</TableRowColumn>
							<TableRowColumn>{item.createdate}</TableRowColumn>
							<TableRowColumn>Steve Brown</TableRowColumn>
							<TableRowColumn>
								  <Button label="查看"  type="link"/>
								  <Button label="编辑"  type="link"/>
							 </TableRowColumn>
						 </TableRow>

				  )}
				</TableBody>

				<TableFooter></TableFooter>

				</Table>
   </div>
  );
  }
}






