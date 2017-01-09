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
	constructor(props,context){
		super(props,context)
		this.state={
			options:[],
			selectedCommunitys:[]
		}
	}
	componentDidMount=()=>{
		let _this = this;
		this.setState({
			options:_this.props.options
		})
	}


	chooseAllCommunity=()=>{
		var a = this.state.options.concat();
		var c=[];
		a.forEach(function(item,index){
			let b = item.children;
			b.forEach(function(item,index){
				c.push(item);
			})
		})
		this.setState({
			selectedCommunitys :c
		})
	}
	chooseCommunityZero=()=>{
		this.setState({
			selectedCommunitys:[]
		})
	}
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
		})
	}
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
		});
		for(var i=0;i<nowSelectedCommunitys.length;i++){
			sendValues = sendValues + "+++"+nowSelectedCommunitys[i].children[0].hardwareid
		}
		const {input}=this.props;
		input.onChange(sendValues);
	}
	reduceCommunity=(reducedCommunity)=>{
		let nowSelectedCommunitys =this.state.selectedCommunitys;
		let location = nowSelectedCommunitys.indexOf(reducedCommunity);
		nowSelectedCommunitys.splice(location, 1);
		this.setState({
			selectedCommunitys:nowSelectedCommunitys
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
