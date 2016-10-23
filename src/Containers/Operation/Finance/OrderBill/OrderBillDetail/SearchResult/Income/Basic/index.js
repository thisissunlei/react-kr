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
	Form,
	Dialog,
	KrField,
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
class SearchForm extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          openSearch:false,

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
		let detail=this.props.detail;
		console.log('detail',detail)
		return(
				<Form name="SearchForm"  onSubmit={this.onSubmit} >
					
					<KrField grid={1} name="accountType" component="select" label="代码" /> 
					<KrField grid={1} name="operatedate" type="select" component="date" label="款项" />
					<KrField grid={1/2} name="startTime" component="date" label="开始日期" />
					<KrField grid={1/2} name="endTime" component="date" label="结束日期" />
					<Button  label="确定" type="submit" primary={true} /> 
					<Button  label="取消" type="button" onTouchTap={this.onCancel} /> 
				</Form>


			);
	}

}

export default class Basic extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);
		this.openViewDialog=this.openViewDialog.bind(this);
		this.onOperation=this.onOperation.bind(this);
		this.openSearchDialog=this.openSearchDialog.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
           item:{},
           Params:{
           	accountType:'INCOME',
           },
           openview:false,
           openSearch:false
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
	//高级搜索
	openSearchDialog(){
		this.setState({
			openSearch:!this.state.openSearch
		})
	}
	onSubmit(){

	}
	//查看
	openViewDialog(){
		var _this=this;
		this.setState({
			openview:!this.state.openview
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
        />
      ]
		return(

			 <div>
			 	<Button label="高级查询"  type="link" onTouchTap={this.openSearchDialog}/>
            <Table style={{marginTop:10}} displayCheckbox={false} ajax={true}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params} onOperation={this.onOperation} >
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
			title="高级查询"
			modal={true}
			open={this.state.openSearch}
			>
				
			<SearchForm  onSubmit={this.onSubmit} onCancel={this.openSearchDialog}  />
		  	</Dialog>
		  	

			</div>		

		);

	}

}







