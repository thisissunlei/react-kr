import React, {
	Component
} from 'react';


export default class CalendarToolbar extends React.Component {

	static displayName = 'CalendarToolbar';

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

	render() {


		return (
				<div className="calendar-toolbar">
            <span className="left-button">&lt;</span>
            <span className="year-number">2016年</span>
            <span className="month-number">11月</span>
            <span className="right-button">&gt;</span>
				</div>
		);

	}


}
