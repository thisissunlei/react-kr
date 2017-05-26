
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
import $ from 'jquery';

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
		let _this = this;
		State.getCollectList();
		var tableExportHeight = $(".community-collect-table-box").eq(0).height();
		window.onscroll = function(){
			console.log("$(window).scrollTop()",$(window).scrollTop());
			var windowScrollTop = $(window).scrollTop();
			if($(window).scrollTop()>153){
				_this.refs.communityCollectTableBox.style.position = "fixed";
				_this.refs.communityCollectTableBox.style.top = "30px";
				$(".community-collect-box").eq(0).height(tableExportHeight+80);

			}else{
				_this.refs.communityCollectTableBox.style.position = "";
			}
		}
		
	}


	componentWillReceiveProps(nextProps){
		
		this.setState({
			isShowLeft : nextProps.isLeftProps
		})
	}


	exportExcle=()=>{
		console.log(`/apis/krspace-finance-web/finance/explan-summary-excel?communityId=${State.communityId}&endDate=${State.endDate}`);
		window.open(`/apis/krspace-finance-web/finance/explan-summary-excel?communityId=${State.communityId}&endDate=${State.endDate}`);

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
					<div className="community-collect-table-box" ref="communityCollectTableBox">
						{
							isShowLeft?<TableIndex isLeftProps={isShowLeft}/>:null
						}
						<div className="export" onClick={this.exportExcle}>导出</div>
					</div>
				</div>
			</div>

		);
	}
}
