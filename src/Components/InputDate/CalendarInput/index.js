import React, {
	Component
} from 'react';


export default class CalendarInput extends React.Component {

	static displayName = 'CalendarInput';

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
				<div className="calendar-input" >
            <input type="text"/>
        </div>
		);

	}


}
