import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		
	}


	render(){
       
		return (
            <div>
              <SliderTree />
            </div>
        )
	 }
 }
