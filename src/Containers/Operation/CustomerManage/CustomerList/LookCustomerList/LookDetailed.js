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
import './index.less'

import State from './State';
@observer
class LookDetail extends Component{

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

	render(){
		let unifyStyle={width:305,float:"left"}
		
		return(
	      <div >
			<KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"detail.foreignCode"} inline={true} requireLabel={true} />
			<KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"this.state.detail.foreignCode"} inline={true} requireLabel={true}/>
			<KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"this.state.detail.foreignCode"} inline={true} />
			<KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"this.state.detail.foreignCode"} inline={true} />
			<KrField grid={1/2} label="会员卡号:" style={unifyStyle} component="labelText" value={"this.state.detail.foreignCode"} inline={true} />

	      </div>

		);
	}

}
export default LookDetail;
