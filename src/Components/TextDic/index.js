import React from 'react';
import './index.less';
import Text from './Text';
export default class TextDic extends React.Component{

	static displayName = 'TextDic';

	static propTypes = {
		
    }

	constructor(props){
		super(props);
    }
    
    dicRender=()=>{
        let {label,next}=this.props;
        if(label&&label.value){
          return <Text label={label.value} next={next}/>            
        }   
    }

	render(){

	
		return (
			
                <div style={{display:'inline-block'}}>
                   {this.dicRender()}
                </div>
			
		);
	}
}
