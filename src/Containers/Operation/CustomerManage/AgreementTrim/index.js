import React, { PropTypes } from 'react'; 
import { connect } from 'kr/Redux';

import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { observer } from 'mobx-react';

import {
	Actions,
	Store
} from 'kr/Redux';

import Baidu from 'kr/Utils/Baidu';

import {Http,DateFormat} from 'kr/Utils';

import {
	Tabs,
	Tab,
	Form,
	Title,
	Message,
	Section,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Button,
	Tooltip,
	SearchForms,
	Drawer,
	KrField,
	Row,
	Col,
	Dialog,
	Grid,
	ListGroup,
	ListGroupItem


} from 'kr-ui';
import './index.less'
import AgreementList from './AgreementList';
import Edit from './Edit';
import State from './State';
import Data from './Data';

@observer
class AgreementTrim extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log('did')
	}
	onPageChange=(page)=>{
		console.log(page)
	}
	onSearchSubmit=(value)=>{
		let customerId ;

		if(!value.id){
			customerId ='';
		}else{
			customerId = value.id;

		}
		console.log(value)
		let params = {
			customerId,
			page:1
		}
		// let content = value.content;
		State.searchParams = Object.assign({},State.searchParams,params);
		console.log('onSearchSubmit',State.searchParams)
	}
	openNewCreateDialog=()=>{
		State.openAgreementList = true;
	}


	contracttype=(type)=>{
    	let typeName = '';
    	switch (type){
			case 'ENTER' :
				typeName = '入驻协议书'; 
				break;
			case 'ADDRENT' :
				typeName = '增租协议书';
				break;
			case 'RENEW' :
				typeName = '续租协议书'
				break;
			case 'LESSRENT' :
				typeName = '减租协议书'
				break;
			case 'QUITRENT' :
				typeName = '退租协议书'
				break;
			case 'INTENTION' :
				typeName = '承租意向书'
				break;
		}
		return typeName;
    }
	detailOpenAgreement=()=>{
		console.log('detailOpenAgreement')
		State.contractList = []
		State.openAgreementList=false;
	}
	detailOpenEdit=()=>{
		State.openAgreementList=false;
		State.contractList = []
		State.openEdit = false;
	}
	deleteDemos=()=>{
		State.openDelete = true;
	}
	deleteDialogClose=()=>{
		State.openDelete = false;
	}
	deleteDemoFun=()=>{
		State.deleteDemo();
	}
	customerName=(itemData)=>{
		console.log('customerName',itemData);
		window.open(window.location.origin+`/new/#/operation/customerManage/`+itemData.customerid+`/order/`+itemData.mainbillid+`/detail`);
	}
	createData=()=>{
		State.opencreateData()
	}

	


	render() {
		

		return (

			<div className="tab-container-trim" style={{minHeight:910,background:'#fff'}}>

			<Title value="合同调整"/>
			<Section title="合同调整" description="" bodyPadding={'20px 20px 50px 20px'}>
				
				<Row>
			          <Col
					     align="left"
					     style={{float:'left',marginTop:3}}
					   >
						<Button  label="新建"  onTouchTap={this.openNewCreateDialog} />
						<span style={{display:'inline-block',width:30}}></span>
						<Button  label="清除测试数据" width={110} onTouchTap={this.deleteDemos} />
						<span style={{display:'inline-block',width:30}}></span>
						<Button  label="确认月收入数据" width={110} onTouchTap={this.createData} />
					  </Col>

			          <Col style={{marginTop:-15,float:'right'}}>
				        <form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45,lineHeight:'45px'}}>
							<span className='source-customer'>客户名称:</span>
                 			<KrField  grid={1} name="sourceId" style={{marginTop:4,width:150}} component='companyName'  onChange={this.onSearchSubmit} placeholder='请选择' />
						</form>
			          </Col>
	         </Row>
				<Table
					displayCheckbox={false}
					className="member-list-table"
					style={{marginTop:10,position:'inherit'}}
					ajax={true}
					ajaxFieldListName='items'
					ajaxUrlName='agreementTrimList'
					ajaxParams={State.searchParams}
					onPageChange={this.onPageChange}
				>
					<TableHeader>
						<TableHeaderColumn>客户名称</TableHeaderColumn>
						<TableHeaderColumn>订单名称</TableHeaderColumn>
						<TableHeaderColumn>合同类型</TableHeaderColumn>
						<TableHeaderColumn style={{width:350}}>调整内容</TableHeaderColumn>
						<TableHeaderColumn style={{width:100}}>操作人</TableHeaderColumn>
						<TableHeaderColumn style={{width:160}}>操作时间</TableHeaderColumn>
					</TableHeader>
					<TableBody style={{position:'inherit'}}>
						<TableRow>
						<TableRowColumn name="customerName"
						component={(value,oldValue,itemData)=>{
							 return (
							 	<div style={{padding:5,whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}} >
							 		<span className='tableOver'
							 			onTouchTap={this.customerName.bind(this,itemData)}>
							 			{value}
							 		</span>

							 	</div>)
						}}
						></TableRowColumn>
						<TableRowColumn name="mainbillName"
						component={(value,oldValue)=>{
							 return (<div style={{padding:5,whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}} >
							 <span>{value}</span></div>)
						}}
						></TableRowColumn>
						<TableRowColumn name="detailType"
						></TableRowColumn>
						<TableRowColumn name="changeContent"
						component={(value,oldValue)=>{

							var TooltipStyle=""
							if(value.length==""){
								TooltipStyle="none"
							}else{
								TooltipStyle="block";
							}
							 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:350,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
							 	<Tooltip offsetTop={0} place='bottom' >
									<div style={{width:"350px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{value}</div>
							 	</Tooltip></div>)
						}}

						></TableRowColumn>
						<TableRowColumn name="operateName"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="operatedate"
						component={(value,oldValue,itemData)=>{
							if(value==""){
								value="-"
							}
							return (<span>{DateFormat(itemData.operatedate,'yyyy/mm/dd HH:MM:ss')}</span>)}}
						></TableRowColumn>
						</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
				</Table>					
			</Section>
			   <Drawer
				    open={State.openAgreementList}
				    width={750}
				    onClose={this.detailOpenAgreement}
				    openSecondary={true}
				    modal={true}
				    containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			    >
                    <AgreementList />

		        </Drawer>
		        <Drawer
				    open={State.openEdit}
				    width={750}
				    modal={true}
				    onClose={this.detailOpenEdit}
				    openSecondary={true}
				    containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			    >
                    <Edit />

		        </Drawer>
		    <Dialog
				title="提示"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.deleteDialogClose}
				open={State.openDelete} 
				contentStyle={{width:'400px'}}>
					<div>
						<p style={{textAlign:'center',margin:'30px'}}>仅限（内部）氪空间下的测试数据</p>
						<Grid>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'40%',textAlign:'right',paddingRight:'5%'}}><Button  label="确定" type="submit"  onTouchTap={this.deleteDemoFun}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'40%',textAlign:'left',paddingLeft:'5%'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.deleteDialogClose}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</div>

			  </Dialog>
			<Dialog
				title="确认月收入数据"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.createData}
				open={State.createData} 
				contentStyle={{width:'400px'}}>
					<Data onCancel={this.createData} />

			  </Dialog>


			


		</div>
		);
	}
}
export default AgreementTrim = reduxForm({
	form: 'SearchList',
})(AgreementTrim);
