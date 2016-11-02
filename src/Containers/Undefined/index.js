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
<<<<<<< HEAD
	DotTitle,
	BraceWidth,
	SelfAdaption,
=======

	
>>>>>>> 53537c361fbda9a9f183a8e2c93c87b302558dbf
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

			    <div>
					<Section title="出错了" description="" >
						<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit}>
							<KrField grid={1/1}  name="age" component="date" label="电话" />
							<Button  label="确定" type="submit" primary={true} />
						</Form>
					</Section>
<<<<<<< HEAD

					<DotTitle title='你好' />
					<BraceWidth contentL='yyyyyy' contentR='hhhhhhh'>
					 <span>fjdgidftyfyy</span>
					 <span>urtghirthgiurtih</span>
					</BraceWidth>
			</SelfAdaption>
=======
                </div>
>>>>>>> 53537c361fbda9a9f183a8e2c93c87b302558dbf

		);

	}

}
