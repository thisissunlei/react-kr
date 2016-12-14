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
			this.initializeDialogBodyStyles();

			window.addEventListener('resize',function(){
				this.initializeStyles();
				this.initializeDialogBodyStyles();
			}.bind(this));
	}


	initializeDialogBodyStyles = ()=>{

		var ele = this.refs.dialogBody;
		const {autoScrollBodyContent} = this.props;

		var page = this.getPageWidthOrHeight();

		if(autoScrollBodyContent){
			ele.style.maxHeight = page.height-200+'px';
			ele.style.overflowY = 'auto';
		}

	}

	getPageWidthOrHeight = ()=>{

			var page = {};
			 page.width = window.innerWidth;
			 page.height = window.innerHeight;
			if(document.compatMode == 'CSS1Compat'){
				 page.width = document.documentElement.clientWidth;
				 page.height = document.documentElement.clientHeight;
			}else{
				page.width = document.body.clientWidth;
				page.height = document.body.clientHeight;
			}
			return  Object.assign({},page);
	}

	initializeStyles = ()=>{

			var ele = ReactDOM.findDOMNode(this);

			var position = {};

			if(ele.getClientRects().length){
					position = ele.getBoundingClientRect();
			}

			var page = this.getPageWidthOrHeight();

			ele.style.width = page.width+'px';
			ele.style.height = page.height+'px';
			ele.style.zIndex = 99;
			ele.style.top = -position.top +'px';
			ele.style.left = -position.left+'px';
			ele.style.bottom = -position.bottom+'px';
			ele.style.right = -0+'px';
	}


	onClose = ()=>{
			//document.body.style.overflow = 'auto';
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
			contentStyle,
			...other
		} = this.props;

		let styles = {};

		if(open){
				styles.display = 'block';
			//document.body.style.overflow = 'hidden';
		}else{
				styles.display = 'none';
		}

		return (
			<div className="ui-dialog" ref="dialog" style={styles}>
				<div className="dialog-modal"></div>
				<div className="dialog-content" style={contentStyle}>
						<div className="dialog-header">
								<div className="dialog-header-title"> {title} </div>
								<span className="close" onClick={this.onClose}></span>
						</div>
						<div className="dialog-body" ref="dialogBody">
							{this.props.open && children}
						</div>
				</div>
			</div>
		);

	}
}
