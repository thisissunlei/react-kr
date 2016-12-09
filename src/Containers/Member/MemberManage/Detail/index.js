import React,{Component} from 'react';
import{
  Tabs,
  Tab,
  Section,
  DotTitle
}from 'kr-ui';
import PersonalData from './PersonalData';
import PersonalJob from './PersonalJob';
import PersonalBehavior from './PersonalBehavior';
export default class memberListDetail extends Component{
  constructor(props, context) {
		super(props, context);
    this.state = {
			params: {
				accountType: 'PAYMENT',
				childType: 'basic',
				propertyId: '',
				propInfo: 'SETTLED',
				orderId: this.props.params.orderId,
				page: 1,
				pageSize: 20,
				index:''
			},
		}
  }
  initpersonalData() {
		var _this = this;
		let {
			params
		} = this.props;
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			mainbillid: params.orderId,
		})).then(function(response) {
      console.log(11111);
			_this.setState({
				personalData: response.baseinfo,
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
    Store.dispatch(Action.callApI('getMemberDatailBehavior',{
      mainbillid: params.orderId,
    })).then(function(response){
      console.log(response);
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
        <Tabs >
          <Tab label="个人资料">
            <div style={{background:"fff",height:'680'}}>
              <DotTitle title='基本信息' style={{marginBottom:'40'}}/>
                <PersonalData  detail={this.state.PersonalData}/>
              <DotTitle title='工作信息' style={{marginTop:'40',marginBottom:'40'}}/>
                <PersonalJob  detail={this.state.PersonalJob}/>
            </div>
          </Tab>
          <Tab label="个人行为记录">
            <div>
              <PersonalBehavior  detail={this.state.PersonalBehavior}/>
            </div>
          </Tab>

          <Tab label="更新日志">
            <div>更新日志</div>

          </Tab>
        </Tabs>

      </div>

    );

  }
}
