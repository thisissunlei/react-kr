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
				maxLength:React.PropTypes.number,
				placeholder:React.PropTypes.string,
				disabled:React.PropTypes.bool,
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
	render() {

		let {children,className,style,type,name,disabled,placeholder,...other} = this.props;

		let {value} = this.state;

		let  classNames = ClassNames('ui-input',className);

		if(disabled){
		  	classNames = ClassNames('ui-input',className,'disabled');
		}

		return (
			 <input type={type} style={style} name={name} className={classNames} placeholder={placeholder} value={value} disabled={disabled} onChange={this.onChange} {...other}/>
		);
	}
}
