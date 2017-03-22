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



		this.state = {
			customerId: ''
		}
	}

	componentDidMount() {
		let {
			input
		} = this.props;
	}
	componentWillReceiveProps(nextProps) {

		var _this = this;
		this.setState({
			customerId: nextProps.customerId
		}, function() {
			console.log('1111')
			_this.select.loadOptions()


		})
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

	getOptions = (lastname) => {
		console.log('2222')
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('get-mainbill', {
				mainBillName: lastname || "",
				customerId: this.state.customerId
			})).then(function(response) {
				response.map(function(item, index) {
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

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					value={input.value}
					ref={(select)=>this.select=select}
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