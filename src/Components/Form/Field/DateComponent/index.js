import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
import dateFormat from 'dateformat';

export default class DateComponent extends React.Component{

	static PropTypes = {
		defaultValue:React.PropTypes.string,
		onChange:React.PropTypes.func,
	}

	constructor(props){
		super(props)
		this.onChange = this.onChange.bind(this);
		this.setDefaultDate = this.setDefaultDate.bind(this);
		this.supplementZero = this.supplementZero.bind(this);
		this.state = {
			value:new Date()
		}
	}

	setDefaultDate(){
		var {input} = this.props;
		var value = '';
		if(!(input.value instanceof Date)){
			if(!input.value){
				value = new Date();
			}else if(isNaN(input.value)){
				value = new Date(Date.parse(input.value));
			}else{
				value = new Date(input.value);
			}
			this.setState({
				value
			});
		}
	}

	componentDidMount(){
		this.setDefaultDate();
	}

	supplementZero(value){
		if(value<10){
			value = '0'+value;
		}
		return value 
	}
	onChange(event,value){
		if(!value){
			return ;
		}
		this.setState({
			value
		});

		let {input,onChange} = this.props;

		var dt = new Date(value);
		var year = dt.getFullYear();
		var month = this.supplementZero(1+ dt.getMonth());
		var date = this.supplementZero(dt.getDate());
		var hours = this.supplementZero(dt.getHours());
		var minutes = this.supplementZero(dt.getMinutes());
		var seconds = this.supplementZero(dt.getSeconds());

		var result = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
		input.onChange(result);
		onChange && onChange(result);
	}


	render(){


		let{ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,defaultValue} = this.props;

		const styles ={
			border:'1px solid #ddd',
			height:40,
			borderRadius:'4px',
			paddingLeft:10
		}

		return (
					<div className="form-item-wrap " style={style}>
					<div className="form-item date">
					{label &&<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label> }
					<div className="form-main">
						<div className="form-input-main">
							<div className="form-input">
								 <DatePicker
									hintText={placeholder||'日期'}
									 value={this.state.value}
										textFieldStyle={styles}
										name={input.name}
										onChange={this.onChange}/>
							</div>
						</div>
						{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
					</div>
				  </div>
						</div>
					);
	}

}
