import React from 'react';
import './index.less'
export default class Toolbar extends React.Component{

	static displayName = 'Toolbar';

	static propTypes = {
		
    }
    
    iconClick=()=>{
        const {iconClick}=this.props;

        iconClick && iconClick();
    }

	constructor(props){
		super(props);
	}

	render(){

        let {label,iconClass,style} = this.props;
        
		return (
			
                <div className='ui-toolbar' onClick = {this.iconClick} style = {style||{}}>
                    <span className={iconClass}></span>
                    <span style={{marginTop:-12,display:'inline-block',verticalAlign:'middle'}}>{label}</span>
                </div>
			
		);
	}
}
