import React from 'react';
import Drawer from 'material-ui/Drawer';

export default class DrawerSimpleExample extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  render() {

    let {
      children,
      open
    } = this.props;
    let content = "";
    if (!open) {
      return null;
    }
    return (
      <Drawer {...this.props}>
          {children}
        </Drawer>
    );
  }
}