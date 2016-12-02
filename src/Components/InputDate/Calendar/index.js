import React, {
	Component
} from 'react';

import CalendarInput from '../CalendarInput';
import CalendarDayDisplay from '../CalendarDayDisplay';
import CalendarMonthDate from '../CalendarMonthDate';
import CalendarToolbar from '../CalendarToolbar';
import CalendarYearSelector from '../CalendarYearSelector';
import CalendarMonthSelector from '../CalendarMonthSelector';

export default class Calendar extends React.Component {

	static displayName = 'Calendar';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
    open:React.PropTypes.bool,
		onChange:React.PropTypes.func,
	}


		static childContextTypes =  {
	          onSelectedYear: React.PropTypes.func.isRequired,
						onSelectedMonth: React.PropTypes.func.isRequired,
						onSelectedDate: React.PropTypes.func.isRequired,
						onPrevMonth:React.PropTypes.func.isRequired,
						onNextMonth:React.PropTypes.func.isRequired,
					  onSetDate:React.PropTypes.func.isRequired,

	  }

		getChildContext() {
					return {
						onSelectedDate:this.onSelectedDate,
						onSelectedYear:this.onSelectedYear,
						onSelectedMonth:this.onSelectedMonth,
						onPrevMonth:this.onPrevMonth,
						onNextMonth:this.onNextMonth,
						onSetDate:this.onSetDate,
					};
		}


	constructor(props) {
		super(props)

		this.state = {
			year:'2015',
			month:'11',
			date:'1',
			openYearSelector:false,
			openMonthSelector:false,
		}

	}

	onSetDate = (year,month,date)=>{

		console.log('year',year,month,date)
			this.setState({
					year,
					month,
					date
			});
	}

	onNextYear = ()=>{
			let {year} = this.state;
			year++;
			this.setState({
					year
			});
	}

	onPrevYear = ()=>{
		let {year} = this.state;
		year--;
		this.setState({
				year
		});
	}

	onNextMonth = ()=>{
			let {year,month} = this.state;
			month++;
			if(month>12){
					this.onNextYear();
					month = 1;
			}
			this.setState({
				month
			});
	}

	onPrevMonth = ()=>{
			let {month} = this.state;
			month--;
			if(month<1){
					this.onPrevYear();
					month = 12;
			}
			this.setState({
				month
			});
	}

	onSelectedYear = (year)=>{
		this.setState({
				year,
				openYearSelector:false
			});
	}

	openYearSelectorDialog = ()=>{
		this.setState({
				openYearSelector:!this.state.openYearSelector
			});
	}

	openMonthSelectorDialog =()=>{
		this.setState({
				openMonthSelector:!this.state.openMonthSelector
		});
	}


	onSelectedMonth = (month)=>{
		this.setState({
				month,
				openMonthSelector:false
			});
	}

	onSelectedDate = (date)=>{
			this.setState({date});
			const {onChange} = this.props;
			let {year,month} = this.state;
			onChange && onChange(year+'-'+month+'-'+date+' 00:00:00');
	}

	render() {

    let {open} = this.props;

		let {year,month,date,openYearSelector,openMonthSelector} = this.state;

    if(!open){
      return null;
    }

		return (
				<div className="calendar">
					<CalendarInput year={year} month={month} date={date} />
					<CalendarToolbar year={year} month={month} openYearSelectorDialog={this.openYearSelectorDialog} openMonthSelectorDialog={this.openMonthSelectorDialog}/>
					<CalendarDayDisplay />
          <CalendarMonthDate year={year} month={month} date={date} />

					<CalendarYearSelector open={openYearSelector} onSelected={this.onSelectedYear}/>
					<CalendarMonthSelector open={openMonthSelector} onSelected={this.onSelectedMonth}/>
				</div>
		);

	}


}
