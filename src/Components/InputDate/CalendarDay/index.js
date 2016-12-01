import React, {
	Component
} from 'react';


export default class CalendarDay extends React.Component {

	static displayName = 'CalendarDay';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		value:React.PropTypes.string,
	}

	constructor(props) {
		super(props)
	}

	render() {

		let {value} = this.props;

		return (
				<div className="calendar-day">
						{value}
				</div>
		);

	}


}
