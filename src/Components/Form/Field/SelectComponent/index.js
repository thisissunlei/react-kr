import React from 'react';

import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectComponent extends React.Component{

	static PropTypes = {
		onChange:React.PropTypes.func
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.setInitValue = this.setInitValue.bind(this);

		this.isInit = false;

		this.state = {
			value:[]
		}
	}

	componentDidMount(){
		this.setInitValue(this.props.input.value);
	}


	componentWillReceiveProps(nextProps){
		if(!this.isInit && nextProps.input.value){
			this.setInitValue(nextProps.input.value);
		}
	}

	setInitValue(value){
		
		if(!value){
			return ;
		}

		this.setState({value});
		this.isInit = true;
	}

	handleChange(value){

		let {input} = this.props;
		this.setState({value});
		input.onChange(value);
	}

	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);

		onChange && onChange(item);
	}

	render(){

		let { input, label, type, meta: { touched, error },children,disabled,style,requireLabel,options,multi,...other} = this.props;

		if(multi){
			return (
					<div className="form-item-wrap" style={style}>
					<div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
							<div className="form-main">
							<div className="form-input">
							<ReactSelect 
									multi
									simpleValue
									name={input.name}
									value={this.state.value} 
									clearable={true}
									options={options}
									onChange={this.handleChange} 
									placeholder="请选择..."
								/>
							</div>
							{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
						  </div>
					</div>
			</div>
			);

		}
		if(options){
			return (
					<div className="form-item-wrap" style={style}>
					<div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
							<div className="form-main">
							<div className="form-input">
							<ReactSelect 
									name={input.name}
									searchable={false}
									value={input.value} 
									clearable={true}
									options={options}
									onChange={this.onChange} 
									placeholder="请选择..."
								/>
							</div>
							{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
						  </div>
					</div>
			</div>
			);

		}

		return (
			<div className="form-item-wrap" style={style}>
					<div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
							<div className="form-main">

								<div className="form-input">
									<select {...input}  disabled={disabled}>
									{children}
									</select>
								</div>

								{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
						  </div>
					</div>
			</div>
		);

	}


}

