import React from 'react';

import ReactSelect from '../../Select/Select';
import Input from '../../Input';

import WrapComponent from '../WrapComponent';
import './index.less';
import $ from 'jquery';
import {ShallowEqual} from 'kr/Utils';
//import 'react-select/dist/react-select.css';

export default class SelectComponent extends React.Component {


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.setInitValue = this.setInitValue.bind(this);

		this.isInit = false;

		this.state = {
			value: [],
			options:this.props.options,
			showCity:false,
			optionsList:this.props.options
		}
	}

	componentDidMount() {
		this.setInitValue(this.props.input.value);
	}


	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.props.options,nextProps.options)){
			this.props.options = nextProps.options;
			// Store.dispatch(initialize('createMemberForm', nextProps.detail));

		}
	}

	setInitValue(value) {

		if (!value) {
			return;
		}

		this.setState({
			value
		});
		this.isInit = true;
	}

	handleChange(value) {

		let {
			input
		} = this.props;
		this.setState({
			value
		});
		input.onChange(value);
	}

	onChange(item) {
		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}
	

	onfocus=()=>{
		let {showCity} = this.state;
		if(showCity){
			return;
		}
		this.bodyEvent();
		this.setState({
			showCity:true
		})
		console.log('onfocus');
	}
	onChange=(e)=>{
		console.log(e.target.value);
		let key = e.target.value;
		let {options} = this.state;
		let optionsList = [];
		options.forEach((item)=>{
			if(item.label.indexOf(key)>=0){
				optionsList.push(item)
			}
		})
		this.setState({
			optionsList
		})
	}
	selectList=(e)=>{
		console.log(e.target.id,e.target.innerHTML);
		this.setState({
			showCity:false
		});
	}
	bodyEvent=()=>{
		// let _this = this;
		// $('body').click(function(event){
		// 	if(event.target.className !='city-name'){
		// 		console.log('body',event.target.className);
		// 		_this.setState({
		// 			showCity:false
		// 		});
		// 	}
		// });
	}

render() {

		let {input, label, inline, search, type, meta: {touched, error}, children, disabled, style, requireLabel, multi, ...other} = this.props;
		let {options,optionsList} = this.state;
		console.log('options',optionsList);
		let {showCity} = this.state;
		let cityDiv = {};
		cityDiv.display = showCity?'block':'none';

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div className="ui-list-compontent">
					<input ref={input=>{this.input = input}} onFocus={this.onfocus} onChange={this.onChange}/>
					<span className="arrow"></span>

					<div className="ui-list-cantainer" style={cityDiv}>
					{optionsList.map(item=>{
						return (
							<div className="ui-list-content" id={`ui-list-${item.value}`} onClick={this.selectList}>{item.label}</div>
						)
					})}
					</div>
				</div>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>

		);
	}
}
