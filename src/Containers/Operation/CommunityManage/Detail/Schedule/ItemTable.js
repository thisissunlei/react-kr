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
import _ from 'lodash';

import {
  findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import EmployessTable from './EmployessTable';
import D3Content from './D3Content';
import DismantlingForm from './DismantlingForm';

import dateFormat from 'dateformat';

export default class ItemTable extends Component {


  static PropTypes = {
    onDismantling: React.PropTypes.func,
    onStation: React.PropTypes.func,
    index: React.PropTypes.number
  }


  constructor(props, context) {
    super(props, context);

    this.onStation = this.onStation.bind(this);
    this.onDismantlingDialog = this.onDismantlingDialog.bind(this);
    // this.onDismantling = this.onDismantling.bind(this);
    this.renderOrder = this.renderOrder.bind(this);
    this.onhref = this.onhref.bind(this);


    this.state = {
      detail: this.props.detail,
      //activity: false,
      Dismantling: false,

    }

  }


  componentWillReceiveProps(nextProps) {


    if (!_.isEqual(this.props.detail, nextProps.detail)) {
      this.setState({
        detail: nextProps.detail
      });
    }


  }

  componentDidMount() {

    }
    //撤场
  onDismantling(detail) {

      const {
        onDismantling
      } = this.props;

      onDismantling && onDismantling(detail);

    }
    //分配工位
  onStation() {

    let {
      detail
    } = this.state;

    detail.activity = !detail.activity;

    this.setState({
      detail
    });

    let {
      onStation
    } = this.props;

    onStation && onStation()


  }
  onDismantlingDialog() {
    this.setState({
      Dismantling: !this.state.Dismantling
    })

  }


  //查看员工跳转地址
  onhref() {

    location.href = "/krspace_member_web/member/companyMembers?companyId=" + this.props.companyId + "&communityId=" + this.props.communityId;
  }

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
							
							<p className="name">{item.contractName}({item.contractCount})</p>
							<p>{dateFormat(item.contractTime,"yyyy.mm.dd")}</p>
						</li>
        )
      }
    })
    return contractTypeVo;
  }
  render() {


    let {
      show,
      detail
    } = this.state;

    let {
      communityids,
      activity,
      index
    } = this.props;

    let width = 660;
    var _this = this;
    var id = communityids;


    return (

      <tr className="last-td"   >
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
    { /*<D3Content detail={detail.contractInstallmentplanVo} finaBluePointVo={detail.finaBluePointVo} finaRedPointVo={detail.finaRedPointVo} width={width} id={detail.billId}/>*/ }
              <EmployessTable  activity={detail.activity} detail={detail} id={id} />
						</td>
						<td className="btnlist">
							<Button className="Station" type="link" joinEditForm label="" onTouchTap={this.onStation}   />
                <div className="tip hide  hover">
                   分配工位 < span className = "bArrow" > < /span>
                </div>
					    <Button className="Dismantling" type="link" joinEditForm label="" 	onClick={this.onDismantling.bind(this,detail)}/>
                  <div className="tip hide hover ">
                       撤场日期 <span className = "bArrow"></span>
                 </div>
  						<Button className="preson" type="link" joinEditForm label="" onTouchTap={this.onhref}/>
                <div className="tip hide  hover">
                      查看员工 <span className = "bArrow"></span>
                </div>


						</td>
					</tr>

    );
  }
}