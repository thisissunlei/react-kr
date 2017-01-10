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
	Drawer

} from 'kr-ui';
import State from './State';
@observer
class LookMerchants extends Component{

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
	render(){
		return(
      <div className="m-newMerchants">
      	<div className="title">
			<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
			<div className="close" onClick={this.onCancel}></div>
		</div>
        <div >
            
        </div>
      </div>

		);
	}

}
export default LookMerchants;
