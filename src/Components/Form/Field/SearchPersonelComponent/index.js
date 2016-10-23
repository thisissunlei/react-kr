import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {Actions,Store} from 'kr/Redux';

export default class  SearchPersonelComponent extends React.Component {

	constructor(props){
		super(props)
	}

	render(){

		let { input, label, type, meta: { touched, error },children,disabled,style,requireLabel} = this.props;

		var isLoading = false;
		var changeValue = function(item){
			var value = (item && item.value) || '';
			input.onChange(value);
		}

		var getOptions = function(lastname){

			isLoading = true;

			return new Promise((resolve, reject) => {

				Store.dispatch(Actions.callAPI('getHrmResourceExtListByLastname',{
					lastname:lastname
				},{})).then(function(response){
					response.forEach(function(item,index){
						item.value = item.id;
						item.label = item.lastname;
					});
					resolve({options:response});
					isLoading = false;
				}).catch(function(err){
					reject(err);
					isLoading = false;
				});
			});
			isLoading = false;
		}

		return (
			<div className="form-item-wrap" style={style}>
			<div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
			<div className="form-input">
			<ReactSelect.Async 
			name={input.name} 
			isLoading={isLoading}
			value={input.value}
			loadOptions={getOptions}
			clearable={true}
			clearAllText="清除"
			onChange={changeValue} 
			placeholder="请选择..." />
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</div>
			</div>
			</div>
		);

	}

}
