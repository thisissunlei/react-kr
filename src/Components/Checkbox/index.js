import React,{Component} from 'react';


class KrCheckbox extends Component{

	static displayName = 'KrCheckbox';

	static defaultProps = {
		checked:false
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		checked:React.PropTypes.bool,
		/**
		 * 点选时回调该方法
		 */
		onCheck:React.PropTypes.func
	};


	render(){

		let {checked,onCheck} = this.props;

		return (
			<input type="checkbox" onClick={onCheck} checked={checked}/>
		);
	}
}

export default KrCheckbox;
