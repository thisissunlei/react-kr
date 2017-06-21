
import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
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
	observer,
	inject
} from 'mobx-react';

@inject("NavModel")
@observer


class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isShowLeft:true

      		
		}
	}


	componentDidMount() {
		let _this = this;
		State.getCollectList();
		if(this.state.isShowLeft){
			var tableExportHeight = $(".community-collect-table-box").eq(0).height();
			
			$(window).bind("scroll",function(){
				var windowScrollTop = $(window).scrollTop();
				if($(window).scrollTop()>153){
					_this.refs.communityCollectTableBox.style.position = "fixed";
					_this.refs.communityCollectTableBox.style.top = "30px";
					$(".community-collect-box").eq(0).height(tableExportHeight+80);
		    	
					
				}else{
					_this.refs.communityCollectTableBox.style.position = "";
				}
			})
		}
		
		
	}

	componentWillUnmount(){
		
		$(window).unbind();
	}


	componentWillReceiveProps(nextProps){
		let _this =this;
		this.setState({
			isShowLeft : nextProps.isLeftProps
		},function(){
			if(this.state.isShowLeft){
				var tableExportHeight = $(".community-collect-table-box").eq(0).height();
				
				$(window).bind("scroll",function(){
					var windowScrollTop = $(window).scrollTop();
					if($(window).scrollTop()>153){
						_this.refs.communityCollectTableBox.style.position = "fixed";
						_this.refs.communityCollectTableBox.style.top = "30px";
						$(".community-collect-box").eq(0).height(tableExportHeight+80);

					}else{
						_this.refs.communityCollectTableBox.style.position = "";
					}
				})
			}
		})
	}


	exportExcle=()=>{

		window.open(`/api/krspace-finance-web/finance/explan-summary-excel?communityId=${State.communityId}&endDate=${State.endDate}`);

	}

	toDetailFun=(param)=>{
		
		let {toDetailFun} = this.props;
		toDetailFun && toDetailFun(param);
	}



	render(){
		let {NavModel} = this.props;

		let _this = this;
		let {dataList,isShowLeft} = this.state;
		let {sidebar_nav}=this.props;
		
		return(
			<div className="community-collect" >
				<div className="community-collect-box">
					<div className="search-form-community-collect">
						
							<SearchDetailForm/>
						
					</div>
					<div className="community-collect-table-box" ref="communityCollectTableBox">
						{
							isShowLeft?<TableIndex isLeftProps={isShowLeft} isLeftNavShow={NavModel.openSidebar} toDetailFun={this.toDetailFun}/>:null
						}
						<div className="export" onClick={this.exportExcle}>导出</div>
					</div>
				</div>
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
