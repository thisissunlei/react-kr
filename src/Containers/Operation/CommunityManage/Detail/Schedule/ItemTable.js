import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'kr/Redux';
import {
  reduxForm,
  submitForm,
  change,
  reset
} from 'redux-form';
import {
  Actions,
  Store
} from 'kr/Redux';

import {
  Tabs,
  Tab,
  Dialog,
  Section,
  Grid,
  Button,
  Notify,
  BreadCrumbs,
} from 'kr-ui';

import './index.less';
import {
  findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import EmployessTable from './EmployessTable';
import D3Content from './D3Content';
import DismantlingForm from './DismantlingForm';

import dateFormat from 'dateformat';

export default class ItemTable extends Component {
  static defaultProps = {
    companyId: 1,
    communityId: 1
  }

  static PropTypes = {
    onDismantling: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.onStation = this.onStation.bind(this);
    this.onDismantlingDialog = this.onDismantlingDialog.bind(this);
    this.onDismantling = this.onDismantling.bind(this);
    this.renderOrder = this.renderOrder.bind(this);
    this.onhref = this.onhref.bind(this);

    this.state = {
      activity: false,
      Dismantling: false,
    }

  }

  componentDidMount() {

    }
    //撤场
  onDismantling() {

      const {
        onDismantling
      } = this.props;

      onDismantling && onDismantling();

    }
    //分配工位
  onStation() {
    this.setState({
      activity: !this.state.activity
    });
  }
  onDismantlingDialog() {
    this.setState({
      Dismantling: !this.state.Dismantling
    })

  }

  //查看员工跳转地址
  onhref() {

    location.href = "http://optest.krspace.cn/krspace_member_web/member/companyMembers?companyId=" + this.props.companyId + "&communityId=" + this.props.communityId;
  }

  //http://op.krspace.cn/krspace_member_web/member/companyMembers?companyId=1&communityId=11
  renderOrder(contractTypeVo) {
    contractTypeVo = contractTypeVo.map((item, index) => {
      if (!item.contractCount) {
        return (
          <li key={index} className="company-order-zero">
							<p className="name">{item.contractName}</p>
							<p>{dateFormat(item.contractTime,"yyyy.mm.dd")}</p>
						</li>
        )
      } else if (item.contractCount === 1) {
        return (
          <li key={index} className="company-order">
							<p className="name">{item.contractName}</p>
							<p>{dateFormat(item.contractTime,"yyyy.mm.dd")}</p>
						</li>
        )
      } else {
        return (
          <li key={index} className="company-order">
							<span className="count">({item.contractCount})</span>
							<p className="name">{item.contractName}</p>
							<p>{dateFormat(item.contractTime,"yyyy.mm.dd")}</p>
						</li>
        )
      }
    })
    return contractTypeVo;
  }
  render() {

    let {
      activity
    } = this.state;
    var contractInstallmentplanVo = [{
      "installmentAmount": 3000,
      "installmentBegindate": 1451620800000,
      "installmentEnddate": 1459483200000,
      "name": "唐朝",
      "phone": "13317199888",
      "stationnum": 5
    }, {
      "installmentAmount": 3000,
      "installmentBegindate": 1459483200000,
      "installmentEnddate": 1467345600000,
      "name": "唐朝",
      "phone": "13317199888",
      "stationnum": 10
    }, {
      "installmentAmount": 3000,
      "installmentBegindate": 1467345600000,
      "installmentEnddate": 1475294400000,
      "name": "唐朝",
      "phone": "13317199888",
      "stationnum": 10
    }, {
      "installmentAmount": 3000,
      "installmentBegindate": 1475294400000,
      "installmentEnddate": 1483156800000,
      "name": "唐朝",
      "phone": "13317199888",
      "stationnum": 10
    }, ];
    var finaBluePointVo = [{
      "finaName": "入驻意向书",
      "pointDate": 1477557209000
    }, {
      "finaName": "入住协议书",
      "pointDate": 1466049600000
    }, {
      "finaName": "增租协议书",
      "pointDate": 1477568858000
    }, {
      "finaName": "续租协议书",
      "pointDate": 1477572574000
    }];

    var finaRedPointVo = [{
      "pointDate": 1477568292000
    }, {
      "pointDate": 1451620800000
    }, {
      "pointDate": 1458187200000
    }, {
      "pointDate": 1466049600000
    }, {
      "pointDate": 1473998400000
    }, {
      "pointDate": 1477568862000
    }, {
      "pointDate": 1477572578000
    }, {
      "pointDate": 1477454400000
    }, {
      "pointDate": 1458187200000
    }, {
      "pointDate": 1466049600000
    }, {
      "pointDate": 1473998400000
    }];
    var contractTypeVo = [{
      "contractCount": 1,
      "contractName": "入驻意向书",
      "contractTime": 1477557209000,
      "contractType": 1,
      "id": 0
    }, {
      "contractCount": 1,
      "contractName": "入住协议书",
      "contractTime": 1477568288000,
      "contractType": 2,
      "id": 0
    }, {
      "contractCount": 1,
      "contractName": "增租协议书",
      "contractTime": 1477568858000,
      "contractType": 3,
      "id": 0
    }, {
      "contractCount": 3,
      "contractName": "续租协议书",
      "contractTime": 1477572574000,
      "contractType": 4,
      "id": 0
    }, {
      "contractCount": 0,
      "contractName": "减租协议书",
      "contractType": 5,
      "id": 0
    }, {
      "contractCount": 0,
      "contractName": "退租协议书",
      "contractType": 6,
      "id": 0
    }];


    return (

      <tr className="last-td" >
						<td className="company-list">
							<div className="company-name" data-tip> 诚意有限公司 
							<ReactTooltip place="right">
								<ul>
								{
									this.renderOrder(contractTypeVo)
								}
								</ul>
							</ReactTooltip>
							</div>
						</td>
						<td colSpan="12">
							<D3Content detail={contractInstallmentplanVo} finaBluePointVo={finaBluePointVo} finaRedPointVo={finaRedPointVo}/>
							<EmployessTable activity={activity}/>
						</td>
						<td>
							<Button className="Station" type="link" primary={true} label="分配工位" onTouchTap={this.onStation}/>
							<Button className="Dismantling" type="link" primary={true} label="撤场" 	onTouchTap={this.onDismantling}/>
							<Button className="preson" type="link" primary={true} label="员工" onTouchTap={this.onhref}/>
						</td>
					</tr>

    );
  }
}