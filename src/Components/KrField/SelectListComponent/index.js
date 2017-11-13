import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelect from '../../Select/Select';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SelectListComponent extends React.Component {

	static defaultProps = {
		placeholder:'请选择'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)
		this.onChange = this.onChange.bind(this);
		this.state={
			options:[]
		}
	}

	componentWillMount(){
		//搜索下拉options优先级大于selectUrl
		let {selectUrl,params,options}=this.props;
		var _this=this;
		var obj = Object.assign({},params);
		if(options && typeJudgment(options) === "[object Array]"){
			this.setState({
				options:options
			})
			return ;
		}

		return new Promise((resolve, reject) => {
			Http.request(selectUrl,params||{}).then(function(response){
				_this.setState({
					options:response.items
				})
			}).catch(function(err){
				reject(err);
			});
		});
	}
    

	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

    
	render(){

		let { input, label, inline,type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;

		let {options}=this.state;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
						<ReactSelect
									name={input.name}
									searchable={false}
									value={input.value}
									clearable={true}
									options={options}
									onChange={this.onChange}
									placeholder={placeholder}
									onValueClick={function(){
									}}
								/>

					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>

		);
	}
}
