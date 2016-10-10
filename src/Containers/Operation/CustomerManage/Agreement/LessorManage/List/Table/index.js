import React, {Component, PropTypes} from 'react';

import {KrField,LabelText} from 'kr-ui/Form';

import {Button} from 'kr-ui/Button';

import {Dialog,Snackbar} from 'material-ui';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


const ViewHtml = (props)=>{

	return (
		<div>
				<KrField component="labelText" label="出租方名称" value={props.item.corporationName} /> 
				<KrField name="enableflag" component="labelText"  label="是否启用" value={props.item.enableflag?'是':'否'} /> 
				<KrField name="corporationName" component="labelText"  label="出租方名称" value={props.item.corporationName} /> 
				<KrField name="corporationAddress" component="labelText" type="text" label="详细地址"  value={props.item.corporationAddress}/> 
				<KrField name="corporationDesc" component="labelText" label="备注"  placeholder="备注信息" value={props.item.corporationDesc}/> 

	</div>
	);
}


export default class RenderTable extends Component {

  constructor(props,context){
    super(props, context);


	  this.state = {
		  openView:false,
		  item:{}
	  }

  }

  openViewDialog(index){

	  const list = this.props.items;
	  console.log('item',list[index]);

		this.setState({
			item:list[index],
			openView:!this.state.openView
		});

  }


	render() {

		 const actions = [
			  <Button
				label="关闭"
				primary={true}
				 style={{marginLeft:10}}
				onTouchTap={this.openViewDialog.bind(this)}
			  />,
			];

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
								  <Button label="查看"  type="link" onClick={this.openViewDialog.bind(this,index)}/>
								  <Button label="编辑"  type="link" onTouchTap={this.openViewDialog} />
							 </TableRowColumn>
						 </TableRow>

				  )}
				</TableBody>

				<TableFooter></TableFooter>

				</Table>


				<Dialog
			title="查看"
			modal={true}
			actions={actions}
			open={this.state.openView}
				>
				<ViewHtml item={this.state.item}/>
			  </Dialog>
   </div>
  );
  }
}






