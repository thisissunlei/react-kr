import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
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

	
} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {
	List,
	ListItem
} from 'material-ui/List';

import './index.less';

export default class Undefined extends Component {

	static defaultProps = {
		page: 1,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {

	}

	onSubmit(values) {

	}

	render() {

		let initialValues = {
			age: ''
		}

		return (

			    <div className='ui-labelText'>
					{/*<Section title="出错了" description="" >
						<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit}>
							<KrField grid={1/1}  name="age" component="date" label="电话" />
							<Button  label="确定" type="submit" primary={true} />
						</Form>
					</Section>*/}
					<span className='ui-textLeft'></span>
					<span className='ui-textRight'></span>
                </div>

		);

	}

}