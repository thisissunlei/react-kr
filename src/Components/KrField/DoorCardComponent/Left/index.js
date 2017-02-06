import React from 'react';
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
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
			communitys:
				[],
			// [{"cityId":1,"cityName":"北京市","children":[{"children":[{"id":2,"hardwareId":"11112"}],"communityName":"北京天创科技社区","communityId":2}]},
			// 			{"cityId":88,"cityName":"杭州市","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"武汉","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":88,"cityName":"深圳","children":[{"children":[{"id":5,"hardwareId":"11115"}],"communityName":"杭州梦想小镇社区","communityId":5}]},
			// 			{"cityId":74,"cityName":"上海市","children":[{"children":[{"id":1,"hardwareId":"111101"}],"communityName":"上海凤城巷社区","communityId":11}]}
			// 			],
			newArrayCommunity:[],
			isIncommunity:''
		}
	}
	// 首次加载获取社区列表
	componentDidMount(){
		let _this = this;
		Store.dispatch(Actions.callAPI('getCommunityEquipment',""))
	      .then(function(response){
	      	_this.setState({
	      		communitys : response.items
	      	})

	    }).catch(function(err){
	        Message.error(err.message);
	    });
	}
	chooseAllCommunity=()=>{
		let _this = this;
		var newArrayAllCommunitys = [];
			for(var i = 0 ;i<this.state.communitys.length;i++){
			for(var j = 0;j<this.state.communitys[i].children.length;j++){
				newArrayAllCommunitys.push(this.state.communitys[i].children[j])
			}
		}
		const {chooseAllCommunity}=this.props;
		chooseAllCommunity && chooseAllCommunity(newArrayAllCommunitys);
	}
	selectCommunityByCity=(thisCity)=>{
		let {selectCommunityByCity} = this.props;
		selectCommunityByCity && selectCommunityByCity(thisCity);
	}
	addCommunity=(detailCommunityInfo)=>{
		let {addCommunity}= this.props;
		addCommunity && addCommunity(detailCommunityInfo);
	}
	// 输入搜索社区
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
		// let {communitys} = this.props;
		let {communitys} = this.state;
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
							<div className="ui-door-card-community-list-inner">
								{communitys && communitys.map((item,index)=>{
									return <LeftItem  community={item} key={index} 
												selectCommunityByCity={this.selectCommunityByCity} 
												addCommunity={this.addCommunity}
												newArrayCommunity={this.state.newArrayCommunity}/>
								})}
							</div>
							
						</div>
						
					</div>
					<div className="ui-door-card-left-toright-img">
						<img src={toright}/>
					</div>
				</div>
			);
	}
}
