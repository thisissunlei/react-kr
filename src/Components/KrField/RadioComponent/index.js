import React from 'react';

export default class RadioComponent  extends React.Component{

	constructor(props){
		super(props)
	}
	onClick = (event)=>{
		let {input}=this.props;
		let values=input;
		let {onClick} = this.props;
		onClick && onClick(values);
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,checked} = this.props; 
		const Styles = Object.assign(style,{
			paddingRight:10,
		});

		return (
			<span style={Styles}>
					<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} onClick={this.onClick}/>
					<span style={{paddingLeft:5}}>{label}</span>
			</span>	
		)

	}

} 

