import React, {
	Component
} from 'react';
import './index.less';


export default class SnackTip extends Component {

	static displayName = 'SnackTip';

	static defaultProps = {
		
	}

	static propTypes = {
		/**
		*关闭
		*/
		onClose: React.PropTypes.func,
		/**
		*是否开启
		*/
		open: React.PropTypes.bool,
		/**
		*标题
		*/
		title: React.PropTypes.string,
		/**
		*样式
		*/
		style:React.PropTypes.object,
	}
     
    open=()=>{
      
     }

	render() {

		const {
			title,
			style,
			open,
			onClose,
			children,
			...other
		} = this.props;
         



		return (
			<div>
			  <span style={style}>{title}</span>
			</div>
		);

	}
}
