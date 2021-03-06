import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelectAsync from '../../Select/AsyncCreatable';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchSourceAddComponent extends React.Component {

	static defaultProps = {
		placeholder:'请输入...'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)

		this.state={
			value:{}
		}
	}

	componentDidMount(){
		let {input} = this.props;
	}

	onInputChange=()=>{

	}

	onNewOptionClick=(params)=>{
      let {input,onChange} = this.props;
			Http.request('highSourceName',{sourceName:params.value}).then(function(response){
			  input.onChange(params.value);
			  onChange && onChange(params);
			}).catch(function(err){
	    });
	}


	onChange = (item) =>{
	
		this.setState({
			value:item
		})
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange && input.onChange(value);
		onChange && onChange(item);
		if(item.className){
		  this.onNewOptionClick(item);
		}
	}


	getOptions = (searchKey) =>{
		return new Promise((resolve, reject) => {
			Http.request('highSourceName',{sourceName:searchKey}).then(function(response){
				resolve({options:response.sources});
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
					ref={(element)=>this.element=element}
					name={input.name}
					value={this.state.value}
					loadOptions={this.getOptions}
					clearAllText="清除"
					onChange={this.onChange}
					noResultsText=""
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
