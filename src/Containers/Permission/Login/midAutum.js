import React from 'react'; 
import './index.less';
import zqBg from './images/zhongQiu/bg.jpg';

export default class MidAutumn extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	render() {

		return (
				 <div style={{position:'absolute',top:'0px',left:'0px',right:'0px',bottom:'0px'}}>
					<img style={{display:'block',width:'100%',height:'100%'}}  src={zqBg} />
				</div> 
		);

	}
}