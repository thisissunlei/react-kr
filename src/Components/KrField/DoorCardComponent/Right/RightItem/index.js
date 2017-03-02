import React from 'react';
import "../../index.less"
import reduce from "../../images/reduce.svg"
export default class RightItem extends React.Component{

	static dispalyName = 'RightItem';


	static propTypes = {
	}

	constructor(props,context){
		super(props,context)
	}
	reduceCommunity=()=>{
		let reducedCommunity = this.props.selectedCommunity;
		let {reduceCommunity}=this.props;
		reduceCommunity && reduceCommunity(reducedCommunity);
	}
	render(){
		let {selectedCommunity} = this.props;
		// console.log("selectedCommunity",selectedCommunity);
		return (
				<div className="ui-door-card-right-community-box">
					<div className="ui-door-card-right-community-item">{selectedCommunity.communityName}</div>
					<img className="ui-door-card-right-reduce-community-img" src={reduce} onClick={this.reduceCommunity}/>
				</div>
			);
	}
}