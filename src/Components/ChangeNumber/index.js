import React, { PropTypes } from 'react';
import './index.less';
import Message from  '../Message';

export default class ChangeNumber extends React.Component{

  static displayName = 'ChangeNumber';
  constructor(props) {
    super(props);
    this.state={
      num : 20
    }
  }

  componentDidMount(){
    let {initNum}  = this.props;
    if(initNum){
      this.setState({
        num : initNum
      })
    }
  }

  changeInputValue=(e)=>{
    this.setState({
      num : e.target.value
    },function(){
      let {changeNum} = this.props;
      changeNum && changeNum(e.target.value);
    })
  }


  changeNumInputBlur=()=>{
    if(!this.judgeNum()){
      Message.error("温度必须为15-35之间的正整数");
    }
  }

  decreaseNum = ()=>{
    let reg =/^[0-9]*[1-9][0-9]*$/;
    let {num} = this.state;
    if(!reg.test(num)){
      Message.error("温度必须为15-35之间的正整数");
      return;
    }
    this.setState({
      num : num -1
    },function(){
      let {changeNum} = this.props;
      changeNum && changeNum(this.state.num);
      if(!this.judgeNum()){
        Message.error("温度必须为15-35之间的正整数");
        return ;
      }
    })
  }

  increaseNum = ()=>{
    let reg =/^[0-9]*[1-9][0-9]*$/;
    let {num} = this.state;
    if(!reg.test(num)){
      Message.error("温度必须为15-35之间的正整数");
      return;
    }
    var numParam  = parseInt(num)+1;
    this.setState({
      num : numParam
    },function(){
      let {changeNum} = this.props;
      changeNum && changeNum(numParam);
      if(!this.judgeNum()){
        Message.error("温度必须为15-35之间的正整数");
        return ;
      }
    })
  }

  judgeNum=()=>{
    let reg =/^[0-9]*[1-9][0-9]*$/;
    let {num} = this.state;
    if(!reg.test(num)){
      return false;
    }else{
      if(num<15 || num > 35){
        return false;
      }else{
        return true;
      }
    }
  }


  render() {
    let {num} = this.state;
    return (
      <div className="ui-change-num">
        <img src={require("./images/decreace.svg")} className="ui-change-num-img"  onClick={this.decreaseNum}/>
        <input type="text" className="ui-change-num-input" value={num} onChange={this.changeInputValue} onBlur={this.changeNumInputBlur}/>
        <img src={require("./images/increase.svg")} className="ui-change-num-img" onClick={this.increaseNum}/>
      </div>

    );
  }
}
