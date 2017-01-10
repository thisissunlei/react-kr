import React from 'react';
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';
import plus from "../images/plus.svg";
import toright from "../images/toright.svg";
import Input from "../../../Input"
import LeftItem from './LeftItem';
export default class Left extends React.Component{
	static dispalyName = 'Left';
	static propTypes = {
		communitys:React.PropTypes.array
	}
	constructor(props,context){
		super(props,context);
		this.state = {
			communitys:[],
			newArrayCommunity:[],
			isIncommunity:''
		}
	}
	componentDidMount(){
		this.setState({
			communitys:this.props.communitys
		})
	}
	chooseAllCommunity=()=>{
		const {chooseAllCommunity}=this.props;
		chooseAllCommunity && chooseAllCommunity();
	}
	selectCommunityByCity=(thisCity)=>{
		let {selectCommunityByCity} = this.props;
		selectCommunityByCity && selectCommunityByCity(thisCity);
	}
	addCommunity=(detailCommunityInfo)=>{
		let {addCommunity}= this.props;
		addCommunity && addCommunity(detailCommunityInfo);
	}
	onSearchCommunity=(value)=>{
		if(value !== ""){
			let allCommunity = this.state.communitys;
			let epmtyCommunityBox = [];
			var EmptyArray = [];
			allCommunity.map(function(item,index){
				epmtyCommunityBox.push(item);
			})
			for(var i=0;i<epmtyCommunityBox.length;i++){
				epmtyCommunityBox[i].children.map(function(item,index){
					if(item.communityName.indexOf(value)>-1){
						if (EmptyArray.indexOf(epmtyCommunityBox[i])>-1){
							return;
						}
						EmptyArray.push(epmtyCommunityBox[i]);
					}
				})
			}
			this.setState({
				newArrayCommunity:EmptyArray
			})
		}else{
			this.setState({
				newArrayCommunity:[]
			})
		}
	}
	render(){
		let {communitys} = this.props;
		return (
				<div className="ui-door-card-left-part">
					<div className="ui-door-card-left-search-box">
						<span className="icon-searching ui-door-card-search-community" ></span>
						<Input placeholder={"请输入查找关键字"} 
							style={{paddingLeft:35,width:254,height:36,marginBottom:6}} 
							onChange={this.onSearchCommunity}
						/>
					</div>
					<div className="ui-door-card-left">
						<div className="ui-door-card-all-li">
							<span className="ui-door-card-all-community-text">全部社区</span>
							<img src={plus} className="ui-door-card-select-all" onClick={this.chooseAllCommunity}/>
						</div>
						<div className="ui-door-card-community-list">
							{communitys && communitys.map((item,index)=>{
								return <LeftItem  community={item} key={index} 
											selectCommunityByCity={this.selectCommunityByCity} 
											addCommunity={this.addCommunity}
											newArrayCommunity={this.state.newArrayCommunity}/>
							})}
						</div>
						
					</div>
					<div className="ui-door-card-left-toright-img">
						<img src={toright}/>
					</div>
				</div>
			);
	}
}
