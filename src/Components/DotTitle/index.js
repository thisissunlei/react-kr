import React,{Component} from 'react';
import './index.less';

export default class DotTitle extends Component{
	static PropTypes = {
	  title:React.PropTypes.title,
	}

	render(){  
	   const {title} = this.props; 
       return(
        <div>       
         <span className='ui-title-dot'></span>
		 <span className='ui-title-mid'>{title}</span>
		 <span className='ui-title-dot'></span>	
		</div>
       	)
	}
}







