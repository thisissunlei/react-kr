import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';


import Dialog from '../Dialog';


let containerDOM = '';

class Message extends Component{

	static displayName = 'Message';
  constructor(props){
    super(props)
    this.state = {
      open:true,
    }

  }

  onClose = ()=>{
    ReactDOM.render('', containerDOM);
  }

	render(){
    let {message} = this.props;
		return (
        <div className="ui-message">
            {message}
        </div>
		);
	}
}


Message.show = function (messages) {
  if(!containerDOM){
    containerDOM = document.createElement('div');
    document.body.appendChild(containerDOM);
  }
    ReactDOM.render(<Message messages={messages} />, containerDOM);
};

Message.success = function (messages) {
  if(!containerDOM){
    containerDOM = document.createElement('div');
    document.body.appendChild(containerDOM);
  }
    ReactDOM.render(<Message messages={messages} />, containerDOM);
};

Message.error = function (messages) {
  if(!containerDOM){
    containerDOM = document.createElement('div');
    document.body.appendChild(containerDOM);
  }
    ReactDOM.render(<Message messages={messages} />, containerDOM);
};



module.exports = Message;
