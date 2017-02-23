import React from 'react';


export default class DrawerBody extends React.Component {

  static propTypes = {
    open:React.PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  render() {

    let {children,style} = this.props;

    return (
      <div className="drawer-body" style={style}>
          {children}
      </div>
    );
  }
}
