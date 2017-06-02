import React from 'react';
import {
  Tabs,
  Tab,
} from 'kr-ui';

 import './index.less';
 import VoucherDetail from './VoucherDetail';
 import MoneyDetail from './MoneyDetail';

export default class ItemDetail extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'table',
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

	onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
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
    let signedClientStyle = (tab == 'signedClient') ? activeTab : commenTab;
      return (
        <div className="m-voucher-d">
					<div className="u-audit-add">
		          <div className="u-audit-add-title">
		           <span className="u-audit-close" style={{
		               marginRight: 40
		           }} onTouchTap={this.onCancel}></span>
		          </div>
							<Tabs className="tabs" inkBarStyle={{background:"#499df1",top:0}}>
		            <Tab label="凭证详情" onActive={this.merchants} style={merchantsStyle}>
		                <VoucherDetail
													detail={this.props.detail}
		                      tab={initSearch}
		                />
		            </Tab>

		            <Tab label="回款详情" onActive={this.signedClient} style={signedClientStyle}>
		               <MoneyDetail
										 			 detail={this.props.detail}
		                       tab={initSearch}
		                />
		            </Tab>

		        </Tabs>
					</div>


      </div>

      );
  }

}
