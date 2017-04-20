import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import './index.less';



class Home extends React.Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		}
	}


	componentDidMount() {

	}

	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}


	render() {

		return (

			<div>


			<div className="main">
				<div className="l-sidebar">
				hahahahah
			hhhhh
				</div>

			</div>




	</div>

		);
	}
}


function mapStateToProps(state){

	return {
		sidebar_nav:state.sidebar_nav,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
