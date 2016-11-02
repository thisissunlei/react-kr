import React,{Component} from 'react';
import './index.less';

export default class BraceWidthRight extends Component{
	static PropTypes = {
	  contentR:React.PropTypes.contentR,
	}

	render(){  
	   const {contentR} = this.props; 
       return(
        <div className='ui-brace-right'>{contentR}</div>             
       	)
	}
}







