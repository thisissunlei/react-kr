
import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import './index.less';

class Help extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

	}

	render(){

		return(

			<div>
				<div className="m-welcome">
					<h1>Welcome</h1>
				</div>
			</div>
		);

	}

}




function mapStateToProps(state){
	return {
		notify:state.notify,
		items:state.notify.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Help);
