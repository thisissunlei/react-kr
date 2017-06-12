import React from 'react';
import {Http} from 'kr/Utils';
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
	CircleStyleTwo,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button
} from 'kr-ui';
import './index.less';


class EditGroup extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			
		}

	}
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	render() {
		const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div><span className="u-create-icon"></span><label className="title-text">新建群组</label></div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
						<CircleStyleTwo num="1" info="头像信息">
							<KrField 
								name="photoUrl"
								component="newuploadImage"
								innerstyle={{width:392,height:161,padding:10}}
								photoSize={'570*212'}
								pictureFormat={'JPG,PNG,GIF'}
								pictureMemory={'500'}
								requestURI = ''
								requireLabel={true}
								label="群组头像"
								inline={false}
								/>
						</CircleStyleTwo>
						<CircleStyleTwo num="2" info="群组信息" circle="bottom">
							<KrField
								style={{width:260}}
								name="title"
								type="text"
								component="input"
								label="群组名称"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginLeft:25}}
								name="title"
								type="text"
								component="input"
								label="群组类型"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260}}
								name="title"
								type="text"
								component="input"
								label="所属城市"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginLeft:25}}
								name="title"
								type="text"
								component="input"
								label="所属社区"
								requireLabel={true}
						 	/>
						 	<KrField 
						 		style={{width:260,marginBottom:10}}
						 		name="publishedStatus" 
						 		component="group" 
						 		label="允许退出群组"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value="PUBLISHED"
				                    />
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value="UNPUBLISHED"
				                    />
							</KrField>
							<KrField 
						 		style={{width:260,marginLeft:25,marginBottom:10}}
						 		name="publishedStatus" 
						 		component="group" 
						 		label="允许发帖"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value="PUBLISHED"
				                    />
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value="UNPUBLISHED"
				                    />
							</KrField>
							<KrField 
						 		style={{width:260,marginBottom:10}}
						 		name="publishedStatus" 
						 		component="group" 
						 		label="是否推荐"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value="PUBLISHED"
				                    />
				                    <KrField 
				                    		name="publishedStatus" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value="UNPUBLISHED"
				                    />
							</KrField>
							<KrField
								style={{width:260,marginLeft:25}}
								name="title"
								type="text"
								component="input"
								label="排序号"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:548}}
								name="newsDesc"
								component="textarea"
								label="群组描述"
								maxSize={500}
								requireLabel={true}
						/>
						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"  />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
						</CircleStyleTwo>
				</form>
			</div>
		);
	}
}
const validate = values => {

		const errors = {};


		if (!values.customerId) {
			errors.customerId = '请选择客户名称';
		}

		if (!values.mainBillId) {
			errors.mainBillId = '请选择所属订单';
		}

		if (!values.payWay) {
			errors.payWay = '请选择收款方式';
		}
		if (!values.accountId) {
			errors.accountId = '请选择我司账户';
		}
		console.log('values.payAccount',values.payAccount)
		if (!values.payAccount) {
			errors.payAccount = '请输入付款账户';
		}
		if (!values.dealTime) {
			errors.dealTime = '请选择收款日期';
		}


		return errors
}

export default reduxForm({
		form: 'editGroup',
		 validate,
		// enableReinitialize: true,
		// keepDirtyOnReinitialize: true,
	})(EditGroup);
