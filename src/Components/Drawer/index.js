import React from 'react';


import DrawerBody from './DrawerBody';
import DrawerModal  from './DrawerModal';

import './index.less';

export default class DrawerSimpleExample extends React.Component {


  static defaultProps = {
    width:1000,
  }
  static propTypes = {
    open:React.PropTypes.bool,
    width:React.PropTypes.number,
    contentStyle:React.PropTypes.object,
    onClose:React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }


  onClose =()=>{
    const {onClose} = this.props;
    onClose && onClose();
  }

  render() {

    let {children,open,contentStyle,width} = this.props;

    if(!open){

      return null;
    }

    contentStyle = Object.assign({},contentStyle);

    if(width){
      contentStyle = Object.assign({},contentStyle,{width:width});
    }

    return (

      <div className="ui-drawer">
        <DrawerModal onClose={this.onClose}/>
        <DrawerBody style={contentStyle}> {children} </DrawerBody>
      </div>

    );
  }
}