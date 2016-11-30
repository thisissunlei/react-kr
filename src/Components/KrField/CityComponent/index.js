import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

import './index.less';

import WrapComponent from '../WrapComponent';
import { myData } from './city.json';

export default class CityComponent extends React.Component {

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

	componentDidMount() {
		// this.setDefaultDate(this.props.input.value);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.input.value) {
			this.setDefaultDate(nextProps.input.value);
		}
	}
	

	onChange(event, value) {

		

		onChange && onChange(result);
	}

	render() {

		console.log('myData',myData);
		let {
			style,
			left,
			right,
			grid = 1,
			className,
			children,
			inline,
			component,
			type,
			requireLabel,
			label,
			value,
			search,
			colorStyle,
			heightStyle,
			lengthClass,
			...other
		} = this.props;


		

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="city-component">
					{label}
					</div>
				</WrapComponent>
		);
	}

}
