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
        let {name,next}=this.props;
        if(name&&name.value){
          return <Text name={name.value} next={next}/>            
        }   
    }

	render(){

	
		return (
			
                <div>
                   {this.dicRender()}
                </div>
			
		);
	}
}
