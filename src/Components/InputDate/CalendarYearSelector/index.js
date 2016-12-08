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
				<div className="calendar-year-selector" >
						<div className="item-year" onClick={this.onSelected.bind(this,2015)}>2015</div>
						<div className="item-year" onClick={this.onSelected.bind(this,2013)}>2015</div>
						<div className="item-year" onClick={this.onSelected.bind(this,2016)}>2015</div>
						<div className="item-year">2015</div>
						<div className="item-year">2015</div>
						<div className="item-year">2015</div>
						<div className="item-year">2015</div>
						<div className="item-year">2015</div>
							<div className="item-year">2015</div>
								<div className="item-year">2015</div>
									<div className="item-year">2015</div>
										<div className="item-year">2015</div>
											<div className="item-year">2015</div>
												<div className="item-year">2015</div>

				</div>
		);

	}


}
