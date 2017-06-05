import React from 'react';

import ReactSelect from '../../Select/Select';
import Input from '../../Input';
import {Actions,Store} from 'kr/Redux';
import WrapComponent from '../WrapComponent';
import './index.less';
import $ from 'jquery';
import {ShallowEqual} from 'kr/Utils';
import {
	Http
} from "kr/Utils";
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

		this.handleChange = this.handleChange.bind(this);

		this.setInitValue = this.setInitValue.bind(this);

		this.isInit = false;

		this.state = {
			value: '',
			options:[],
			showCity:false,
			optionsList:[],
			name:'',
			selected:false
		}
	}

	componentDidMount() {
		this.setInitValue(this.props.input.value);
		this.getMenberList();
	}
	getMenberList=()=>{
		let _this = this;
		Http.request('memberRecvList')
		.then(function(response){
			let option = [];
			option = response.map((item)=>{
				item.value = item.id ;
				item.label = item.name;
				return item;
			})
			_this.setState({
				options:option,
				optionsList:option
			});
		});

	}


	componentWillReceiveProps(nextProps){
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



	onfocus=()=>{
		let {showCity} = this.state;
		if(showCity){
			return;
		}
		this.bodyEvent();
		this.setState({
			showCity:true
		})
	}
	onChange=(e)=>{
		let key = e.target.value;
		let {options} = this.state;
		let optionsList = [];
		options.forEach((item)=>{
			if(item.label.indexOf(key)>=0){
				optionsList.push(item)
			}
		})
		this.setState({
			optionsList,
			selected:false
		})
	}
	selectList=(e)=>{
		let select = this.refs.input;
		let nameId = e.target.id.split('-')[2];
		select.value = e.target.innerHTML;

		this.setState({
			showCity:false,
			value:nameId,
			name:e.target.innerHTML,
			selected:true
		});
		let {onSubmit} = this.props;
		onSubmit && onSubmit(nameId);
	}
	onBlur=()=>{
		let {value} = this.state;
		let select = this.refs.input;
		if(!value){
			select.value = '';
		}
	}
	bodyEvent=()=>{
		let _this = this;
		let select = this.refs.input;
		let {onSubmit} = this.props;
		$('body').click(function(event){
			if(event.target.id.indexOf('ui-selectlist')){
				if(!_this.state.selected){
					select.value = null;
					_this.setState({
						value:''
					},function(){
						onSubmit && onSubmit(0);
					})

				}
				_this.setState({
					showCity:false
				});
			}
		});
	}

render() {

		let {input, label, inline, search, type, meta: {touched, error}, children, disabled, style, requireLabel, multi, ...other} = this.props;
		let {options,optionsList} = this.state;
		let {showCity} = this.state;
		let cityDiv = {};
		cityDiv.display = showCity?'block':'none';

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div className="ui-list-compontent">
					<input ref='input' id='ui-selectlist-input' autoComplete="off" onFocus={this.onfocus} onChange={this.onChange} placeholder="请输入..." onBlur={this.onBlur}/>
					<span className="arrow"></span>

					<div className="ui-list-cantainer" style={cityDiv}>
					{optionsList.map(item=>{
						return (
							<div className="ui-list-content" id={`ui-selectlist-${item.value}`} onClick={this.selectList} ref='selectContent'>{item.label}</div>
						)
					})}
					</div>
				</div>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>

		);
	}
}
