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
import {
	Http
} from "kr/Utils";
import $ from 'jquery';
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
			selectedCommunitys:[],
			nameList:'请选择',
			showBox:false
		}
	}
	onChange=(selectedCommunitys)=>{
		let sendValues = "";
		for(var i=0;i<selectedCommunitys.length;i++){
				sendValues = sendValues + ","+selectedCommunitys[i].id
		}
		sendValues = sendValues.substring(1);
		const {input}=this.props;
		let name= '';
		if(selectedCommunitys.length){
			name = selectedCommunitys[0].name;
		}
		if(selectedCommunitys.length > 1 && selectedCommunitys.length){
			name = selectedCommunitys[0].name + '等'+selectedCommunitys.length+'个社区';
		}
		if(!selectedCommunitys.length){
			name= '请选择'
		}
		// input.onChange(sendValues);
		input.onChange(selectedCommunitys);
		this.setState({
			nameList:name
		})
	}
	componentDidMount=()=>{
		this.getBasicData(this.props.defaultValue)
	    $('body').on('click',this.closeBox)
	}
	getBasicData=(defaultValue)=>{
		let list = [];
		
		let _this = this;
		let nameList = '请选择';
		let name = '';
		
		Http.request('getActivityCommunityList',"")
	      .then(function(response){
	      	let communitys = [];


	      	response.map(item=>{
				list = list.concat(item.communitys)
			})
			let defaultCommunitys = [];
			list.map(item=>{
				defaultValue.map(value=>{
					if(item.id == value){
						defaultCommunitys.push(item)
					}
				})
			})
			const {input}=_this.props;
			if(defaultCommunitys.length){
				name = defaultCommunitys[0].name;
			}
			if(defaultCommunitys.length > 1 && defaultCommunitys.length){
				name = defaultCommunitys[0].name + '等'+defaultCommunitys.length+'个社区';
			}
			if(!defaultCommunitys.length){
				name= '请选择'
			}
			input.onChange(defaultCommunitys);
			_this.setState({
				selectedCommunitys:defaultCommunitys,
				nameList:name
			})
	      	

	    }).catch(function(err){
	        // Message.error(err.message);
	    });
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.defaultValue!=this.props.defaultValue){
			this.getBasicData(nextProps.defaultValue)
		}
	}

	componentWillUnmount(){
		$('body').on('click',this.closeBox)
	}

	closeBox=(e)=>{
		let target = e.target;
		let a = $(target).parentsUntil('.ui-activity-card');
		if(!a.length){return}
		let name = a[a.length-1].className;
		if(!!!name){
			this.setState({
				showBox:false
			})
		}
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
		thisCity.communitys.map(function(item,index){
			for(var i=0;i<nowSelectedCommunitys.length;i++){
				if(item.id == nowSelectedCommunitys[i].id){
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
			if(detailCommunityInfo.id == nowSelectedCommunitys[i].id){
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
	click=()=>{
		let {showBox} = this.state;
		this.setState({
			showBox:!showBox
		})
	}
	render(){
		const {options,defaultValue} = this.props;
		let selectedCommunitys = this.state;
		let {
			style,
			left,
			right,
			grid = 1,
			className,
			children,
			inline,
			component,
			type,
			requireLabel,
			label,
			value,
			meta: {
				touched,
				error
			},
			search,
			colorStyle,
			heightStyle,
			lengthClass,
			...other
		} = this.props;
		let {nameList,showBox} = this.state;
		let show = showBox?'block':'none';
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div className="ui-activity-card" value={selectedCommunitys}>
					<input readOnly="true" style={{color:nameList=='请选择'?'#ddd':'#666'}} value={nameList}  ref={input=>{this.input = input}} className='cityInput' onClick={this.click}/>
					<div style={{display:show,width:520,marginTop:10}} className="communitys-list">
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
				</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>
			);
	}
}
