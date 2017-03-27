import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm, formValueSelector, initialize, change} from 'redux-form';

import {Actions, Store} from 'kr/Redux';

import {
    KrField,
    Grid,
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    SearchForms,
    ButtonGroup,
    CircleStyleTwo,
    KrDate
} from 'kr-ui';

import dateFormat from 'dateformat';
import './index.less';

export default class ViewAudit extends Component {

    static PropTypes = {
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            totalCountMoney: 0,
            showName: false,
            finaflowInfo: [],
            customerId: "",
            infoList: [],
            payInfoList: {},
            topInfoList: []
        }

        this.getDetailInfo();
        this.getPayInfo();
        this.getInfo();

    }

    componentDidMount() {
      var _this = this;
      setTimeout(function() {
        _this.getDetailInfo();
      }, 0)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showName: !this.state.showName
        })
    }

    //table
    getInfo = () => {
        var _this = this;
        var id = this.props.detail.id
        Store.dispatch(Actions.callAPI('get-fina-flow-logs', {
            finaVerifyId: id
        }, {})).then(function(response) {
            _this.setState({topInfoList: response})
        }).catch(function(err) {});
    }
    //付款明细
    getPayInfo = () => {
        var id = this.props.detail.id
        var _this = this;
        Store.dispatch(Actions.callAPI('get-flow-edit-info', {
            finaVerifyId: id
        }, {})).then(function(response) {
            _this.setState({payInfoList: response})

        }).catch(function(err) {});
    }
    //付款信息
    getDetailInfo = () => {
        var id = this.props.detail.id
        var _this = this;
        Store.dispatch(Actions.callAPI('get-fina-infos', {
            finaVerifyId: id
        }, {})).then(function(response) {
            _this.setState({infoList: response},function(){
              var fileList=[];
              if(this.state.infoList.uploadFileIds.length>0){
    						this.state.infoList.uploadFileIds.map((item, value) => {
    							fileList.push(item.fileName)
    							fileList.push(<br />)
    						});
    					}else{
    						fileList=['暂无上传任何附件'];
    					}
    						this.fileList=fileList;
            })

        }).catch(function(err) {});
    }

    onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    renderPayList = () => {
        let {payInfoList} = this.state;
        var type;
        if (payInfoList.cimbList && payInfoList.cimbList.length > 0) {
            return payInfoList.cimbList.map((item, index) => {
                if (item.contactType == 1) {
                    type = "承租意向书"
                } else if (item.contactType == 2) {
                    type = "入驻协议书"
                } else if (item.contactType == 3) {
                    type = "增租协议书"
                } else if (item.contactType == 4) {
                    type = "续租协议书"
                }
                return (
                    <div key={index} className="u-order-list u-clearfix">
                        <div className="u-order-name">{`${type}-${item.contactName}`}</div>
                        {item.frontmoney
                            ? (
                                <div className="u-order-font-list">
                                    <div className="u-order-deatil">定金<span className="u-font-red">{`（未回款额：${item.nFrontmoney}）`}</span>
                                    </div>
                                    <div className="u-order-count">{item.frontmoney}</div>
                                </div>
                            )
                            : ''
}
                        {item.depositId
                            ? (
                                <div className="u-order-font-list">
                                    <div className="u-order-deatil">履约保证金<span className="u-font-red">{`（未回款额：${item.nDeposit}）`}</span>
                                    </div>
                                    <div className="u-order-count">{item.deposit}</div>
                                </div>
                            )
                            : ''
}
                        {item.totalrentId
                            ? (
                                <div className="u-order-font-list">
                                    <div className="u-order-deatil">工位服务费<span className="u-font-red">{`（未回款额：${item.nTotalrent}）`}</span>
                                    </div>
                                    <div className="u-order-count">{item.totalrent}</div>
                                </div>
                            )
                            : ''
}

                    </div>

                )

            })
        }

    }
    renderNullOrder = () => {
      let {
        payInfoList
      } = this.state;
      if (payInfoList.scvList && payInfoList.scvList.length > 0) {

        return (
          <div style={{marginTop:16}}>
              <div className="u-order-title">无合同</div>
              <div className="u-order-list u-clearfix">
              { payInfoList.scvList.map((item, index) => {
                return (
                  <div className="u-order-font-list" key={index}>
                    <div className="u-order-deatil">{item.propname}</div>
                    <div className="u-order-count">{item.propamount}</div>
                  </div>
                )
              })}
              </div>
            </div>

        )



      }
    }

    render() {

        const {error, handleSubmit, pristine, reset} = this.props;
        let {infoList, payInfoList, topInfoList} = this.state;
        console.log('sadfsad',payInfoList);
        return (
            <div className="u-audit-add u-audit-edit">
                <div className="u-audit-add-title">
                    <span className="u-audit-add-icon"></span>
                    <span>回款详情</span>
                    <span className="u-audit-close" style={{
                        marginRight: 40
                    }} onTouchTap={this.onCancel}></span>
                </div>
                <div className="u-table-list">
                    <table className="u-table">
                        <tr>
                            <th>序号</th>
                            <th width={100}>审核时间</th>
                            <th width={100}>审核人</th>
                            <th width={100}>审核状态</th>
                            <th width={270}>备注</th>
                        </tr>
                        <tbody>
                            {topInfoList && topInfoList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><KrDate value={item.operateTime}/></td>
                                        <td>{item.operateUserName}</td>
                                        <td>{item.targetStatus == 'CHECKED'
                                                ? <span className="u-font-green">{item.verifyName}</span>
                                                : <span className="u-font-red">{item.verifyName}</span>}</td>
                                        <td>{item.operateRemark}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <CircleStyleTwo num="1" info="付款信息">
                    <KrField style={{
                        width: 260
                    }} name="customerId" inline={false} component="labelText" label="客户名称" value={infoList.company}/>
                    <KrField style={{
                        width: 260,
                        marginLeft: 25
                    }} name="mainBillId" component="labelText" inline={false} label="所属订单" value={infoList.mainBillName}/>
                    <KrField style={{
                        width: 260
                    }} component="labelText" inline={false} label="订单起止" value={infoList.mainBillDate}/>
                    <KrField style={{
                        width: 260,
                        marginLeft: 25
                    }} component="labelText" inline={false} label="公司主体" value={infoList.corporationName}/>
                    <KrField style={{
                        width: 260
                    }} name="payName" component="labelText" label="收款方式" inline={false} value={infoList.payName}/>
                    <KrField style={{
                        width: 260,
                        marginLeft: 25
                    }} name="accountId" component="labelText" inline={false} value={infoList.accountNum} label="我司账户"/>
                    <KrField style={{
                        width: 260
                    }} name="payAccount" type="text" component="labelText" inline={false} label="付款账户" value={infoList.payAccount}/>
                    <KrField style={{
                        width: 260,
                        marginLeft: 25
                    }} name="dealTime" component="labelText" inline={false} label="收款日期" value={dateFormat(infoList.dealTime, "yyyy-mm-dd")}/>
                    <KrField style={{
                        width: 548
                    }} name="remark" component="labelText" inline={false} defaultValue={infoList.remark} label="备注" maxSize={100}/>
                    <KrField style={{
                        width: 548
                    }} name="uploadFileIds" component="labelText" inline={false} label="上传附件" value={this.fileList}/>
                </CircleStyleTwo>
                <CircleStyleTwo num="2" info="付款明细" circle="bottom">
                    <div className="u-add-total-count">
                        <span className="u-add-total-icon"></span>
                        <span className="u-add-total-title">付款总金额：</span>
                        <span>{infoList.flowAmount}</span>
                    </div>
                    <div className="u-order-title">对应合同</div>
                    {this.renderPayList()}
                    {this.renderNullOrder()}
                </CircleStyleTwo>

            </div>

        );
    }
}
