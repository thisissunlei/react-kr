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

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
	}

	static childContextTypes =  {
					openCalendarDialog: React.PropTypes.func.isRequired
	}

	getChildContext() {
				return {
					openCalendarDialog:this.openCalendarDialog,
				};
	}

	constructor(props) {
		super(props)

		this.state = {
			openCalendar:false,
			value:'2016-12-7'
		}

	}

	componentDidMount(){
			var _this = this;
			document.addEventListener('click',function(event){
					event = event || window.event;
					console.log('documnt');
					var target = event.target;
					while (target) {
						console.log(target.className)
							if(target && target.className && target.className.indexOf('calendar')!==-1){
								 return ;
							}
							target = target.parentNode;
					}
					_this.setState({
						openCalendar:false
					});
			});

	}

	openCalendarDialog = ()=>{
			this.setState({
				openCalendar:!this.state.openCalendar
			});

	}

	onChange = (value)=>{
		this.setState({value});
	}

	render() {

		let {openCalendar} = this.state;

		return (
				<div className="ui-calendar">
        	<Input onClick={this.openCalendarDialog} value={this.state.value}/>
					{openCalendar && <Calendar onChange={this.onChange} value={this.state.value}/>}
				</div>
		);

	}


}
