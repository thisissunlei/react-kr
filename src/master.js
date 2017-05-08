import React from 'react';

import {Actions,Store,connect} from 'kr/Redux';

import Header from 'kr/Containers/Header';
import Footer from 'kr/Containers/Footer';
import {Http} from "kr/Utils";


class Master extends React.Component {


	static childContextTypes =  {
		params: React.PropTypes.object.isRequired,
	}

	getChildContext() {
		return {
			params:this.props.params,
		};
	}


	constructor(props,context){
		super(props, context);

		Http.request('getSelfMenuInfo').then(function(response){
			Store.dispatch(Actions.setUserNavs(response.navcodes));
			Store.dispatch(Actions.setUserBasicInfo(response.user));
		}).catch(function(err){

		});
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
			<div className="app-container">
				<Header/>

				<div className="container" style={styles}>
					{this.props.children}
				</div>
				<Footer/>
				<div id="nowtify-wrapper"></div>

			</div>
		);
	}
}

export default connect((state)=>{
	return {
		header_nav:state.header_nav,
		sidebar_nav:state.sidebar_nav,
		right_bar:state.right_bar
	};
})(Master);
