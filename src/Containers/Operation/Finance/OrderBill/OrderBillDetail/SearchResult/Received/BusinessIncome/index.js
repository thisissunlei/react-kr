import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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
	KrField
} from 'kr-ui';

import ReceivedMoney from './ReceivedMoney';


var arr=[];
class ViewForm extends Component{
	constructor(props,context){
		super(props,context);
	}
	
	render(){
      
       let items=this.props.detail
	   //console.log("5555",items)
        

		return(
				<div>					
					<KrField grid={1}  component="labelText" label="代码名称" value={items.accountName}/> 
					<KrField grid={1}  component="labelText" label="付款日期" value={items.occuryear}/> 
					<KrField grid={1}  component="labelText" label="交易编号" value={items.tradingCode}/> 
					<KrField grid={1}  component="labelText" label="金额（元）" value={items.finaflowAmount}/> 
					<KrField grid={1}  component="labelText" label="备注" value={items.finaflowdesc}/> 
					<KrField grid={1}  component="labelText" label="上传附件" value={items.accountName}/>
				</div>	


			);
	 }
}
export default class Basic extends Component{
    
    static contextTypes =  {
        onInitSearchDialog: React.PropTypes.func,
    }


	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
		
	}

	constructor(props,context){
		super(props, context);
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.ReceivedDialog=this.ReceivedDialog.bind(this);
		this.openReceivedDialog=this.openReceivedDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.openViewDialog=this.openViewDialog.bind(this);
		
		this.openSearchDialog = this.openSearchDialog.bind(this);
		this.onSearchSuccess = this.onSearchSuccess.bind(this);


        
		  this.state = {
		  	initialValues:{},
			openReceive:false,
			openView:false,
			itemDetail:{},
			arr:[],

			isLoading:false,

			Params:{
                orderId:this.props.params.orderId,
				accountType:'PAYMENT',
				page:1,
				pageSize:20,
				propertyId:this.props.params.id
	         }
			
			
	     }
   }

    onSearchSuccess(form){
		
   		let {Params} = this.state;
   		Params = form;
	    this.setState({
			Params	
	    });

	    
   }


   openSearchDialog(){

   	  
   	  this.context.onInitSearchDialog(this.onSearchSuccess,'PAYMENT');
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
		this.setState({
			openView:!this.state.openView
		});
	}

	componentDidMount() {
       
        
	}
    
    openReceivedDialog(){
    	 var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	accountType:'PAYMENT'
	      })).then(function(response){  
	         
 		      response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.id=item.id;
 		      	 list.accountname=item.accountname;
 		      	 arr.push(list);		      	 	      	                                            
              })
              arr.map(function(item,index){
				 item.label=item.accountname;
                 item.value=item.id;
				 return item;
			    });

 		        _this.setState({
			      arr:arr
		       });             		   
 		}).catch(function(err){
			Notify.show([{
				message:message,
				type: 'danger',
			}]);
		 });
        this.setState({
			openReceive:!this.state.openReceive
		});
    }

   
    ReceivedDialog(){
   	  this.setState({
		 openReceive:!this.state.openReceive,			
		});	 
   }
   
   
     



	  onAddReceivedSubmit(params){  	  	  
	  	  //params.fileids=JSON.stringify(params.fileids);
	  	  params= Object.assign({},params);
	  	  params.receiveDate=dateFormat(params.receiveDate,"yyyy-mm-dd h:MM:ss");
		  var _this = this;
	      Store.dispatch(Actions.callAPI('receiveMoney',{},params)).then(function(response){  
 		    
 		}).catch(function(err){
			Notify.show([{
				message:message,
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openReceive:!this.state.openReceive,
			isLoading:true
		});	  
    }

   

	render(){

		let {params,type,handleSubmit} = this.props;

		
		
		if(params.childType != type){
			return  null;
		}
		
		
       

       let initialValues = {
			mainbillid:params.orderId,
		}
	 
	  console.log("aaax7777",this.state.Params)

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
                  <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.openReceivedDialog}/></Col>
					<Col md={2}><Button label="开票" primary={true}/></Col>
					<Col><Button label="高级查询"  type="button"  onTouchTap={this.openSearchDialog}/></Col>
                  </Row>
       
               
               <Table displayCheckbox={false} style={{marginTop:10}} loading={this.state.isLoading} ajax={true}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params} onOperation={this.onOperation}>
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
	                    <TableRowColumn name="typeName"></TableRowColumn>
	                    <TableRowColumn name="propertyName"></TableRowColumn>
	                    <TableRowColumn name="finaflowAmount"></TableRowColumn>
	                    <TableRowColumn name="finaflowdesc"></TableRowColumn>
	                    <TableRowColumn>
	                        <Button label="查看"  type="operation" operation="view" />
	                    </TableRowColumn>
	                  </TableRow>
	              </TableBody>
	              <TableFooter></TableFooter>
              </Table>

			


               <Dialog
						title='添加回款'
						modal={true}
						open={this.state.openReceive}
					>
					  <ReceivedMoney onSubmit={this.onAddReceivedSubmit} onCancel={this.ReceivedDialog} optionList={this.state.arr} initialValues={initialValues} />

				  </Dialog>

                   
                <Dialog
						title="查看"
						modal={true}
						open={this.state.openView}
						actions={close}
						>
				
						<ViewForm detail={this.state.itemDetail} onCancel={this.openViewDialog} />
					 </Dialog>   

                  

			</div>		

		);

	}

}







