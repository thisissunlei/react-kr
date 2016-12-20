import React,{Component} from 'react';

import './index.less';


export default class KrCheckbox extends Component{

	static displayName = 'KrCheckbox';

	static defaultProps = {
		checked:false,
		label:'',
		readOnly:false,
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		checked:React.PropTypes.bool,
		/**
		 * 点选时回调该方法
		 */
		onCheck:React.PropTypes.func,
		/**
		* label
		*/
		label:React.PropTypes.string,
		/**
		*是否只读
		*/
		readOnly:React.PropTypes.bool
	};

	constructor(props){
		super(props);

	}

	onCheck = ()=>{

		let {readOnly} = this.props;

		if(readOnly){
				return ;
		}
		const {onCheck,checked} = this.props;
		onCheck && onCheck(!checked);

	}


	render(){

		let {checked} = this.props;
		let {label} = this.props;

		return (
			<span className="ui-checkbox">
					<input type="checkbox" onChange={this.onCheck} checked={checked}/>
					{label && <span className="label">{label}</span>}
			</span>

		);

	}
}
