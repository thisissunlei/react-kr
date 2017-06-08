import React from 'react';
import {
} from 'kr-ui';

import './index.less';
export default class Tip  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    componentDidMount(){
        let {hoverData}=this.props;
        var width=this.tip.getBoundingClientRect().width/2;
        var height=this.tip.getBoundingClientRect().height;
        this.tip.style.left=hoverData.clientX-width+'px';
        this.tip.style.top=hoverData.clientY-hoverData.height/2-height-8+'px';
    }

	render(){
        let {hoverData}=this.props
		return(

			<div className="com-tips"  ref={(tip)=>this.tip=tip} >
                    <div>工位编号：{hoverData.name?hoverData.name:'-'}</div>
                    <div>姓名：{hoverData.pName?hoverData.pName:'-'}</div>
                    <div>电话：{hoverData.phone?hoverData.phone:'-'}</div>
                    <div>公司：{hoverData.company?hoverData.company:'-'}</div>
                    <div>租期：{hoverData.leaseStart+'-'+hoverData.leaseEnd}</div>
		   </div>
		);
	}

}
