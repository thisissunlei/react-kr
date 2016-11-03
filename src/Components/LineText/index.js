import React,{Component} from 'react';
import './index.less';

export default class LineText extends Component{
	static PropTypes = {
	  title:React.PropTypes.title,
	  primary:React.PropTypes.string, 
	}

	render(){  
	   const {title,primary} = this.props; 
	  
       return(
                    <div className='ui-lineText'>
                        <span className={primary!='true'?'lineText-line line-gray':'lineText-line line-blue'}></span>
                        <span className={primary!='true'?'lineText-text text-gray':'lineText-text text-blue'}>{title}</span>
		            </div>
       	)
	}
}







