
import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	Tabs,
	Tab
} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';


import SearchDetailForm from "./SearchDetailForm";
import TableIndex from "./TableIndex";


import State from './State';
import {
	observer
} from 'mobx-react';
@ observer


export default class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isShowLeft:true

      		
		}
	}


	componentDidMount() {
		State.getCollectList();
		
	}


	componentWillReceiveProps(nextProps){
		
		this.setState({
			isShowLeft : nextProps.isLeftProps
		})
	}


	exportExcle=()=>{
		
		window.open(`/mockjs/38/finance/explan-summary-excel?communityId=${State.communityId}&endDate=${State.endDate}`);

	}


	render(){
		let _this = this;
		
		let {dataList,isShowLeft} = this.state;

		return(
			<div className="community-collect">
				<div className="community-collect-box">
					<div className="search-form-community-collect">
						
							<SearchDetailForm/>
						
					</div>
					<div className="community-collect-table-box">
						{
							isShowLeft?<TableIndex isLeftProps={isShowLeft}/>:null
						}
						
					</div>
					<div className="export" onClick={this.exportExcle}>导出</div>
				</div>
			</div>

		);
	}
}
