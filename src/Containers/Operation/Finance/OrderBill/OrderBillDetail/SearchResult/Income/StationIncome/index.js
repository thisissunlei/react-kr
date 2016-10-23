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

class SupplementForm extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          supplement:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(){
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}

	render(){
		
		return(
				
				<div>
					<p>是否确定补挂延期收入？</p>
					<Button  label="确定" type="button"  onTouchTap={this.onSubmit}/> 
					<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
				</div>
					
					
				
			);
	}
	
}



class ChangeAccountForm extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          Addaccount:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(){
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	
	render(){
		
		return(
				<Form name="jyayayoinForm"  onSubmit={this.onSubmit} >
					
					<KrField grid={1} name="accountid" component="select" label="代码名称" /> 
					<KrField grid={1} name="operatedate" type="date" component="date" label="付款日期" /> 
					<KrField name="preCode" component="group" label="金额正负">
		                <KrField name="preCode" label="正" type="radio" value="0"/>
		                <KrField name="preCode" label="负" type="radio" value="1" />
		            </KrField> 
					
					<KrField grid={1} name="finaflowamount" type="text" component="input" label="金额（元）" /> 
					<KrField grid={1} name="finaflowdesc" type="text" component="input" label="备注" /> 
					<KrField grid={1} name="fileids" component="file" label="上传附件" />
					<Button  label="确定" type="submit" primary={true} /> 
					<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
				</Form>

			);
	}

}

export default class StationIncome extends Component{

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
		this.openSupplement=this.openSupplement.bind(this);
		this.state={
           item:{},
           Params:{},
           openview:false,
          Addaccount:false,
          supplement:false,
		}
	}


	componentDidMount() {
        
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
	//补收入
	openSupplement(){
		this.setState({
			supplement:!this.state.supplement
		})
	}
	onSupplementSubmit(){
		/*Store.dispatch(Actions.callAPI('addIncome')).then(function(){
			Notify.show([{
				message:'创建成功',
				type: 'danger',
			}]);
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});*/
		/*this.setState({
			Addaccount:!this.state.Addaccount
		})*/
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
					<Col md={2}><Button label="补收入" primary={true} onTouchTap={this.openSupplement}/></Col>
                  </Row>

                   <Table style={{marginTop:10}} displayCheckbox={false} ajax={true}  ajaxUrlName='getPageAccountFlow'  ajaxParams={this.state.Params} onOperation={this.onOperation} >
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
					
					<ChangeAccountForm onSubmit={this.onConfrimSubmit}  onCancel={this.openAddaccount}  />
			  	</Dialog>
			  	<Dialog
				title="补收入"
				modal={true}
				open={this.state.supplement}
				>
					
					<SupplementForm onSubmit={this.onSupplementSubmit}  onCancel={this.openSupplement}  />
			  	</Dialog>
			</div>		

		);

	}

}







