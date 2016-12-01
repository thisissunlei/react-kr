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
		month:React.PropTypes.string,
		date:React.PropTypes.string,
	}

	constructor(props) {
		super(props)
	}


	getDaysInMonth = (year,month) =>{
	      month = parseInt(month,10)+1;
	      var temp = new Date(year+"/"+month+"/0");
	      return temp.getDate();
	}

	createDate(date){

		let handlers = {};
		let props = {};

		return React.createElement('a', {...props,
			...handlers,
		}, date);
		
	}

	renderMonthDate =()=>{

		let renderDates = [];
		let {year,month,date} = this.props;
		let now = new Date(year,month,date);
		let lastDate = this.getDaysInMonth(year,month);

		for(var i = 1;i<=lastDate;i++){


		}

	}

	render() {


		return (
				<div className="calendar-month-date">
					{this.renderMonthDate()}
				</div>
		);

	}


}
