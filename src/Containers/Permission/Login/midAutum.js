import React from 'react'; 
import './index.less';
import zqBg from './images/zhongQiu/bg.jpg';
import ActionTranslate from 'material-ui/SvgIcon';

export default class MidAutumn extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	render() {

		return (
				 <div style={{position:'absolute',top:'0px',left:'0px',right:'0px',bottom:'0px',overflow:'hidden',background:'#222c72'}}>
					<img style={{display:'inline-block','maxWidth':'1600px',width:'100%',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}  src={zqBg} />
				</div> 
		);

	}
}