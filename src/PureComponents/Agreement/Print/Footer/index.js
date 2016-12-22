import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import './index.less';
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
} from 'kr-ui';

export default class Initialize extends Component {

	constructor(props, context) {
		super(props, context);

	}


	render() {

		return (

			<div className="print-Footer">

						<p>双方证实上述资料属实，并已阅读及同意本页和背页所载之协议</p>
						<p className="print-Bottom">氪空间&ensp;<span className="dott"></span>&ensp;让办公更简单<span className="tel">Tel：400-807-3636</span></p>

			</div>
		);
	}

}
