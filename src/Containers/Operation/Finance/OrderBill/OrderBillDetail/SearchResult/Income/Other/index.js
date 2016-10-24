import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
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
	Notify,
	List,
 	ListItem,
	LabelText,
	Dialog,
	KrField,
	Form
} from 'kr-ui';
import ChangeAccountForm from './ChangeAccountForm';
class ViewForm extends Component{
	constructor(props,context){
		super(props,context);
	};
	
	render(){
		let detail=this.props.detail;
		console.log('detail',detail)
		return(
				<div>
					
					<KrField grid={1}  value={detail.accountName} component="labelText" label="代码名称" /> 
					<KrField grid={1}  value={detail.occuryear} component="labelText" label="付款日期" /> 
					<KrField grid={1}  value={detail.id} component="labelText" label="交易编号" /> 
					<KrField grid={1}  value={detail.finaflowAmount} component="labelText" label="金额（元）" /> 
					<KrField grid={1}  value={detail.finaflowdesc} component="labelText" label="备注" /> 
					<KrField grid={1}  value={detail.propcode} component="labelText" label="上传附件" />
				</div>	


			);
	}

}


export default class Other extends Component{
	static contextTypes =  {
        onInitSearchDialog: React.PropTypes.func,
    }
	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);
		this.openViewDialog=this.openViewDialog.bind(this);
		this.onOperation=this.onOperation.bind(this);
		this.openAddaccount=this.openAddaccount.bind(this);
		this.onConfrimSubmit=this.onConfrimSubmit.bind(this);

		this.openSearchDialog = this.openSearchDialog.bind(this);
		this.onSearchSuccess = this.onSearchSuccess.bind(this);
		this.state={
           item:{},
           Params:{},
           openview:false,
          Addaccount:false,
		}
	}


	componentDidMount() {
        
	}
	onSearchSuccess(){
		console.log('-----');
   }


   openSearchDialog(){
   	 this.context.onInitSearchDialog(this.onSearchSuccess,'INCOME');
   }
	//操作相关
	onOperation(type,itemDetail){

		this.setState({
			itemDetail
		});

		if(type == 'view'){
			this.openViewDialog();
		}
	}
	openViewDialog(){
		var _this=this;
		this.setState({
			openview:!this.state.openview
		})
	}
	openAddaccount(){
		this.setState({
			Addaccount:!this.state.Addaccount
		})
	}
	onConfrimSubmit(formValues){
		Store.dispatch(Actions.callAPI('supplementIncome',{},formValues)).then(function(){
			Notify.show([{
				message:'创建成功',
				type: 'danger',
			}]);
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});
		this.setState({
			Addaccount:!this.state.Addaccount
		})
	}
	render(){

	   let {params,type} = this.props;

	   let items=this.state.item.items;

	   
	    if(!items){
	    	items=[];
	    }

		if(params.childType != type){
			return  null;
		}
		const close=[
        <Button
        label="关闭"
        primary={true}
         style={{marginLeft:10}}
        onTouchTap={this.openViewDialog}
        />]
		return(

			 <div>
                   <Row>
					<Col md={2}><Button label="挂账" onTouchTap={this.openAddaccount}/></Col>
					<Col md={3}><Button label="高级查询"  type="button" onTouchTap={this.openSearchDialog}/></Col>
                  </Row>
			 <Table style={{marginTop:10}} ajax={true} displayCheckbox={false}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params} onOperation={this.onOperation} >
	              <TableHeader>
				          <TableHeaderColumn>序号</TableHeaderColumn>
				          <TableHeaderColumn>交易日期</TableHeaderColumn>
				          <TableHeaderColumn>代码</TableHeaderColumn>
				           <TableHeaderColumn>类别</TableHeaderColumn>
				          <TableHeaderColumn>款项</TableHeaderColumn>
				          <TableHeaderColumn>金额</TableHeaderColumn>
				           <TableHeaderColumn>备注</TableHeaderColumn>
				           <TableHeaderColumn>操作</TableHeaderColumn>
	              </TableHeader>
	              <TableBody>
	                <TableRow>
	                	<TableRowColumn name="id"></TableRowColumn>
	                    <TableRowColumn name="occuryear"></TableRowColumn>
	                    <TableRowColumn name="accountName"></TableRowColumn>
	                    <TableRowColumn name="recordType"></TableRowColumn>
	                    <TableRowColumn name="propertyName"></TableRowColumn>
	                    <TableRowColumn name="finaflowAmount"></TableRowColumn>
	                    <TableRowColumn name="finaflowdesc"></TableRowColumn>
	                    <TableRowColumn>
	                        <Button label="查看"  type="operation" operation="view"/>
	                    </TableRowColumn>
	                  </TableRow>
	              </TableBody>
            	</Table>
                 <Dialog
				title="查看"
				modal={true}
				open={this.state.openview}
				actions={close}
				>
					
				<ViewForm detail={this.state.itemDetail} onCancel={this.openViewDialog}  />
			  	</Dialog> 
                <Dialog
				title="添加挂账"
				modal={true}
				open={this.state.Addaccount}
				>
					
					<ChangeAccountForm onSubmit={this.onConfrimSubmit} onCancel={this.openAddaccount}  />
			  	</Dialog>

			</div>		

		);

	}

}







