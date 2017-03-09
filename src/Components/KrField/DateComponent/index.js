import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

//import DatePicker from 'material-ui/DatePicker';
import DatePicker from '../../DatePicker';
import InputDate from '../../InputDate';

import {
	DateFormat
} from 'kr/Utils';

import './index.less';

import WrapComponent from '../WrapComponent';

export default class DateComponent extends React.Component {

	static displayName = 'DateComponent';

	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		defaultValue: React.PropTypes.string,
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);

		this.isInit = false;
		this.state = {
			value: ''
		}

	}

	setInputValue = (value) => {

		let {
			input
		} = this.props;

		if(this.props.flag=='true'){
			return ;
		}
		value = DateFormat(value, "yyyy-mm-dd") + ' 00:00:00';
		input.onChange(value);


	}

	componentDidMount() {
	}

	supplementZero = (value) =>{
		if (value < 10) {
			value = '0' + value;
		}
		return value
	}

	formatDate = (value) => {

		var dtArr = [];

		if(typeof value === 'string'){
			value = value.trim();
			value = value.split(' ')[0];
			dtArr = value.split('-');
		}

		var dt = new Date(dtArr[0],dtArr[1],dtArr[2]);

		var year = dt.getFullYear();

		var month = this.supplementZero(1 + dt.getMonth());
		var date = this.supplementZero(dt.getDate());
		var hours = this.supplementZero(dt.getHours());
		var minutes = this.supplementZero(dt.getMinutes());
		var seconds = this.supplementZero(dt.getSeconds());

		var result = `${year}-${month}-${date} 00:00:00`;

		if(this.props.dateNoSecond=='true'){
		 var result = `${year}-${month}-${date}`;
		}

		return result;
	}

	onChange(value) {

		if (!value) {
			return;
		}

		let { input, onChange} = this.props;

		var result = this.formatDate(value);

		this.setInputValue(Date.parse(result));

		onChange && onChange(result);
	}

	render() {


		let {
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			requireLabel,
			disabled,
			search,
			placeholder,
			style,
			defaultValue,
			inline,
		} = this.props;


		const styles = {
			border: '1px solid #ddd',
			height: 40,
			borderRadius: '4px',
			paddingLeft: 10,
			color: '#fff',
			backgroundColor: 'transparent',
			opacity: 0
		}
		return (


			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="date-component">
									<InputDate
												value = {input.value}
												placeholder={placeholder}
												name={input.name}
												defaultValue={defaultValue}
												onChange={this.onChange}/>
					</div>
					{touched && error && <div className="error-wrap error-tip"> <span>{error}</span></div> }
				</WrapComponent>
		);
	}

}
