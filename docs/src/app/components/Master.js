import React, {Component, PropTypes} from 'react';

import {AppBar,Drawer,List,ListItem} from 'kr-ui';

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

    let containerStyles = {
      marginLeft:0,
      paddingLeft:20,
      paddingTop:20,
      paddingRight:20,
      paddingBottom:20
    };

    if(this.state.openSidebar){
      containerStyles.marginLeft = 180;
    }

    return (
      <div>
        <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>

        <div style={containerStyles}>
              { children }
        </div>
        <Drawer width={180} open={this.state.openSidebar}>
            <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>
            <List>
              <ListItem href="/#/components/checkbox">Checkbox</ListItem>
              <ListItem href="/#/components/divider">Divider</ListItem>
            </List>
        </Drawer>
      </div>
    );
  }
}
