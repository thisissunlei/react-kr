    import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
	Row,
	Col,
	Dialog,
	Drawer,
	Tabs,
	Tab

} from 'kr-ui';
import './index.less';
import $ from 'jquery';
import Admit from "../Admit/Create";
import Exit from "../Exit/Create";
import Increase from "../Increase/Create";
import Join from "../Join/Create";
import Reduce from "../Reduce/Create";
import Renew from "../Renew/Create";
import allState from "../State";
import {

	Agreement


} from 'kr/PureComponents';
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
	
	

	componentWillReceiveProps(nextProps){
		
	}
	componentDidMount(){
		
	}
	render(){
		let num="";
		let text="";
        
        let dialogDiv=[];
        let showTab=[];
        let noneTab=[];
        
		if(!allState.enter){
			num=50+(5-noneTab.length)*109.16;
			text="入驻协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="入驻协议书">
					<Agreement.Join.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="入驻协议书">
					<Agreement.Join.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);
		}


		if(!allState.increase){

			num=50+(5-noneTab.length)*109.16;
			
			text="增租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="增租协议书" >
					<Agreement.Increase.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="增租协议书" >
					<Agreement.Increase.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);
		}	

		

		if(!allState.relet){
			num=50+(5-noneTab.length)*109.16;
			
			text="续租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="续租协议书" >
					<Agreement.Renew.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)

		}else{
			showTab.push(
				<Tab label="续租协议书" >
					<Agreement.Renew.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);

		}


		if(!allState.reduce){
			num=50+(5-noneTab.length)*109.16;
			
			text="减租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="减租协议书" >
					<Agreement.Reduce.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="减租协议书" >
					<Agreement.Reduce.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);
		}


		if(!allState.returnRent){
			num=50+(5-noneTab.length)*109.16;
			
			text="退租协议书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="退租协议书" >
					<Agreement.Exit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="退租协议书" >
					<Agreement.Exit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);

		}	

		if(!allState.admit){
			
			num=50+(5-noneTab.length)*109.16;
			
			text="承租意向书"
			dialogDiv.push(<div className="every-noneClick" style={{width:109.16}}>{text}</div>)
			noneTab.push(
				<Tab label="承租意向书" >
					<Agreement.Admit.Create params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="承租意向书" >
					<Admit params={{customerId:allState.listId,orderId:allState.mainBillId}}/>
				</Tab>
			);

		}	         

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
				{showTab}
				{noneTab}
					
				
			</Tabs>
			<div className="m-noneClick" style={{width:noneTab.length*109.16}}>
			 {dialogDiv}
			</div>		        
		    </div>
				

		);
	}

}
export default LookCustomerList;
