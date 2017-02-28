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
			if(noneTab.length==0){
				num="574px";
			}
			if(noneTab.length==1){
				num="443px";
			}
			if(noneTab.length==2){
				num="312px";
			}
			if(noneTab.length==3){
				num="181px";
			}
			if(noneTab.length==4){
				num="50px";
			}
			text="入驻协议书"
			dialogDiv.push(<div className="m-noneClick" style={{left:num}}>{text}</div>)
			noneTab.push(
				<Tab label="入驻协议书" >
					<Join params={{customerId:1,orderId:1}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="入驻协议书" >
					<Join params={{customerId:1,orderId:1}}/>
				</Tab>
			);
		}


		if(!allState.increase){

			if(noneTab.length==0){
				num="574px";
			}
			if(noneTab.length==1){
				num="443px";
			}
			if(noneTab.length==2){
				num="312px";
			}
			if(noneTab.length==3){
				num="181px";
			}
			if(noneTab.length==4){
				num="50px";
			}
			text="增租协议书"
			dialogDiv.push(<div className="m-noneClick" style={{left:num}}>{text}</div>)
			noneTab.push(
				<Tab label="增租协议书" >
					<Increase params={{customerId:1,orderId:1}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="增租协议书" >
					<Increase params={{customerId:1,orderId:1}}/>
				</Tab>
			);
		}	

		if(!allState.reduce){
			if(noneTab.length==0){
				num="574px";
			}
			if(noneTab.length==1){
				num="443px";
			}
			if(noneTab.length==2){
				num="312px";
			}
			if(noneTab.length==3){
				num="181px";
			}
			if(noneTab.length==4){
				num="50px";
			}
			text="减租协议书"
			dialogDiv.push(<div className="m-noneClick" style={{left:num}}>{text}</div>)
			noneTab.push(
				<Tab label="减租协议书" >
					<Reduce params={{customerId:1,orderId:1}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="减租协议书" >
					<Reduce params={{customerId:1,orderId:1}}/>
				</Tab>
			);
		}

		if(!allState.relet){
			if(noneTab.length==0){
				num="574px";
			}
			if(noneTab.length==1){
				num="443px";
			}
			if(noneTab.length==2){
				num="312px";
			}
			if(noneTab.length==3){
				num="181px";
			}
			if(noneTab.length==4){
				num="50px";
			}
			text="续租协议书"
			dialogDiv.push(<div className="m-noneClick" style={{left:num}}>{text}</div>)
			noneTab.push(
				<Tab label="续租协议书" >
					<Renew params={{customerId:1,orderId:1}}/>
				</Tab>
			)

		}else{
			showTab.push(
				<Tab label="续租协议书" >
					<Renew params={{customerId:1,orderId:1}}/>
				</Tab>
			);

		}
		if(!allState.returnRent){
			if(noneTab.length==0){
				num="50px";
			}
			if(noneTab.length==1){
				num="181px";
			}
			if(noneTab.length==2){
				num="312px";
			}
			if(noneTab.length==3){
				num="443px";
			}
			if(noneTab.length==4){
				num="574px";
			}
			text="退租协议书"
			dialogDiv.push(<div className="m-noneClick" style={{left:num}}>{text}</div>)
			noneTab.push(
				<Tab label="退租协议书" >
					<Exit params={{customerId:1,orderId:1}}/>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="退租协议书" >
					<Exit params={{customerId:1,orderId:1}}/>
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
			 		 style={{width:100}}
				>
				{showTab}
				{noneTab}
					
				
			</Tabs>
			 {dialogDiv}
		        
		    </div>
				

		);
	}

}
export default LookCustomerList;
