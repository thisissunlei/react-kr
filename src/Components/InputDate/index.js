import React, {
	Component
} from 'react';

import Input from '../Input';

import Calendar from './Calendar';
import ReactDOM from 'react-dom';

import './index.less';
import './animate.less';

export default class InputDate extends React.Component {

	static displayName = 'InputDate';

	static defaultProps = {
			placeholder:'日期',
			defaultValue:+new Date
	}
	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		placeholder: React.PropTypes.string,
	}

	static childContextTypes =  {
					openCalendarDialog: React.PropTypes.func.isRequired,
					onChange:React.PropTypes.func.isRequired
	}

	getChildContext() {
				return {
					openCalendarDialog:this.openCalendarDialog,
					onChange:this.onChange
				};
	}

	constructor(props) {
		super(props)

		this.state = {
			openCalendar:false,
			value:''
		}
	}


	setDefaultValue = (value)=>{

		if(typeof value === 'undefined' || !value){
			 return '';
		}

		if(!isNaN(value)){
			var nowTime = new Date(value);
			var year = nowTime.getFullYear();
			var month = nowTime.getMonth();
			var date = nowTime.getDate();

			this.setState({
				value:`${year}-${month}-${date}`
			});

			return ;
		}

		if(typeof value === 'string' && value.indexOf('-')!==-1){
			this.setState({
				value:value
			});
			return ;
		}

		if(typeof value === 'string' && value.indexOf('/')!==-1){
			this.setState({
				value:value.replace('/','-')
			});
			return ;
		}

	}

	componentDidMount(){
			this.setDefaultValue(this.props.value);
			var _this = this;
			document.addEventListener('click',function(event){

					event = event || window.event;
					var target = event.target;

					while (target) {
							if(target && target.className && target.className.indexOf('calendar') !== -1){
									return ;
							}
							target = target.parentNode;
					}

					_this.setState({
						openCalendar:false
					});

			});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.defaultValue !== this.props.defaultValue ){
				this.setDefaultValue(nextProps.defaultValue);
		}
	}

	openCalendarDialog = ()=>{
			this.setState({
				openCalendar:!this.state.openCalendar
			});
	}

	onChange = (value)=>{

		var year;
		var month;
		var date;
		var valueArr = [];

		//校验格式
		if(value.indexOf('-') !== -1){
				valueArr = value.split('-');
		}else if(value.indexOf('/') !== -1){
				valueArr = value.split('/');
		}

		year = valueArr[0];
		month = valueArr[1];
		date = valueArr[2];

		if(!year){
				return ;
		}

		if(!date || date>31){
			return ;
		}

		if(!month || month<-1 || month>12){
				return ;
		}

		this.setState({value});
		let {onChange} = this.props;
		onChange && onChange(value);
	}


	render() {

		let {openCalendar} = this.state;

		return (
				<div className="ui-calendar">
					<div className="calendar-content"  onClick={this.openCalendarDialog}>
							<div className="calendar-value"> {this.state.value || this.props.placeholder}</div>
							<span className="icon"></span>
					</div>
					{openCalendar && <Calendar onChange={this.onChange} value={this.state.value}/>}
				</div>
		);

	}


}
