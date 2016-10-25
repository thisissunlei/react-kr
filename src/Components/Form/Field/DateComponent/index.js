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

	}

	componentDidMount(){

	}


	onChange(event,value){
		if(!value){
			return ;
		}
		let {input,onChange} = this.props;
		input.onChange(value);
		onChange && onChange(value);
	}


	render(){


		let{ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,defaultValue} = this.props;

		const styles ={
			border:'1px solid #ddd',
			height:40,
			borderRadius:'4px',
			paddingLeft:10
		}

		let dateValue = input.value || new Date;

		if(input.value && typeof input.value == 'string'){
			 console.log("intp",input.value)
			 dateValue = Date.parse(input.value);
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
									 value={dateValue}
		   						textFieldStyle={styles}
										name={input.name}
		  						 	onChange={this.onChange}
										formatDate={function(obj){
										    var dt = new Date(obj);
										    var result =  dt.getFullYear()+'-'+(1+dt.getMonth())+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
										return result;
									}}
		  					 	/>
			{/*
		   							formatDate={function(obj){
										var dt = new Date(obj);
										var result =  dt.getFullYear()+'-'+(1+dt.getMonth())+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
										return result;
									}}
				*/}
							</div>
						</div>
						{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
					</div>
				  </div>
						</div>
					);
	}

}
