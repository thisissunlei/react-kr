import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {Actions,Store} from 'kr/Redux';

export default class  SearchPersonelComponent extends React.Component {

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount(){

	}

	onChange(item){
		let {input} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
	}

	getOptions(lastname){
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('getHrmResourceExtListByLastname',{ lastname:lastname })).then(function(response){
				response.forEach(function(item,index){
					item.value = item.id;
					item.label = item.lastname;
				});
				resolve({options:response});
			}).catch(function(err){
				reject(err);
			});
		});
	}

	render(){

		let { input, label, type, meta: { touched, error },children,disabled,style,requireLabel,...other} = this.props;

		return (
			<div className="form-item-wrap" style={style}>
			<div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
			<div className="form-input">
				<ReactSelect.Async
					name={input.name}
					value={input.value}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					placeholder="请选择..."
					{...other}
			/>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</div>
			</div>
			</div>
		);

	}

}
