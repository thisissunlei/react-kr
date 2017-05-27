

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	Dialog,
	
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';


import SearchDetailForm from "./SearchDetailForm";
import TableIndex from "./TableIndex";
import AdvancedQueryForm from "./AdvancedQueryForm";
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer

export default class CommunityDetail  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isShowLeft:true
		}
	}

	componentWillMount(){
		State.getDetailList();	
	}
	
	componentDidMount() {
		var _this = this;
		if(!_this.state.isShowLeft){
			var tableExportHeight = $(".community-detial-table-box").eq(0).height();
			window.onscroll = function(){
				
				var windowScrollTop = $(window).scrollTop();
				if($(window).scrollTop()>152){
					_this.refs.communityDetailTableBox.style.position = "fixed";
					_this.refs.communityDetailTableBox.style.top = "51px";
					$(".community-detail-box").eq(0).height(tableExportHeight+80);

				}else{
					_this.refs.communityDetailTableBox.style.position = "";
				}
			}
		}
			
	}
	componentWillReceiveProps(nextProps){
		let _this =this;
		this.setState({
			isShowLeft : nextProps.isLeftProps
		},function(){
			if(!_this.state.isShowLeft){
				var tableExportHeight = $(".community-detial-table-box").eq(0).height();
				window.onscroll = function(){
					
					var windowScrollTop = $(window).scrollTop();
					if($(window).scrollTop()>152){
						_this.refs.communityDetailTableBox.style.position = "fixed";
						_this.refs.communityDetailTableBox.style.top = "51px";
						$(".community-detail-box").eq(0).height(tableExportHeight+80);

					}else{
						_this.refs.communityDetailTableBox.style.position = "";
					}
				}
			}
		})
	}
	openAdvancedQueryDialog=()=>{
		State.advanceQueryDialogOpen = false;
	}


	exportExcle=()=>{
		console.log(`/apis/krspace-finance-web/finance/explan-excel?communityId=${State.communityId}&corporationId=${State.corporationId}&endDate=${State.endDate}&end=${State.end}&customerId=${State.customerId}&dayType=${State.dayType}`);
		window.open(`/apis/krspace-finance-web/finance/explan-excel?communityId=${State.communityId}&corporationId=${State.corporationId}&endDate=${State.endDate}&end=${State.end}&customerId=${State.customerId}&dayType=${State.dayType}`);
		
	}

	render(){
		let {isShowLeft}=this.state;
		let {pageSecond}=this.props;
		return(
			<div className="community-detail">
				<div className="community-detail-box">
					<div className="search-form-community-detail">
							
						<SearchDetailForm/>
						
					</div>
					<div className="community-detial-table-box" ref="communityDetailTableBox">
						{
							!isShowLeft?<TableIndex isLeftProps={isShowLeft}/>:null
						}
						<div className="export" onClick={this.exportExcle}>导出</div>
					</div>
				</div>
				<Dialog
					title="高级查询"
					modal={true}
					open={State.advanceQueryDialogOpen}
					onClose={this.openAdvancedQueryDialog}
					contentStyle={{width:687}}
				>
					<AdvancedQueryForm onSubmit={this.onAdvanceSearchSubmit} params={this.params} onCancel={this.openAdvancedQueryDialog}  style={{marginTop:37}} />
			  </Dialog>
			</div>

		);
	}
}
