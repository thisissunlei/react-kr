import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
	observer
} from 'mobx-react';
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
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message,
	UpLoadList,
	FontIcon,
	Pagination
} from 'kr-ui';
import DateFormat from "kr/Utils";
import State from './State';
import SearchForm from "./SearchForm";
import OneNewAgreement from "./OneNewAgreement";
import TwoNewAgreement from "./TwoNewAgreement";
import EditAgreementList from "./EditAgreementList";
import Admit from "./Admit";
import Create from './Admit/Create';


import AdmitDetail from './Admit/Detail';
import ExitDetail from './Exit/Detail';
import ReduceDetail from './Reduce/Detail';
import RenewDetail from './Renew/Detail';
import IncreaseDetail from './Increase/Detail';
import JoinDetail from './Join/Detail';
import NewIndent from "./NewIndent";
import DelAgreementNotify from './DelAgreementNotify';
import './index.less';
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
		    todayDate:'',
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
           
		}
		 this.allOrderReady();
	}

	//新建订单的数据准备
	allOrderReady=()=>{
		var _this=this;
	    Store.dispatch(Actions.callAPI('community-city-selected')).then(function(response) {
         State.orderReady=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	//打开第二新建页面
	openTwoAgreement = () => {
		State.openTowAgreement=true;
	}
	//关闭第二新建页面
	closeTwoAgreement = () => {
		State.openTowAgreement=false;
	}

	//打开第一新建页面
	openOneAgreement = () => {
		State.openOneAgreement=true;
	}
	//关闭第一新建页面
	closeOneAgreement = () => {
		State.openOneAgreement=false;
	}
	//打开编辑页
	openEditAgreement = () => {
		State.openEditAgreement=true;
	}
	//关闭编辑页
	closeEditAgreement = () =>{
		State.openEditAgreement=false;
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

    componentWillMount(){
    	State.createContract();
    }    
    //查看关闭
	cancelAgreementDetail=(event)=>{
		// console.log("ppppp");
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
			console.log("11111")
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:!this.state.opretionOpen,
				
			})
		}else{
			console.log("2222")

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
		console.log('target',target);
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

		let {
			delAgreementId
		} = this.state;
		Store.dispatch(Actions.callAPI('delete-enter-contract', {
			contractId: delAgreementId
		})).then(function(response) {
			 Message.success('删除成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 100)
		}).catch(function(err) {
            Message.error(err.message);
		});
		State.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})

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
		let url = `./#/operation/customerManage/${item.customerid}/order/${item.mainbillid}/agreement/${name}/${item.id}/print`
		var newWindow = window.open(url);

	}
 
    ajaxRebd=()=>{

    }

	componentDidMount() {
		State.ajaxListData(this.state.searchParams);
  //     	let _this=this;
		// let bodyElem=document.getElementsByTagName("body")[0];
		// bodyElem.onclick=function(event){
		// 	event = event || window.event;
		// 	var target = event.target;
		// 	console.log("body");
		// 	while (target) {
				
		// 		if (target && target.className && target.className.indexOf('agreement-list-annex') !== -1 ||
		// 			target && target.className && target.className.indexOf('agreement-list-other') !== -1
		// 			) {
		// 			return;
		// 		}
		// 		target = target.parentNode;
		// 	}

		// 	_this.setState({
				
		// 		openMenu:false,
		// 		opretionOpen:false,
				

		// 	})
		// }

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
			},function(){
			    State.ajaxListData(searchParams);
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
			},function(){
                State.ajaxListData(searchParams);
			});
			
        })

    }

   //搜索提交
   onSearchSubmit=(value)=>{
   	 let {searchParams}=this.state;
      if(value.filter=='company'){
        searchParams.customerName=value.content;
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        State.ajaxListData(searchParams);
     }
      if(value.filter=='city'){
        searchParams.cityName=value.content;
        searchParams.customerName='';
        searchParams.communityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        State.ajaxListData(searchParams);
     }
      if(value.filter=='community'){
        searchParams.communityName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.salerName='';
        searchParams.createrName='';
        State.ajaxListData(searchParams);
     }
      if(value.filter=='people'){
        searchParams.salerName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.createrName='';
        State.ajaxListData(searchParams);
     }
      if(value.filter=='write'){
        searchParams.createrName=value.content;
        searchParams.customerName='';
        searchParams.cityName='';
        searchParams.communityName='';
        searchParams.salerName='';
        State.ajaxListData(searchParams);
     }
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
        searchParams.page=page;
        searchParams.pageSize='15';
    	State.ajaxListData(searchParams);
	}




	editClick=(values)=>{
		State.argumentType=values.contracttype;
		State.listId=values.customerid;
    	State.agreementId=values.id;
    	State.mainBillId=values.mainbillid;
		State.openEditAgreement=true;
	}
	maskClock=()=>{
		State.openOneAgreement=false;
		State.openTowAgreement=false;
		State.openEditAgreement=false;
		State.openAgreementDetail=false;
	}


	contractRender=()=>{
		         let contractSelect='';
			      if(State.argumentType=='INTENTION'){
                            contractSelect=<AdmitDetail 
						    params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                            onCancel={this.cancelAgreementDetail}
						  />
			           	 }
                         
                         if(State.argumentType=='ENTER'){
                            contractSelect=<JoinDetail 
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }

			           	  if(State.argumentType=='ADDRENT'){
                            contractSelect=<IncreaseDetail 
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }


			           	 if(State.argumentType=='LESSRENT'){
                            contractSelect=<ReduceDetail 
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }


			           	 if(State.argumentType=='QUITRENT'){
                            contractSelect=<ExitDetail 
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>
			           	 }

                          if(State.argumentType=='RENEW'){
                            contractSelect=<RenewDetail 
						 params={{id:State.agreementId,customerId:State.listId,orderId:State.mainBillId}}
                         onCancel={this.cancelAgreementDetail}
						/>		
			           	 }

			     return contractSelect
	}

    noDataRender=()=>{
       let {contractList}=State;
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


	render(){     

      	let {contractList}=State;
      	var blockStyle={};
       	const {
			orderBaseInfo,
			earnest,
			installmentPlan,
			contractStatusCount,
		} = this.state.response;
         
         
	    let {opretionId,opretionOpen,isShow,searchParams,todayDate,noDataOpen}=this.state;
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
      <div className="m-agreement-list">
			<Title value="合同列表"/>
      		<Section title="合同列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:18,marginTop:-4,zIndex:6,position:'relative'}}>
	          	<Col
			     	style={{float:'left',marginTop:6}}
			   	>
					{State.editRight&&<Button
						label="新建合同"
						type='button'
						onTouchTap={this.openOneAgreement}
					/>}

			 	 </Col>
			  	 <Col
			  		style={{float:'right',width:"90%"}}
			  	 >

			  		<SearchForm  
			  		  onStartChange={this.onStartChange} 
			  		  onEndChange={this.onEndChange} 
			  		  todayDate={todayDate}
                      onSearchSubmit={this.onSearchSubmit}
			  		 />
			 		
			  	</Col>
			          
	        </Row>
       

            <Table
			    style={rowStyle}
	            displayCheckbox={false}
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>城市</TableHeaderColumn>
		              <TableHeaderColumn>社区</TableHeaderColumn>
		              <TableHeaderColumn>合同类型</TableHeaderColumn>
		              <TableHeaderColumn>起始时间</TableHeaderColumn>
		              <TableHeaderColumn>结束时间</TableHeaderColumn>
		              <TableHeaderColumn>工位数</TableHeaderColumn>
		              <TableHeaderColumn>独立空间</TableHeaderColumn>
		              <TableHeaderColumn>服务费总额</TableHeaderColumn>
		              <TableHeaderColumn>销售员</TableHeaderColumn>
		              <TableHeaderColumn>录入人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>
				<TableBody className='noDataBody' borderBodyStyle>
					<TableRow style={{backgroundColor:'#fff'}}>
						<TableRowColumn colSpan={100} >
							 {this.noDataRender()}
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
		              <TableHeaderColumn>城市</TableHeaderColumn>
		              <TableHeaderColumn>社区</TableHeaderColumn>
		              <TableHeaderColumn>合同类型</TableHeaderColumn>
		              <TableHeaderColumn>起始时间</TableHeaderColumn>
		              <TableHeaderColumn>结束时间</TableHeaderColumn>
		              <TableHeaderColumn>工位数</TableHeaderColumn>
		              <TableHeaderColumn>独立空间</TableHeaderColumn>
		              <TableHeaderColumn>服务费总额</TableHeaderColumn>
		              <TableHeaderColumn>销售员</TableHeaderColumn>
		              <TableHeaderColumn>录入人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody>
			        	{contractList.map((item,index)=>{
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
			        		let showOpretion = (item.id == opretionId && opretionOpen)?'visible':'hidden';

			        		return (
				        		<TableRow key={index}>
					                <TableRowColumn><span className="tableOver">{item.company}</span>{this.everyTd(item.company)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.cityName}</span>{this.everyTd(item.cityName)}</TableRowColumn>
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
					                <TableRowColumn>
					                    <Button label="查看"  type='operation'  onClick={this.lookClick.bind(this,item)}/>

					                    <div className="agreement-list-annex" style={{display:"inline-block",width: 24,paddingRight: 10}}>
					                    <Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,item.id)} linkTrue labelStyleLink={{paddingLeft:0,paddingRight:0,fontWeight:0}}/>
										<UpLoadList open={[this.state.openMenu,this.state.openId]} onChange={this.onChange} detail={item}>Tooltip</UpLoadList>
										</div>

										<div className="agreement-list-other" style={{display:"inline-block",width: 24,paddingRight: 10}}>
											<Button type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,item.id)} linkTrue/>
											<div style={{visibility:showOpretion}} className="m-operation" >
												{State.editRight&&item.editFlag&&<span style={{display:'block'}} onClick={this.editClick.bind(this,item)}>编辑</span> }
												{<span  style={{display:'block'}} onClick={this.print.bind(this,item)}>打印</span>}
												{State.editRight&&item.editFlag&&item.contracttype=='ENTER'&&<span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}>删除</a> </span>}
							
											</div>
										</div>
					                    
					                </TableRowColumn>
					            </TableRow>
					          	);
			        	})}
			              
			        </TableBody>
			  
			       
           </Table>

           <div className='footPage' style={rowFootStyle}><Pagination  totalCount={State.totalPaper} page={State.page} pageSize={State.pageSize} onPageChange={this.onPageChange}/></div>

           </Section>
					{/*新建合同的第一页*/}
					<Drawer
				        open={State.openOneAgreement}
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
				        open={State.openTowAgreement}
				        width={750}
				        openSecondary={true}
				        onClose={this.closeTwoAgreement}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			       	 	<TwoNewAgreement onCancel={this.closeTwoAgreement}/>
		           	</Drawer>

		           {/*编辑合同*/}
		           <Drawer
				        open={State.openEditAgreement}
				        width={750}
				        onClose={this.closeEditAgreement}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			      	
			      	<EditAgreementList onCancel={this.closeEditAgreement}/>
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

        </div>
		);
	}

}
export default Merchants;
