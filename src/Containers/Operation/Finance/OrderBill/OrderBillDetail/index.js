import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {LabelText} from 'kr-ui/Form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import dateFormat from 'dateformat';
import {
	KrField,
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
	Dialog,
} from 'kr-ui';


import BasicInfo from './BasicInfo';
import SearchParam from './SearchParam';
import SearchForm from './SearchForm';
import ReceivedBtnForm from './ReceivedBtnForm';
import QuitBtnForm from './QuitBtnForm';
import SwitchBtnForm from './SwitchBtnForm';

//代码列表
var codeList=[];
//款项列表
var typeList=[];
//回款的代码列表,合同的合同编号
var receivedList=[];
export default class AttributeSetting  extends Component{ 

	constructor(props,context){
		super(props, context);
		this.onSearch = this.onSearch.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.onQuitSubmit=this.onQuitSubmit.bind(this);
		this.onSwitchSubmit=this.onSwitchSubmit.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSelect = this.onSelect.bind(this);
		

		this.openSearchDialog=this.openSearchDialog.bind(this);
		this.openReceivedBtn=this.openReceivedBtn.bind(this);
		this.openQuitBtn=this.openQuitBtn.bind(this);
		this.openSwitchBtn=this.openSwitchBtn.bind(this);

		this.closeSearchDialog=this.closeSearchDialog.bind(this);
		this.closeReceivedDialog=this.closeReceivedDialog.bind(this);
		this.closeSwitchBtn=this.closeSwitchBtn.bind(this);

		this.initBasicInfo = this.initBasicInfo.bind(this);
		this.searchUpperFun=this.searchUpperFun.bind(this);
		
		this.state = {			
		    params:{
				accountType:'PAYMENT',
				childType:'',
				propertyId:'',
				orderId:this.props.params.orderId,
				page:1,
				pageSize:20
			 },
			//为了判断和获取选中的条的id
			fiMoney:'',
			fiItem:'',
			//这几个是上下的数据
			basicInfo:{},
			detailPayment:[],
			detailIncome:[],
			detailBalance:'',
			//这三个是全局的
			codeList:[],
            typeList:[],
            receivedList:[],
            
            //这三个是为了挑出选定的那个复选框
            list:[],
            selectedList:[],
            listValues:[],

			openSearch:false,
			openReceivedBtn:false,
            openQuitBtn:false,
            openSwitchBtn:false,
            isLoading:false,

		}
	}
//打开遮罩层区域
	openSearchDialog(){
		this.searchUpperFun();
        this.setState({
			openSearch:!this.state.openSearch	
	    });
	    typeList=[];
	    codeList=[];
	}
	openReceivedBtn(){
    	 var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	accountType:'PAYMENT'
	      })).then(function(response){          	         
 		      response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.accountname;
 		      	 receivedList.push(list);		      	 	      	                                            
              })
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
			openReceivedBtn:!this.state.openReceivedBtn
		});
    }
    openQuitBtn(){
    	 let items=this.state.selectedList
         var _this=this;          
           items.map(function(item,index){
             if(typeof(item.finaflowAmount)=='number'){
             	_this.setState({
			       fiMoney:item.finaflowAmount,
			       fiItem:item
	             })                   
              }
           })
           if(this.state.listValues.length==0){
           	 alert('请选择一条回款数据进行退款');
           }else if(this.state.listValues.length>1){
           	  alert('只能选择一条数据');
           }else if(_this.state.fiMoney>=0){
              alert('金额必须为负且存在可用金额');
           }else{
           	 this.setState({
			    openQuitBtn:!this.state.openQuitBtn	
	         }); 
            }
         }
		
    openSwitchBtn(){
    	let items=this.state.selectedList
        var _this=this;          
           items.map(function(item,index){
             if(typeof(item.finaflowAmount)=='number'){
             	_this.setState({
			       fiMoney:item.finaflowAmount,
			       fiItem:item
	             })                   
              }
           })
           if(this.state.listValues.length==0){
           	 alert('请选择一条回款数据进行退款');
           }else if(this.state.listValues.length>1){
           	  alert('只能选择一条数据');
           }else if(_this.state.fiMoney>=0){
              alert('金额必须为负且存在可用金额');
           }else{
           	 this.setState({
			    openSwitchBtn:!this.state.openSwitchBtn	
	         }); 
            
           
	       Store.dispatch(Actions.callAPI('findContractListById',{
	       	  id:_this.state.fiItem.id
	       })).then(function(response){ 
               response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.contractcodeId;
 		      	 receivedList.push(list);	      	 	      	                                            
              })
 		        _this.setState({
			      receivedList:receivedList
		       });    	       
 		    }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		  });
         }     
      }
   


     //关闭遮罩层区域  
    closeReceivedDialog(){
   	  this.setState({
		 openReceivedBtn:!this.state.openReceivedBtn,			
		});	 
		receivedList=[]; 
    }

	closeSearchDialog(){
		 this.setState({
			openSearch:!this.state.openSearch	
	    }); 
		typeList=[];
	    codeList=[];
	}

    closeSwitchBtn(){
    	 this.setState({	    
			openSwitchBtn:!this.state.openSwitchBtn,
		});	 
		receivedList=[]; 
    }

//确定提交区域
    //切换
	onSearch(params){
	  this.setState({params});
	}
	 //高级查询
    onSubmit(params){
      this.setState({
      	    params,
			openSearch:!this.state.openSearch	
	    });   
    }
    onSelect(values){
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
    //回款提交
    onAddReceivedSubmit(params){  	  
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
	    this.setState({
			openReceivedBtn:!this.state.openReceivedBtn,
			isLoading:true
		});	 
		receivedList=[]; 
    }
    onQuitSubmit(params){ 
    	  var _this = this;
    	  params= Object.assign({},params);	 
		  params.operatedate=dateFormat(params.operatedate,"yyyy-mm-dd h:MM:ss");
	      Store.dispatch(Actions.callAPI('payBack',{},params)).then(function(response){  
 		  }).catch(function(err){
			Notify.show([{
				message:message,
				type: 'danger',
			}]);
		 });
	    _this.setState({
			openQuitBtn:!this.state.openQuitBtn,
			isLoading:true
		});	  
    }
    onSwitchSubmit(params){  
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToDeposit',{},params)).then(function(response){    
 		  }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });       
	    _this.setState({
			openSwitchBtn:!this.state.openSwitchBtn,
			isLoading:true
		});	 
		receivedList=[]; 
    }
    //
	initBasicInfo(){
		var _this = this;
		let {params} = this.props;
		Store.dispatch(Actions.callAPI('getAccountFlow',{
			mainbillid:params.orderId,
		})).then(function(response){
			_this.setState({
				basicInfo:response.topdata,
				detailPayment:response.paymentdata,
				detailIncome:response.incomedata,
				detailBalance:response.balance,
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}
     
    searchUpperFun(){
         var _this = this; 
         let {params} = this.state;     
	      Store.dispatch(Actions.callAPI('findAccountAndPropList',{
	      	accountType:params.accountType
	      })).then(function(response){
             response.account.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.accountname;
 		      	 codeList.push(list);		      	 	      	                                            
              })
		      response.property.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.propname;
 		      	 typeList.push(list);		      	 	      	                                            
              })
 		        _this.setState({
			      codeList:codeList,
			      typeList:typeList
		       });             	           		   
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
    }
    


	componentDidMount() {
     	this.initBasicInfo();
	}
    
	render(){
	   let {params,fiItem}=this.state
	   //判断按钮出现与隐藏
       let childBtn=params.childType; 
       let parentBtn=params.accountType;
       //回款传订单id
       let initialValues={
       	   mainbillid:params.orderId,
       } 
       //退款等要操作的id
       let initialValuesId={
       	   mainbillid:fiItem.id,
       } 

       var buttonArr = [];
       if(parentBtn=='PAYMENT'&&childBtn==''){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true} onTouchTap={this.openReceivedBtn}/>
       	   	  ,<Button label="退款"  type="submit" primary={true} onTouchTap={this.openQuitBtn}/>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='dingjin'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="转押金"  type="submit"  primary={true} onTouchTap={this.openSwitchBtn}/>
       	   	  ,<Button label="转营收"  type="submit" primary={true} />);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='yajin'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="转押金"  type="submit"  primary={true}/>
       	   	  ,<Button label="转营收"  type="submit"  primary={true}/>
       	   	  ,<Button label="退款"  type="submit"  primary={true}/>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='gongweihuikuan'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="开票"  type="submit"  primary={true}/>
       	   	  ,<Button label="转营收"  type="submit"  primary={true}/>
       	   	  ,<Button label="退款"  type="submit"  primary={true}/>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='qitahuikuan'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="开票"  type="submit"  primary={true}/>
       	   	  ,<Button label="转押金"  type="submit"  primary={true}/>
       	   	  ,<Button label="转营收"  type="submit" primary={true} />
       	   	  ,<Button label="退款"  type="submit"  primary={true}/>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='yingshouhuikuan'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="开票"  type="submit" primary={true} />
       	   	  );
       }
        if(parentBtn=='PAYMENT'&&childBtn=='shenghuoxiaofeihuikuan'){
       	   buttonArr.push(<Button label="回款"  type="submit" primary={true}/>
       	   	  ,<Button label="开票"  type="submit"  primary={true}/>
       	   	  ,<Button label="退款"  type="submit" primary={true} />);
       }
       if(parentBtn=='INCOME'&&childBtn==''){
       	   
       }
       if(parentBtn=='INCOME'&&childBtn=='gongweishouru'){
       	  buttonArr.push(<Button label="挂账"  type="submit" primary={true}/>
       	   	  ,<Button label="补收入"  type="submit" primary={true} />
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='qitashouru'){
       	  buttonArr.push(<Button label="挂账"  type="submit" primary={true}/>
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='yingyewaishouru'){
       	  buttonArr.push(<Button label="挂账"  type="submit" primary={true}/>
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='shenghuoxiaofeishouru'){
       	  buttonArr.push(<Button label="挂账"  type="submit" primary={true}/>
       	   	  ); 
       }
       


		
		return(
			<div>
					<Section title="订单明细账" description="" > 
						   <BasicInfo detail={this.state.basicInfo} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome}/>
							<Row>
							<Col md={2} >
								<SearchParam onSearch={this.onSearch} params={this.state.params} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome} detailBalance={this.state.detailBalance} />
							</Col>
							<Col md={10}>
							     <div>
							        {buttonArr}     							       
							        <Button label="高级查询"  type="button"  onTouchTap={this.openSearchDialog}/>
							     </div>
							 
								 <Table style={{marginTop:10}} ajax={true} loading={this.state.isLoading} onSelect={this.onSelect} onLoaded={this.onLoaded} ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.params} onOperation={this.onOperation}>
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
							</Col>

						</Row>

				</Section>


				    <Dialog
						title="高级查询"
						open={this.state.openSearch}
						>							
					   <SearchForm  onCancel={this.closeSearchDialog} codeList={this.state.codeList} typeList={this.state.typeList} onSubmit={this.onSubmit}/>
					 </Dialog>

					 <Dialog
						title="添加回款"
						open={this.state.openReceivedBtn}
						>							
					   <ReceivedBtnForm onSubmit={this.onAddReceivedSubmit} initialValues={initialValues} onCancel={this.closeReceivedDialog} optionList={this.state.receivedList}/>
					 </Dialog>

					 <Dialog
						title="退款"
						open={this.state.openSwitchBtn}
						>							
					   <QuitBtnForm  onSubmit={this.onQuitSubmit} onCancel={this.openQuitBtn}  initialValues={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="转押金"
						open={this.state.openQuitBtn}
						>							
					   <SwitchBtnForm  onSubmit={this.onSwitchSubmit} onCancel={this.closeSwitchBtn} optionList={this.state.receivedList} initialValues={initialValuesId}/>
					 </Dialog>

			</div>		
	    );

     }
}



