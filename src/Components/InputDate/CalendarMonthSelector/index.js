import React, {
	Component
} from 'react';


export default class CalendarMonthSelector extends React.Component {

	static displayName = 'CalendarMonthSelector';

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
		open:React.PropTypes.bool,
	}

	constructor(props) {
		super(props)
	}

	onSelected(year){
			const {onSelected} = this.props;
			onSelected && onSelected(year);
	}

	render() {

		let {open} = this.props;
		if(!open){
			return null;
		}

		return (
				<div className="calendar-month-selector" >
						<div className="item-month" onClick={this.onSelected.bind(this,2)}>2015</div>
						<div className="item-month" onClick={this.onSelected.bind(this,3)}>2015</div>
						<div className="item-month" onClick={this.onSelected.bind(this,6)}>2015</div>
						<div className="item-month">2015</div>
						<div className="item-month">2015</div>
						<div className="item-month">2015</div>
						<div className="item-month">2015</div>
						<div className="item-month">2015</div>
							<div className="item-month">2015</div>
								<div className="item-month">2015</div>
									<div className="item-month">2015</div>
										<div className="item-month">2015</div>
											<div className="item-month">2015</div>
												<div className="item-month">2015</div>

				</div>
		);

	}


}
