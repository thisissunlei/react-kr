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
      show: false,
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
    let {
      detail
    } = this.props;
    let width = 700;
    console.log('detail.....', detail)
    return (

      <tr className="last-td" >
						<td className="company-list">
							<div className="company-name" data-tip> 
              {
                detail.companyName
              }
							<ReactTooltip place="right">
								<ul>
								{
									this.renderOrder(detail.contractTypeVo)
								}
								</ul>
							</ReactTooltip>
							</div>
						</td>
						<td colSpan="12">
							<D3Content detail={detail.contractInstallmentplanVo} finaBluePointVo={detail.finaBluePointVo} finaRedPointVo={detail.finaRedPointVo} width={width}/>
							<EmployessTable activity={activity}/>
						</td>
						<td className="btnlist">
							<Button className="Station" type="link" primary={true} label="" onTouchTap={this.onStation} />
                <div className="tip hide  hover">
                   分配工位 < span className = "bArrow" > < /span>
                </div>
					    <Button className="Dismantling" type="link" primary={true} label="" 	onTouchTap={this.onDismantling}/>
                  <div className="tip hide hover ">
                       撤场日期 <span className = "bArrow"></span>
                 </div>
  						<Button className="preson" type="link" primary={true} label="" onTouchTap={this.onhref}/>
                <div className="tip hide  hover">
                      查看员工 <span className = "bArrow"></span>
                </div>
                

						</td>
					</tr>

    );
  }
}