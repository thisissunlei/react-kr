import React, {
	Component
} from 'react';

import CalendarDay from '../CalendarDay';


export default class CalendarDate extends React.Component {

	static displayName = 'CalendarDate';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		year:React.PropTypes.string,
		date:React.PropTypes.string,
		day:React.PropTypes.string,
	}

	constructor(props) {
		super(props)
	}

	renderMonthDate =()=>{

	}

	render() {


		return (
				<div className="calendar-month-date">
					{this.renderMonthDate()}
				</div>
		);

	}


}
