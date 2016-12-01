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
		}
	}

	openCalendarDialog = ()=>{
			this.setState({
				openCalendar:!this.state.openCalendar
			});
	}

	render() {


		return (
				<div className="ui-calendar">
        	<Input name="date" onClick={this.openCalendarDialog}/>
					<Calendar open={this.state.openCalendar} />
				</div>
		);

	}


}
