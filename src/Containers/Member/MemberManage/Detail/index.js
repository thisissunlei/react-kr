import React,{Component} from 'react';
import{
  Tabs,
  Tab,
  Section,
  DotTitle
}from 'kr-ui';
import PersonalData from './PersonalData';
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
			_this.setState({
				personalData: response.baseinfo,

			});
		}).catch(function(err) {
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
      <div name="memberListDetail">
        <Tabs >
          <Tab label="个人资料">

          </Tab>
          <Tab label="个人行为记录">

          </Tab>

          <Tab label="更新日志">

          </Tab>
        </Tabs>
        <div style={{background:"fff"}}>
          <DotTitle title='基本信息' style={{marginTop:'6',marginBottom:'40'}}/>
            <PersonalData  detail={this.state.PersonalData}  />
          <DotTitle title='工作信息' style={{marginTop:'6',marginBottom:'40'}}/>
        </div>
      </div>

    );

  }
}
