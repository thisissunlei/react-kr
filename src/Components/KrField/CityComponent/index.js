import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';

import WrapComponent from '../WrapComponent';
import { default as CityData } from './CityData.json';

export default class CityComponent extends React.Component {

	static displayName = 'DateComponent';

	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		defaultValue: React.PropTypes.string,
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);

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
			city:'请选择',
		}

	}

	componentDidMount() {
		// this.setDefaultDate(this.props.input.value);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.input.value) {
			this.setDefaultDate(nextProps.input.value);
		}
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
	

	onChange(event, value) {

		

		onChange && onChange(result);
	}
	selected=(event)=>{
		event.target.style.background = '#f5f5f5';
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
			console.log('none');
		}

		this.setState({
			thirdCity,
			secondId:secondCityId,
			secondName:target.innerHTML
		})


	}
	leaveFirstCity=(event)=>{
		let e = event;
		// if(event.target.className === 'city-name'){
			// event.target.style.background = '#fff';
		// }
		// const h = event.target.offsetHeight;
  //   	const w = event.target.offsetWidth;
  //   	var x = (e.pageX - event.target.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
		// var y = (e.pageY - event.target.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
		// var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		// console.log(e,event.target,event.target.offsetLeft);
		// // console.log(e.pageX,event.target.offsetLeft,event.target.offsetParent.parentNode.offsetLeft);
		// // console.log(Math.atan2(y, x),Math.atan2(y, x) * (180 / Math.PI))
		// var dirName = new Array('上方','右侧','下方','左侧');
		// // let w = event.target.width;
		// console.log('leave',dirName,direction,dirName[direction]);
	}

	showCity=()=>{
		this.setState({
			showCity:true
		})	
	}
	cityName=(event)=>{
		// let {firstName,secondName}= this.state;
		let thirdCityId = event.target.getAttribute('data-for');
		console.log(thirdCityId);
		const target = event.target.getElementsByTagName('span')[0];
		this.setState({
			thirdCityId,
			thirdName:target.innerHTML
		});

		this.submit(target.innerHTML);
	}

	submit=(name)=>{
		let {thirdName,firstName,secondName} = this.state;
		let city = `${firstName}/${secondName}/${name}`;
		
		this.setState({
			city
		})


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
			search,
			colorStyle,
			heightStyle,
			lengthClass,
			...other
		} = this.props;
		let {showCity} = this.state;
		let cityDiv = {};
		cityDiv.display = showCity?'block':'none';
		let firstCity = this.firstCityList();
		let {secondCity,thirdCity,firstId,secondId,city} = this.state;
		let cityStyle= {
			background:'#fff'
		};
		let selectedCity = {
			background:'#f5f5f5'
		}
		let hoverColor = {};


		

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="city-component" ref={div=>{this.cityContainer = div}}>
						<input readOnly="true" value={city} onClick={this.showCity} ref={input=>{this.input = input}}/>
						<span className="arrow"></span>
						<div className="city-cantainer" style={cityDiv}>
							<ul ref={ul=>{this.cityList = ul}}>
								<li className="firstCity">
									{firstCity.map((item,index)=>{
										hoverColor = (item.id == firstId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectFirstCity} onMouseOut={this.leaveFirstCity}><span >{item.name}</span></div>)
									})}
								</li>
								<li className="secondCity">
									{secondCity.map((item,index)=>{
										hoverColor = (item.id == secondId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectSecondCity} onMouseOut={this.leaveFirstCity}><span >{item.name}</span></div>)
									})}
								</li>
								<li className="thirdCity">
									{thirdCity.map((item,index)=>{
										return (<div key={index} className='city-name' data-for={item.id} onMouseOver={this.selected} onMouseOut={this.leave} onClick={this.cityName}><span >{item.name}</span></div>)
									})}
								</li>
							</ul>
						</div>
					</div>
				</WrapComponent>
		);
	}

}
