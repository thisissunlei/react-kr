import React, {
	Component
} from 'react';

import './index.less';


export default class Chip extends Component {

	static displayName = 'KrChip';

	static defaultProps = {
		edit: false,
		label: '',
		readOnly: false,
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		edit: React.PropTypes.bool,
		/**
		 * 点选编辑时调该方法
		 */
		onEdit: React.PropTypes.func,
        /**
		 * 点选删除时调该方法
		 */
		onDel: React.PropTypes.func,
		/**
		 * label
		 */
		label: React.PropTypes.string,
		
		style: React.PropTypes.object,
		editStyle: React.PropTypes.object,


	};

	constructor(props) {
		super(props);

	}

	onDel=()=>{
        const {
			onDel,
		} = this.props;
		onDel();
    }

    onEdit=()=>{
        const {
			onEdit,
		} = this.props;
		onEdit();
    }

	render() {
		let {
			edit,
			label,
			style,
			editStyle,
		} = this.props;

        
		return (
			<div style={edit?editStyle:style} className="ui-chip">
					{edit && <span onClick={this.onDel} className="del"></span>}
					<span className="label">{label}</span>
                    {edit && <span onClick={this.onEdit} className="edit"></span>}
			</div>

		);

	}
}
