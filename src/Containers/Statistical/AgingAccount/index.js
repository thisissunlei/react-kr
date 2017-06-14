

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	Message,
	Tabs,
	TabItem
} from 'kr-ui';



import {Http} from 'kr/Utils';
import $ from 'jquery';
import './index.less';

import CommunityCollect from "./CommunityCollect";
import CommunityDetail from "./CommunityDetail";

class AgingAccount  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isLeft:true,
			hasCollect : false,
			hasDetail : false,
			initialSelectedNum : 'prev'
		}
	}


	componentDidMount() {
	
		let _this =this;
		Http.request('getSelfMenuInfo', {}).then(function(response) {
			if(response.navcodes.stat &&response.navcodes.stat.indexOf("cmt_summary")>-1){
				// 有社区汇总表
				_this.setState({
					hasCollect:true
				})
			}else{
				_this.setState({
					isLeft:false
				})
			}
			if(response.navcodes.stat &&response.navcodes.stat.indexOf("cmt_explan")>-1){
				// 有社区明细表
				_this.setState({
					hasDetail:true,
				})
			}
			if(response.navcodes.stat &&response.navcodes.stat.indexOf("cmt_summary")<0 && response.navcodes.stat &&response.navcodes.stat.indexOf("cmt_explan")>-1){
				// 有社区明细表
				_this.setState({
					hasDetail:true,
					isLeft : false
				})
			}
			
		}).catch(function(err) {
			Message.error(err.message);
		});
		
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
	demo=()=>{
		this.setState({
			initialSelectedNum :'next'
		})
	}
	render(){
		let {isLeft,hasDetail,hasCollect,initialSelectedNum}=this.state;
		let {sidebar_nav}=this.props;
		
		return(
			<div className="aging-account">
				<Tabs inkBarStyle={{backgroundColor:"rgb(43, 141, 205)"}} 
					tabItemContainerStyle={{backgroundColor:"#fff"}} 
					contentContainerClassName = "contentContainer"
					value = {initialSelectedNum}
					onChange={(value)=>{
						console.log('value:',value)
				
					}}
	
				>
					<TabItem label="社区汇总" value="prev">
										<span onClick = {this.demo}>sdfdskk</span>
					</TabItem>
					<TabItem label="社区明细" value="next">
							afddks
					</TabItem>
					{/*
						hasCollect&&<Tab label="社区汇总" onActive={this.leftActive} style={{color:"black"}}>
										<CommunityCollect isLeftProps={isLeft}/>
									</Tab>
					}
					{
						hasDetail&&<Tab label="社区明细" onActive={this.rightActive} style={{color:"black"}}>
							<CommunityDetail isLeftProps={isLeft}/>
						</Tab>
					*/}

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
