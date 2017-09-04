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

        let {label,iconClass,style,leftSpac,rightSpac} = this.props;
		let left = {marginLeft:leftSpac||0},right = {marginRight:rightSpac||0};
		let toolbarStyle = Object.assign({},style||{},left,right)
		
        
		return (
			
                <div className='ui-toolbar' onClick = {this.iconClick} style = {toolbarStyle||{}}>
                    <span className={iconClass}></span>
                    <span style={{marginTop:-12,display:'inline-block',verticalAlign:'middle'}}>{label}</span>
                </div>
			
		);
	}
}
