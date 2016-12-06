import React, {
	Component
} from 'react';

import Input from '../Input';

import Calendar from './Calendar';

import './index.less';


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

	constructor(props) {
		super(props)

		this.state = {
			openCalendar:true,
			value:''
		}

		var _this = this;
		document.addEventListener('click',function(event){
			var nodeName = event.target.className;
			//_this.openCalendarDialog();
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


		return (
				<div className="ui-calendar">
        	<Input name="date" onClick={this.openCalendarDialog} value={this.state.value}/>
					<Calendar open={this.state.openCalendar} onChange={this.onChange}/>
				</div>
		);

	}


}
