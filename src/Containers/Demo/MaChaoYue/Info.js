import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {
	observer
} from 'mobx-react';
import {Notify} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
import {Actions,Store} from 'kr/Redux';
import upload from "./images/upload.png";
import State from './State';

@observer
export default class Info extends Component {
	static defaultProps = {

	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
	}

	render() {
		return(
			<div className="ui-upload-header">
				dsadasdasd
			</div>
		);
	}
}
