import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';
import WrapComponent from '../WrapComponent';
import { default as CityData } from './CityData.json';
import {
	observer
} from 'mobx-react';
import State from './State';
@observer

export default class CountyComponent extends React.Component {

	static displayName = 'DateComponent';


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		defaultValue: React.PropTypes.string,
		onSubmit: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
	}

	constructor(props) {
		super(props)

		this.isInit = false;
		this.state = {
			value: '',
			showCity:false,
			secondCity:[],
			first:true,
			thirdCity:[],
			firstId:0,
			secondId:0,
			thirdId:0,
			firstName:'',
			secondName:'',
			thirdName:'',
		}

		this.key='';
	}

	componentDidMount() {
		if(this.props.input.value){
			State.city=this.fnTree(this.props.input.value,CityData);
		}else{
			State.city='请选择';
		}
	}
    

	//递归
	fnTree = (id,data) =>{	
			var cityLable = '';
			for(var i=0;i<data.length;i++){		
				let item = data[i];
				cityLable = item.name;
				if(!item.children && item.id == id ){
						this.key = item.id;
						 cityLable = item.name;
						 return cityLable;
				}else{
					if(item.children){
						let text = this.fnTree(id,item.children);
						if(text){
							return cityLable+='/'+text;
						}
						
					}	
				}
			}
			return false;
	}
   

    
	firstCityList=()=>{
		var firstCity = [];
		firstCity = CityData.map((item)=>{
			var obj = {};
			obj.id = item.id;
			obj.name = item.name;
			return obj;

		})
		return firstCity;


	}

	secondCityList=(id)=>{
		var secondCity = [];
		CityData.map(item=>{
			if(item.id == id){
				secondCity = item.children;
			}
		})
		return secondCity;
	}
	thirdCityList=(secondCity,id)=>{
		var thirdCity = [];
		secondCity.map(item=>{
			if(item.id == id){
				thirdCity = item.children;
			}
		})
		return thirdCity;
	}


	selected=(event)=>{
		event.target.style.background = '#f5f5f5';
		let thirdId = event.target.getAttribute('data-for');
		const target = event.target.getElementsByTagName('span')[0];
		this.setState({
			thirdId,
		});
	}
	leave=(event)=>{
		event.target.style.background = '#fff';
	}
	selectFirstCity=(event)=>{
		let firstCityId = event.target.getAttribute('data-for');
		event.target.style.background = '#f5f5f5';
		const second = ReactDOM.findDOMNode(this.cityList);
		const SecondCity = second.getElementsByClassName('secondCity')[0];
		const target = event.target.getElementsByTagName('span')[0];
		SecondCity.style.display = 'inline-block';
		const ThirdCity = second.getElementsByClassName('thirdCity')[0];
		ThirdCity.style.display = 'none';
		let secondCity = this.secondCityList(firstCityId);

		this.setState({
			secondCity,
			firstId:firstCityId,
			firstName:target.innerHTML
		})
	}
	selectSecondCity=(event)=>{
		let {secondCity} = this.state;
		event.target.style.background = '#f5f5f5';
		let secondCityId = event.target.getAttribute('data-for');
		const third = ReactDOM.findDOMNode(this.cityList);
		const ThirdCity = third.getElementsByClassName('thirdCity')[0];
		ThirdCity.style.display = 'inline-block';
		let thirdCity = this.thirdCityList(secondCity,secondCityId);
		const target = event.target.getElementsByTagName('span')[0];
		if(!thirdCity.length){
		}

		this.setState({
			thirdCity,
			secondId:secondCityId,
			secondName:target.innerHTML
		})


	}

	showCity=()=>{
		let {showCity} = this.state;
		if(showCity){
			return;
		}
		this.bodyEvent();
		this.setState({
			showCity:true
		})
	}

	onSubmit=(event)=>{
		let {thirdId,secondId} = this.state;
		let {input}=this.props;
		const target = event.target.getElementsByTagName('span')[0];
		let {thirdName,firstName,secondName} = this.state;
		let city = `${firstName}/${secondName}/${target.innerHTML}`;
		State.city=city;
		this.setState({
			showCity:false
		});
		this.key=thirdId;
		input.onChange(this.key);
	}


    onSecondSubmit=()=>{
      let {thirdName,firstName,secondName,secondId} = this.state;
      let {openCity}=this.props;
      if(openCity){
      	let city = `${firstName}/${secondName}`;
		State.city=city;
		this.setState({
			showCity:false
		});
      }
    }

	bodyEvent=()=>{
		let _this = this;
		$('body').click(function(event){
			if(event.target.className !='city-name'){
				_this.setState({
					showCity:false
				});
			}
		});
	}



	render() {

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
			onlyRead,
			...other
		} = this.props;
		let {showCity} = this.state;
		let cityDiv = {};
		cityDiv.display = showCity?'block':'none';
		let firstCity = this.firstCityList();
		let {secondCity,thirdCity,firstId,secondId,thirdId} = this.state;
		let city=State.city;
		let cityStyle= {
			background:'#fff'
		};
		let selectedCity = {
			background:'#f5f5f5'
		}
		let hoverColor = {};
		let color="#666";


		if(onlyRead){
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<span style={{ display: "inline-block", padding: "10px",paddingLeft:'0px' }}>
						{city}
					</span>
				</WrapComponent>
			)
		}


		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="city-component" ref={div=>{this.cityContainer = div}} onClick={this.showCity}>
						{!State.city && <span style={{fontSize:'14px',position:'absolute',transform:'translateY(-50%)',top:'50%',color:'#ccc'}}>城市</span>}
						<input readOnly="true" value={city} style={{color:color}} ref={input=>{this.input = input}} className='cityInput'/>
						<span className="arrow"></span>
						<div className="city-cantainer" style={cityDiv}>
							<ul ref={ul=>{this.cityList = ul}}>
								<li className="firstCity">
									{firstCity.map((item,index)=>{
										hoverColor = (item.id == firstId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectFirstCity}><span>{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
								<li className="secondCity">
									{secondCity.map((item,index)=>{
										hoverColor = (item.id == secondId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectSecondCity} onClick={this.onSecondSubmit}><span>{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
								<li className="thirdCity">
									{thirdCity.map((item,index)=>{
										hoverColor = (item.id == thirdId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selected}  onClick={this.onSubmit}><span >{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
							</ul>
						</div>
					</div>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}

}
