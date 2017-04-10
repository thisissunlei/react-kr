import React, {
	Component
} from 'react';
import './index.less';

import ReactDOM from 'react-dom';

import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';

export default class DialogComponent extends Component {

	static displayName = 'DialogComponent';

	static defaultProps = {
		autoScrollBodyContent: false,
	}
	constructor(props, context) {
		super(props, context);

		this.state = {
			contentStyle:{marginTop:0}
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

	componentDidMount(){
			// var elem=document.getElementById("dialog-content");
			// this.setState({
			// 	contentStyle:{"marginTop":-elem.innerHeight/2}
			// })
			this.initializeStyles();
			window.addEventListener('resize',function(){
				this.initializeStyles();
				
			}.bind(this));


	}


	componentWillReceiveProps() {
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

			// var ele = ReactDOM.findDOMNode(this);
			var ele;
			try{
				ele = this.refs.dialog;
			}catch(err){
				ele = null;
			}
			if(!ele){
				return;
			}

			var position = {};

			try{
					position = ele.getBoundingClientRect();
			}catch(err){
				position = {};
			}

			var page = this.getPageWidthOrHeight();

			ele.style.width = page.width+'px';
			ele.style.height = page.height+'px';
			ele.style.zIndex = 1001;
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
			bodyStyle,
			contentStyle,
			footerStyle,
			actions,
			dialogHeaderStyle,
			...other
		} = this.props;

		let styles = {};
		// let content=Object.assign(contentStyle,this.state.contentStyle);
        let closeStyle={};
		if(open){
				styles.display = 'block';
			//document.body.style.overflow = 'hidden';
		}else{
				styles.display = 'none';
		}

		if(typeof onClose!='function'){
		  closeStyle.display='none';
		}

		return (
			<div className="ui-dialog" ref="dialog" style={styles}>
				<div className="dialog-modal"></div>
				<div id="dialog-content" className="dialog-content" style={contentStyle}>
						<div className="dialog-header" style={dialogHeaderStyle}>
								<div className="dialog-header-title"> {title} </div>
								<span className="close" onClick={this.onClose} style={closeStyle}></span>
						</div>
						{open && <DialogBody bodyStyle={bodyStyle}> {children} </DialogBody>}
						{open && actions &&  <DialogFooter footerStyle={footerStyle}> {actions} </DialogFooter>}
				</div>
			</div>
		);

	}
}
