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

		static contextTypes =  {
					onSetDate:React.PropTypes.func.isRequired,
		}
	constructor(props) {
		super(props)


		let {year,month,date} = this.props;
		let value = year+'-'+month+'-'+date;
		this.state = {
			value:value
		}

	}

	componentWillReceiveProps(nextProps) {

		let {year,month,date} = nextProps;
		let value = year+'-'+month+'-'+date;

		this.setState({
			value
		});
	}


	onChange = (event)=>{
		var value = event.target.value;
		this.setState({
			value
		});
		let [year,month,date] = value.split('-');
		const {onSetDate} = this.context;
		//校验正确性
		if(month<1 || month>12){
			return ;
		}

		if(date>31){
			return ;
		}

		if(year && month && date){
			onSetDate && onSetDate(year,month,date);
		}
	}

	render() {

		let {value} = this.state;

		return (
				<div className="calendar-input" >
            <input type="text" name="" onChange={this.onChange} value={value} />
						<div className="line"></div>
        </div>
		);

	}


}
