import React from 'react';
import "../../index.less"
import plus from "../../images/plus.svg";
import arrowsBottom from "../../images/arrowsBottom.svg";
import arrowsRight from "../../images/arrowsRight.svg";
import LeftItemIndex from "./LeftItemIndex";
import {ShallowEqual} from 'kr/Utils'
export default class LeftItem extends React.Component{
	static dispalyName = 'LeftItem';
	static propTypes = {
		community:React.PropTypes.object,
	}
	constructor(props,context){
		super(props,context)
		this.state={
			showItem:false,
			ItemOpen:false,
			community:"",
			newArrayCommunity:""
		}
	}
	componentWillReceiveProps(nextProps){
		let _this = this;
		if(ShallowEqual(this.props,nextProps)){
			return;
		}
		nextProps.newArrayCommunity.map(function(item,index){
			if(item.cityName == nextProps.community.cityName){
				_this.setState({
					showItem:true
				})
			}
		})
		if(!nextProps.newArrayCommunity.length){
			_this.setState({
				showItem:false
			})
		}
	}
	showCommunity=()=>{
		this.setState({
			showItem:!this.state.showItem
		});
	}
	selectCommunityByCity=()=>{
		let thisCity = this.props.community;
		let {selectCommunityByCity} = this.props;
		selectCommunityByCity && selectCommunityByCity(thisCity);
	}
	addCommunity(detailCommunityInfo){
		let {addCommunity}= this.props;
		addCommunity && addCommunity(detailCommunityInfo);
	}
	render(){
		let {community,newArrayCommunity} = this.props;
		return (
				<div className="ui-door-card-left-community-box">
					<div className="ui-door-card-left-item" >
						<img className="ui-door-card-left-item-city-img" 
							src={this.state.showItem?arrowsBottom:arrowsRight}/>
						<div className="ui-door-card-left-item-city" onClick={this.showCommunity}>
							{community.cityName}
						</div>	
						<img src={plus} className="ui-door-card-left-detail-community-plus" onClick={this.selectCommunityByCity}/>
					</div>
					<div style={{display:this.state.showItem?"block":"none"}} className="ui-door-card-left-community-detail-box" key={community.cityName} ref={community.cityName}>
						{community.children.map((item,index)=>{
							return(
								<div className="ui-door-card-left-detail-community" key={index}>
									{/*<LeftItemIndex 
																			communityDetail={item} 
																			addCommunity={this.addCommunity}/>*/}
									<div className="ui-door-card-left-community-box" onClick={this.addCommunity.bind(this,item)}>
										{item.communityName}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			);
	}
}
