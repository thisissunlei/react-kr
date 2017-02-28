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
		var elem1=$(".ddd");
		var elem=$(".入驻协议书");
		console.log(elem.html());
		// elem.css("display","none");
		elem1.click(function () {
			console.log('33333');
			elem.mouseup().mousedown();
		})
	}
	h1Click=()=>{
		console.log("h1Click");
	}
	render(){
		let num="";
		let text="";
		if(!allState.enter){
			num="50px";
			text="入驻协议书"
		}	
		if(!allState.increase){
			num="181px";
			text="增租协议书"
		}	
		if(!allState.reduce){
			num="312px";
			text="减租协议书"
		}
		if(!allState.relet){
			num="443px";
			text="续租协议书"
		}
		if(!allState.returnRent){
			num="574px";
			text="退租协议书"
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
				<Tab label="入驻协议书" >
					<Join params={{customerId:1,orderId:1}}/>
				</Tab>
					
				<Tab label="增租协议书" >
					<Increase params={{customerId:1,orderId:1}}/>
				</Tab>
				<Tab label="减租协议书" >
					<Reduce params={{customerId:1,orderId:1}}/>
				</Tab>
					
				<Tab label="续租协议书" >
					<Renew params={{customerId:1,orderId:1}}/>
				</Tab>
				<Tab label="退租协议书" >
					<Exit params={{customerId:1,orderId:1}}/>
				</Tab>
					
				
			</Tabs>
			<div className="m-noneClick" style={{left:num}}>{text}</div>
		        
		    </div>

		);
	}

}
export default LookCustomerList;
