import React,{Component} from 'react';
import './index.less';

export default class DotTitle extends Component{
	static PropTypes = {
	  title:React.PropTypes.title, 
	  children:React.PropTypes.children,
	  style:React.PropTypes.style
	}

	render(){  
	   const {title,children,style} = this.props; 
	  
       return(
        <div className='ui-title' style={style}>
         <div className='ui-head'>       
			 <span className='ui-title-mid'>{title}</span>
         </div>
		 {children &&
		  <div className='ui-body'> 
		     <div className='ui-body-inner'>       
		 	   {children}
		 	 </div>  		 	  
		  </div>}

		</div>
       	)
	}
}







