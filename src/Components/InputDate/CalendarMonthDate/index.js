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

		this.state = {
			isLoading:false
		}

	}

	componentDidMount(){
		//this.getLoading();
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.month !== this.props.month){
			this.getLoading();
		}
	}

	getLoading = ()=>{

		this.setState({
			 isLoading:false
		},function(){
			var _this = this;
		 window.setTimeout(function(){
			 	_this.setState({
					isLoading:!_this.state.isLoading
				})
		 },100);
		});
	}

	getDaysInMonth = (year,month)=>{
	    var temp = new Date(Number(year),Number(month),0);
	    return temp.getDate();
	}

	createDate(year,month,date,key){

		let handlers = {
			onClick:this.context.onSelectedDate
		};

		let props = {
			key:key,
			year:year,
			month:month,
			date:date,
			active:false
		};

		if(this.props.year == year && this.props.month == month && this.props.date == date){
				props.active = true;
		}

		return <CalendarDay {...props} {...handlers} />

	}

	createPlaceholderElement = (year,month,date,key)=>{
		let handlers = {
			onClick:this.context.onSelectedDate
		};
		let props = {
			key:key,
			date:date,
			year:year,
			month:month,
			disable:true,
			active:false,
		};

		return <CalendarDay {...props} {...handlers} />
	}

	renderMonthDate =()=>{

		let monthDateAll = [];
		let {year,month,date} = this.props;

		year = Number(year);
		month = Number(month);
		date = Number(date);

		var lastDate = this.getDaysInMonth(year,month);

		//preTime
		var preLastDate = this.getDaysInMonth(year,month-1);

		var nowTime = new Date(year,month-1,1);
		var placeholderSize = nowTime.getDay();
		var key = 0;

		let calcTime = null;

		for(var i = placeholderSize-1;i>=0;i--){
			calcTime = new Date(year,month-1,1);
			monthDateAll.push(this.createPlaceholderElement(calcTime.getFullYear(),calcTime.getMonth(),preLastDate-i,key));
			key++;
		}
		for(i = 1;i<=lastDate;i++){
			monthDateAll.push(this.createDate(year,month,i,key));
			key++;
		}

		var nextMonth = (7-key%7)%7;

		let time = null;

		for(var j = 1;j<=nextMonth;j++){
			time = new Date(year,month+1,1);
			monthDateAll.push(this.createPlaceholderElement(time.getFullYear(),time.getMonth(),j,key));
			key++;
		}
		return monthDateAll;

	}

	render() {

		let {isLoading} = this.state;
		let className = 'calendar-month-date animated';

		if(isLoading){
			className += ' fadeInRightBig';
		}else{
			className += ' ';
		}
		return (
			<div className={className} style={{'animationDuration':'0.2s'}}>
				{this.renderMonthDate()}
			</div>
		);

	}


}
