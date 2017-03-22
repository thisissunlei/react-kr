import React from 'react';


import ReactSelectAsync from '../../Select/Async';

import {
	Actions,
	Store
} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class SearchMainbill extends React.Component {

	static defaultProps = {
		placeholder: '请输入...'
	}

	static PropTypes = {
		placeholder: React.PropTypes.string,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount() {
		let {
			input
		} = this.props;
	}
	componentWillReceiveProps(nextProps) {
		var id = this.props.customerId;
		var _this = this;
		setTimeout(function() {
			//console.log('1111----', id)
			_this.getOptions("", _this.props.customerId);
		}, 1000)


	}
	onInputChange = () => {


	}

	onChange(item) {
		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions(lastname, customerId) {
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('get-mainbill', {
				mainBillName: lastname,
				customerId: customerId
			})).then(function(response) {
				response.map(function(item, index) {
					//console.log('item---', item)
					item.value = item.id;
					item.label = item.mainBillName;
					return item;
				});
				resolve({
					options: response
				});
			}).catch(function(err) {
				reject(err);
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
			customerId,
			...other
		} = this.props;
		console.log('this.props.customerId----', customerId)
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					value={input.value}
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