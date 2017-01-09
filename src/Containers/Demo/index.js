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
		return (
			<div>
			</div>

		);
	}
}
