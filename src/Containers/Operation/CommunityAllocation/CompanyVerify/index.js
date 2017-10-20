import React from 'react';
import {
  Actions,
  Store
} from 'kr/Redux';
import {
  Tabs,
  Tab,
  Title
} from 'kr-ui';
import {
    Http,
} from "kr/Utils";



 import WaitAudit from './WaitAudit';
 import Audited from './Audited';
 import NotPass from './NotPass';

export default class CompanyVerify extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'table',
    }
  }
  merchants = () => {
    let {
      tab,
      initSearch
    } = this.state;

    tab = 'merchants';
    this.setState({
      tab,
      initSearch: 'm'
    });
  }

  personal = () => {
    let {
      tab,
      initSearch
    } = this.state;
    tab = 'personal';
    this.setState({
      tab,
      initSearch: 'p'
    });
  }
  signedClient = () => {
    let {
      tab,
      initSearch
    } = this.state;
    tab = 'signedClient';
    this.setState({
      tab,
      initSearch: 's'
    });
  }


  render() {
    let {
      tab,
      initSearch
    } = this.state;
    const activeTab = {
      color: '#2b8dcd',
      borderBottom: "1px solid #eee",
      fontSize: 16
    }
    const commenTab = {
      color: '#666',
      borderBottom: "1px solid #eee",
      fontSize: 16
    }
    let merchantsStyle = (tab == 'merchants' || tab == 'table') ? activeTab : commenTab;
    let personalStyle = (tab == 'personal') ? activeTab : commenTab;
    let signedClientStyle = (tab == 'signedClient') ? activeTab : commenTab;
    
    return (

        <div>
          <Title value="审核列表"/>
          <Tabs className="tabs">
            <Tab label="待审核" onActive={this.merchants} style={merchantsStyle}>
                <WaitAudit />
            </Tab>
            <Tab label="已审核"  onActive={this.personal} style={personalStyle}>
               <Audited />
            </Tab>
            <Tab label="未通过" onActive={this.signedClient} style={signedClientStyle}>
                <NotPass />
            </Tab>
        </Tabs>
      </div>

      );

  }

}