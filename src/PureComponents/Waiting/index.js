import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

class Waiting extends React.Component {

	static displayName = 'Waiting';

	constructor(props) {
		super(props)
		this.state = {
			isClassName: true,
		}
	}

	onClose = () => {

		this.setState({
			isClassName: !this.state.isClassName
		})

	}
	componentWillUnmount(){
		document.body.style.overflow="scroll";//显示页面水平和垂直滚动条
	}

	render() {
		let {isClassName} = this.state;
		if(isClassName){
			document.body.style.overflow="hidden";//隐藏页面水平和垂直滚动条
		}else{
			document.body.style.overflow="scroll";//显示页面水平和垂直滚动条
		}
		  
		return (
			<div className="shadow" style={{display:isClassName?'display':'none'}}>
				<div className="ui-message message_box">
					<span onTouchTap={this.onClose} style={{color:'#EDEDED'}}></span>
					<p className="waiting">
						<span>注意！此页面的数据可能不准，工程师正在努力修复中</span>
					</p>
				</div>
			</div>
		);
	}
}


module.exports = Waiting;
