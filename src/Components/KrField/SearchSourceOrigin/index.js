import React from 'react';

import {
	Http
} from "kr/Utils";
import ReactSelectAsync from '../../Select/Async';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchSourceOrigin extends React.Component {

	static defaultProps = {
		placeholder:'请输入...'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount(){
		let {input} = this.props;
	}

	onInputChange=()=>{


	}

	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions(searchKey){
		return new Promise((resolve, reject) => {
			Http.request('get-common-dic',{searchKey:searchKey }).then(function(response){
				response.items.forEach(function(item, index) {
					item.value = ''+item.id;
					item.label = item.name;
					return item;
				});
				resolve({
					options: response.items
				});
			}).catch(function(err){
				reject(err);
			});
		});
	}

	render(){

		let { input, label, type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;

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
