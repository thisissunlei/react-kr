import React from 'react';
import {Actions,Store} from 'kr/Redux';
import './index.less';
import State from './State';
export default class LoadingProgress extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    


	render(){
		let {progress,style}=this.props;
		return(

			<div className='high-load'>
			  <li className="loading-progress" style={{position:'relative'}}>
                 <span className={style?"progress":"progress progress-two"} style={{width:`${progress}%`,height:'16px',position:'absolute',top:0}}></span>
                 <span style={{display:'block',position:'absolute',top:20,left:'50%',transform:'translateX(-15px)'}}>{progress}%</span>
              </li>
			</div>
		);
	}

}
