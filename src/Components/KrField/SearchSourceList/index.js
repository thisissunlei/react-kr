import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelectAsync from '../../Select/AsyncCreatable';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchSourceList extends React.Component {

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
		}
	}

	componentDidMount(){
		let {input} = this.props;
	}

	onInputChange=()=>{

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
			Http.request('getOpSource',{sourceName:searchKey}).then(function(response){
				response.sourceList.forEach(function(item, index) {
					item.value = item.id;
					item.label = item.sourceDesc;
					return item;
				});
				resolve({
					options: response.sourceList
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
