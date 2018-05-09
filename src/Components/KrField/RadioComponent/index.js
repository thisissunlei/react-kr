import React from 'react';

export default class RadioComponent  extends React.Component{

	constructor(props){
		super(props)

	}

	onClick = (event)=>{
		event.stopPropagation();
		let {input}=this.props;
		let {onClick} = this.props;
		onClick && onClick(input);
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style} = this.props;
		const Styles = Object.assign(style,{
			paddingRight:10,
		});
		var inputProps = {};
        if(type=='fieldCheck'){
			var fieldCheck=false;
			if(input.value){
				fieldCheck=true;
			}else{
				fieldCheck=false;
			}
			type='checkbox';
			inputProps = {
				...input,
				placeholder:placeholder||label,
				type,
				disabled,
				onClick:this.onClick,
				checked:fieldCheck
		    }
		}else{
			inputProps = {
				...input,
				placeholder:placeholder||label,
				type,
				disabled,
				onClick:this.onClick,
		    }
		}
		
		return (
			<span style={Styles}>
					<input {...inputProps} />
					<span style={{paddingLeft:5}}>{label}</span>
			</span>
		)

	}

}
