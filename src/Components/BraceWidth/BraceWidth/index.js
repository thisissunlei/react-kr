import React,{Component} from 'react';
import './index.less';
import BraceWidthLeft from '../BraceWidthLeft';
import BraceWidthRight from '../BraceWidthRight';

export default class BraceWidth extends Component{
	static PropTypes = {
	  contentL:React.PropTypes.string,
	  contentR:React.PropTypes.string,
	}

	render(){  
	   const {contentL,contentR,children} = this.props; 
       return(
        <div className='ui-braceWidth'>       
          <BraceWidthLeft contentL=''/>
           {children}
          <BraceWidthRight contentR=''/>
		</div>
       	)
	}
}







