





import React, { PropTypes } from 'react';
import './index.less';



export default class SetNumber extends React.Component{

  static displayName = 'SetNumber';

  static PropTypes = {
    initailNum: React.PropTypes.number,
    // children: React.PropTypes.node,
    // /**
    //  * place有四个参数值top,bottom,left,right
    //  */
    // place:React.PropTypes.string,
    // backgroundColor:React.PropTypes.string,
    // /**
    //  * tooltip内容的阴影，box-shadow的参数
    //  */
    // boxShadow:React.PropTypes.string,
    // /**
    //  * 与box-shadow的阴影色相同
    //  */

  }

  constructor(props) {
    super(props);
    this.state={
      num : 0
    }
  }






  render() {

    let {num} = this.state;

    return (
      <div className="ui-set-num">
        <span className="ui-btn">-</span>
        <span className="ui-num">{num}</span>
        <span className="ui-btn">+</span>
      </div>

    );
  }
}
