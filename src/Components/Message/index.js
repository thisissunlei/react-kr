import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import Dialog from '../Dialog';


let containerDOM = '';
let shadowDOM = '';

class Message extends Component{

	static displayName = 'Message';
  constructor(props){
    super(props)
		this.state={
				isClassName:false,
		}
  }

  onClose = ()=>{
		this.setState({
			isClassName:!this.state.isClassName
		})
		window.setTimeout(function(){
			ReactDOM.render(<div className='hide'></div>, shadowDOM);
		},500)

  }

	render(){
    let {messages,className} = this.props;
		let {isClassName}=this.state;
		return (
			<div className="shadow">
        <div className={`ui-message message_box ${isClassName?'exit':''}`}>
					<span onTouchTap={this.onClose}></span>
					<p className={className}>
						<span>{messages}</span>
					</p>
        </div>
			</div>
		);
	}
}

function commonTimeout(){
	setTimeout(function(){
		ReactDOM.render(<div className='hide'></div>, shadowDOM);
	},1000)
}

/**
* type success error normal
*/

function commonRender(messages,type,fn){
	  var className = 'normal';
    if(type == 'success'){
				className = 'success';
		}else if (type == 'error') {
			className = 'error';
		}
		if(!containerDOM){
			shadowDOM = document.createElement('div');
			shadowDOM.className = "outer";
			containerDOM = document.createElement('div');
			shadowDOM.appendChild(containerDOM);
			document.body.appendChild(shadowDOM);
		}
			ReactDOM.render(<Message messages={messages} className={className}/>, shadowDOM);
			if(fn){
				fn();
			}
}

Message.show = function (messages) {
    commonRender(messages,'error');
};

Message.success = function (messages) {
		commonRender(messages,'success',commonTimeout);

};

Message.error = function (messages) {
	  commonRender(messages,'error');
};


module.exports = Message;
