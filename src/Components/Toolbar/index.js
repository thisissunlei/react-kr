import React from 'react';
export default class Toolbar extends React.Component{

	static displayName = 'Toolbar';

	static propTypes = {
		
    }
    
    propsClick=()=>{
        const {propsClick}=this.props;

        propsClick && propsClick();
    }

	constructor(props){
		super(props);
	}

	render(){

        let {label,iconClass} = this.props;
        
		return (
			<div>
                <div className='ui-dele-all' onClick = {this.propsClick}>
                    <span className={iconClass}></span>
                    <span style={{marginTop:-12,display:'inline-block',verticalAlign:'middle'}}>{label}</span>
                </div>
			</div>
		);
	}
}
