import React, {
	Component
} from 'react';
import './index.less';

import ReactDOM from 'react-dom';

export default class DialogComponent extends Component {

	static displayName = 'DialogComponent';

	static defaultProps = {
		autoScrollBodyContent: true,
		autoDetectWindowHeight: true,
	}

	static propTypes = {
		/**
		*关闭时回调函数
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
		*显示遮罩层
		*/
		modal: React.PropTypes.bool,
		/**
		*
		*/
		autoDetectWindowHeight: React.PropTypes.bool,
		/**
		* 内容出现滚动条
		*/
		autoScrollBodyContent: React.PropTypes.bool,
	}

	componentDidMount(){
			this.initializeStyles();
	}

	initializeStyles = ()=>{

			var ele = ReactDOM.findDOMNode(this);

			var position = {};

			if(ele.getClientRects().length){
					position = ele.getBoundingClientRect();
			}

			var pageWidth = window.innerWidth;
			var pageHeight = window.innerHeight;
			if(document.compatMode == 'CSS1Compat'){
				 pageWidth = document.documentElement.clientWidth;
				 pageHeight = document.documentElement.clientHeight;
			}else{
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
			}

			ele.style.width = pageWidth+'px';
			ele.style.height = pageHeight+'px';
			ele.style.zIndex = 99;
			ele.style.top = -position.top +'px';
			ele.style.left = -position.left+'px';
			ele.style.bottom = -position.bottom+'px';
			ele.style.right = -0+'px';
	}


	onClose = ()=>{
			document.body.style.overflow = 'auto';
			const {onClose} = this.props;
			onClose && onClose();
	}


	render() {

		const {
			title,
			modal,
			open,
			onClose,
			autoDetectWindowHeight,
			autoScrollBodyContent,
			children,
			...other
		} = this.props;
		console.log('autoScrollBodyContent',autoScrollBodyContent);

		let styles = {};
		let bodyStyles ={};
		if(open){
				styles.display = 'block';
			document.body.style.overflow = 'hidden';

		}else{
				styles.display = 'none';
		}
		if(autoScrollBodyContent){
			bodyStyles.maxHeight = '400px';
			bodyStyles.overflowY = 'auto';
		}

		return (
			<div className="ui-dialog" ref="dialog" style={styles}>
				<div className="dialog-modal"></div>
				<div className="dialog-content">
						<div className="dialog-header">
								<div className="dialog-header-title"> {title} </div>
								<span className="close" onClick={this.onClose}></span>
						</div>
						<div className="dialog-body" style={bodyStyles}>
							{children}
						</div>
				</div>
			</div>
		);

	}
}
