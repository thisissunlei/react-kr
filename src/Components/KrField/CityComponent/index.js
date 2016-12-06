import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

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
			showCity:false
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
		secondCity = CityData.map(item=>{
			if(item.id === id){
				return item.children;
			}
		})
		return secondCity;
	}
	thirdCityList=(secondCity,id)=>{
		var thirdCity = [];
		thirdCity = secondCity.map(item=>{
			if(item.id === id){
				return item.children;
			}
		})
		return thirdCity;
	}
	

	onChange(event, value) {

		

		onChange && onChange(result);
	}

	showCity=()=>{
		this.setState({
			showCity:true
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
		console.log('firstCity',firstCity);

		

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="city-component">
						<input readOnly="true" value="请选择" onClick={this.showCity}/>
						<span className="arrow"></span>
						<div className="city-cantainer" style={cityDiv}>
							<ul>
								<li className="firstCity">
									{firstCity.map((item,index)=>{
										return (<span key={index} className='city-name'>{item.name}</span>)
									})}
								</li>
								<li className="secondCity">2</li>
								<li className="thirdCity">3</li>
							</ul>
						</div>
					</div>
				</WrapComponent>
		);
	}

}
