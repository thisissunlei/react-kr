import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
} from 'kr-ui';


export default  class FloorPlan extends Component {

	constructor(props,context){
		super(props, context);

	}

	 componentDidMount(){

	 }


  render() {

    return (

		 <div>

		</div>
	);
  }
}







