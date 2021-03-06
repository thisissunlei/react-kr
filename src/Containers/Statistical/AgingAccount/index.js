

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	Message,
} from 'kr-ui';
import Baidu from 'kr/Utils/Baidu';
import {
	Tabs
}from 'material-ui';
import {
  	Tab
} from 'material-ui/Tabs';
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
			hasDetail : false,
			value : '0',
			communityId : ''
		}
	}


	componentDidMount() {
		
		// console.log("----校验有没有菜单权限",NavModel.checkOperate("cmt_summary"),NavModel.checkOperate("cmt_explan"));
		Baidu.trackEvent('账龄分析','访问');

		let _this =this;
		setTimeout(function(){
			let {NavModel} = _this.props;
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
		},1000)
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
	toDetailFun=(communityId)=>{
		let communityIdReal
		if(communityId == 0){
			communityIdReal = '';
		}else{
			communityIdReal = communityId;
		}
		this.setState({
			value :'1',
			communityId : communityIdReal,
			isLeft:false
		})

	}
	onChangeCommunity=(communityId)=>{
		this.setState({
			communityId  
		})
	}
	render(){
		let {isLeft,hasDetail,hasCollect,value,communityId}=this.state;
		let {sidebar_nav}=this.props;
		let _this =this;
		return(
			<div className="aging-account">
				<Tabs inkBarStyle={{backgroundColor:"rgb(43, 141, 205)",position:"relative",top:"-48px"}} 
					tabItemContainerStyle={{backgroundColor:"#fff",borderBottom: "solid 1px #eee"}} 
					contentContainerClassName = "contentContainer"
					value = {value}
					onChange={(value)=>{
						if(!isNaN(value)){
							this.setState({
								value :value
							})
						}
					}}
	
				>
					
					{
						hasCollect&&<Tab label="社区汇总" onActive={this.leftActive} style={{color:"black"}} value={'0'} style={{borderRight:"solid 1px #eee",color:"black"}}>
										<CommunityCollect isLeftProps={isLeft} toDetailFun={_this.toDetailFun}/>
									</Tab>
					}
					{
						hasDetail&&<Tab label="社区明细" onActive={this.rightActive} style={{color:"black"}} value={'1'} >
							<CommunityDetail isLeftProps={isLeft} communityId={communityId} onChangeCommunity={this.onChangeCommunity}/>
						</Tab>
					}

					

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
