import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector} from 'redux-form';

import {KrField,LabelText} from 'kr-ui/Form';

import {Button} from 'kr-ui/Button';

import {
	Notify
} from 'kr-ui';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';




let LessorUpdateForm = function(props){
	console.log('props',props)
  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

	return (

			<form onSubmit={handleSubmit(onSubmit)}>


							<KrField name="corporationName" type="text" label="出租方名称" /> 

							<KrField name="enableflag" component="group" label="是否启用">
								<KrField name="enableflag" label="是" component="radio" type="radio" value="1"/>
								<KrField name="enableflag" label="否" component="radio" type="radio" value="0" />
							</KrField>
							
							<KrField name="corporationAddress" component="text" type="text" label="详细地址"/> 
							 <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 


							<Grid style={{marginTop:30}}>
								<Row style={{marginTop:30}}>
								<Col md={8}></Col>
								<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
								</Row>
							</Grid>

				</form>

	);

}



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


 class RenderTable extends Component {

  constructor(props,context){
    super(props, context);

	  this.confirmUpdateSubmit = this.confirmUpdateSubmit.bind(this);
	  this.cancelUpdateSubmit = this.cancelUpdateSubmit.bind(this);
	  this.renderTableBody = this.renderTableBody.bind(this);
	  this.onPageChange = this.onPageChange.bind(this);

	  this.state = {
		  openView:false,
		  openUpdate:false,
		  page:1,
		  loading:false,
		  item:{}
	  }



  }

  onPageChange(page){
  	console.log('page----',page)
  		this.setState({
  			page:page,
  			loading:!this.state.loading
  		});

  		var {actions} = this.props;
  		var _this = this;
		actions.callAPI('fnaCorporationList',{ 
			page:page,

		},page).then(function(response){ 
			
		}).catch(function(err){ });

		var _this = this;
		window.setTimeout(function(){
			_this.setState({
  			loading:!_this.state.loading
  		   });
		},1000);

  }

	 componentDidMount(){
		 this.setState({
  			loading:!this.state.loading
  		});
		 var _this = this;
		window.setTimeout(function(){
			_this.setState({
  			loading:!_this.state.loading
  		   });
		},1000);
	 }

	 componentWillReceiveProps(nextProps){


	 }

  confirmCreateSubmit(values){

		var {actions} = this.props;
		var _this = this;

		actions.callAPI('addFnaCorporation',{ },values).then(function(response){ }).catch(function(err){ });

	}

	 confirmUpdateSubmit(values){

		var {actions} = this.props;
		var _this = this;

		actions.callAPI('editFnaCorporation',{ },values).then(function(response){ 
			console.log('------*******',response)
			/*Notify.show([{
				message:'更新成功',
				type: 'success',
			}]);*/


		}).catch(function(err){ 

			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);

		});


	 this.openUpdateDialog();
	 	window.location.reload();

	 }


	 cancelUpdateSubmit(){

		this.setState({
			openUpdate:!this.state.openUpdate
		});
	 }
	openUpdateDialog(index){

	  const list = this.props.items;

		this.setState({
			openUpdate:!this.state.openUpdate
		});

		LessorUpdateForm= reduxForm({
		  form: 'orderUpdateForm',
			initialValues:list[index]
		})(LessorUpdateForm);

	}


  openViewDialog(index){


	  const list = this.props.items;
	  console.log('item',list[index]);


		this.setState({
			item:list[index],
			openView:!this.state.openView
		});

  }


	renderTableBody(){

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
				<Table  style={{marginTop:10}} displayCheckbox={true}  page={this.state.page} loading={this.state.loading}>
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
				<Table  style={{marginTop:10}} onPageChange={this.onPageChange} page={this.state.page} loading={this.state.loading} >
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
					  {this.props.items && this.props.items.length && this.props.items.map((item,index)=> <TableRow key={index}>
							<TableRowColumn >{item.id}</TableRowColumn>
							<TableRowColumn>{item.corporationName}</TableRowColumn>
							<TableRowColumn>{item.enableflag?'是':'否'}</TableRowColumn>
							<TableRowColumn>{item.corporationAddress}</TableRowColumn>
							<TableRowColumn>{item.creater}</TableRowColumn>
							<TableRowColumn>{item.createdate}</TableRowColumn>
							<TableRowColumn>
								  <Button label="查看"  type="link" onClick={this.openViewDialog.bind(this,index)}/>
								  <Button label="编辑"  type="link" onClick={this.openUpdateDialog.bind(this,index)} />
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

				<Dialog
			title="编辑"
			modal={true}
			open={this.state.openUpdate}
				>
				<LessorUpdateForm onSubmit={this.confirmUpdateSubmit} onCancel={this.cancelUpdateSubmit}/>
	  </Dialog>

   </div>
  );
  }
}


export default connect()(RenderTable );
