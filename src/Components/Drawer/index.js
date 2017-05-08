import React from 'react';


import DrawerBody from './DrawerBody';
import DrawerModal  from './DrawerModal';

import './index.less';

export default class DrawerSimpleExample extends React.Component {


  static defaultProps = {
    width:200,
    openSecondary:true,
    modal:true,
  }
  static propTypes = {
    open:React.PropTypes.bool,
    width:React.PropTypes.number,
    contentStyle:React.PropTypes.object,
    onClose:React.PropTypes.func,
    openSecondary:React.PropTypes.bool,
    modal:React.PropTypes.bool
  }

  constructor(props) {
    super(props);
  }


  onClose =()=>{
    const {onClose} = this.props;
    onClose && onClose();
  }

  render() {

    let {children,open,contentStyle,width,openSecondary,modal} = this.props;
   
    var drawerStyles = Object.assign({},{width:width});

     if(!open){
      return null;
    }

    if(openSecondary){
        drawerStyles.right = 0;
    }else{
        drawerStyles.left = 0;
    }

    return (
      <div className="ui-drawer" style={drawerStyles}>
        {modal && <DrawerModal onClose={this.onClose}/> }
        <DrawerBody style={contentStyle}> {children} </DrawerBody>
      </div>
    );
  }
}