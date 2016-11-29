import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import './index.less';


export default class InputComponent extends React.Component{

	static PropTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number
	}

	constructor(props){
		super(props)


		console.log('00',this.props);
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,inline,simple,heightStyle,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
					</div>
				);
			}
			let className = '';

			if(touched && error){
				className = 'error-input';
			}


			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple}>
					<Input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} className={className} style={heightStyle} {...other}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}
