import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';


import Dialog from '../Dialog';


let containerDOM = '';
let zhezhaoDOM = '';

class Message extends Component{

	static displayName = 'Message';
  constructor(props){
    super(props)
    this.state = {
      open:true,
			msg:'保存成功'
    }

  }

  onClose = ()=>{
    ReactDOM.render(<div className='hide'></div>, zhezhaoDOM);
  }

	render(){
    let {messages,className} = this.props;
		let {msg}=this.state;
		var  Messages=messages || msg

		return (
			<div className="zhezhao">
        <div className="ui-message message_box">
					<span onTouchTap={this.onClose}></span>
					<p className={className}>
						<span>{messages}</span>
					</p>
        </div>
			</div>
		);
	}
}


Message.show = function (messages) {
  if(!containerDOM){
		zhezhaoDOM = document.createElement('div');
		zhezhaoDOM.className = "wai";
    containerDOM = document.createElement('div');
		zhezhaoDOM.appendChild(containerDOM);
		document.body.appendChild(zhezhaoDOM);
  }
    ReactDOM.render(<Message messages={messages} className="success"/>, zhezhaoDOM);
};

Message.success = function (messages) {
	if(!containerDOM){
		zhezhaoDOM = document.createElement('div');
		zhezhaoDOM.className = "wai";
    containerDOM = document.createElement('div');
		zhezhaoDOM.appendChild(containerDOM);
		document.body.appendChild(zhezhaoDOM);
  }
    ReactDOM.render(<Message messages={messages} className="success"/>, zhezhaoDOM);
};

Message.error = function (messages) {
  if(!containerDOM){
		zhezhaoDOM = document.createElement('div');
		zhezhaoDOM.className = "wai";
    containerDOM = document.createElement('div');
		zhezhaoDOM.appendChild(containerDOM);
		document.body.appendChild(zhezhaoDOM);
  }
    ReactDOM.render(<Message messages={messages} className="error" />, zhezhaoDOM);
};



module.exports = Message;
