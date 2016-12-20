import React,{Component} from 'react';
import{
  Tabs,
  Tab,
  Section,
  DotTitle,
  Paper,
  Notify
}from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';
import dateFormat from 'dateformat';
import PersonalData from './PersonalData';
import PersonalJob from './PersonalJob';
import PersonalCompanyInfo from './PersonalCompanyInfo';
import PersonalBehavior from './PersonalBehavior';
import OrganizationChart from './OrganizationChart';
import UpdateLog from './UpdateLog';
export default class memberListDetail extends Component{
  constructor(props, context) {
		super(props, context);
		this.initpersonalData = this.initpersonalData.bind(this);
    console.log("this.props",this.props);
    this.state = {
      isLeader:true,
			params: {
				orderId: this.props.params.orderId,
				page: 1,
				pageSize: 15,
				index:''
			},
      // OrganizationChart:{
      //   page:1,
      //   pageSize:15,
      //   companyId:1
      // }
		}
  }
  componentDidMount() {
    // console.log("-------------个人详情");
		var _this = this;
		let {
			params
		} = this.props;
    // 获取会员详细信息
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			mainbillid: params.orderId,
		})).then(function(response) {
      // console.log("_this",_this);
			_this.setState({
				personalData: response.baseinfo,
        isLeader:response.isLeader,
			});

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}
  initpersonalData=()=>{
    // console.log("-------------获取个人行为");
		// var _this = this;
		// let {
		// 	params
		// } = this.props;
    // // 获取会员详细信息
		// Store.dispatch(Actions.callAPI('getMemberDetailData', {
		// 	mainbillid: params.orderId,
		// })).then(function(response) {
		// 	_this.setState({
		// 		personalData: response.baseinfo,
    //     isLeader:response.isLeader,
		// 	});
    //
		// }).catch(function(err) {
		// 	Notify.show([{
		// 		message: err.message,
		// 		type: 'danger',
		// 	}]);
		// });
    // 获取会员个人行为
    Store.dispatch(Actions.callApI('getMemberDatailBehavior',{
      mainbillid: params.orderId,
    })).then(function(response){
      // console.log("获取个人行为",response);
      _this.setState({
				personalBehavior: response.items,
			});
    }).catch(function(err){
      Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
    });
	}
  isLeader=()=>{
    let show = true;
    let {isLeader} = this.state.isLeader;
    if(this.state.isLeader){
      return (
        <Tabs>
        <Tab label="个人资料">

            <div style={{background:"fff",height:'860'}}>
              <DotTitle title='基本信息' style={{marginBottom:'40'}}/>
                <PersonalData  detail={this.state.PersonalData}/>
              <DotTitle title='工作信息' style={{marginTop:'40',marginBottom:'40'}}/>
                <PersonalJob  detail={this.state.PersonalJob}/>
              <DotTitle title='公司信息' style={{marginTop:'40',marginBottom:'40'}}/>
                  <PersonalCompanyInfo  detail={this.state.PersonalJob}/>
            </div>

        </Tab>
        <Tab label="个人行为记录">
          <div>
            <PersonalBehavior  detail={this.state.PersonalBehavior}/>
          </div>
        </Tab>
        <Tab label="组织架构">
          <div style={{marginTop:76}}>
            <OrganizationChart  detail={this.state.OrganizationChart}/>
          </div>
        </Tab>
        <Tab label="更新日志">
          <div>
            <UpdateLog  detail={this.state.UpdateLog}/>
          </div>
        </Tab>
        </Tabs>
      )
    }else{
      return(
        <Tabs >
        <Tab label="个人资料">

            <div style={{background:"fff",height:'860'}}>
              <DotTitle title='基本信息' style={{marginBottom:'40'}}/>
                <PersonalData  detail={this.state.PersonalData}/>
              <DotTitle title='工作信息' style={{marginTop:'40',marginBottom:'40'}}/>
                <PersonalJob  detail={this.state.PersonalJob}/>
              <DotTitle title='公司信息' style={{marginTop:'40',marginBottom:'40'}}/>
                  <PersonalJob  detail={this.state.PersonalJob}/>
            </div>

        </Tab>
        <Tab label="个人行为记录">
          <div>
            <PersonalBehavior  detail={this.state.PersonalBehavior}/>
          </div>
        </Tab>
        <Tab label="更新日志">
          <div>
            <UpdateLog  detail={this.state.UpdateLog}/>
          </div>
        </Tab>
        </Tabs>
      )
    }
  }
  render(){
    let {
			params,
			isInitLoading
		} = this.state;
		if (isInitLoading) {
			return <Loading/>
		}
    return(
      <div name="memberListDetail" >
          {
            this.isLeader()
          }
      </div>

    );

  }
}
