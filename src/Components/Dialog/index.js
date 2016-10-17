import React,{Component} from 'react';
import './index.less';


import {
	Dialog,
} from 'material-ui';

export default class DialogComponent extends Component{


	static defaultProtypes ={
		autoScrollBodyContent:true,
	}

	static PropTypes = {
		open:React.PropTypes.bool,
		title:React.PropTypes.title,
		modal:React.PropTypes.bool,
		autoDetectWindowHeight:React.PropTypes.bool,
		autoScrollBodyContent:React.PropTypes.bool,
	}


	constructor(props){
		super(props)
	}


	render(){

		const {title,modal,open,autoDetectWindowHeight,autoScrollBodyContent,children,...other} = this.props;

		return (
			<div>
				<Dialog
					title={title}
					modal={modal}
					autoScrollBodyContent={autoScrollBodyContent}
					autoDetectWindowHeight={autoDetectWindowHeight}
					open={open} 
					{...other}>
						{children}
				  </Dialog>
			</div>
		);

	}
}






