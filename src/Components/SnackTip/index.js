import React, {
	Component
} from 'react';
import './index.less';

export default class SnackTip extends Component {

	static displayName = 'SnackTip';
    
   constructor(props) {
    super(props);
    this.state = { flag:'true' };
  }

	static propTypes = {
		/**
		*标题
		*/
		title: React.PropTypes.string,
		/**
		*样式
		*/
		style:React.PropTypes.object,
		onClose:React.PropTypes.func,
		open:React.PropTypes.bool
	}
    

	render() {

		const {
			title,
			style,
			children,
			open,
			onClose,
			...other
		} = this.props;


		let className = 'snackTap';

		if(!open){
			className = 'none';	
		} 

		return (
			<div className="ui-snackTap">
			 <div className={className}  style={style} onClick={onClose}>
			  <span>{title}</span>
			 </div>
			</div>
		);

	}
}
