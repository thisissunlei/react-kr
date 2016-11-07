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
	KrDate,
    DotTitle,
    ButtonGroup
} from 'kr-ui';


import BasicInfo from './BasicInfo';
import SearchParam from './SearchParam';
import SearchForm from './SearchForm';
import ReceivedBtnForm from './ReceivedBtnForm';
import QuitBtnForm from './QuitBtnForm';
import SwitchBtnForm from './SwitchBtnForm';
import BusinessBtnForm from './BusinessBtnForm';
import AccountBtnForm from './AccountBtnForm';
import SupplementBtnForm from './SupplementBtnForm';
import './index.less'

//代码列表
var codeList=[];
//款项列表和分拆金额
var typeList=[];
//回款的代码列表,合同的合同编号
var receivedList=[];
//获取单条的金额
var fiMoney='';
//得到单条数据
var fiItem={};
class ViewForm extends Component{
	constructor(props,context){
		super(props,context);
	}
	render(){
		let items=this.props.detail
	    if(!items.fileList){
	    	items.fileList=[]
	    }

		return(
				<div className='ui-watch-detail'>					
					<KrField grid={1/2}  component="labelText" label="代码名称" value={items.accountName} inline={false} defaultValue="无"/>
					<KrField grid={1/2} label="付款日期" component="labelText" inline={false} value={items.occuryear} defaultValue="无" type="date"/>
					   
					<KrField grid={1/2} label="操作时间" component="labelText" value={items.occuryear} format="yyyy-mm-dd hh:mm:ss" type="date" inline={false} defaultValue="无"/>
					  
					<KrField grid={1/2}  component="labelText" label="交易编号" value={items.tradingCode} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="labelText" label="操作人"  value={items.optUserName} inline={false} defaultValue="无"/>  
					<KrField grid={1/2}  component="labelText" label="金额（元）" value={items.finaflowAmount} inline={false} defaultValue="无"/> 
					<KrField grid={1/2}  component="labelText" label="备注" value={items.finaflowdesc} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="group" label="上传附件" inline={false} defaultValue="无"> 
			         {items.fileList.map((item,index)=>						
						  <KrField key={index} grid={1} component="labelText" value={item.fileName} />						 
					  )}
					</KrField>   
				</div>	


			);
	 }
}
export default class AttributeSetting  extends Component{ 

	constructor(props,context){
		super(props, context);
		this.onSearch = this.onSearch.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.onAddReceivedSubmit=this.onAddReceivedSubmit.bind(this);
		this.onQuitSubmit=this.onQuitSubmit.bind(this);
		this.onSwitchSubmit=this.onSwitchSubmit.bind(this);
		this.onBusinessSubmit=this.onBusinessSubmit.bind(this);
		this.onConfrimSubmit=this.onConfrimSubmit.bind(this);
		this.onSupplementSubmit=this.onSupplementSubmit.bind(this);
		this.onOperation=this.onOperation.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSelect = this.onSelect.bind(this);
		

		this.openSearchDialog=this.openSearchDialog.bind(this);
		this.openReceivedBtn=this.openReceivedBtn.bind(this);
		this.openQuitBtn=this.openQuitBtn.bind(this);
		this.openSwitchBtn=this.openSwitchBtn.bind(this);
		this.openBusinessBtn=this.openBusinessBtn.bind(this);
		this.openAccountBtn=this.openAccountBtn.bind(this);
		this.openSupplementBtn=this.openSupplementBtn.bind(this);
		this.openViewDialog=this.openViewDialog.bind(this);

		this.closeSearchDialog=this.closeSearchDialog.bind(this);
		this.closeReceivedDialog=this.closeReceivedDialog.bind(this);
		this.closeSwitchBtn=this.closeSwitchBtn.bind(this);
		this.closeQuitBtn=this.closeQuitBtn.bind(this);
		this.closeBusinessBtn=this.closeBusinessBtn.bind(this);
		this.closeAddaccount=this.closeAddaccount.bind(this);
		this.closeViewDialog=this.closeViewDialog.bind(this);

		this.initBasicInfo = this.initBasicInfo.bind(this);
		this.searchUpperFun=this.searchUpperFun.bind(this);
		
		this.state = {			
		    params:{
				accountType:'PAYMENT',    
				childType:'basic',
				propertyId:'',
				propInfo:'SETTLED',
				orderId:this.props.params.orderId,
				page:1,
				pageSize:20
			 },
			 itemDetail:{},
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
            openBusinessBtn:false,
            openAddaccountBtn:false,
            openSupplementBtn:false,
            isLoading:false,
            openView:false

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
	      Store.dispatch(Actions.callAPI('findAccountAndPropList',{
	      	accountType:'PAYMENT'
	      })).then(function(response){       	         
 		      response.account.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.accountname;
 		      	 receivedList.push(list);		      	 	      	                                            
              })
              response.property.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.propcode;
 		      	 list.label=item.propname;
 		      	 typeList.push(list);		      	 	      	                                            
              })
		        _this.setState({
			      receivedList:receivedList,
			      typeList:typeList
		       });             		   
 		}).catch(function(err){
			Notify.show([{
				message:err.message,
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
			       fiMoney=item.finaflowAmount;
			       fiItem=item;			       	                            
              }
           })
           if(this.state.listValues.length==0){
           	 
           	  Notify.show([{
				message:'请选择一条回款数据进行退款',
				type: 'danger',
			 }]);
           	 
           }else if(this.state.listValues.length>1){
           	   Notify.show([{
				message:'只能选择一条数据',
				type: 'danger',
			 }]);
           }else if(fiMoney>=0){  
               Notify.show([{
				message:'金额必须为负且存在可用金额',
				type: 'danger',
			 }]);       	  
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
             	  fiMoney=item.finaflowAmount;
             	  fiItem=item;		              
              }
           })
           if(this.state.listValues.length==0){
           	  Notify.show([{
				message:'请选择一条回款数据进行转押金',
				type: 'danger',
			 }]);
           }else if(this.state.listValues.length>1){
           	 Notify.show([{
				message:'只能选择一条数据',
				type: 'danger',
			 }]);
           }else if(fiMoney>=0){   	 
               Notify.show([{
				message:'金额必须为负且存在可用金额',
				type: 'danger',
			  }]);   
           }else{
           	 this.setState({
			    openSwitchBtn:!this.state.openSwitchBtn	
	         }); 
            
           
	       Store.dispatch(Actions.callAPI('findContractListById',{
	       	    id:fiItem.id
	       })).then(function(response){ 
               response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.value=item.id;
 		      	 list.label=item.contractcode;
 		      	 receivedList.push(list);	      	 	      	                                            
              })
 		        _this.setState({
			      receivedList:receivedList
		       });    	       
 		    }).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		  });
         }     
      }
   openBusinessBtn(){
   	 let items=this.state.selectedList
         var _this=this;          
           items.map(function(item,index){
             if(typeof(item.finaflowAmount)=='number'){
             	  fiMoney=item.finaflowAmount;
             	  fiItem=item;		                
              }
           })
           if(this.state.listValues.length==0){
           	Notify.show([{
				message:'请选择一条回款数据进行转营收',
				type: 'danger',
			 }]);
           	
           }else if(this.state.listValues.length>1){
           	  Notify.show([{
				message:'只能选择一条数据',
				type: 'danger',
			 }]);
           }else if(fiMoney>=0){
              Notify.show([{
				message:'金额必须为负且存在可用金额',
				type: 'danger',
			  }]);  
           }else{
           	 this.setState({
			    openBusinessBtn:!this.state.openBusinessBtn	
	         }); 
            }
   }

    openAccountBtn(){
         var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	accountType:'INCOME'
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
				message:err.message,
				type: 'danger',
			}]);
		 });
		this.setState({
			openAddaccountBtn:!this.state.openAddaccountBtn
		})
    }
    openSupplementBtn(){
       this.setState({
			openSupplementBtn:!this.state.openSupplementBtn
		})
    }
    openViewDialog(itemDetail){
          var _this = this;
          let id=itemDetail.id
	      Store.dispatch(Actions.callAPI('getAccountFlowDetail',{
	      	id:id
	      })).then(function(response){             	         
 		    _this.setState({
			 itemDetail:response
		   });  
 		      	 
 		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		 });
		this.setState({
			openView:!this.state.openView
		});
	}
    
     //关闭遮罩层区域  
    closeReceivedDialog(){
   	  this.setState({
		 openReceivedBtn:!this.state.openReceivedBtn,			
		});	 
		receivedList=[]; 
		typeList=[];
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
    closeBusinessBtn(){
    	this.setState({	    
			openBusinessBtn:!this.state.openBusinessBtn,
		});	  
    }
    closeQuitBtn(){
    	this.setState({	    
			openQuitBtn:!this.state.openQuitBtn,
		});	 
    }
    closeAddaccount(){
       this.setState({
			openAddaccountBtn:!this.state.openAddaccountBtn
		})

		receivedList=[];
	}
	closeViewDialog(){
		this.setState({	    
			openView:!this.state.openView,
		});
	}

//确定提交区域
    //切换
	onSearch(params){
	  this.setState({params});
	}
	 //高级查询
    onSubmit(params){
         //为了让其保持params原有的参数，同时将自己的参数传过去
    	params = Object.assign({},this.state.params,params);
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
        if(params.autoSplit==0){
          params.jsonStr = {};
	  	  params.jsonStr.yajin=params.yajin;
	  	  params.jsonStr.yingshouhuikuan=params.yingshouhuikuan;
	  	  params.jsonStr.shenghuoxiaofeihuikuan=params.shenghuoxiaofeihuikuan;
	  	  params.jsonStr.gongweihuikuan=params.gongweihuikuan;
	  	  params.jsonStr.qitahuikuan=params.qitahuikuan;
	  	  params.jsonStr.dingjin=params.dingjin;
	  	  params.jsonStr  = JSON.stringify(params.jsonStr);
	  	  delete params.dingjin;
	  	  delete params.yajin;
	  	  delete params.yingshouhuikuan;
	  	  delete params.shenghuoxiaofeihuikuan;
	  	  delete params.gongweihuikuan;
	  	  delete params.qitahuikuan;
        }	  	  
	  	  params.receiveDate=dateFormat(params.receiveDate,"yyyy-mm-dd h:MM:ss");
		  var _this = this;
	      Store.dispatch(Actions.callAPI('receiveMoney',{},params)).then(function(response){   

 			 Notify.show([{
				message:'回款成功',
				type:'success', 
			}]);

			window.setTimeout(function(){
				window.location.reload();
			},200);

 		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type:'danger',
                
			}]);
		 });
	    this.setState({
			openReceivedBtn:!this.state.openReceivedBtn,
			isLoading:true
		});	 
		receivedList=[];
		typeList=[]; 
		
    }
    onQuitSubmit(params){ 
    	  var _this = this;
    	  params= Object.assign({},params);	 
		  params.operatedate=dateFormat(params.operatedate,"yyyy-mm-dd h:MM:ss");
	      Store.dispatch(Actions.callAPI('payBack',{},params)).then(function(response){ 
	        window.location.reload();	 
 		  }).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		 });
	    this.setState({
			openQuitBtn:!this.state.openQuitBtn,
			isLoading:true
		});
		  
    }
    onSwitchSubmit(params){ 
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToDeposit',{},params)).then(function(response){  
	       window.location.reload();   
 		  }).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		 });       
	    this.setState({
			openSwitchBtn:!this.state.openSwitchBtn,
			isLoading:true
		});	 
		receivedList=[];
		
    }
    onBusinessSubmit(params){ 	  
		  var _this = this;
	      Store.dispatch(Actions.callAPI('transToOperateIncome',{},params)).then(function(response){ 
 		    Notify.show([{
				message:'操作成功',
				type: 'success',
			}]);
 		    window.location.reload(); 
 		  }).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		 });

	    this.setState({
			openBusinessBtn:!this.state.openBusinessBtn,
			isLoading:true
		});	
		 
    }
    onConfrimSubmit(formValues){
		Store.dispatch(Actions.callAPI('supplementIncome',{},formValues)).then(function(){
			Notify.show([{
				message:'操作成功',
				type: 'danger',
			}]);
			window.location.reload();
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});
		this.setState({
			openAddaccountBtn:!this.state.openAddaccountBtn,
			isLoading:true
		})
		receivedList=[];
		
	}
	onSupplementSubmit(){
		var _this=this;
		Store.dispatch(Actions.callAPI('addIncome',{
			mainbillid:_this.props.params.orderId})).then(function(response){
			Notify.show([{
				message:'操作成功',
				type: 'success',
			}]);
			 window.location.reload();
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});
		_this.setState({
			openSupplementBtn:!this.state.openSupplementBtn,
			isLoading:true
		})
		
	}
    //操作相关
	onOperation(type,itemDetail){
		if(type == 'view'){		
			this.openViewDialog(itemDetail);
		}
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
				message:err.message,
				type: 'danger',
			}]);
		 });
    }
    


	componentDidMount() {
     	this.initBasicInfo();
	}
    
	render(){
	   let {params}=this.state;
       
      
      
	   //判断按钮出现与隐藏
       let childBtn=params.childType; 
       let parentBtn=params.accountType;
       let propInfo=params.propInfo;
       //回款传订单id
       let initialValues={
       	   mainbillid:params.orderId,

       } 
       //退款等要操作的id
       let initialValuesId={
       	   id:fiItem.id
       } 
       //挂账按钮操作
       let propId={
       	   propid:params.propertyId,
       	   mainbillid:params.orderId
       } 
       //高级查询
       let searchValue={
       	   accountType:params.accountType,
       	   orderId:params.orderId
       } 
       
       var buttonArr = [];
       if(parentBtn=='PAYMENT'&&childBtn=='basic'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="退款"   type="button" joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='dingjin'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转押金"  type="button"  joinEditForm onTouchTap={this.openSwitchBtn}/>
       	   	  <Button label="转营收"  type="button" joinEditForm onTouchTap={this.openBusinessBtn}/></ButtonGroup>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='yajin'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转押金"  type="button"  joinEditForm onTouchTap={this.openSwitchBtn}/>
       	   	  <Button label="转营收"  type="button"  joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='gongweihuikuan'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转营收"  type="button"  joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='qitahuikuan'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  
       	   	  <Button label="转押金"  type="button"  joinEditForm onTouchTap={this.openSwitchBtn}/>
       	   	  <Button label="转营收"  type="button" joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='PAYMENT'&&childBtn=='yingshouhuikuan'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/></ButtonGroup>
       	   	  
       	   	  );
       }
        if(parentBtn=='PAYMENT'&&childBtn=='shenghuoxiaofeihuikuan'){
       	   buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  
       	   	  <Button label="退款"  type="button" joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='INCOME'&&childBtn=='basic'){
       	   
       }
       if(parentBtn=='INCOME'&&childBtn=='gongweishouru'){
       	  buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/>
       	   	  <Button label="补收入"  type="button" joinEditForm onTouchTap={this.openSupplementBtn}/></ButtonGroup>
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='qitashouru'){
       	  buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='yingyewaishouru'){
       	  buttonArr.push(<ButtonGroup><Button label="挂账" type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>
       	   	  ); 
       }
       if(parentBtn=='INCOME'&&childBtn=='shenghuoxiaofeishouru'){
       	  buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>
       	   	  ); 
       }
       if(parentBtn=='PAYMENT'&&propInfo=='NEW'){
       	 buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="退款" type="button" joinEditForm onTouchTap={this.openQuitBtn}/></ButtonGroup>);
       }
       if(parentBtn=='INCOME'&&propInfo=='NEW'){
       	      buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>
       	   	  ); 
       }
       
       const close=[
        <Button
        label="关闭"
        joinEditForm
         style={{marginLeft:10}}
        onTouchTap={this.closeViewDialog}
        />
      ]

		
		return(
			<div>
					<Section title="订单明细账" description="" > 
					      <DotTitle title='订单描述' style={{marginTop:'6',marginBottom:'40'}}/>
						  <BasicInfo  detail={this.state.basicInfo} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome}/>
						   
						  <DotTitle title='订单明细账' style={{marginTop:'28',marginBottom:'62'}}/>
						  <div className='ui-detail-bottom'>
								<Row style={{marginTop:10}}>
								 <div className='detail-left'>
									<SearchParam onSearch={this.onSearch} params={this.state.params} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome} detailBalance={this.state.detailBalance} />
								
								 </div>
								 <div className='detail-right'>
								     <div>
								        <Col align="left" className='btn-left'>{buttonArr}</Col>     							       
								        <Col align="right"><Button label="高级查询"  type="button"  onTouchTap={this.openSearchDialog}/></Col>
								     </div>
								 
									 <Table style={{marginTop:30}} ajax={true} loading={this.state.isLoading} onSelect={this.onSelect} onLoaded={this.onLoaded} ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.params} onOperation={this.onOperation}>
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
							                    <TableRowColumn name="occuryear" type="date" format="yyyy-mm-dd"></TableRowColumn>
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
								</div>

							</Row>
                       </div>
				</Section>


				    <Dialog
						title="高级查询"
						open={this.state.openSearch}
						onClose={this.closeSearchDialog}
						>							
					   <SearchForm onCancel={this.closeSearchDialog} initialValues={searchValue} codeList={this.state.codeList} typeList={this.state.typeList} onSubmit={this.onSubmit}/>
					 </Dialog>

					 <Dialog
						title="添加回款"
						open={this.state.openReceivedBtn}
						onClose={this.closeReceivedDialog}
						
						>							
					   <ReceivedBtnForm onSubmit={this.onAddReceivedSubmit}  onCancel={this.closeReceivedDialog} optionList={this.state.receivedList} typeList={this.state.typeList}/>
					 </Dialog>

					 <Dialog
						title="退款"
						open={this.state.openQuitBtn}
						onClose={this.closeQuitBtn}
						>							
					   <QuitBtnForm  onSubmit={this.onQuitSubmit} onCancel={this.closeQuitBtn}  initialValues={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="转押金"
						open={this.state.openSwitchBtn}
						onClose={this.closeSwitchBtn}
						>							
					   <SwitchBtnForm  onSubmit={this.onSwitchSubmit} onCancel={this.closeSwitchBtn} optionList={this.state.receivedList} initialValues={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="转营收"
						open={this.state.openBusinessBtn}
						onClose={this.closeBusinessBtn}
						>							
					   <BusinessBtnForm  onSubmit={this.onBusinessSubmit} onCancel={this.closeBusinessBtn} fiMoney={fiMoney} initialValues={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="挂账"
						open={this.state.openAddaccountBtn}
						onClose={this.closeAddaccount}
						>							
					   <AccountBtnForm  onSubmit={this.onConfrimSubmit}  onCancel={this.closeAddaccount}  optionList={this.state.receivedList} initialValues={propId}/>
					 </Dialog>

					 <Dialog
						title="补收入"
						open={this.state.openSupplementBtn}
						onClose={this.openSupplementBtn}
						>							
					   <SupplementBtnForm  onSubmit={this.onSupplementSubmit} mainbillid="{params.orderId}" onCancel={this.openSupplementBtn} />
					 </Dialog>

					  <Dialog
						title="查看"
						open={this.state.openView}
						onClose={this.closeViewDialog}
						>							
						<ViewForm detail={this.state.itemDetail}  />
					 </Dialog> 

			</div>		
	    );

     }
}



