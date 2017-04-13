import React from 'react';

export default class RadioComponent  extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			value:this.props.value
		}
	}
	
	onClick = (event)=>{
		let {input}=this.props;
		let {onClick} = this.props;
		onClick && onClick(input);
		input.onChange(this.state.value);
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,checked} = this.props;
		const Styles = Object.assign(style,{
			paddingRight:10,
		});

		return (
			<span style={Styles}>
					<input name={input.name} placeholder={placeholder|| label} type={type} disabled={disabled} onClick={this.onClick}/>
					<span style={{paddingLeft:5}}>{label}</span>
			</span>
		)

	}

}
