import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	bindActionCreators
} from 'redux';
import nzh from 'nzh'
import {
	Checkbox,
	DatePicker,
	Form,
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
  Title,
  ListGroup,
  ListGroupItem,
  SearchForms,
	Drawer

} from 'kr-ui';
import State from './State';
import './index.less'
@observer
export default class Demo extends Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			userNameDefaultValue: ''
		}
		State.switchNewMerchants();

	}


	componentDidMount() {}



	render() {
		var nzhcn = nzh.cn;
		console.log(nzhcn.encodeS(100111.09));
		console.log(nzhcn.encodeB(100111.09));
		return (
			<div>
			</div>

		);
	}
}
