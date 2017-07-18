import React from 'react';
import './index.less';
import TreePublic from'../TreePublic'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		
	}


	render(){
       
		return (
            <div>
              <TreePublic />
            </div>
        )
	 }
 }
