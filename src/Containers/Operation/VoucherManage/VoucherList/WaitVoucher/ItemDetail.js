import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	KrDate,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
} from 'kr-ui';
import './index.less';


export default class ItemDetail extends Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {
	}

	renderFileName=()=>{
		this.fileList.map((item, value) => {
			return (
				<div key={index}>{item}</div>
			)
		});
	}
	render() {
		console.log(this.fileList);
		return (
			<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>凭证详情</span>
			     	<span className="u-audit-close" style={{
								marginRight: 40
						}} onTouchTap={this.onCancel}></span>
			     </div>

			</div>


		);
	}
}
