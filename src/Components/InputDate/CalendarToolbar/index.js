import React, {
	Component
} from 'react';


export default class CalendarToolbar extends React.Component {

	static displayName = 'CalendarToolbar';

			static contextTypes =  {
		          onSelectedYear: React.PropTypes.func.isRequired,
							onSelectedMonth: React.PropTypes.func.isRequired,
							onSelectedDate: React.PropTypes.func.isRequired,
							onPrevMonth:React.PropTypes.func.isRequired,
							onNextMonth:React.PropTypes.func.isRequired,
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
	}

	constructor(props) {
		super(props)
	}

	onNextMonth = ()=>{
		let {onNextMonth} =  this.context;
		onNextMonth && onNextMonth();
	}

	onPrevMonth = ()=>{
		let {onPrevMonth} =  this.context;
		onPrevMonth && onPrevMonth();
	}

	render() {

		let {year,month} = this.props;

		return (
				<div className="calendar-toolbar">
            <span className="left-button" onClick={this.onPrevMonth}>&lt;</span>
						<span className="main-content">
							<span className="year-number">{year}年</span>
							<span className="month-number">{month}月</span>
						</span>
            <span className="right-button" onClick={this.onNextMonth}>&gt;</span>
				</div>
		);

	}


}
