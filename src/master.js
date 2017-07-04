import React from 'react';

import {Actions,Store,connect} from 'kr/Redux';

import Header from 'kr/Containers/Header';
import Footer from 'kr/Containers/Footer';


import {Http} from "kr/Utils";
import { observer, inject } from 'mobx-react';

import {
	Dialog,
} from 'kr-ui';

@inject("NavModel")
@observer
export default class Master extends React.Component {

	getChildContext() {
		return {
			params:this.props.params,
		};
	}

	constructor(props,context){
		super(props, context);

		this.constructor.childContextTypes= {
           params: React.PropTypes.object.isRequired
		}

		this.state = {
			updateLogOpen:true,
		}

	}
	render() {

		var containerStyles = {};

		const {NavModel} = this.props;

		if(NavModel.openSidebar){
			containerStyles = {
				marginLeft:180,
			}
		}

		if(!NavModel.openHeaderbar){
			containerStyles.marginTop = 0;
		}

		return (
			<div className="app-container">
				<Header/>
				<div className="container" style={containerStyles}>
					{this.props.children}
				</div>
				<Footer/>
				<div id="nowtify-wrapper"></div>
		
			</div>
		);
	}
}

