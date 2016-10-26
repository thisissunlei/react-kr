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
import QuitMoney from './QuitMoney';

var fiMoney='';
var fiItem={};
var receivedList=[];
var url=window.location.href;
var url_arr=url.split('/');
class ViewForm extends Component{

	constructor(props,context){
		super(props,context);
	}
	
	render(){
      
       let items=this.props.detail

	   console.log("5555",items);
	  
	   


		return(
				<div>					
					<KrField grid={1}  component="labelText" label="代码名称" value={items.accountName}/> 
					<KrField grid={1}  component="labelText" label="付款日期" value={items.occuryear}/> 
					<KrField grid={1}  component="labelText" label="交易编号" value={items.tradingCode}/> 
					<KrField grid={1}  component="labelText" label="金额（元）" value={items.finaflowAmount}/> 
					<KrField grid={1}  component="labelText" label="备注" value={items.finaflowdesc}/> 
					<KrField grid={1}  component="labelText" label="上传附件" />
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
		
		
		this.openReceivedDialog=this.openReceivedDialog.bind(this);
		this.openQuitDialog=this.openQuitDialog.bind(this);
		this.openSearchDialog = this.openSearchDialog.bind(this);
		this.openViewDialog=this.openViewDialog.bind(this);
		
		this.quitMoneyDialog=this.quitMoneyDialog.bind(this);		
		this.receivedDialog=this.receivedDialog.bind(this);
	
		
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.onQuitSubmit=this.onQuitSubmit.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onSearchSuccess = this.onSearchSuccess.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSelect = this.onSelect.bind(this);
		
        
		  this.state = {

            list:[],
            selectedList:[],
            listValues:[],



            itemDetail:{},

			openReceive:false,
			openQuit:false,
			openView:false,

			isLoading:false,

			receivedList:[],

			listParams:{
				orderId:url_arr[url_arr.length-2],
				pageNum:1,
				pageSize:20,
				accountType:'PAYMENT'
			},
	     }
   }
   

   onSearchSuccess(form){
   		let {listParams} = this.state;
   		listParams = form;
	    this.setState({
			listParams	
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

	componentDidMount() {
       
	}
   
	openViewDialog(){
		this.setState({
			openView:!this.state.openView
		});
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
 		      	 receivedList.push(list);		      	 	      	                                            
              })
              receivedList.map(function(item,index){
				 item.label=item.accountname;
                 item.value=item.id;
				 return item;
			    });

 		        _this.setState({
			      receivedList:receivedList
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
   
    receivedDialog(){
   	  this.setState({
		 openReceive:!this.state.openReceive,			
		});	 
		receivedList=[]; 
   }
   
     openQuitDialog(){
           let items=this.state.selectedList
           var _this=this;          
           items.map(function(item,index){
             if(typeof(item.finaflowAmount)=='number'){
                 fiMoney=item.finaflowAmount;
                 fiItem=item                 
              }
           })

           if(this.state.listValues.length==0){
           	 alert('请选择一条回款数据进行退款');
           }else if(this.state.listValues.length>1){
           	  alert('只能选择一条数据');
           }else if(fiMoney>=0){
              alert('金额必须为负且存在可用金额');
           }else{
           	 this.setState({
			  openQuit:!this.state.openQuit
		      });
            }
         }
           
    
    

	 quitMoneyDialog(){
		this.setState({	    
			openQuit:!this.state.openQuit,
		});	 
	 }


	  onAddReceivedSubmit(params){  //获取提交时的params	  	  
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

		receivedList=[]; 

    }
    
    //获取提交时的params
    onQuitSubmit(params){ 
    	  params= Object.assign({},params);
	  	  //params.fileids=JSON.stringify(params.fileids);
		  var _this = this;
		  params.operatedate=dateFormat(params.operatedate,"yyyy-mm-dd h:MM:ss");
	      Store.dispatch(Actions.callAPI('payBack',{},params)).then(function(response){  //post请求   
 		  }).catch(function(err){
			Notify.show([{
				message:message,
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openQuit:!this.state.openQuit,
			isLoading:true
		});	  


    }



    onSelect(values){
        console.log("111111",values)

        //此处反着？
    	let {list,selectedList} = this.state;
    	selectedList = list.map(function(item,index){            
				if(values.indexOf(index)){
					return false;
				}
				return item;			           
    	});

    	this.setState({
    		selectedList,
    		listValues:values
    	});


      
    }

    onLoaded(response){
    	let list = response.items;    
    	this.setState({
    		list
    	})
    }

	render(){

		let {params,type,handleSubmit} = this.props;
		
		if(params.childType != type){
			return  null;
		}
		

		
        console.log("asasaaaa",fiItem)
        
        
        
       

       
       let initialValues = {
			id:fiItem.id
		}
		let initialValue = {
			mainbillid:url_arr[url_arr.length-2],
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


                  <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.openReceivedDialog}/></Col>
					<Col md={2}><Button label="退款" primary={true} onTouchTap={this.openQuitDialog}/></Col>
					<Col><Button label="高级查询"  type="button"  onTouchTap={this.openSearchDialog}/></Col>
                  </Row>
       
               
               <Table style={{marginTop:10}} ajax={true} loading={this.state.isLoading} onSelect={this.onSelect} onLoaded={this.onLoaded}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.listParams} onOperation={this.onOperation}>
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
	                        <Button label="查看"  type="operation" operation="view"/>
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
					  <ReceivedMoney onSubmit={this.onAddReceivedSubmit} initialValues={initialValue} onCancel={this.receivedDialog} optionList={this.state.receivedList}/>

				  </Dialog>

                   

                   <Dialog
						title='退款'
						modal={true}
						open={this.state.openQuit}
					>
					 <QuitMoney onSubmit={this.onQuitSubmit} onCancel={this.quitMoneyDialog} items={this.state.selectedList} initialValues={initialValues}/>  
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







