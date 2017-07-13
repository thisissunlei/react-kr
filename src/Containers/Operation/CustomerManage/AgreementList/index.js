import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
	observer,
	inject
} from 'mobx-react';
import Baidu from 'kr/Utils/Baidu';
import {DateFormat,Http} from 'kr/Utils';
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
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
	Drawer,
	Tooltip,
	Message,
	UpLoadList,
	FontIcon,
	Pagination,
	Loading,
	CheckPermission,
	ListGroup,
	ListGroupItem,
	SearchForms,
} from 'kr-ui';
import State from './State';
import SearchForm from "./SearchForm";
import OneNewAgreement from "./OneNewAgreement";
import TwoNewAgreement from "./TwoNewAgreement";
import EditAgreementList from "./EditAgreementList";
import NewIndent from "./NewIndent";
import DelAgreementNotify from './DelAgreementNotify';
import PrintAgreement from './PrintAgreement';
import './circle.less';
import './active.less';
import './index.less';
import {

	Agreement


} from 'kr/PureComponents';


@inject("CommunityAgreementList","NavModel")
@observer
class Merchants extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			open: false,
			loading: true,
			delAgreementId: 0,
			openCreateAgreement: false,
			openDelAgreement: false,
			isShow: false,
			View: false,
			openMenu:false,
			openId:0,
			opretionId:0,
			opretionOpen:false,
			response: {
				orderBaseInfo: {},
				installment: {},
				earnest: {},
				contractList: [],
				antecedent: [],
			},
			staionsList: [],

            //日期查询
		    startValue:'',
		    endValue:'',

		    searchParams:{
			   page:1,
			   pageSize:15,
			   createDateBegin:'',
			   createDateEnd:'',
		     },
		    agreementListAnnex:false,
		    agreementListOther:false,
			isRefresh:true,
			openCopyAgreement:false,

		}
		 this.allOrderReady();
	}

	//新建订单的数据准备
	allOrderReady=()=>{
		var _this=this;
	    Http.request('community-city-selected').then(function(response) {
         State.orderReady=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	//打开第二新建页面
	openTwoAgreement = () => {
		this.props.CommunityAgreementList.openTowAgreement=true;
	}
	//关闭第二新建页面
	closeTwoAgreement = () => {
		this.props.CommunityAgreementList.openTowAgreement=false;
		console.log('closeAll')
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openLocalStorage = false;
	}
	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = State.mainBillId+''+State.listId+ State.argumentType + 'edit';
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 removeList.map((item)=>{
 			 localStorage.removeItem(item);
 		})
	}
	//打开第一新建页面
	openOneAgreement = () => {
		this.props.CommunityAgreementList.openOneAgreement=true;
	}
	//关闭第一新建页面
	closeOneAgreement = () => {
		this.props.CommunityAgreementList.openOneAgreement=false;
	}
	//打开编辑页
	openEditAgreement = () => {
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openEditAgreement=true;
	}
	//关闭编辑页
	closeEditAgreement = () =>{
		// this.removeLocalStorage();
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openEditAgreement=false;
	}
	//新建订单打开
    openNewIndent = () => {
    	State.openNewIndent=true;
    }
    //关闭新建订单
    closeNewIndent = (value) =>{
    	State.openNewIndent=false;
    	if(isNaN(value)){
			Store.dispatch(change('OneNewAgreement','staionTypeId',''));
    	}

    }

    detailOpenAgreement=()=>{
    	State.agreementDetail();
    }

    //选中几项领取，转移等
    onSelect=(value)=>{
    	var arrItem=[]
    	let {loadData}=this.state;
    	if(loadData.length>15){
           value=value.splice(0,15);
    	}
    	if(loadData.length<=15){
    	   value=value.splice(0,loadData.length);
    	}
        for(var i=0;i<value.length;i++){
        	var allId=value[i];
        	arrItem.push(loadData[allId].id)
        }

      if(value.length>0){
      	State.openDialog=true;
        this.setState({
         dialogNum:value.length,
         arrItem
        })
      }else{
      	State.openDialog=false;
      }
    }


    //查看相关操作
    lookClick=(values)=>{
    	State.listId=values.customerid;
    	State.agreementId=values.id;
    	State.mainBillId=values.mainbillid;
    	State.argumentType=values.contracttype;
    	State.openAgreementDetail=true;
    }


    //查看关闭
	cancelAgreementDetail=(event)=>{
		State.agreementDetail();
		// event.stopPropagation();

	}

	//新建提交按钮
	onNewMerchants=(params)=>{
		switchNewMerchants(params);
	}



	componentWillReceiveProps(nextProps){

	}




	uploadFile = (id) => {
		let fileId = this.state.openId;
		if(fileId == id){

			this.setState({
				openMenu:!this.state.openMenu,
				openId:id,
				opretionOpen:false,

			})
		}else{

			this.setState({
				openMenu:true,
				openId:id,
				opretionOpen:false
			})

		}
	}



	showMoreOpretion = (id) => {
		let {opretionId,opretionOpen} = this.state;
		if(opretionId == id){
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:!this.state.opretionOpen,

			})
		}else{

			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:true,

			})
		}
	}


	docClick = (event) => {
		event = event || window.event;
		var target = event.target;
		if(target.className == 'icon-more'){
			return ;
		}
		this.setState({
			openMenu:false,
			opretionOpen:false
		})
		document.removeEventListener('click', this.docClick)

	}

	openDelAgreementDialog = () => {
		this.setState({
			openDelAgreement: !this.state.openDelAgreement
		});
	}


	setDelAgreementId = (delAgreementId) => {
		var _this=this;
			this.setState({
				delAgreementId,
			}, function() {
				_this.openDelAgreementDialog();
			});
	}

	confirmDelAgreement=()=>{

		this.openDelAgreementDialog();
		let {CommunityAgreementList} = this.props;

		let {
			delAgreementId
		} = this.state;
		Http.request('delete-enter-contract', {
			contractId: delAgreementId
		}).then(function(response) {
			 Message.success('删除成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 100)
		}).catch(function(err) {
            Message.error(err.message);
		});
		CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})

	}

	print=(item)=>{

		var typeList = [{
			name: 'INTENTION',
			value: 'admit'
		}, {
			name: 'ENTER',
			value: 'join'
		}, {
			name: 'ADDRENT',
			value: 'increase'
		}, {
			name: 'LESSRENT',
			value: 'reduce'
		}, {
			name: 'QUITRENT',
			value: 'exit'
		}, {
			name: 'RENEW',
			value: 'renew'
		}];
		let name = ''
		typeList.map(function(value) {
			if (value.name === item.contracttype) {
				name = value.value;
			}
		});
		const params = this.props.params;
		let url = `./#/operation/customerManage/${item.customerid}/order/${item.mainbillid}/agreement/${name}/${item.id}/print?print=`
		// var newWindow = window.open(url);
		this.setState({
			url:url,
			openCopyAgreement:true
		})

	}

    ajaxRebd=()=>{

    }

    getLocalStorageDate=()=>{
		let date = [];
		let delList = [];
		let now = +new Date();
		// let clearDate = 60*60*1000*1;//1小时
		let clearDate = 60*60*1000*1*24*30;//30天
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf('setLocalStorageDate')!='-1'){
			 	let time = now - parseInt(localStorage.getItem(itemName));
				if((time/clearDate)>1){
					//10小时
					date.push(itemName.replace('setLocalStorageDate',''));
				}
			 }
		 }
		 date.map((item)=>{
		 	for (var i = 0; i < localStorage.length; i++) {
				if(localStorage.key(i).indexOf(item)!='-1'){
					delList.push(localStorage.key(i));
				}
			}
		 })
		 delList.map((item)=>{
		 	localStorage.removeItem(item);
		 })

	}

	componentDidMount() {
		var {checkOperate} = this.props.NavModel;
		setTimeout(function() {
			State.isEdit = checkOperate("contract_create_contract");
		    State.isPrint = checkOperate("oper_contract_print");
		    State.isDel = checkOperate("oper_contract_delete");
		},500);	


		this.props.CommunityAgreementList.ajaxListData(this.state.searchParams);
		Baidu.trackEvent('合同列表','访问');
      	let _this=this;
		let bodyElem=document.getElementById("m-agreement-list");
		this.getLocalStorageDate();
		bodyElem.addEventListener("click", function(){
		   event = event || window.event;
			var target = event.target;
			while (target) {

				if (target && target.className && target.className.indexOf('agreement-list-annex') !== -1 ||
					target && target.className && target.className.indexOf('agreement-list-other') !== -1
					) {
					return;
				}
				target = target.parentNode;
			}

			_this.setState({

				openMenu:false,
				opretionOpen:false,


			})
		},false);



	}
     //日期开始
	 onStartChange=(startD)=>{
    	let {searchParams}=this.state;
        let start=startD;
        let end=searchParams.createDateEnd;
        this.setState({
        	startValue:startD
        },function () {
        	if(start>end&&end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let createDateBegin=this.state.startValue;
	    	searchParams = Object.assign({}, searchParams, {createDateBegin:this.state.startValue,createDateEnd:this.state.endValue||searchParams.createDateEnd});
	    	this.setState({
				searchParams
			});

        })
    }

    //日期结束
    onEndChange=(endD)=>{
    	let {searchParams}=this.state;
        let start=searchParams.createDateBegin;
        let end=endD;
        this.setState({
        	endValue:endD
        },function () {
        	if(start>end&&start){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let createDateEnd=this.state.endValue;
	    	searchParams = Object.assign({}, searchParams, {createDateBegin:this.state.startValue||searchParams.createDateBegin,createDateEnd:this.state.endValue,});
	    	this.setState({
				searchParams
			});

        })

    }

   //搜索提交
   onSearchSubmit=(value)=>{
   	 let {searchParams}=this.state;
   	 let {CommunityAgreementList} = this.props;
   	     searchParams.page = 1;
	    searchParams.contractType='';
		searchParams.createDateBegin='';
		searchParams.createDateEnd='';
		searchParams.hasAgreement='';
      if(value.filter=='company'){
        searchParams.customerName=value.content;
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        CommunityAgreementList.ajaxListData(searchParams);
     }
      if(value.filter=='city'){
        searchParams.cityName=value.content;
        searchParams.customerName='';
        searchParams.communityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        CommunityAgreementList.ajaxListData(searchParams);
     }
      if(value.filter=='community'){
        searchParams.communityName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        CommunityAgreementList.ajaxListData(searchParams);
     }
      if(value.filter=='people'){
        searchParams.salerName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.createrName='';
        CommunityAgreementList.ajaxListData(searchParams);
     }
      if(value.filter=='write'){
        searchParams.createrName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.salerName='';
        CommunityAgreementList.ajaxListData(searchParams);
     }
   }


 contractChange=(params)=>{
   let {searchParams}=this.state;
	 if(!params.value){
		 searchParams.contractType='';
	 }else{
		 searchParams.contractType=params.value;
	 }
	 searchParams=Object.assign({},this.state.searchParams,searchParams);
	 this.setState({
		 searchParams
	 })
 }

 isOtherChange=(params)=>{
    let {searchParams}=this.state;
	 if(!params.value){
		 searchParams.hasAgreement='';
	 }else{
		 searchParams.hasAgreement=params.value;
	 }
	 searchParams=Object.assign({},this.state.searchParams,searchParams);
	 this.setState({
		 searchParams
	 })
 }

	everyTd=(value)=>{
		var show=false;
		if(!value){
			return;
		}
		if(value.length==0){
			show=false;

		}else{
			show=true;
		}
		return (<Tooltip offsetTop={5} place='top'>{value}</Tooltip>)
	}

    onPageChange=(page)=>{
    	let {searchParams}=this.state;
    	let {CommunityAgreementList} = this.props;
        searchParams.page=page;
        searchParams.pageSize='15';
    	CommunityAgreementList.ajaxListData(searchParams);
	}




	editClick=(values)=>{
		let {CommunityAgreementList} = this.props;

		State.argumentType=values.contracttype;
		State.listId=values.customerid;
    	State.agreementId=values.id;
    	State.mainBillId=values.mainbillid;
		CommunityAgreementList.openEditAgreement=true;
	}
	maskClock=()=>{
		let {CommunityAgreementList} = this.props;
		CommunityAgreementList.openLocalStorage = false;
		CommunityAgreementList.openOneAgreement=false;
		CommunityAgreementList.openTowAgreement=false;

		CommunityAgreementList.openEditAgreement=false;
		State.openAgreementDetail=false;
	}


	contractRender=()=>{

		         let contractSelect='';
			      if(State.argumentType=='INTENTION'){
                            contractSelect=<Agreement.Admit.Detail
						    params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                            onCancel={this.cancelAgreementDetail}
						  />
			           	 }

                         if(State.argumentType=='ENTER'){
                            contractSelect=<Agreement.Join.Detail
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }

			           	  if(State.argumentType=='ADDRENT'){
                            contractSelect=<Agreement.Increase.Detail
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }


			           	 if(State.argumentType=='LESSRENT'){
                            contractSelect=<Agreement.Reduce.Detail
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }


			           	 if(State.argumentType=='QUITRENT'){
                            contractSelect=<Agreement.Exit.Detail
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }

                          if(State.argumentType=='RENEW'){
                            contractSelect=<Agreement.Renew.Detail
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }

			     return contractSelect
	}

    noDataRender=()=>{
       let {contractList}=this.props.CommunityAgreementList;
       var render='';
       if(contractList.length==0){
         render=<div style={{textAlign:'center',paddingTop:100,paddingBottom:100}}>
								<div className="ui-nothing">
									<div className="icon"></div>
									<p className="tip">暂时还没有数据呦~</p>
								</div>
				</div>
          }else{
          	render=<div style={{display:'none'}}></div>
          }
        return render
    }

    openCopyAgreementDialog=()=>{
    	this.setState({
    		openCopyAgreement:false
    	})
    }
    confirmPrintAgreement=(value)=>{
    	console.log('confirmPrintAgreement',this.state.url+value);
    	// return;
    	let url = this.state.url+value;
    	this.setState({
    		openCopyAgreement:false
    	})
    	var newWindow = window.open(url);
    }
	
	//高级查询打开
	openSearchUpperDialog=()=>{
		let {searchParams}=this.state;
		searchParams.contractType='';
		searchParams.createDateBegin='';
		searchParams.createDateEnd='';
		searchParams.hasAgreement='';
		this.setState({
			searchParams
		})
		this.props.CommunityAgreementList.openSearchUpper=!this.props.CommunityAgreementList.openSearchUpper;
	}

	searchUpperSubmit=()=>{
	   let {searchParams}=this.state;
       this.props.CommunityAgreementList.ajaxListData(searchParams);
	   this.props.CommunityAgreementList.openSearchUpper=!this.props.CommunityAgreementList.openSearchUpper; 
	}


	render(){

      	let {loading}=State;
      	let {contractList} = this.props.CommunityAgreementList;
      	var blockStyle={};
       	const {
			orderBaseInfo,
			earnest,
			installmentPlan,
			contractStatusCount,
		} = this.state.response;


       let options=[
		 {label:'公司名称',value:'company'},
		 {label:'城市',value:'city'},
		 {label:'社区',value:'community'},
		 {label:'销售员',value:'people'},
		 {label:'录入人',value:'write'},
		]

	    let {opretionId,opretionOpen,isShow,searchParams,noDataOpen}=this.state;

      let rowStyle={};
      let rowLineStyle={};
      let rowFootStyle={};

	    if(contractList.length==0){
	    	rowStyle={
	    		marginTop:8
	    	}
	    	rowLineStyle={
	    		display:'none',
	    	}
	    	rowFootStyle={
	    		display:'none',
	    	}
	    }else{
	    	rowStyle={
	    		display:'none',
	    	}
	    	rowLineStyle={
	    		marginTop:8
	    	}
	    	rowFootStyle={
	    		display:'block',
	    	}
	    }
		return(
      <div id="m-agreement-list" className="m-agreement-list">
			<Title value="合同列表"/>
      		<Section title="合同列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:12,marginTop:-4,zIndex:6,position:'relative'}}>
	          	<Col
			     	style={{float:'left'}}
			   	>
				   <CheckPermission  operateCode="contract_create_contract" >

					<Button
						label="新建合同"
						type='button'
						onTouchTap={this.openOneAgreement}
					/>
				  </CheckPermission>

			 	 </Col>
				  <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入关键字' searchFilter={options} onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			      </Col>
				  
	        </Row>


            <Table
			    style={rowStyle}
	            displayCheckbox={false}
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>社区</TableHeaderColumn>
		              <TableHeaderColumn>合同类型</TableHeaderColumn>
		              <TableHeaderColumn>起始时间</TableHeaderColumn>
		              <TableHeaderColumn>结束时间</TableHeaderColumn>
		              <TableHeaderColumn>工位数</TableHeaderColumn>
		              <TableHeaderColumn>独立空间</TableHeaderColumn>
		              <TableHeaderColumn>服务费</TableHeaderColumn>
		              <TableHeaderColumn>销售员</TableHeaderColumn>
		              <TableHeaderColumn>录入人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
					  <TableHeaderColumn>其他约定</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>
				<TableBody className='noDataBody' borderBodyStyle>
					<TableRow style={{backgroundColor:'#fff'}}>
						<TableRowColumn colSpan={100} >
							 {!loading && this.noDataRender()}
						</TableRowColumn>
					</TableRow>
				</TableBody>
			</Table>


            <Table
			    style={rowLineStyle}
	            displayCheckbox={true}
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>社区</TableHeaderColumn>
		              <TableHeaderColumn>合同类型</TableHeaderColumn>
		              <TableHeaderColumn>起始时间</TableHeaderColumn>
		              <TableHeaderColumn>结束时间</TableHeaderColumn>
		              <TableHeaderColumn>工位数</TableHeaderColumn>
		              <TableHeaderColumn>独立空间</TableHeaderColumn>
		              <TableHeaderColumn>服务费</TableHeaderColumn>
		              <TableHeaderColumn>销售员</TableHeaderColumn>
		              <TableHeaderColumn>录入人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
					  <TableHeaderColumn>其他约定</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody>

			        	{ !loading && contractList.map((item,index)=>{
			        		let type='';
			        		if(item.contracttype=='INTENTION'){
                               type='承租意向书'
			        		}
			        		if(item.contracttype=='ENTER'){
                               type='入驻协议书'
			        		}
			        		if(item.contracttype=='ADDRENT'){
                               type='增租协议书'
			        		}
			        		if(item.contracttype=='LESSRENT'){
                               type='减租协议书'
			        		}
			        		if(item.contracttype=='QUITRENT'){
                               type='退租协议书'
			        		}
			        		if(item.contracttype=='RENEW'){
                               type='续租协议书'
			        		}
			        		let border='1px solid #dfdfdf';
			        		let otherBootom=true;
			        		if((!State.editRight || !item.editFlag) && item.contracttype == 'QUITRENT' && (!State.editRight || !item.editFlag)){
								border='0px solid #dfdfdf';
								otherBootom=false;

			        		}

			        		let showOpretion = (item.id == opretionId && opretionOpen)?'visible':'hidden';

			        		return (
				        		<TableRow key={index}>
					                <TableRowColumn><span className="tableOver">{item.company}</span>{this.everyTd(item.company)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.communityName}</span>{this.everyTd(item.communityName)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{type}</span>{this.everyTd(type)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver"><KrDate value={item.leaseBegindate}/></span>{this.everyTd(<KrDate value={item.leaseBegindate}/>)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver"><KrDate value={item.leaseEnddate}/></span>{this.everyTd(<KrDate value={item.leaseEnddate}/>)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.stationnum}</span>{this.everyTd(item.stationnum)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.boardroomnum}</span>{this.everyTd(item.boardroomnum)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.totalrent}</span>{this.everyTd(item.totalrent)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.saler}</span>{this.everyTd(item.saler)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.inputUser}</span>{this.everyTd(item.inputUser)}</TableRowColumn>
									<TableRowColumn><span className="tableOver"><KrDate value={item.createdate}/></span>{this.everyTd(<KrDate value={item.createdate}/>)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.hasAgreement}</span>{this.everyTd(item.hasAgreement)}</TableRowColumn>
					                <TableRowColumn>
					                    <Button label="查看"  type='operation'  onClick={this.lookClick.bind(this,item)}/>

					                    <div className="agreement-list-annex" style={{display:"inline-block",width: 24,paddingRight: 10}}>
					                    <Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,item.id)} linkTrue labelStyleLink={{paddingLeft:0,paddingRight:0,fontWeight:0}}/>
										<UpLoadList open={[this.state.openMenu,this.state.openId]} onChange={this.onChange} detail={item}>Tooltip</UpLoadList>
										</div>

										{(State.isEdit||State.isPrint||State.isDel)&&<div className="agreement-list-other" style={{display:"inline-block",width: 24,paddingRight: 10}}>
											{otherBootom && <Button type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,item.id)} linkTrue/>}
											<div style={{visibility:showOpretion,border:border}} className="m-operation" >
												
													{State.isEdit && item.editFlag && <span style={{display:'block'}} onClick={this.editClick.bind(this,item)}>编辑</span>}
												
													{State.isPrint && item.contracttype != 'QUITRENT' && <span  style={{display:'block'}} onClick={this.print.bind(this,item)}>打印</span>}
												
													{State.isDel && item.editFlag && item.contracttype=='ENTER' && <span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}>删除</a> </span>}

											</div>
										</div>}

					                </TableRowColumn>
					            </TableRow>
					          	);
			        	})}

			        </TableBody>



           </Table>

					 {loading&&<Loading style = {{width:"100%"}}/>}
           {!loading && <div className='footPage' style={rowFootStyle}><Pagination  totalCount={this.props.CommunityAgreementList.totalPaper} page={this.props.CommunityAgreementList.page} pageSize={this.props.CommunityAgreementList.pageSize} onPageChange={this.onPageChange}/></div>}

           </Section>
					{/*新建合同的第一页*/}
					<Drawer
				        open={this.props.CommunityAgreementList.openOneAgreement}
				        width={750}
				        openSecondary={true}
				        onClose={this.closeOneAgreement}

				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >

			       	 	<OneNewAgreement onCancel={this.closeOneAgreement}/>
		           	</Drawer>

		            {/*新建合同的第二页*/}
		           	<Drawer
				        open={this.props.CommunityAgreementList.openTowAgreement}
				        width={750}
				        openSecondary={true}
				        onClose={this.closeTwoAgreement}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >

			       	 	<TwoNewAgreement onCancel={this.closeTwoAgreement} searchParams = {searchParams}/>
		           	</Drawer>

		           {/*编辑合同*/}
		           <Drawer
				        open={this.props.CommunityAgreementList.openEditAgreement}
				        width={750}
				        onClose={this.closeEditAgreement}
				        openSecondary={true}

				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >


			      	<EditAgreementList onCancel={this.closeEditAgreement} searchParams = {searchParams}/>
		           </Drawer>

					{/*新建订单*/}
					<Drawer
							open={State.openNewIndent}
							width={750}
							openSecondary={true}
							onClose={this.closeNewIndent}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}

					 >
						{State.openNewIndent&&
							<NewIndent
								companyName={State.companyName}
								onCancel={this.closeNewIndent}
				                orderReady={State.orderReady}
				                listId={State.listId}
				                customerName={State.customerName}
				                orderCount={State.orderCount}
						/>}
					</Drawer>

                   {/*查看*/}
		            <Drawer
				        open={State.openAgreementDetail}
				        width={750}
				        onClose={this.detailOpenAgreement}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			        >
                        {this.contractRender()}

		           </Drawer>
		           <Dialog
					title="删除合同"
					modal={true}
					onClose={this.openDelAgreementDialog}
					open={this.state.openDelAgreement}
					contentStyle={{width:445,height:236}}>
						<DelAgreementNotify onSubmit={this.confirmDelAgreement} onCancel={this.openDelAgreementDialog.bind(this,0)}/>
					</Dialog>
					 <Dialog
					title="打印"
					modal={true}
					onClose={this.openCopyAgreementDialog}
					open={this.state.openCopyAgreement}
					contentStyle={{width:700,height:'auto'}}>
						<PrintAgreement onSubmit={this.confirmPrintAgreement} onCancel={this.openCopyAgreementDialog}/>

					</Dialog>

					{/*高级查询*/}
                    <Dialog
						title="高级查询"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={this.props.CommunityAgreementList.openSearchUpper}
						contentStyle ={{ width: '666',height:'320px',overflow:'visible'}}
					>
				    <SearchForm
			  		  onStartChange={this.onStartChange}
			  		  onEndChange={this.onEndChange}
					  contractChange={this.contractChange}
					  isOtherChange={this.isOtherChange}
					  onCancel={this.openSearchUpperDialog}
					  onSubmit={this.searchUpperSubmit}
			  		 />
				    </Dialog>

        </div>
		);
	}

}
export default Merchants;
