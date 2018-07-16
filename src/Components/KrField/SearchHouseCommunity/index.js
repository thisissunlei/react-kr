import React from 'react';


import ReactSelectAsync from '../../Select/Async';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http
} from "kr/Utils";

import WrapComponent from '../WrapComponent';

export default class SearchCommunitys extends React.Component {

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

	onInputChange = () => {


	}

	onChange(item) {
        console.log(this.props)
		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions(lastname) {
        let cityType = this.props.cityType
		return new Promise((resolve, reject) => {
			Http.request('house-city-cmt-list', {
				cityType: cityType
			}).then(function(response) {
				var obj = [].concat(response);
				obj.forEach(function(item, index) {
					item.value = item.cmtId;
					item.label = item.cmtName;
				});
				resolve({
					options: obj
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
			...other
		} = this.props;

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