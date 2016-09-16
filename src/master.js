import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';

class Master extends Component {

  componentWillMount() {

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

    return (
      <div>
				<Header/>

				<div className="container" style={styles}>
					{this.props.children}
				</div>

				{/*

				<Footer/>

			

					*/}

      </div>
    );
  }
}

function mapStateToProps(state){
	return {
		sidebar_nav:state.sidebar_nav
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Master);
