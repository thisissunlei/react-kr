import React from 'react';
import {
} from 'kr-ui';

import './index.less';
export default class Tip  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
            width:'',
            height:''
        }
	}

    componentDidMount(){
        var dom=document.getElementById('com-tips');
        this.setState({
            width:dom.getBoundingClientRect().width/2,
            height:dom.getBoundingClientRect().height
        })
    }

	render(){
        let {hoverData}=this.props;
        let {width,height}=this.state;
		return(

			<div className="com-tips" id='com-tips' style={{left:hoverData.clientX-width,top:hoverData.clientY-22-height}}>
                    <div>工位编号：{hoverData.name?hoverData.name:'-'}</div>
                    <div>姓名：{hoverData.pName?hoverData.pName:'-'}</div>
                    <div>电话：{hoverData.phone?hoverData.phone:'-'}</div>
                    <div>公司：{hoverData.company?hoverData.company:'-'}</div>
                    <div>租期：{hoverData.leaseStart+'-'+hoverData.leaseEnd}</div>
		   </div>
		);
	}

}
