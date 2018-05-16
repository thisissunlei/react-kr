import React, {
	Component
} from 'react';

import './index.less';
export default class KrCheckbox extends Component {

	static displayName = 'KrCheckbox';

	static defaultProps = {
		checked: false,
		label: '',
		readOnly: false,
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		checked: React.PropTypes.bool,
		/**
		 * 点选时回调该方法
		 */
		onCheck: React.PropTypes.func,
		/**
		 * label
		 */
		label: React.PropTypes.string,
		/**
		 *是否只读
		 */
		readOnly: React.PropTypes.bool,
		style: React.PropTypes.object,
		heightStyle: React.PropTypes.object,
	};

	constructor(props) {
		super(props);

	}

	onCheck = () => {

		let {
			readOnly,
			data
		} = this.props;

		if (readOnly) {
			return;
		}
		const {
			onCheck,
			checked
		} = this.props;
		onCheck && onCheck(!checked);

	}


	render() {
		let {
			checked,
			label,
			style,
			readOnly,
			heightStyle,
			...other
		} = this.props;
		var checkboxClass = ".input-checkbox-init"
		if(checked && !other.disabled){
			checkboxClass = "input-checkbox-active"
		}
		let disabled = readOnly?'disabled':''
		if(checked && other.disabled){
			checkboxClass = "input-checkbox-disabled-active"
		}
		if(!checked && other.disabled){
			checkboxClass = "input-checkbox-disabled-init"
		}

		return (
			<span style={style} className="ui-checkbox">
					 <input type="checkbox" onChange={this.onCheck} checked={checked} disabled={disabled} {...other}/>
					{label && <span style={heightStyle} className="label">{label}</span>}
			</span>

		);

	}
}
