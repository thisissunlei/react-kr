import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelectAsync from '../../Select/Async';

import {
	Actions,
	Store
} from 'kr/Redux';

import  AsyncCreatable  from '../../Select/AsyncCreatable';

import WrapComponent from '../WrapComponent';

export default class SearchPayAccount extends React.Component {

	static defaultProps = {
		placeholder: '请输入...'
	}

	static PropTypes = {
		placeholder: React.PropTypes.string,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)
		this.state={
			options:[],
			inputList:""
		}
		
	}

	componentDidMount() {
		let {
			input
		} = this.props;
	}

	onInputChange = () => {


	}
	onInputKeyDown=(event)=> {
	    switch (event.keyCode) {
	        case 9:   // TAB
	            // Extend default TAB behavior by doing something here
	            break;
	        case 13: // ENTER
	            // Override default ENTER behavior by doing stuff here and then preventing default
	            event.preventDefault();
	            break;
	    }
	}

	onChange=(item)=> {
		let {
			input,
			onChange
		} = this.props;
		var value =  item.value;
		input.onChange(value);
		onChange && onChange(value);
		this.setState({
			inputList:item.value
		})
	}

	getOptions=(lastname)=> {
		var _this=this;
		return new Promise((resolve, reject) => {
			Http.request('get-payment-account', {
				account: lastname
			}, {}).then(function(response) {
				response.map((item, index) => {
					item.label = item.account;
					item.value = item.account;
					return item;
				})
				_this.setState({
					options:response
				})
				resolve({
					options: response
				});


			}).catch(function(err) {});

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
		let {
			options,
			inputList
		}=this.state;
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
				<AsyncCreatable
					name={input.name}
					value={input.value}
					options={options}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					noResultsText=""
					placeholder={placeholder}
					onInputKeyDown={this.onInputKeyDown}
					multi={false}
					allCreate={true}
					backspaceRemoves={true}
					ignoreAccents={true}
					ignoreCase={true}
					disabled={false}
					onBlurResetsInput={true}
					searchable={true}
					tabSelectsValue={true}
					
					/>
				
				
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}