import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';

class Master extends Component {


	static childContextTypes =  {
          params: React.PropTypes.object.isRequired
  }

	getChildContext() {
				return {
					params:this.props.params
				};
	 }


	constructor(props,context){
		super(props, context);

	}

	componentWillMount() {


	}

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps, nextContext) {

	}

	render() {

		var styles = {};

		var {switch_value} = this.props.sidebar_nav;

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
				{/*
					<Footer/>
				*/}
			<div id="nowtify-wrapper"></div>

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
