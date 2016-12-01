import React, {
	Component
} from 'react';

import CalendarInput from '../CalendarInput';
import CalendarMonthDate from '../CalendarMonthDate';
import CalendarToolbar from '../CalendarToolbar';

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

	}

	constructor(props) {
		super(props)
	}

	render() {

    let {open} = this.props;

    if(!open){
      return null;
    }

		return (
				<div className="calendar">
					<CalendarInput />
					<CalendarToolbar />
          <CalendarMonthDate year="2015" month="11" date="1"/>
				</div>
		);

	}


}
