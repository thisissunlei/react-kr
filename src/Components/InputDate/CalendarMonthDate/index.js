import React, {
	Component
} from 'react';

import CalendarDay from '../CalendarDay';


export default class CalendarMonthDate extends React.Component {

	static displayName = 'CalendarMonthDate';

	static contextTypes =  {
		    onSelectedYear: React.PropTypes.func.isRequired,
				onSelectedMonth: React.PropTypes.func.isRequired,
				onSelectedDate: React.PropTypes.func.isRequired,
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
		year: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		month: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		date: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	}

	constructor(props) {
		super(props)
	}

	getDaysInMonth = (year,month)=>{
	      month = parseInt(month,10)+1;
	      var temp = new Date(year,month,0);
	      return temp.getDate();
	}

	createDate(date){

		let handlers = {
			onClick:this.context.onSelectedDate
		};
		let props = {
			value:date,
			key:date,
			date:this.props.date
		};

		return <CalendarDay {...props} {...handlers} />

	}

	renderMonthDate =()=>{

		let monthDateAll = [];
		let {year,month,date} = this.props;
		var lastDate = this.getDaysInMonth(year,month);

		for(var i = 1;i<=lastDate;i++){
				monthDateAll.push(this.createDate(i));
		}
		return monthDateAll;

	}

	render() {


		return (
				<div className="calendar-month-date">
					{this.renderMonthDate()}
				</div>
		);

	}


}
