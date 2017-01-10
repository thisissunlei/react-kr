import React from 'react';
import RightItem from  './RightItem';
import reduce from "../images/reduce.svg"
export default class Right extends React.Component{
	static dispalyName = 'Right';
	static propTypes = {
		selectedCommunity:React.PropTypes.array,
	}
	constructor(props,context){
		super(props,context)
	}
	chooseCommunityZero=()=>{
		let {chooseCommunityZero} = this.props;
		// console.log("chooseCommunityZero Right",chooseCommunityZero);
		chooseCommunityZero && chooseCommunityZero();
	}
	reduceCommunity=(reducedCommunity)=>{
		let {reduceCommunity}=this.props;
		reduceCommunity && reduceCommunity(reducedCommunity);
	}
	render(){
		let {selectedCommunitys} = this.props;
		return (

				<div className="ui-door-card-right-part">
					<div className="ui-door-card-right-selected-num">社区总数：{selectedCommunitys.length}</div>
					<div className="ui-door-card-right" >
							
							<div className="ui-door-card-all-selected-li">
								<span className="ui-door-card-selected-community-title">已选择社区</span>
								<img src={reduce} className="ui-door-card-not-select-all" onClick={this.chooseCommunityZero}/>
							</div>
							<div className="ui-door-card-selected-community-list">
								{selectedCommunitys && selectedCommunitys.map((item,index)=>{
									return <RightItem  selectedCommunity={item} key={index} reduceCommunity={this.reduceCommunity}/>
								})}
							</div>
					</div>
				</div>	
			);
	}
}
