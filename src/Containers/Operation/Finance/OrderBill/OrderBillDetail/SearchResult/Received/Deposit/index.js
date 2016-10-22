import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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
	Notify,
	List,
 	ListItem,
	LabelText,
	Dialog,
	KrField
} from 'kr-ui';
var arr=[];
var arr1=[];
import {Actions,Store} from 'kr/Redux';

export default class Deposit extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.onSwitchSubmit=this.onSwitchSubmit.bind(this);
		this.onQuitSubmit=this.onQuitSubmit.bind(this);
		this.onBusinessSubmit=this.onBusinessSubmit.bind(this)

		this.ReceivedDialog=this.ReceivedDialog.bind(this);
        this.QuitMoneyDialog=this.QuitMoneyDialog.bind(this);
        this.SwitchDialog=this.SwitchDialog.bind(this);
        this.BusinessDialog=this.BusinessDialog.bind(this);

		this.openReceivedDialog=this.openReceivedDialog.bind(this);
		this.openQuitDialog=this.openQuitDialog.bind(this);
		this.openSwitchDialog=this.openSwitchDialog.bind(this);
		this.openBusinessDialog=this.openBusinessDialog.bind(this);
		
		

		this.state={
           item:{},
           openReceive:false,
           openSwitch:false,
           openBusiness:false,
           openQuit:false,
           arr:[],
           arr1:[]
		}
	}

     ReceivedMoney(){ 
		  var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	
	      })).then(function(response){  //post请求

	          console.log("ttttt",response);
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
				message:'报错了',
				type: 'danger',
			}]);
		 });
        this.setState({
			openReceive:!this.state.openReceive
		});
    }

     onAddReceivedSubmit(params){  //获取提交时的params  	  
	  	  //params.fileids=JSON.stringify(params.fileids);
	  	  console.log("gggg",params);
		  var _this = this;
	      Store.dispatch(Actions.callAPI('receiveMoney',{},params)).then(function(response){  //post请求   		    
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
	    _this.setState({
			openReceive:!this.state.openReceive
		});	  
    }
 
    ReceivedDialog(){
		this.setState({
			openReceive:!this.state.openReceive,			
		});	 
	 }

     
     SwitchMoney(){ 
           var _this = this;
	       Store.dispatch(Actions.callAPI('findContractListById',{
	       	  id:'1'
	       })).then(function(response){ 
               response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.id=item.id;
 		      	 list.accountname=item.contractcode;
 		      	 arr1.push(list);		      	 	      	                                            
              })
                arr1.map(function(item,index){
				 item.label=item.contractcode;
                 item.value=item.id;
				 return item;
			    });
 		        _this.setState({
			      arr1:arr1
		       });      
 		    }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
        this.setState({
			openSwitch:!this.state.openSwitch
		});       
    }


     onSwitchSubmit(params){  //获取提交时的param
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToDeposit',{},params)).then(function(response){  //post请求   
 		  }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });       
	    _this.setState({
			openSwitch:!this.state.openSwitch
		});	  
    }
      

     SwitchDialog(){
		this.setState({	    
			openSwitch:!this.state.openSwitch,
		});	 
	 }


     
     BusinessMoney(){ 
        this.setState({
			openBusiness:!this.state.openBusiness
		});       
    }
     
     onBusinessSubmit(params){  //获取提交时的param  	  
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToOperateIncome',{},params)).then(function(response){  //post请求   
 		  }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openBusiness:!this.state.openBusiness
		});	  
    }
     

     BusinessDialog(){
		this.setState({	    
			openBusiness:!this.state.openBusiness,
		});	 
	 }
     
     QuitMoneyDialog(){
		this.setState({	    
			openQuit:!this.state.openQuit,
		});	 
	 }
    
    onQuitSubmit(params){  //获取提交时的params
	  	  //params.fileids=JSON.stringify(params.fileids);
		  var _this = this;
	      Store.dispatch(Actions.callAPI('payBack',{},params)).then(function(response){  //post请求   
 		  }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openQuit:!this.state.openQuit
		});	  
    }
    

     QuitMoneyDialog(){
		this.setState({	    
			openQuit:!this.state.openQuit,
		});	 
	 }



	componentDidMount() {
        var _this = this;
		Store.dispatch(Actions.callAPI('getPageAccountFlow')).then(function(response){      
			_this.setState({
				item:response
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}
    
    
    
    

   

    

	render(){

		let {params,type,handleSubmit} = this.props;

		if(params.childType != type){
			return  null;
		}

        let items=this.state.item.items;

	   
	    if(!items){
	    	items=[];
	    }

	    //console.log("dedede",this.state.item)
        

		return(

			 <div>
               <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.openReceivedDialog}/></Col>
					<Col md={2}><Button label="转押金" primary={true} onTouchTap={this.openSwitchDialog}/></Col>
					<Col md={2}><Button label="转营业外收入" primary={true} onTouchTap={this.openBusinessDialog}/></Col>
					<Col md={2}><Button label="退款" primary={true} onTouchTap={this.openQuitDialog}/></Col>
                  </Row>

                  
                  <Table displayCheckbox={false}>
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
                        
                         {items.map((item,index)=><TableRow key={index}>
			              <TableRowColumn>{index+1}</TableRowColumn>
			              <TableRowColumn>{item.occuryear}</TableRowColumn>
			              <TableRowColumn>{item.accountName}</TableRowColumn>
			              <TableRowColumn>{item.recordType}</TableRowColumn>
			              <TableRowColumn>{item.propertyName}</TableRowColumn>
			              <TableRowColumn>{item.finaflowAmount}</TableRowColumn>
			               <TableRowColumn>{item.finaflowdesc}</TableRowColumn>
			              <TableRowColumn>
							  <Button label="查看" component="labelText" type="link"/>
						 </TableRowColumn>
			            </TableRow>
			         )}
			         

           </TableBody>
       </Table> 


              <Dialog
						title='添加回款'
						modal={true}
						open={this.state.openReceive}
					>
					  <ReceivedMoney onSubmit={this.onAddReceivedSubmit} onCancel={this.ReceivedDialog} optionList={this.state.arr} initialValues={this.state.initialValues} />

				  </Dialog>
                   
                    <Dialog
						title='转押金'
						modal={true}
						open={this.state.openSwitch}
					>
					 <SwitchMoney onSubmit={this.onSwitchSubmit} onCancel={this.SwitchDialog} optionList={this.state.arr1} initialValues={this.state.initialValues}/> 
				  </Dialog>
                    
                    
                    <Dialog
						title='转营业外收入'
						modal={true}
						open={this.state.openBusiness}
					>
					  <BusinessMoney onSubmit={this.onBusinessSubmit} onCancel={this.BusinessDialog} />  
				  </Dialog>

                  <Dialog
						title='退款'
						modal={true}
						open={this.state.openQuit}
					>
					 <QuitMoney onSubmit={this.onQuitSubmit} onCancel={this.QuitMoneyDialog}/>  
				  </Dialog>

                   
			</div>		

		);

	}

}







