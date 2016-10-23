import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';

export default class DateComponent extends React.Component{

	static PropTypes = {
		defaultValue:React.PropTypes.string,
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.renderDateComponent = this.renderDateComponent.bind(this);

		this.state = {
			value: new Date()
		}

	}
	componentWillReceiveProps(nextProps){
		let {input} = this.props;
		if(this.props.defaultValue !=nextProps.defaultValue){
			this.onChange('hah',nextProps.defaultValue);
		}
	}

	onChange(event,value){

		if(!value){
			return ;
		}
		let {input} = this.props;

		console.log("in",input);

		var dt = new Date(value);
		var result =  dt.getFullYear()+'-'+(1+dt.getMonth())+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();

		this.setState({
			value:new Date(value)
		});

		input.onChange(result);
	}

	renderDateComponent(){

		console.log('000yaya-----')
		let {placeholder,input} = this.props;

		const styles ={
			border:'1px solid #ddd',
			height:40,
			borderRadius:'4px',
			paddingLeft:10
		}

		return (
			 <DatePicker hintText={placeholder||'日期'} textFieldStyle={styles} name={input.name} onChange={this.onChange} />
		);

	}

	render(){

	let{ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,defaultValue} = this.props;
	return (
				<div className="form-item-wrap " style={style}>
				<div className="form-item date">
				{label &&<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label> }
				<div className="form-main">
					<div className="form-input-main">
						<div className="form-input">
								 {this.renderDateComponent()} 
						</div>
					</div>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</div>
			  </div>	
					</div>
				);
	}

}
