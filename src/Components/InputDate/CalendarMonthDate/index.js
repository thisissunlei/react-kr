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
	    //  month = parseInt(month,10)+1;
	      var temp = new Date(year,month,0);
	      return temp.getDate();
	}

	createDate(date,key){

		let handlers = {
			onClick:this.context.onSelectedDate
		};
		let props = {
			value:date,
			key:key,
			date:this.props.date,
			year:this.props.year,
			month:this.props.month
		};

		return <CalendarDay {...props} {...handlers} />

	}

	createPlaceholderElement = (date,key)=>{
		let handlers = {
			onClick:this.context.onSelectedDate
		};
		let props = {
			value:date,
			key:key,
			date:this.props.date,
			year:this.props.year,
			month:this.props.month,
			disable:true
		};

		return <CalendarDay {...props} {...handlers} />
		//return ( <span className="calendar-day placeholder" key={key}>&nbsp;</span> );
	}

	renderMonthDate =()=>{

		let monthDateAll = [];
		let {year,month,date} = this.props;
		var lastDate = this.getDaysInMonth(year,month);

		//preTime
		var preLastDate = this.getDaysInMonth(year,month-1);

		var nowTime = new Date(year,month-1,1);
		var placeholderSize = nowTime.getDay();
		var key = 0;
		for(var i = placeholderSize-1;i>=0;i--){
				monthDateAll.push(this.createPlaceholderElement(preLastDate-i,key));
				key++;
		}
		for(i = 1;i<=lastDate;i++){
				monthDateAll.push(this.createDate(i,key));
				key++;
		}

		var nextMonth = (7-key%7)%7;

		for(var j = 1;j<=nextMonth;j++){
				monthDateAll.push(this.createPlaceholderElement(j,key));
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
