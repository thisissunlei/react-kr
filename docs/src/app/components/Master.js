import React, {Component, PropTypes} from 'react';

import {AppBar,Drawer} from 'kr-ui';

export default class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  	static childContextTypes =  {
        openSidebarHanlder: React.PropTypes.func.isRequired,
    }

  	getChildContext() {
  			return {
  				openSidebarHanlder:this.openSidebarHanlder
  			};
  	}

  constructor(props){
    super(props);

    this.state = {
      openSidebar:true
    }

  }

  openSidebarHanlder=()=>{

     this.setState({
       openSidebar:!this.state.openSidebar
     })
  }

  render() {

    const { children } = this.props;

    return (
      <div>
        <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>
        { children }
        <Drawer width={180} open={this.state.openSidebar}>
            <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>
        </Drawer>
      </div>
    );
  }
}
