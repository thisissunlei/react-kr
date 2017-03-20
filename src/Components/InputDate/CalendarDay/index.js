import React, {
	Component
} from 'react';


export default class CalendarDay extends React.Component {

	static displayName = 'CalendarDay';


	static defaultProps = {
		disable:false
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
		value:React.PropTypes.any,
		dateValue:React.PropTypes.any,
		onClick:React.PropTypes.func,
		disable:React.PropTypes.bool
	}

	constructor(props) {
		super(props)
	}

	onClick = ()=>{
		let {year,month,date,onClick,disable} = this.props;
		onClick && onClick(year,month,date);
	}

	render() {

		let {date,disable,active} = this.props;

		let classNames = 'calendar-day';

		if(active){
				classNames += ' day-active';
		}else{
		   classNames = 'calendar-day';
		}

		if(disable){
			classNames += ' disable';
		}

		return (
				<span className={classNames} onClick={this.onClick}>
						{date}
				</span>
		);

	}


}
