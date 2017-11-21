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
	DrawerTitle,
	Tooltip
} from 'kr-ui';
import './index.less';


class ViewMember extends React.Component {


	constructor(props, context) {
		super(props, context);
		
		
	}
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
		let {
			detail
		} = this.props;
		let baseInfo = detail;
			if(baseInfo.gender==0){
	     		baseInfo.gender  = "女";
			}else if(baseInfo.gender==1){
				 baseInfo.gender  = "男";
			}else{
				baseInfo.gender  = "保密";
			}
			if(baseInfo.maritalStatus=="MARRIED"){
				baseInfo.maritalStatus = "已婚";
			}else if(baseInfo.maritalStatus=="UNMARRIED"){
				baseInfo.maritalStatus = "未婚";
			}else{
				baseInfo.maritalStatus = "保密";
			}	
			
			
		return (
			<div className="g-create-member">
			<div className="u-create-title">
					<DrawerTitle title ='会员详情' onCancel = {this.onCancel}/>
			</div>
			<form>

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
	form: 'viewMember'
})(ViewMember);
 
