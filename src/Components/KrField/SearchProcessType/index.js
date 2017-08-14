import React from 'react';
import {
	Http
} from "kr/Utils";
import ReactSelectAsync from '../../Select/Async';

import {
	Actions,
	Store
} from 'kr/Redux';
import WrapComponent from '../WrapComponent';

export default class SearchProcessType extends React.Component {

	static defaultProps = {
		placeholder: '请输入...'
	}

	static PropTypes = {
		placeholder: React.PropTypes.string,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		let {
			input
		} = this.props;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showName != this.props.showName) {
			this.selectCustomer.loadOptions();
		}

	}

	onInputChange = () => {


	}

	onChange = (item) => {

		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);

	}

	getOptions = (name) => {

		var _this = this;
		return new Promise((resolve, reject) => {
			Http.request('process-search-select', {
				nameOrEmail: name || ''
			}).then(function(response) {
				response.items.forEach(function(item, index) {
					return item
				});
				resolve({
					options: response.items
				});
				_this.setState({
					isLoading: false
				})
			}).catch(function(err) {
				reject(err);
				_this.setState({
					isLoading: false
				})
			});
		});
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
			placeholder,
			children,
			disabled,
			style,
			requireLabel,
			...other
		} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					isLoading={this.state.isLoading}
					value={input.value}
					ref={(selectCustomer)=>this.selectCustomer=selectCustomer}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					noResultsText=""
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}