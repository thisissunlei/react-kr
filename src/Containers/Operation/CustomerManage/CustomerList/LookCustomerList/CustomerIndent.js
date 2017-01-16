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
	Tab,
	ButtonGroup

} from 'kr-ui';
import './index.less'

import State from './State';
@observer
class CustomerIndent extends Component{

	constructor(props,context){
		super(props, context);
		let {comeFrom}=this.props;
		State.initComeFrom(comeFrom);


	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	isDevelopClick = () =>{
		State.switchDevelop();
	}

	render(){
		let unifyStyle={width:300,marginLeft:-10}
		
		return(
	    	<div className="m-CustomerIndent">
				<div style={{margin:30}}><Button  label="新建订单" type="button" /></div>
				<div className="indentList">
					<div className="orderNumber">1</div>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<div style={{marginTop:20,textAlign: "center"}}>
						<Button  label="编辑" type="button" cancle={true}/>
						<span className="interval"></span>
						<Button  label="查看" type="button" cancle={true}/>
						<span className="interval"></span>
						<Button  label="删除" type="button" cancle={true}/>
					</div>

				</div>
				<div className="bottomWire"></div>
				<div className="indentList">
					<div className="orderNumber">1</div>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} /></li>
					<div style={{marginTop:20,textAlign: "center"}}>
						<Button  label="编辑" type="button" cancle={true}/>
						<span className="interval"></span>
						<Button  label="查看" type="button" cancle={true}/>
						<span className="interval"></span>
						<Button  label="删除" type="button" cancle={true}/>
					</div>

				</div>
	    	</div>
		    
		 		
			

		);
	}

}
export default CustomerIndent;
