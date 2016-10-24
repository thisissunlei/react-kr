import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import {
	Form,
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
					<KrField grid={1}  component="labelText" label="交易编号" value={items.accountName}/> 
					<KrField grid={1}  component="labelText" label="金额（元）" value={items.finaflowAmount}/> 
					<KrField grid={1}  component="labelText" label="备注" value={items.finaflowdesc}/> 
					<KrField grid={1}  component="labelText" label="上传附件" value={items.accountName}/>
				</div>	


			);
	 }
}
export default class Earnest extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
       
	}

	constructor(props,context){
		super(props, context);
        this.ReceivedMoney = this.ReceivedMoney.bind(this);
        this.SwitchMoney = this.SwitchMoney.bind(this);
        this.BusinessMoney =this.BusinessMoney.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCancelQ = this.onCancelQ.bind(this);
        this.onCancelB = this.onCancelB.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.openViewDialog=this.openViewDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);

		this.state={
           item:{},
           openView:false,
           itemDetail:{},
           openReceive:false,
           openSwitch:false,
           openBusiness:false,
           arr:[],
           arr1:[],
           Params:{
				
			}
		}
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
    
    BusinessMoney(){ 
        this.setState({
			openBusiness:!this.state.openBusiness
		});       
    }



    onSubmit(params){  //获取提交时的params
	  	  console.log("gggg",params);
		  var _this = this;
	      Store.dispatch(Actions.callAPI('receiveMoney',{},params)).then(function(response){ //post请求    
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

   
     onCancel(){
		this.setState({
			openReceive:!this.state.openReceive,			
		});	 
	 }

	 onCancelQ(){
		this.setState({	    
			openSwitch:!this.state.openSwitch,
		});	 
	 }

	 onCancelB(){
		this.setState({	    
			openBusiness:!this.state.openBusiness,
		});	 
	 }
     

     onSubmitQ(params){  //获取提交时的param  	  
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


    onSubmitB(params){  //获取提交时的param  	  
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



    ReceivedMoney(){ 
    	  var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{	      	
	      })).then(function(response){  //post请求
	        console.log("nnnn",response); 	          
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

	onSubmitQ(params){  //获取提交时的params	  	  
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToDeposit',{},params)).then(function(response){  //post请求   
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

		let {params,type,mainId} = this.props;
		if(params.childType != type){
			return  null;
		}
        let items=this.state.item.items;
	    if(!items){
	    	items=[];
	    }
        


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
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.ReceivedMoney}/></Col>
					<Col md={2}><Button label="转押金" primary={true} onTouchTap={this.SwitchMoney}/></Col>
					<Col md={2}><Button label="转营业外收入" primary={true} onTouchTap={this.BusinessMoney}/></Col>
					
                  </Row>

                  
                  <Table style={{marginTop:10}} ajax={true}   ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params} onOperation={this.onOperation}>
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
					   <div>
					     <Form name="ReceivedMoney" initialValues={initialValues} onSubmit={this.onSubmit}>
							<KrField  name="mainbillid" type="hidden" component="input"/>
						    <KrField  label="代码名称" name="accountId" type="select" options={this.state.arr}/>
						    <KrField component="date" label="回款日期" name="receiveDate"/>
						    <KrField label="交易编号" name="dealCode"  component="input" type="text"/>
						    <KrField label="是否自动拆分" name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"不是",value:"0"}]
						    }/>
                            <KrField name="sumSign" component="group" label="金额正负" >
				                <KrField name="sumSign" label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign" label="负" component="radio" type="radio" value="1" />
			                </KrField>
                            <KrField label="金额（元）" name="sum" component="input" type="text"/>
                            <KrField label="备注" name="remark" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file" />

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
						    </Row> 

						</Form>
					    
					  </div>

				    </Dialog>


				    <Dialog
						title='转押金'
						modal={true}
						open={this.state.openSwitch}
					>
					   <div>
					      <Form name="SwitchMoney" initialValues={initialValues} onSubmit={this.onSubmitQ}>
						    <KrField  name="id" type="hidden"/>
                            <KrField label="合同编号" name="contractcode" type="select" options={this.state.arr1}/>
                            <KrField label="备注" name="finaflowdesc" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file"/>

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancelQ} /> </Col>
						   </Row> 
					   
                         </Form>
					  </div>
				  </Dialog>


                  <Dialog
						title='转营业外收入'
						modal={true}
						open={this.state.openBusiness}
					>
					   <div>
					      <Form name="BusinessMoney" initialValues={initialValues} onSubmit={this.onSubmitB}>
						    <KrField  name="id" type="hidden"/>
                            <KrField label="款项金额" component="labelText" value={34}/>
                            <KrField label="金额（元）" name="finaflowamount" component="input" type="text"/>
                            <KrField label="备注" name="finaflowdesc" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file"/>

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancelB} /> </Col>
						   </Row> 
					   
                         </Form>
					  </div>
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





