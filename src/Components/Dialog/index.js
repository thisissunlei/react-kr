import React from 'react';

import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';


import './index.less';

export default class DialogComponent extends React.Component {

	static displayName = 'DialogComponent';

	static defaultProps = {
		autoScrollBodyContent: false,
		fxied: false,
	}
	constructor(props, context) {
		super(props, context);

		this.state = {
			contentStyle: { marginTop: 0 }
		}

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
		bodyStyle: React.PropTypes.object,
		/**
		*显示遮罩层
		*/
		modal: React.PropTypes.bool,
		fixed: React.PropTypes.bool,
		/**
		*
		*/
		autoDetectWindowHeight: React.PropTypes.bool,
		/**
		* 内容出现滚动条
		*/
		autoScrollBodyContent: React.PropTypes.bool,
		actions: React.PropTypes.node,
	}

	componentDidMount() {
		this.initializeStyles();
		window.addEventListener('resize', function () {
			this.initializeStyles();
		}.bind(this));
	}
	componentWillReceiveProps(nextProps)  {
		if(nextProps.open!=this.props.open && !nextProps.open){
			document.body.style.overflow="auto";
		}
	}

	componentDidUpdate() {

		const { fixed } = this.props;

		var dialogContentEle = this.refs.dialogContent;
		var height = dialogContentEle.getBoundingClientRect().height;
		if (!dialogContentEle) {
			return
		}

		if (fixed) {
			dialogContentEle.style.transform = `translateY(-${Math.floor(height / 2)}px)`;
			return;
		}
		dialogContentEle.style.transform = `translateY(-${Math.floor(height / 2 + 30)}px)`;
	}


	getPageWidthOrHeight = () => {

		var page = {};
		page.width = window.innerWidth;
		page.height = window.innerHeight;
		if (document.compatMode == 'CSS1Compat') {
			page.width = document.documentElement.clientWidth;
			page.height = document.documentElement.clientHeight;
		} else {
			page.width = document.body.clientWidth;
			page.height = document.body.clientHeight;
		}
		return Object.assign({}, page);
	}

	initializeStyles = () => {

		var ele;
		try {
			ele = this.refs.dialog;
		} catch (err) {
			ele = null;
		}

		if (!ele) {
			return;
		}

		var position = {};

		try {
			position = ele.getBoundingClientRect();
		} catch (err) {
			position = {};
		}

		var page = this.getPageWidthOrHeight();

		ele.style.width = page.width + 'px';
		ele.style.height = page.height + 'px';
		ele.style.zIndex = 1001;
		ele.style.top = -position.top + 'px';
		ele.style.left = -position.left + 'px';
		ele.style.bottom = -position.bottom + 'px';
		ele.style.right = -0 + 'px';

	}


	onClose = () => {
		document.body.style.overflow="auto";
		const { onClose } = this.props;
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
			bodyStyle,
			contentStyle,
			footerStyle,
			actions,
			fixed,
			noMaxHeight,
			dialogHeaderStyle,
			overflow,
			...other
		} = this.props;
		let name = '';
		let styles = {};
		let closeStyle = {};
		if (open) {
			if(this.props.stylesCard){
			  styles.zIndex='1200';	
			}
			styles.display = 'block';
			document.body.style.overflow="hidden";

		} else {
			styles.display = 'none';
		}
		if (typeof onClose != 'function') {
			closeStyle.display = 'none';
		}
		if(overflow=="auto"){
			styles.overflow = 'auto'
		}
		if(other.className){
			name = other.className
		}

		return (
			<div className="ui-dialog" ref="dialog" style={styles}>
				<div className="dialog-modal"></div>
				<div id="dialog-content" ref="dialogContent" className={ name + " "+ "dialog-content"} style={contentStyle}>
					<div className="dialog-header" style={dialogHeaderStyle}>
						<div className="dialog-header-title"> {title} </div>
						<span className="close" onClick={this.onClose} style={closeStyle}></span>
					</div>
					{open && <DialogBody noMaxHeight = {noMaxHeight} bodyStyle={bodyStyle} fixed={fixed} overflow={overflow}> {children} </DialogBody>}
					{open && actions && <DialogFooter footerStyle={footerStyle}> {actions} </DialogFooter>}
				</div>
			</div>
		);

	}
}
