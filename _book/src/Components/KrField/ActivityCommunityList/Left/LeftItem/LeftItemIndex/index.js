import React from 'react';
import "../../../index.less"
export default class LeftItemIndex extends React.Component{

	static dispalyName = 'LeftItemIndex';


	static propTypes = {
		
	}

	constructor(props,context){
		super(props,context)
	
	}
	addCommunity=()=>{
		let detailCommunityInfo = this.props.communityDetail;
		let {addCommunity}=this.props;
		addCommunity && addCommunity(detailCommunityInfo);
	}

	render(){
		let {communityDetail} = this.props;
		return (
				<div className="ui-door-card-left-community-box" onClick={this.addCommunity}>
					{communityDetail.communityName}
				</div>
			);
	}
}
