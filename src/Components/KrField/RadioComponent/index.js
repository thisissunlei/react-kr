import React from 'react';

export default class RadioComponent  extends React.Component{

	constructor(props){
		super(props)

	}

	onClick = (event)=>{
		let {input}=this.props;
		let {onClick} = this.props;
		onClick && onClick(input);
	}

	componentDidMount(){
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,checked} = this.props;
		const Styles = Object.assign(style,{
			paddingRight:10,
		});

		var inputProps = {
				...input,
				placeholder:placeholder||label,
				type,
				disabled,
				onClick:this.onClick,
		}

		return (
			<span style={Styles}>
					<input {...inputProps}/>
					<span style={{paddingLeft:5}}>{label}</span>
			</span>
		)

	}

}
