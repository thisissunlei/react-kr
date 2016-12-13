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
		this.supplementZero = this.supplementZero.bind(this);

		this.formatDate = this.formatDate.bind(this);

	}

	componentDidMount() {
	}

	supplementZero(value) {
		if (value < 10) {
			value = '0' + value;
		}
		return value
	}

	formatDate(value) {

		var dt = new Date(value);
		var year = dt.getFullYear();
		var month = this.supplementZero(1 + dt.getMonth());
		var date = this.supplementZero(dt.getDate());
		var hours = this.supplementZero(dt.getHours());
		var minutes = this.supplementZero(dt.getMinutes());
		var seconds = this.supplementZero(dt.getSeconds());

		var result = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

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
<<<<<<< HEAD
		input.onChange(result);
=======

		input.onChange(result);

>>>>>>> abbfbb54d92a92634db4889936a8565236fd8f61
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

									{/*
							<span className="date-input"> {(input.value && DateFormat(input.value,"yyyy-mm-dd")) || placeholder || '日期'} <span className="icon"></span></span>

								<span className="date-operation">
											<DatePicker
												okLabel="确定"
												cancelLabel="取消"
												value = {this.state.value}
												hintText={placeholder}
												textFieldStyle={styles}
												name={input.name}
												autoOk={true}
												container="inline"
												onChange={this.onChange}/>
								</span>
										*/}
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
