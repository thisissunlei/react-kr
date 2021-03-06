
import React from 'react';
import {

	Title,
	Section,
	Dialog,
	KrField,
} from 'kr-ui';
import {Actions,Store,connect} from 'kr/Redux';
import {Http} from 'kr/Utils';
// import './index.less';
import SearchForm from "./SearchForm";
import TableIndex from "./TableIndex";
// import IntroduceForm from "./IntroduceForm";
import $ from 'jquery';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

@inject("NavModel")
@observer

 class PaymentRemindTable extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {

			
		}
	}

	componentWillMount(){

		State.getInitialList();

	}
	
	componentDidMount(){
		
		
	}

	
	
	render() {
		
		let {sidebar_nav,NavModel}=this.props;
		
		return (
			    <div>
					<Title value="催款表"/>
					<Section title="催款表">
						<SearchForm/>
						<TableIndex sidebarShow={NavModel.openSidebar}/>
					</Section>
				</div>
		);

	}

}
export default connect((state) => {

   var sidebar_nav = state.sidebar_nav;


	return {
		sidebar_nav
	}

})(PaymentRemindTable);

