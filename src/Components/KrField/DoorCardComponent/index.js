import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import WrapComponent from '../WrapComponent';
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';
import './index.less';
import Left from './Left';
import Right from './Right';
export default class InputComponent extends React.Component{
	static propTypes = {
		options:React.PropTypes.array,
		defaultValue:React.PropTypes.string,
		selected:React.PropTypes.array
	}
	static childContextTypes =  {
        onChange: React.PropTypes.func.isRequired,
  	}
	getChildContext() {
		return {
			onChange:this.onChange,
		};
	}
	constructor(props,context){
		super(props,context)
		this.state={
			options:[],
			selectedCommunitys:[]
		}
	}
	onChange=(selectedCommunitys)=>{
		let sendValues = "";
		for(var i=0;i<selectedCommunitys.length;i++){
			for(var j=0;j<selectedCommunitys[i].children.length;j++){
				sendValues = sendValues + ","+selectedCommunitys[i].children[j].hardwareId
			}
		}
		sendValues = sendValues.substring(1);
		const {input}=this.props;
		input.onChange(sendValues);
	}
	componentDidMount=()=>{
		let _this = this;
		this.setState({
			options:_this.props.options
		})
	}
	// 添加全部社区
	chooseAllCommunity=(newArrayAllCommunitys)=>{
		this.setState({
			selectedCommunitys :newArrayAllCommunitys
		},function(){
			this.onChange(this.state.selectedCommunitys);
		})
	}
	// 去除全部社区
	chooseCommunityZero=()=>{
		this.setState({
			selectedCommunitys:[]
		},function(){
			this.onChange(this.state.selectedCommunitys);
		})
	}
	// 通过城市添加社区
	selectCommunityByCity=(thisCity)=>{
		let nowSelectedCommunitys =this.state.selectedCommunitys;
		thisCity.children.map(function(item,index){
			for(var i=0;i<nowSelectedCommunitys.length;i++){
				if(item == nowSelectedCommunitys[i]){
					return;
				}
			}
			nowSelectedCommunitys.push(item);
		})
		this.setState({
			selectedCommunitys:nowSelectedCommunitys
		},function(){
			this.onChange(this.state.selectedCommunitys);
		})
	}
	//点击单个社区添加
	addCommunity=(detailCommunityInfo)=>{
		let nowSelectedCommunitys =this.state.selectedCommunitys;
		let sendValues="";
		for(var i=0;i<nowSelectedCommunitys.length;i++){
			if(detailCommunityInfo == nowSelectedCommunitys[i]){
				return;
			}
		}
		nowSelectedCommunitys.push(detailCommunityInfo);
		this.setState({
			selectedCommunitys:nowSelectedCommunitys
		},function(){
			this.onChange(this.state.selectedCommunitys);
		});
	}
	// 点击单个社区减少
	reduceCommunity=(reducedCommunity)=>{
		let nowSelectedCommunitys =this.state.selectedCommunitys;
		let location = nowSelectedCommunitys.indexOf(reducedCommunity);
		nowSelectedCommunitys.splice(location, 1);
		this.setState({
			selectedCommunitys:nowSelectedCommunitys
		},function(){
			this.onChange(this.state.selectedCommunitys);
		})
	}

	render(){
		const {options,defaultValue} = this.props;
		let selectedCommunitys = this.state
		return (
				<div className="ui-door-card" value={selectedCommunitys}>
					<Left communitys={options} 
						chooseAllCommunity={this.chooseAllCommunity} 
						selectedCommunitys={this.state.selectedCommunitys}
						selectCommunityByCity={this.selectCommunityByCity}
						addCommunity={this.addCommunity}/>
					<Right 
						selectedCommunitys={this.state.selectedCommunitys} 
						chooseCommunityZero={this.chooseCommunityZero} 
						reduceCommunity ={this.reduceCommunity}

					/>
				</div>
			);
	}
}
