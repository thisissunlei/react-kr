
import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	Message,
	Tabs,
	Tab
} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';


// import SearchDetailForm from "./SearchDetailForm";
// import TableIndex from "./TableIndex";
import $ from 'jquery';

import State from './State';

import {
	observer,
	inject
} from 'mobx-react';

@inject("NavModel")
@observer


class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			
      		
		}
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
				一代门禁
			</div>

		);
	}
}

export default connect((state) => {

   var sidebar_nav = state.sidebar_nav;


	return {
		sidebar_nav
	}

})(CommunityCollect);
