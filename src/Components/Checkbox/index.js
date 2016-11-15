import React,{Component} from 'react';


class KrCheckbox extends Component{

	static propTypes = {
		/**
		 * Checkbox is checked if true.
		 */
		checked:React.PropTypes.bool,
		/**
		 * The SvgIcon to use for the checked state.
		 */
		onCheck:React.PropTypes.func
	};

	static displayName = 'KrCheckbox';

	render(){

		let {checked,onCheck} = this.props;

		return (
			<input type="checkbox" onClick={onCheck} checked={checked}/>
		);
	}
}

export default KrCheckbox;
