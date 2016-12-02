import React, {
	Component
} from 'react';


export default class CalendarYearSelector extends React.Component {

	static displayName = 'CalendarYearSelector';

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

		return (
				<span >
				</span>
		);

	}


}
