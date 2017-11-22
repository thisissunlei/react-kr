import React from 'react';


import DrawerBody from './DrawerBody';
import DrawerModal  from './DrawerModal';
import {
  Grid,
  Row,
  Col
} from '../Grid';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import './index.less';

export default class DrawerSimpleExample extends React.Component {


  static defaultProps = {
    width:200,
    openSecondary:true,
    modal:true,
    drawerStyle:{}
  }
  static propTypes = {
    open:React.PropTypes.bool,
    width:React.PropTypes.number,
    drawerStyle:React.PropTypes.object,
    contentStyle:React.PropTypes.object,
    onClose:React.PropTypes.func,
    openSecondary:React.PropTypes.bool,
    modal:React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }


  onClose =()=>{
    const {onClose} = this.props;
    onClose && onClose();
  }

  render() {

    let {children,open,contentStyle,width,openSecondary,modal,drawerStyle,openDirection} = this.props;
   
    contentStyle = Object.assign({},contentStyle,{width:width});


    if(!open){
      return null;
    }

    if(openSecondary){
        contentStyle.right = 0;
        contentStyle.left = 'auto';
    }else{
        contentStyle.left = 0;
        contentStyle.right = 'auto';
    }


    return (
      <div className="ui-drawer" style={drawerStyle}>
        {modal && <DrawerModal onClose={this.onClose}/> }
        <DrawerBody openDirection={openDirection} style={contentStyle}> {children} </DrawerBody>
      </div>
    );
  }
}



