import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  Actions,
  Store
} from 'kr/Redux';


import {
  Form,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Button,
  Section,
  Grid,
  Row,
  Col,
  Dialog,
  Tabs,
  Tab,
  KrField,
  Title
} from 'kr-ui';

// import ToDoAudit from './ToDoAudit';
// import DoAudit from './DoAudit';
// import DoneAudit from './DoneAudit';

export default class AuditList extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'table',
      countList: " "
    }
  }

  componentDidMount() {}

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
      initSearch,
      countList
    } = this.state;
    const activeTab = {
      color: '#2b8dcd',
      borderBottom: "1px solid #eee",
      fontSize: '16px'
    }
    const commenTab = {
      color: '#666',
      borderBottom: "1px solid #eee",
      fontSize: '16px'
    }


    let merchantsStyle = (tab == 'merchants' || tab == 'table') ? activeTab : commenTab;
    let personalStyle = (tab == 'personal') ? activeTab : commenTab;
    let signedClientStyle = (tab == 'signedClient') ? activeTab : commenTab;

  //   if (countList != " ") {
  //     return (
	//
  //       <div>
  //         <Title value="审核列表"/>
  //         <Tabs className="tabs">
  //           <Tab label="待处理凭证" onActive={this.merchants} style={merchantsStyle}>
  //               <ToDoAudit
  //                     tab={initSearch}
  //               />
  //           </Tab>
  //           <Tab label="已处理凭证" onActive={this.personal} style={personalStyle}>
  //              <DoAudit
  //                      tab={initSearch}
  //               />
  //           </Tab>
	//
  //           <Tab label="已删除凭证" onActive={this.signedClient} style={signedClientStyle}>
  //               <DoneAudit
  //                      tab={initSearch}
  //               />
  //           </Tab>
  //       </Tabs>
  //     </div>
	//
  //     );
  //   } else {
  //     return (
  //       <div></div>
  //     )
  //   }

	return(
		<div></div>
	)
  }

}
