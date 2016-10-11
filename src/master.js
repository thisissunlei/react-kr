import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';

class Master extends Component {

	constructor(props,context){
		super(props, context);

	}

	componentWillMount() {


	}

	componentDidMount(){
		//document.cookie = 'isso_pctoken=tnlm3/aWyzliiKcR++3mmFJgRw4DZlFU0+DgzXk3D9p2nkba1dplzw=='
	}

	componentWillReceiveProps(nextProps, nextContext) {

	}

	render() {

		var styles = {};

		var {switch_value} = this.props.sidebar_nav;

		console.log('---switch_value',switch_value);

		if(switch_value){
			styles = {
				marginLeft:180,
			}
		}

		if(!this.props.header_nav.switch_value){
			styles.marginTop = 0;
		}

		return (
			<div>
			<Header/>

			<div className="container" style={styles}>
			{this.props.children}
			</div>

			<div id="nowtify-wrapper"></div>

			{/*

				<Footer/>
*/}

			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		header_nav:state.header_nav,
		sidebar_nav:state.sidebar_nav
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Master);
