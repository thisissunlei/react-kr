import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
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

var arr=[];
export default class Basic extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
		detailResult:React.PropTypes.object,
	}

	constructor(props,context){
		super(props, context);
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.ReceivedDialog=this.ReceivedDialog.bind(this);
		this.openReceivedDialog=this.openReceivedDialog.bind(this);
		this.openQuitDialog=this.openQuitDialog.bind(this);
		this.onQuitSubmit=this.onQuitSubmit.bind(this);
		this.QuitMoneyDialog=this.QuitMoneyDialog.bind(this);
        
		  this.state = {
		  	initialValues:{},
			openReceive:false,
			openQuit:false,
			arr:[],
			
	     }
   }

	componentDidMount() {

        var _this = this;
        let initialValues = {};
		Store.dispatch(Actions.callAPI('getAccountFlow',{
			accountType:'PAYMENT',
			mainbillid:'3'
		})).then(function(response){
             initialValues.mainbillid =response.topdata.mainbillid;  
			_this.setState({
				initialValues
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

	}
    
    openReceivedDialog(){
    	 var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	
	      })).then(function(response){  //post请求
	         
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
   
    ReceivedDialog(){
   	  this.setState({
		 openReceive:!this.state.openReceive,			
		});	 
   }
   
     openQuitDialog(){
        this.setState({
			openQuit:!this.state.openQuit
		});
    }
    
    

	 QuitMoneyDialog(){
		this.setState({	    
			openQuit:!this.state.openQuit,
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

	render(){

		let {params,type,detailResult,handleSubmit} = this.props;
		let items=detailResult.items;
		if(params.childType != type){
			return  null;
		}
		if(!items){
			items=[];
		}
        

        console.log("cvcv",params.childType);
        console.log("cvcv",type);
	 
		return(

			 <div>
                  <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.openReceivedDialog}/></Col>
					<Col md={2}><Button label="退款" primary={true} onTouchTap={this.openQuitDialog}/></Col>
                  </Row>
       
                  <Table displayCheckbox={true}>
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
			              <TableRowColumn>{item.id}</TableRowColumn>
			              <TableRowColumn>{item.occurday}</TableRowColumn>
			              <TableRowColumn>{item.accountname}</TableRowColumn>
			              <TableRowColumn>{item.proptypename}</TableRowColumn>
			              <TableRowColumn>{item.propname}</TableRowColumn>
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







