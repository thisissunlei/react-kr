import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
	observer,
	inject
} from 'mobx-react';

import {
	Tabs,
	Tab,
	Dialog,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';

import $ from 'jquery';
import allState from "../State";

import { Agreement } from 'kr/PureComponents';

import './index.less';


@inject("CommunityAgreementList")
@observer
class LookCustomerList extends Component{

	constructor(props,context){
		super(props, context);

	}
	onSubmit = () => {

	 this.props.CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''});
	 Store.dispatch(change('SearchForm','contractType',""));
	 Store.dispatch(change('SearchForm','createDateBegin',""));
	 Store.dispatch(change('SearchForm','createDateEnd',""));
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	onActive=(type)=>{
		allState.active = type;
	}

	componentWillReceiveProps(nextProps){

	}
	componentDidMount(){
		this.getlocalSign();
		let {CommunityAgreementList} = this.props
		CommunityAgreementList.openLocalStorage=false;
		allState.openLocalStorages = 0;
		let obj = this.renderTab();
		let defaultActive = obj.showTab[0].props.label;
		switch (defaultActive){
			case '入驻协议书' :
				this.onActive('enter')
				break;
			case '增租协议书' :
				this.onActive('increase')
				break;
			case '续租协议书' :
				this.onActive('relet')
				break;
			case '减租协议书' :
				this.onActive('reduce')
				break;
			case '退租协议书' :
				this.onActive('returnRent')
				break;
			case '承租意向书' :
				this.onActive('admit')
				break;
		}

	}
	getlocalSign=()=>{
		allState.hasLocal = false;
		let type = ['ENTER','INTENTION','ADDRENT','RENEW','LESSRENT','QUITRENT'];
		let keyWord = allState.mainBillId+''+ allState.listId  ;
		let local = [];
		type.map((item)=>{
			let localData = JSON.parse(localStorage.getItem(keyWord + item+'create'));
			if(localData && localData.num-localData.oldNum>1){
				allState.openLocalStorage = true;
				allState.hasLocal = true;
				local.push(item)
			}
		})
		allState.local = local;
	}

	renderTab=()=>{
		let num="";
		let text="";

        let dialogDiv=[];
        let showTab=[];
        let noneTab=[];
        let obj = {
        	showTab:[],
        	noneTab:[],
        	dialogDiv:[]
        }

        let local = allState.local;

		if(!allState.enter){
			num=50+(5-noneTab.length)*109.16;
			text="入驻协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="入驻协议书" onActive={this.onActive.bind(this,'enter')}>
					<Agreement.Join.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit} />
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="入驻协议书" onActive={this.onActive.bind(this,'enter')} type="ENTER">
					<Agreement.Join.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);
		}


		if(!allState.increase){

			num=50+(5-noneTab.length)*109.16;

			text="增租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="增租协议书" onActive={this.onActive.bind(this,'increase')} >
					<Agreement.Increase.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="增租协议书" onActive={this.onActive.bind(this,'increase')} type="ADDRENT">
					<Agreement.Increase.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);
		}



		if(!allState.relet){
			num=50+(5-noneTab.length)*109.16;

			text="续租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="续租协议书" onActive={this.onActive.bind(this,'relet')}>
					<Agreement.Renew.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			)

		}else{
			showTab.push(
				<Tab label="续租协议书" onActive={this.onActive.bind(this,'relet')} type="RENEW">
					<Agreement.Renew.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);

		}


		if(!allState.reduce){
			num=50+(5-noneTab.length)*109.16;

			text="减租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="减租协议书" onActive={this.onActive.bind(this,'reduce')}>
					<Agreement.Reduce.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="减租协议书" onActive={this.onActive.bind(this,'reduce')} type="LESSRENT">
					<Agreement.Reduce.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);
		}


		if(!allState.returnRent){
			num=50+(5-noneTab.length)*109.16;

			text="退租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="退租协议书" onActive={this.onActive.bind(this,'returnRent')}>
					<Agreement.Exit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="退租协议书" onActive={this.onActive.bind(this,'returnRent')} type="QUITRENT">
					<Agreement.Exit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);

		}

		if(!allState.admit){

			num=50+(5-noneTab.length)*109.16;

			text="承租意向书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="承租意向书" onActive={this.onActive.bind(this,'admit')}>
					<Agreement.Admit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="承租意向书" onActive={this.onActive.bind(this,'admit')} type='INTENTION'>
					<Agreement.Admit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}} onSubmit={this.onSubmit}/>
				</Tab>
			);

		}

		obj.noneTab = noneTab;

		obj.dialogDiv = dialogDiv;
		let localArr = [];
		showTab.map((item,index)=>{
			local.map(value=>{
				if(item.props.type == value){
					localArr.push(item);
					showTab.splice(index,1)
				}
			})
		})
		localArr = localArr.reverse();
		showTab = localArr.concat(showTab);

		obj.showTab = showTab;


		return obj;


	}
	removeLocalStorage=()=>{
		let keyWord = allState.mainBillId+''+allState.listId;

		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(itemName.indexOf(keyWord)!='-1' && itemName.indexOf('create')!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 console.log(removeList)
		 removeList.map((item)=>{
 			 localStorage.removeItem(item);
 		})
 		console.log('remove')
	}

	onCancelStorage=()=>{
		this.removeLocalStorage();
		let {CommunityAgreementList} = this.props
		allState.openLocalStorage=false;
		console.log('open')
		CommunityAgreementList.openLocalStorage=false;
		
		allState.local = [];
	}
	getLocalStorage=()=>{
		let {CommunityAgreementList} = this.props
		allState.openLocalStorage=false
		CommunityAgreementList.openLocalStorage=true;
	}

	render(){
		let obj = this.renderTab();

		return(
		      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:8}}>
		      	<div className="title" >
					<div className="look-close" onClick={this.onCancel}></div>
				</div>
				<div style={{height:30}}></div>
				<Tabs className="tabs"
			 		 inkBarStyle={{background:"#499df1",top:0}}
			 		 initialSelectedIndex={-1}
			 		 tabTemplateStyle={{color:"#333"}}
			 		 style={{width:100}}
				>
				{obj.showTab}
				{obj.noneTab}


			</Tabs>
			<div className="m-noneClick" style={{width:obj.noneTab.length*109.16}}>
			 {obj.dialogDiv}
			</div>
					<Dialog
				title="提示"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={allState.openLocalStorage}
				contentStyle={{width:'400px'}}>
					<div>
						<p style={{textAlign:'center',margin:'30px'}}>是否加载未提交的合同数据？</p>
						<Grid>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'40%',textAlign:'right',paddingRight:'5%'}}><Button  label="确定" type="submit"  onTouchTap={this.getLocalStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'40%',textAlign:'left',paddingLeft:'5%'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancelStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</div>

			  </Dialog>
		    </div>
		);
	}

}
export default LookCustomerList;
