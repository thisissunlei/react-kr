

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	FieldArray,
	change
} from 'redux-form';
import {
	Message,
	Dialog,
	
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';

// import SearchDetailForm from "./SearchDetailForm";
// import TableIndex from "./TableIndex";
// import AdvancedQueryForm from "./AdvancedQueryForm";
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

@inject("NavModel")
@observer

export default class SecondDoorManage  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
		}
	}

	componentWillMount(){
		
	}
	
	componentDidMount() {
		
	}
	
	componentWillUnmount(){
	}
	componentWillReceiveProps(nextProps){
		
	}

	render(){
		
		return(
			<div>
				二代门禁
			</div>
		);
	}
}


