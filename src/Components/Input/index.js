import React from 'react';

import {
	ClassNames
} from 'kr/Utils';


import './index.less';

export default  class Input extends React.Component {

	static displayName = 'Input';

	static defaultPorps = {
		value:'',
		type:'text',
		placeholder:'',
		disabled:false,
	}

	static propTypes = {
				name: React.PropTypes.string,
				style: React.PropTypes.object,
				className: React.PropTypes.string,
				type: React.PropTypes.string,
				children:React.PropTypes.node,
				minLength:React.PropTypes.number,
				maxLength:React.PropTypes.number,
				placeholder:React.PropTypes.string,
				disabled:React.PropTypes.bool,
				/**
				*{maxLength:'不能超过最大值',minLength:'最小值为'}
				*
				*/
				errors:React.PropTypes.object,
				onError:React.PropTypes.func,
	}

	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			value:this.props.value
		}

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
			 this.setState({
				 value:nextProps.value
			 });
		}
	}
	componentDidMount(){
		this.onBlur();
	}

	onChange(event){

			var value = event.target.value;
			const {onChange,maxLength} = this.props;
			if (maxLength) {
					value = value.slice(0,maxLength);
			}

			this.setState({
				value
			});
			onChange && onChange(value);
	}

	onValidate = ()=>{

		let {minLength,maxLength,requiredValue,errors} = this.props;
		let {value} = this.state;


		if(requiredValue && !value){
			return errors['requiredValue'];
		}

		if(minLength && String(value).length<minLength){
			return errors['minLength'];
		}

		if(maxLength && value.length>maxLength){
			return errors['maxLength'];
		}

		return undefined;

	}

	onBlur = ()=>{

		let {value} = this.state;
		let message = this.onValidate();
		let {onError} = this.props;

		if(typeof message !== 'undefined'){
			onError && onError(message);
		}
	}

	render() {

		let {children,className,style,type,name,disabled,placeholder,...other} = this.props;

		let {value} = this.state;

		let  classNames = ClassNames('ui-input',className);

		if(disabled){
		  	classNames = ClassNames('ui-input',className,'disabled');
		}


		return (
			 <input type={type} name={name} className={classNames}  style={style} placeholder={placeholder} value={value} {...other} disabled={disabled} onChange={this.onChange} onBlur={this.onBlur} />
		);
	}
}
