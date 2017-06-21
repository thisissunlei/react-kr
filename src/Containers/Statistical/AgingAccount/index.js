

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	Message,
	Tabs,
	Tab
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';
import './index.less';

import CommunityCollect from "./CommunityCollect";
import CommunityDetail from "./CommunityDetail";
import {
	observer,
	inject
} from 'mobx-react';
@inject("NavModel")
@observer

class AgingAccount  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isLeft:true,
			hasCollect : false,
			hasDetail : false
		}
	}


	componentDidMount() {
		let {NavModel} = this.props;
		console.log("----校验有没有菜单权限",NavModel.checkOperate("cmt_summary"),NavModel.checkOperate("cmt_explan"));
		let _this =this;
		
		// 有汇总
		if(NavModel.checkOperate("cmt_summary")){
			// 有社区汇总表
			_this.setState({
				hasCollect:true
			})
		}else{
			_this.setState({
				isLeft:false
			})
		}
		// 有明细
		if(NavModel.checkOperate("cmt_explan")){
			// 有社区明细表
			_this.setState({
				hasDetail:true,
			})
		}
		// 有明细没汇总
		if(!NavModel.checkOperate("cmt_summary")  &&NavModel.checkOperate("cmt_explan")){
			// 有社区明细表
			_this.setState({
				hasDetail:true,
				isLeft : false
			})
		}
			
		
		
		Store.dispatch(Actions.switchSidebarNav(false));

		
	}

	leftActive=()=>{
		this.setState({
			isLeft:true
		})
	}

	rightActive=()=>{
		
		this.setState({
			isLeft:false
		})
	}
	componentWillUnmount(){
		$(window).unbind();
	}

	render(){
		let {isLeft,hasDetail,hasCollect}=this.state;
		let {sidebar_nav}=this.props;
		return(
			<div className="aging-account">
				<Tabs>
					{
						hasCollect&&<Tab label="社区汇总" onActive={this.leftActive}>
												<CommunityCollect isLeftProps={isLeft}/>
											</Tab>
					}
					{
						hasDetail&&<Tab label="社区明细" onActive={this.rightActive}>
							<CommunityDetail isLeftProps={isLeft}/>
						</Tab>
					}
					{/*
						!hasCollect && !hasDetail &&<Tab>
							<div>
								<img src={require("images/notings.png")}/>
								<span>您没有操作权限</span>
							</div>
						</Tab>
					*/}

				</Tabs>
			</div>

		);
	}
}


export default connect((state) => {

   var sidebar_nav = state.sidebar_nav;


	return {
		sidebar_nav
	}

})(AgingAccount);
