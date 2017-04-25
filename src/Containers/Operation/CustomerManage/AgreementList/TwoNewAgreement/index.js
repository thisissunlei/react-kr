    import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';

import {
	Tabs,
	Tab,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import $ from 'jquery';
import Admit from "../Admit/Create";
import Exit from "../Exit/Create";
import Increase from "../Increase/Create";
import Join from "../Join/Create";
import Reduce from "../Reduce/Create";
import Renew from "../Renew/Create";
import allState from "../State";

import { Agreement } from 'kr/PureComponents';

import './index.less';
@observer
class LookCustomerList extends Component{

	constructor(props,context){
		super(props, context);

	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
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
		let obj = this.renderTab();
		this.getlocalSign();
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
		let keyWord = allState.mainBillId+''+ allState.listId;
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1' && localStorage.key(i).indexOf('createnum')!= '-1'){
				allState.openLocalStorage = true;
			 }
		 }
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

		if(!allState.enter){
			num=50+(5-noneTab.length)*109.16;
			text="入驻协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="入驻协议书" onActive={this.onActive.bind(this,'enter')}>
					<Join params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="入驻协议书" onActive={this.onActive.bind(this,'enter')}>
					<Join params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);
		}


		if(!allState.increase){

			num=50+(5-noneTab.length)*109.16;

			text="增租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="增租协议书" onActive={this.onActive.bind(this,'increase')} >
					<Increase params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="增租协议书" onActive={this.onActive.bind(this,'increase')}>
					<Increase params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);
		}



		if(!allState.relet){
			num=50+(5-noneTab.length)*109.16;

			text="续租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="续租协议书" onActive={this.onActive.bind(this,'relet')}>
					<Renew params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)

		}else{
			showTab.push(
				<Tab label="续租协议书" onActive={this.onActive.bind(this,'relet')}>
					<Renew params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);

		}


		if(!allState.reduce){
			num=50+(5-noneTab.length)*109.16;

			text="减租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="减租协议书" onActive={this.onActive.bind(this,'reduce')}>
					<Reduce params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="减租协议书" onActive={this.onActive.bind(this,'reduce')} >
					<Reduce params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);
		}


		if(!allState.returnRent){
			num=50+(5-noneTab.length)*109.16;

			text="退租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="退租协议书" onActive={this.onActive.bind(this,'returnRent')}>
					<Exit params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="退租协议书" onActive={this.onActive.bind(this,'returnRent')}>
					<Exit params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);

		}

		if(!allState.admit){

			num=50+(5-noneTab.length)*109.16;

			text="承租意向书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="承租意向书" onActive={this.onActive.bind(this,'admit')}>
					<Admit params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="承租意向书" onActive={this.onActive.bind(this,'admit')}>
					<Admit params={{customerId:allState.listId,orderId:allState.mainBillId}} active={allState.active} openLocalStorages={allState.openLocalStorages}/>
				</Tab>
			);

		}	

		obj.noneTab = noneTab;
		obj.showTab = showTab;
		obj.dialogDiv = dialogDiv;

		return obj;        

	}

	onCancelStorage=()=>{
		allState.openLocalStorage=false;
		allState.openLocalStorages=false;
	}
	getLocalStorage=()=>{
		allState.openLocalStorage=false
		allState.openLocalStorages=true
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
