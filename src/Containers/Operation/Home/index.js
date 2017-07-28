import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog

} from 'kr-ui';
import home from './images/home-community.svg';
import  "./index.less";
import ChangeCommunity from './ChangeCommunity';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import State from './State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@inject("NavModel")
@observer

class Home  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
	}
	openChangeCommunityDialog=()=>{
		State.openChangeCommunity = true;
	}
	closeChangeCommunityDialog=()=>{
		State.openChangeCommunity = false;
	}
	ChangeCommunity=(form)=>{
		State.ChangeCommunity(form);
	}

	render(){
		
		return(
			<div style={{minHeight:'910'}} className="operation-home">
				<Title value="运营首页" />
				<div className="home-main-part">
					<img src={home} className="community-img"/>
					<span className="community-name">{State.info.communityName}</span>
					<span className='change-name' onClick={this.openChangeCommunityDialog}>切换社区</span>
				</div>
				<div className='home-content'> 
					<div className="home-left">
						<HomeLeft />
					</div>
					<div className="home-right">
						<HomeRight />
					</div>
				</div>
				
				<Dialog
				title="切换社区"
				modal={true}
				onClose={this.closeChangeCommunityDialog}
				open={State.openChangeCommunity}
				contentStyle={{width:665}}>
					<ChangeCommunity  onCancel={this.closeChangeCommunityDialog} onSubmit={this.ChangeCommunity}/>
				</Dialog>
	     	</div>

		);
	}
}

export default Home;
