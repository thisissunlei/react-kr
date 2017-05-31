import React from 'react';


export default class DrawerBody extends React.Component {

  static propTypes = {
    open:React.PropTypes.bool
  }

  constructor(props) {
    super(props);
  }


  render() {

    let {children,style,openDirection} = this.props;
    var className;
    if(openDirection=='left'){
      className='ui-drawer-left';
    }else{
      className='ui-drawer-in';
    }
    return (
      <div className={`drawer-body ${className}`} style={style} ref="drawerBody">
          {children}
      </div>
    );
  }
}
