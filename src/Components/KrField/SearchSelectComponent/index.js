import React from 'react';
import {
	Http,
	typeJudgment
} from "kr/Utils";

import ReactSelectAsync from '../../Select/Async';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchAllComponent extends React.Component {

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

	getOptions(){
		//搜索下拉options优先级大于selectUrl
		let {selectUrl,params,options}=this.props;
		var obj = Object.assign({},params)
		if(options && typeJudgment(options) === "[object Array]"){
			return options;
		}
		
		return Http.request(selectUrl, obj||{}).then(function(response){
			return {options:response.items};
		})
	}
    
	render(){

		let { input, label, type, meta: { touched, error }, placeholder, children, disabled, style, requireLabel, onlyRead,...other} = this.props;
		console.log(onlyRead,"ppppp")
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
					onlyRead = {onlyRead}
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
