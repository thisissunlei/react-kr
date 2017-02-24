import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
	observer
} from 'mobx-react';
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
// import NewIndent from "./NewIndent";


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
            
           
           
		}
	}
	//打开第二新建页面
	openAgreement=()=>{
		State.openAgreement=true;
	}
	//关闭第二新建页面
	closeAgreement=()=>{
		State.openAgreement=false;
	}

	//打开第一新建页面
	openOneAgreement=()=>{
		State.openNewAgreement=true;
	}
	//关闭第一新建页面
	closeOneAgreement=()=>{
		State.openNewAgreement=false;
	}


	//客户编辑页面开关
	switchEditCustomerList=() => {
		
		State.switchEditCustomerList();

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
    //加载所有数据
    onLoaded=(value)=>{
       let loadData = value.items;
	   this.setState({
			 loadData
		 })
    }
    //领取浮框的关闭
    merClose=()=>{
        State.openDialog=false;	
    }
    //查看相关操作
    onOperation=()=>{
     
      	 State.agreementDetail();
     
    }
    
     cancelAgreementDetail=()=>{
     	State.agreementDetail();
     }

	//新建提交按钮
	onNewMerchants=(params)=>{
		switchNewMerchants(params);
	}
	
	//搜索
	onSearchSubmit=(params)=>{
        let obj = {
			company: params.content,
		}	
		State.searchParams=obj	
	}

	componentWillReceiveProps(nextProps){	
			
	}
	onChange=()=>{

	}
	uploadFile = (id) => {
		let fileId = this.state.openId;
		if(fileId == id){
			this.setState({
				openMenu:!this.state.openMenu,
				openId:id,
				opretionOpen:false
			})
			console.log("123")
		}else{
			this.setState({
				openMenu:true,
				openId:id,
				opretionOpen:false
			})
			console.log("456")

		}
	}

	showMoreOpretion = (id) => {
		let {opretionId,opretionOpen} = this.state;
		if(opretionId == id){
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:!this.state.opretionOpen
			})
		}else{
			this.setState({
				opretionId:id,
				openMenu:false,
				opretionOpen:true
			})
		}
		// if(!opretionOpen){
		// 	document.addEventListener('click', this.docClick)
		// }
		
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
		
			this.setState({
				delAgreementId,
			}, function() {
				this.openDelAgreementDialog();
			});

		


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
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/${name}/${item.id}/print`
		var newWindow = window.open(url);

	}
	componentDidMount() {
		State.ajaxListData(State.searchParams);
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
		return (<Tooltip className="tooltipTextStyle" style={{padding:10, maxWidth:224,}} offsetTop={5} place='top'><div style={{width:160,minHeight:20,wordWrap:"break-word",padding:"10px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div></Tooltip>)
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
		let {
			isShow
		} = this.state
		let {opretionId,opretionOpen}=this.state;
		return(
      <div className="m-agreement-list">
			<Title value="合同列表"/>
      		<Section title="合同列表" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:18,marginTop:-4}}>
	          	<Col
			     	style={{float:'left',marginTop:6}}
			   	>
					<Button
						label="新建合同"
						type='button'
						onTouchTap={this.openOneAgreement}
					/>

			 	 </Col>
			  	<Col
			  		style={{float:'right',width:"90%"}}
			  	>

			  		<SearchForm />
			 		
			  	</Col>
			          
	        </Row>


            <Table
			    style={{marginTop:8}}
	            displayCheckbox={true}
	            exportSwitch={true}
			   
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

			        <TableBody >
			        	{contractList.map((item,index)=>{
			        		let showOpretion = (item.id == opretionId && opretionOpen)?'visible':'hidden';
			        		return (
				        		<TableRow>
					                <TableRowColumn><span className="tableOver">{item.company}</span>{this.everyTd(item.company)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.cityName}</span>{this.everyTd(item.cityName)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.communityName}</span>{this.everyTd(item.communityName)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.contracttype}</span>{this.everyTd(item.contracttype)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver"><KrDate value={item.leaseBegindate}/></span>{this.everyTd(item.leaseBegindate)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver"><KrDate value={item.leaseEnddate}/></span>{this.everyTd(item.leaseEnddate)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.stationnum}</span>{this.everyTd(item.stationnum)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.boardroomnum}</span>{this.everyTd(item.boardroomnum)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.totalrent}</span>{this.everyTd(item.totalrent)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.saler}</span>{this.everyTd(item.saler)}</TableRowColumn>
									<TableRowColumn><span className="tableOver">{item.inputUser}</span>{this.everyTd(item.inputUser)}</TableRowColumn>
									<TableRowColumn><span className="tableOver"><KrDate value={item.createdate}/></span>{this.everyTd(item.createdate)}</TableRowColumn>
					                <TableRowColumn>
					                    <Button label="查看"  type='operation' onClick={this.onOperation} />
					                    <span className='upload-button'><Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,item.id)}/></span>
										<Button  type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,item.id)}/>
										<UpLoadList open={[this.state.openMenu,this.state.openId]} onChange={this.onChange} detail={item}>Tooltip</UpLoadList>
										
										<div style={{visibility:showOpretion}} className="m-operation" >
											{<span style={{display:'block'}}>编辑</span> }
											{ <span  style={{display:'block'}} onClick={this.print.bind(this,item)}>打印</span>}
											{<span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}>删除</a> </span>}
						
										</div>
					                    
					                </TableRowColumn>
					            </TableRow>
					          	);
			        	})}
			              
			        </TableBody>
			        <TableFooter></TableFooter>
           </Table>

          </Section>
					//新建合同的第一页
					<Drawer
				        open={State.openNewAgreement}
				        width={750}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			        <OneNewAgreement onCancel={this.closeOneAgreement}/>
		           </Drawer>
		           //编辑合同
		           <Drawer
				        open={State.openAgreement}
				        width={750}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			      	{/*<NewIndent onCancel={this.closeAgreement}/>*/}
			      	<EditAgreementList onCancel={this.closeAgreement}/>
		           </Drawer>

					{/*新建订单*/}
					<Drawer
							open={State.openNewIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<NewIndent
							 companyName={State.companyName}
							 onCancel={this.switchNewIndent}
			                 orderReady={orderReady}
			                 listId={State.listId}
			                 customerName={State.customerName}
			                 orderCount={State.orderCount}
			                 isOpenIndent={State.orderName}
						/>
					</Drawer>
				  
                   {/*查看*/}
		            <Drawer
				        open={State.openAgreementDetail}
				        width={750}
				        openSecondary={true}
				        //className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			        >
						{/*<ExitDetail 
						 params={{id:1,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>

						<ReduceDetail 
						 params={{id:1,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>

						<RenewDetail 
						 params={{id:1,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>						

						<AdmitDetail 
						 params={{id:985,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>

						<JoinDetail 
						 params={{id:1,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>*/}

						<IncreaseDetail 
						 params={{id:1,customerId:2,orderId:4}}
                         onCancel={this.cancelAgreementDetail}
						/>

		           </Drawer>

					

					
        </div>
		);
	}

}
export default Merchants;
