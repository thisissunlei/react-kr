import React from 'react';


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
		console.log('---',item,value);
		input.onChange(value);
		onChange && onChange(item);
		if(item.className){
		  this.createOption(value);	
		}	
	}

	createOption = (searchKey)=>{
		    let {input} = this.props;
			Store.dispatch(Actions.callAPI('highSourceName',{sourceName:searchKey})).then(function(response){
			 console.log('dfdsfdsfds');
			 input.onChange('3434324324');
			}).catch(function(err){			
	    });
	}

	getOptions(searchKey){
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('highSourceName',{sourceName:searchKey})).then(function(response){
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
					ref={(select)=>this.select = select}
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
