import React,{Component} from 'react';
import './index.less';

export default class BraceWidthLeft extends Component{
	static PropTypes = {
	  contentL:React.PropTypes.contentL,
	}

	render(){  
	   const {contentL} = this.props; 
       return(
        <div className='ui-brace-left'>{contentL}</div>             
       	)
	}
}







