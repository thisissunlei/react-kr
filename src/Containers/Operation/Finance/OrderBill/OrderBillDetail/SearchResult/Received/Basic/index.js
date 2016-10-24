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
class ViewForm extends Component{

	constructor(props,context){
		super(props,context);
	}
	
	render(){
      
       let items=this.props.detail
	   console.log("5555",items)
        

		return(
				<div>					
					<KrField grid={1}  component="labelText" label="代码名称" value={items.accountName}/> 
					<KrField grid={1}  component="labelText" label="付款日期" value={items.occuryear}/> 
					<KrField grid={1}  component="labelText" label="交易编号" value={items.accountName}/> 
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
		this.openViewDialog=this.openViewDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);

		this.openSearchDialog = this.openSearchDialog.bind(this);

		this.onSearchSuccess = this.onSearchSuccess.bind(this);


		this.onLoaded = this.onLoaded.bind(this);
		this.onSelect = this.onSelect.bind(this);
		
        
		  this.state = {
            list:[],
            selectedList:[],
            itemDetail:{},
			openReceive:false,
			openQuit:false,
			openView:false,
			arr:[],
			Params:{
				accountType:'PAYMENT',
				mainbillid:'3'
			},

			
	     }
   }
   
   onSearchSuccess(){
		
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
        
       
        console.log("c",this.state.selectedList[0]);
        

     	if(this.state.selectedList.length==0||this.state.selectedList[0]=='false'){
             alert("请选择一条回款数据进行退款");  
                  
        }else if(this.state.selectedList.length>1){
        	 alert("只能选择一条");

        }else{
        	this.setState({
			openQuit:!this.state.openQuit
		  });
        }

        
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

    onSelect(values){
        

    	let {list,selectedList} = this.state;
    	selectedList = list.map(function(item,index){            
				if(values.indexOf(index)){
					return false;
				}
				return item;
    	});

    	this.setState({
    		selectedList
    	});
      
   

      
    }

    onLoaded(response){

    	

    	let list = response.items;

     
    	this.setState({
    		list
    	})
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
        
        
       console.log("334333",this.state.Params.accountType)
       

       var url=window.location.href;
       var url_arr=url.split('/');
       let initialValues = {
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
       
               
               <Table style={{marginTop:10}} ajax={true} onSelect={this.onSelect} onLoaded={this.onLoaded}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params} onOperation={this.onOperation}>
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
						title='添加回款'
						modal={true}
						open={this.state.openReceive}
					>
					  <ReceivedMoney onSubmit={this.onAddReceivedSubmit} initialValues={initialValues} onCancel={this.ReceivedDialog} optionList={this.state.arr}/>

				  </Dialog>

                   

                   <Dialog
						title='退款'
						modal={true}
						open={this.state.openQuit}
					>
					 <QuitMoney onSubmit={this.onQuitSubmit} onCancel={this.QuitMoneyDialog} items={this.state.selectedList}/>  
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







