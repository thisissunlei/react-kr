import React from 'react';
import {
	Http,
	ReactHtmlParser
} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	KrDate,
	Tooltip
} from 'kr-ui';
import './index.less';


class MemberPersonInfo extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
            baseInfo:{},
        }
		this.getBasicData();
	}
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
    
    getBasicData=()=>{
		const {detail}=this.props;
		let url = this.props.params;
		console.log('detail----===>>>',detail)
		let _this = this;
		Http.request('members-basic-date', {id:detail.holder}).then(function(response) {
			if(response.gender==0){
                response.gender  = "女";
           }else if(response.gender==1){
                response.gender  = "男";
           }else{
                response.gender  = "保密";
           }
           if(response.maritalStatus=="MARRIED"){
                response.maritalStatus = "已婚";
           }else if(response.maritalStatus=="UNMARRIED"){
                response.maritalStatus = "未婚";
           }else{
                response.maritalStatus = "保密";
           }	
			
			_this.setState({
				baseInfo:response
			})


		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	
	render() {
		let {
			baseInfo
		} = this.state;
		
			
			
			
		return (
			<div className="g-create-member">
			<div className="u-create-title">
					<div className="title-text">会员详情</div>
					<div className="u-create-close" onClick={this.onCancel}></div>
			</div>
			<form style={{paddingLeft:73}}>

						<KrField
							style={{width:300,marginRight:20}}
							label="姓名:"
							inline={true} 
							component="labelText"
							value={baseInfo.name}
							defaultValue="无"
						 />
						 <KrField
							style={{width:300}}
							label="公司："
							inline={true} 
							component="labelText"
							value={baseInfo.companyName}
						/>
						<KrField
							style={{width:300,marginRight:20}}
							label="社区："
							inline={true} 
							component="labelText"
							value={baseInfo.communityName}
						/>
						<KrField 
							 style={{width:300}} 
							 label="联系电话:" 
							 inline={true} 
							component="labelText"
							value={baseInfo.phone}
							defaultValue="无"
						 />
						 <KrField
							style={{width:300,marginRight:20}}
							label="职位："
							inline={true} 
							component="labelText"
							value={baseInfo.job}

						/>
						<KrField  
							 style={{width:300}} 
							 label="邮箱:" 
							 inline={true} 
							component="labelText"
							value={baseInfo.email}
							defaultValue="无"
						 />
						 <KrField 
							 style={{width:300,marginRight:20}} 
							 label="性别:" 
							 inline={true} 
							component="labelText"
							value={baseInfo.gender}
							defaultValue="无"
						 />
						 <KrField
							style={{width:300}}
							label="微信昵称:"
							inline={true} 
							component="labelText"
							value={baseInfo.wechatNick}
							defaultValue="无"
						 />
						 <KrField  
							 style={{width:300,marginRight:20}} 
							 label="App昵称:" 
							 inline={true} 
							component="labelText"
							value={baseInfo.nick}
							defaultValue="无"
						 />
						 <KrField  
							 style={{width:300}} 
							 label="生日:" 
							 inline={true} 
							component="labelText"
							value={baseInfo.birthday}
							defaultValue="无"
						 />
						 <KrField
							style={{width:300,marginRight:20}}
							label="婚姻状况:"
							inline={true} 
							component="labelText"
							value={baseInfo.maritalStatus}
							defaultValue="无"
						 />
						 <KrField
							style={{width:300}}
							label="注册时间:"
							inline={true} 
							component="labelText"
							value={
								< KrDate 
									style = {{marginTop:5}} 
									value = {
										baseInfo.registerTime
									}
									   format = "yyyy-mm-dd HH:MM:ss" />
							}

						/>
						
						
						
					<Grid style={{marginTop:50,width:'81%'}}>
					<Row >
					<Col md={12} align="center">
						<ButtonGroup>
							<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
						</ButtonGroup>
					  </Col>
					</Row>
					</Grid>
					
			</form>
		</div>
		);
	}
}

export default reduxForm({
	form: 'memberPersonInfo'
})(MemberPersonInfo);
 
