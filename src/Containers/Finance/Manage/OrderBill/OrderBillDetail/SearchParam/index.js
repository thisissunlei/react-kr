import React from 'react';
import {Actions, Store} from 'kr/Redux';
import './index.less';
import {
    LineText,
    ListGroup,
    Message,
    ListGroupItem
} from 'kr-ui';
import {
    Http
} from "kr/Utils";
export default class SearchParam extends React.Component {

    static defaultProps = {}

    static PropTypes = {
        detailPayment: React.PropTypes.object,
        detailIncome: React.PropTypes.object,
        detailBalance: React.PropTypes.object,
        params: React.PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.onHandleOver = this.onHandleOver.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.state = {
            primaryR: 'true',
            primaryI: 'false',
            active: 10000,
            activeI: this.props.params.accountType == 'PAYMENT'
                ? 10000
                : this.props.params.index,
            myReceive: 10000,
            myIncome: 10000,
            testd: false,
            testArr: [],
            detailPaymentS: [],
            activeSub: false,
            testA: [],
            detailIncomeS: []
        }

    }

    componentDidMount() {
        var n = this.props.detailPayment;
        n.map((item, index) => {
            item.sss = false;
            return item;
        })
        var m = this.props.detailIncome;
        m.map((item, index) => {
            item.sssI = false;
            return item;
        })
        this.setState({detailPaymentS: n, detailIncomeS: m})
    }

    onSearch(type, childType, id, propInfo, index, sss) {
        const {onSearch, params} = this.props;
        var w = this.state.detailIncomeS;
        w.map((item, indexs) => {
            item.sssI = false;
            return item
        })
        if (type == 'PAYMENT' && childType == 'basic') {
            this.setState({primaryR: 'true', primaryI: 'false', activeI: 10000, active: 10000});
        }
        if (type == 'PAYMENT' && childType != 'basic') {
            this.setState({primaryR: 'false', primaryI: 'false', active: index, activeI: 10000});
        }

        if (type == 'INCOME' && childType == 'basic') {
            this.setState({primaryR: 'false', primaryI: 'true', activeI: 10000, active: 10000});
        }
        if (type == 'INCOME' && childType != 'basic') {
            this.setState({primaryR: 'false', primaryI: 'false', activeI: index, active: 10000});
        }
        var searchParam = {};
        var _this = this;
        //this.setState({testArr: [], detailPaymentS: []});
        searchParam.accountType = type;
        searchParam.childType = childType;
        searchParam.propertyId = id;
        searchParam.propInfo = propInfo;
        searchParam.orderId = params.orderId;
        searchParam.index = index;
        searchParam.pageSize = 30;
        //searchParam.childType = params.childType;
        onSearch && onSearch(searchParam);
        var m = this.state.detailPaymentS;
        m.map((item, indexs) => {
            item.sss = false;
            return item
        })
        if (childType != 'basic' ) {
          if (index+1>0) {
              if (m[index].sss == true) {
                  m[index].sss = false;
              } else if (m[index].sss == false) {
                  m[index].sss = true;
              }
          }
        }
        this.setState({detailPaymentS: m})
        if (id) {
            Http.request('getSubCategoryFlow', {
                mainbillid: params.orderId,
                firstCategoryId: id,
                flowType: type
            }).then(function(response) {
                if (response.subCategories.length > 0) {
                    _this.setState({
                        testArr: response.subCategories
                    }, function() {
                        var m = this.state.testArr;
                        m.map((item, indexs) => {
                            item.activeSub = false;
                            return item
                        })
                        _this.setState({testA: m});
                    });

                } else {
                    _this.setState({testArr: []});
                }

            }).catch(function(err) {
                Message.error(err.message);
            });
        }

    }
    onSearchI(type, childType, id, propInfo, index, sssI) {
        const {onSearch, params} = this.props;
        var w = this.state.detailPaymentS;
        w.map((item, indexs) => {
            item.sss = false;
            return item
        })

        if (type == 'PAYMENT' && childType == 'basic') {
            this.setState({primaryR: 'true', primaryI: 'false', activeI: 10000, active: 10000});
        }
        if (type == 'PAYMENT' && childType != 'basic') {
            this.setState({primaryR: 'false', primaryI: 'false', active: index, activeI: 10000});
        }

        if (type == 'INCOME' && childType == 'basic') {
            this.setState({primaryR: 'false', primaryI: 'true', activeI: 10000, active: 10000});
        }
        if (type == 'INCOME' && childType != 'basic') {
            this.setState({primaryR: 'false', primaryI: 'false', activeI: index, active: 10000});
        }

        var searchParam = {};
        var _this = this;
        //this.setState({testArr: [], detailPaymentS: []});
        searchParam.accountType = type;
        searchParam.childType = childType;
        searchParam.propertyId = id;
        searchParam.propInfo = propInfo;
        searchParam.orderId = params.orderId;
        searchParam.index = index;
        searchParam.pageSize = 30;
        onSearch && onSearch(searchParam);
        var m = this.state.detailIncomeS;
        m.map((item, indexs) => {
            item.sssI = false;
            return item
        })
        if(childType != 'basic'){
          if (index+1>0) {
              if (m[index].sssI == true) {
                  m[index].sssI = false;
              } else if (m[index].sssI == false) {
                  m[index].sssI = true;
              }
          }
        }


        this.setState({detailIncomeS: m});
        if (id) {
            Http.request('getSubCategoryFlow', {
                mainbillid: params.orderId,
                firstCategoryId: id,
                flowType: type
            }).then(function(response) {
                if (response.subCategories.length > 0) {
                    _this.setState({
                        testArr: response.subCategories
                    }, function() {
                        var m = this.state.testArr;
                        m.map((item, indexs) => {
                            item.activeSubI = false;
                            return item
                        })
                        _this.setState({testA: m});
                    });

                } else {
                    _this.setState({testArr: []});
                }

            }).catch(function(err) {
                Message.error(err.message);
            });
        }

    }
    renderSubListI = (type, childType) => {

        return (this.state.testArr.map((item, index) => {
            return (
                <ListGroupItem key={index}>
                    <div className={`hover_sub ${item.activeSubI
                        ? 'activeSub'
                        : ''}`} onTouchTap={this.onSearchSubI.bind(this, type, item.id, item.activeSubI, index, childType)}>
                        <span className='receivedText'>{item.propname}</span>
                        <span className='receivedMoney'>{item.propamount}</span>
                    </div>
                </ListGroupItem>
            )
        }))
    }
    renderSubList = (type, childType) => {

        return (this.state.testArr.map((item, index) => {
            return (
                <ListGroupItem key={index}>
                    <div className={`hover_sub ${item.activeSub
                        ? 'activeSub'
                        : ''}`} onTouchTap={this.onSearchSub.bind(this, type, item.id, item.activeSub, index, childType)}>
                        <span className='receivedText'>{item.propname}</span>
                        <span className='receivedMoney'>{item.propamount}</span>
                    </div>
                </ListGroupItem>
            )
        }))
    }
    onSearchSub = (type, subId, activeSub, index, childType) => {
        var m = this.state.testA;
        m.map((item, indexs) => {
            item.activeSub = false;
            return item
        })

        if (m[index].activeSub == true) {
            m[index].activeSub = false;
        } else if (m[index].activeSub == false) {
            m[index].activeSub = true;
        }
        const {onSearch, params} = this.props;
        var searchParam = {};
        var _this = this;
        //this.setState({testArr: [], detailPaymentS: []});
        searchParam.accountType = type;
        if (childType == '007' || '010' || '005' || 'fujiyajin' || 'fujidinjin') {
            searchParam.childType = childType;
        } else {
            searchParam.childType = 'basic';
        }
        //searchParam.childType = childType;
        searchParam.propertyId = subId;
        searchParam.orderId = params.orderId;
        searchParam.page = 1;
        searchParam.pageSize = 30;
        onSearch && onSearch(searchParam);
    }
    onSearchSubI = (type, subId, activeSubI, index, childType) => {
        var m = this.state.testA;
        m.map((item, indexs) => {
            item.activeSubI = false;
            return item
        })

        if (m[index].activeSubI == true) {
            m[index].activeSubI = false;
        } else if (m[index].activeSubI == false) {
            m[index].activeSubI = true;
        }
        const {onSearch, params} = this.props;
        var searchParam = {};
        var _this = this;
        //this.setState({testArr: [], detailPaymentS: []});
        searchParam.accountType = type;
        searchParam.childType = childType;
        //searchParam.childType = childType;
        searchParam.propertyId = subId;
        searchParam.orderId = params.orderId;
        searchParam.page = 1;
        searchParam.pageSize = 30;
        onSearch && onSearch(searchParam);
    }
    onHandleOver(type, index) {
        var _this = this;
        if (type == 'PAYMENT') {
            this.setState({myReceive: index, myIncome: 10000});
        }

        if (type == 'INCOME') {
            this.setState({myIncome: index, myReceive: 10000});
        }
    }
    onLeave(type, index) {
        if (type == 'PAYMENT') {
            this.setState({myReceive: 10000, myIncome: 10000});
        }

        if (type == 'INCOME') {
            this.setState({myReceive: 10000, myIncome: 10000});
        }
    }
    render() {
        const {detailIncome, detailBalance} = this.props;
        let {detailPaymentS} = this.state;


        return (

            <div>

                <LineText title='回款' primary={this.state.primaryR} onClick={this.onSearch.bind(this, 'PAYMENT', 'basic', '', 'SETTLED', '', '')}/>

                <div className='ui-ListGroup'>
                    <ListGroup inline={false}>
                        {detailPaymentS.map((item, index) => {
                            var className;
                            var classPic;

                            if (this.state.active == index) {
                                className = 'active';
                                classPic = 'activePic'
                            } else if (this.state.myReceive == index) {
                                className = 'active_hover';
                                classPic = 'pic_color'
                            } else {
                                className = 'ui-listGroupItem';
                                classPic = 'pic_color'
                            }
                            return (
                                <ListGroupItem key={index}>
                                    <div className={className} onTouchTap={this.onSearch.bind(this, 'PAYMENT', item.propcode, item.id, item.propInfo, index, item.sss,)} onMouseOver={this.onHandleOver.bind(this, 'PAYMENT', index)} onMouseOut={this.onLeave.bind(this, 'PAYMENT', index)}>
                                        <span className={classPic}></span>
                                        <span className={item.propname == '代收（水电、打印等）'
                                            ? 'receivedTextWater'
                                            : 'receivedText'}>{item.propname}</span>
                                        <span className={item.propname == '代收（水电、打印等）'
                                            ? 'receivedTextWaterMoney'
                                            : 'receivedMoney'}>{item.propamount}</span>
                                    </div>
                                    {item.sss
                                        ? this.renderSubList('PAYMENT', item.propcode)
                                        : ''}
                                </ListGroupItem>
                            )
                        })
}
                    </ListGroup>
                </div>

                <LineText title='收入' primary={this.state.primaryI} onClick={this.onSearchI.bind(this, 'INCOME', 'basic', '', 'SETTLED', '', '')}/>

                <div className='ui-ListGroup'>
                    <ListGroup inline={false}>
                        {detailIncome.map((item, index) => {
                            var className;
                            var classPic;

                            if (this.state.activeI == index) {
                                className = 'active';
                                classPic = 'activePic'
                            } else if (this.state.myIncome == index) {
                                className = 'active_hover';
                                classPic = 'pic_color'
                            } else {
                                className = 'ui-listGroupItem';
                                classPic = 'pic_color'
                            }
                            return (
                                <ListGroupItem key={index}>
                                    <div className={className} onTouchTap={this.onSearchI.bind(this, 'INCOME', item.propcode, item.id, item.propInfo, index, item.sssI,)} onMouseOver={this.onHandleOver.bind(this, 'INCOME', index)} onMouseOut={this.onLeave.bind(this, 'INCOME', index)}>
                                        <span className={classPic}></span>
                                        <span className={item.propname == '代收（水电、打印等）'
                                            ? 'receivedTextWater'
                                            : 'receivedText'}>{item.propname}</span>
                                        <span className={item.propname == '代收（水电、打印等）'
                                            ? 'receivedTextWaterMoney'
                                            : 'receivedMoney'}>{item.propamount}</span>
                                    </div>
                                    {item.sssI
                                        ? this.renderSubListI('INCOME', item.propcode)
                                        : ''}
                                </ListGroupItem>
                            )
                        })
}
                    </ListGroup>
                </div>

                <LineText title='余额' primary='false' style={{
                    color: '#999',
                    cursor: 'default'
                }} styleLine={{
                    background: '#999'
                }}/>

                <div className='ui-ListGroup'>
                    <ListGroup inline={false}>
                        <ListGroupItem>
                            <div className='ui-listGroupItem'>
                                <span className='receivedText' style={{
                                    cursor: 'default'
                                }}>余额</span>
                                <span className='receivedMoney' style={{
                                    cursor: 'default'
                                }}>{detailBalance}</span>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </div>

            </div>

        );

    }
}
