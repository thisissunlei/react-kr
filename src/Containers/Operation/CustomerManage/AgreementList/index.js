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


import './index.less';
@observer
class Merchants extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			//选中的数量
			dialogNum:0,
			//加载后的数据
			loadData:[],
			//选中的值
			arrItem:[]
		}
	}
	//打开第二新建页面
	openAgreement=()=>{
		State.openAgreement=true;
	}
	//打开第二新建页面
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
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	 State.agreementDetail();
      }
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
	uploadFile=(id)=>{
		let fileId = this.state.openId;
		if(fileId == id){
			this.setState({
				openMenu:!this.state.openMenu,
				openId:id,
				opretionOpen:false
			})
		}else{
			this.setState({
				openMenu:true,
				openId:id,
				opretionOpen:false
			})
		}
	}
	showMoreOpretion=(id)=>{
		
		
	}
	setDelAgreementId(delAgreementId) {
		

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

	render(){

      let {dataReady,searchParams}=this.props;

      var blockStyle={};
      if(State.openDialog==true){
        blockStyle={
        	display:'inline-block'
        }
      }else{
      	blockStyle={
        	display:'none'
        }
      }
       

		return(
      <div className="m-agreement-list" style={{paddingTop:25}}>


			<Title value="客户列表"/>
      		
	        <Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left'}}
					   >
									<Button
											label="新建客户"
											type='button'
											onTouchTap={this.openAgreement}
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
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            onSelect={this.onSelect}
	            onLoaded={this.onLoaded}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='shareCustomers'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>意向城市</TableHeaderColumn>
		              <TableHeaderColumn>意向社区</TableHeaderColumn>
		              <TableHeaderColumn>意向工位数</TableHeaderColumn>
		              <TableHeaderColumn>来源</TableHeaderColumn>
		              <TableHeaderColumn>客户分类</TableHeaderColumn>
		              <TableHeaderColumn>领取人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="company" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn name="intentionCommunityName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="levelName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="createDate" type='date' component={(value,oldValue)=>{
						                				let show="inline-block";
						                				if(value.length==0){
						                					show="none";
						                				}else{
						                					show="inline-block";
						                				}
														 return (<div style={{display:"inline-block"}}><span className='tableOver' style={{maxWidth:130,marginTop:5,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}><KrDate value={value} format="yyyy-mm-dd"/><span>...</span></span>
														 	<Tooltip offsetTop={10} place='top' style={{left:50,display:show}}>
																<div><KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
														 	</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="查看"  type="operation"  operation="watch" />

			                    <span className='upload-button' style={{position:"relative",top:"-2px"}}><Button  type="link" label="附件" href="javascript:void(0)" onTouchTap={this.uploadFile.bind(this,1)} operation="upload"/></span>
								{(true)?<Button  type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,1)} operation="upload"/>:''}
								
								<UpLoadList open={[]} onChange={this.onChange} detail={[]}>Tooltip</UpLoadList>
								<div style={{}} className="m-operation" >
									{false && <span style={{display:'block'}}><a  type="link" label="编辑" href="#" disabled={true}>编辑</a></span> }
									{false && <span  style={{display:'block'}} onClick={this.print.bind(this,[])}>打印</span>}
									{false  && <span style={{display:'block'}}><a  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,1)} disabled={true}>删除</a> </span>}
								</div>
								
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
           </Table>


					
					<Drawer
				        open={State.openNewAgreement}
				        width={750}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			        <OneNewAgreement onCancel={this.closeOneAgreement}/>
		           </Drawer>

		           <Drawer
				        open={State.openAgreement}
				        width={750}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						
			      	{/*<TwoNewAgreement onCancel={this.closeAgreement}/>*/}
			      	<EditAgreementList onCancel={this.closeAgreement}/>
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

						<IncreaseDetail 
						 params={{id:1,customerId:2,orderId:4}}
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
