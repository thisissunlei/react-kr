import React from 'react';
import {Http} from 'kr/Utils';
import {
	reduxForm,
	change,
	initialize
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
	Button,
	Message
} from 'kr-ui';
import './index.less';


class EditGroup extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[
				{label:'全国群组',value:'COUNTRYWIDE'},
				{label:'社区群组',value:'COMMUNITY'}
			],
			cityList:[],
			requestURI :'http://optest01.krspace.cn/api/krspace-finance-web/activity/upload-pic',
			cityId:'',
		}
		this.getcity();
		this.getInfo();
	}
	
	selectCity=(item)=>{
    	this.setState({
    		cityId:item.cityId
    	})
	}


	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
			Http.request('cluster-detail',{clusterId:detail.id}).then(function(response) {
				_this.setState({
					photoUrl:response.headUrl
				})
				Store.dispatch(initialize('editGroup', response));
			}).catch(function(err) {
				Message.error(err.messgae);
			});
	}

	getcity=()=>{
		var _this=this;
			Http.request('getcity-list').then(function(response) {
			var cityList=response.items.map((item)=>{
					item.label=item.city;
					item.value=item.cityId;
					return item;
				})
				_this.setState({
					cityList: cityList
				})

			}).catch(function(err) {
				Message.error(err.messgae);
			});
	}
	onSubmit=(form)=>{
		const {detail}=this.props;
		form=Object.assign({},form);
		form.clusterId=detail.id;
		let {onSubmit} = this.props;
		var _this=this;
			Http.request('cluster-update',{},form).then(function(response) {
				Message.success('编辑成功');
				onSubmit && onSubmit();
			}).catch(function(err) {
				Message.error(err.messgae);
			});
		
		
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
		let {
				groupList,
				cityList,
				requestURI,
				photoUrl,
				cityId
			}=this.state;
			
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div><span className="u-create-icon"></span><label className="title-text">新建群组</label></div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
						<CircleStyleTwo num="1" info="头像信息">
							<KrField 
								name="headUrl"
								style={{width:260}}
								component="newuploadImage"
								innerstyle={{width:120,height:120,padding:10}}
								photoSize={'1:1'}
								sizePhoto
								pictureFormat={'JPG,PNG'}
								pictureMemory={'500'}
								requestURI = {requestURI}
								requireLabel={true}
								label="群组头像"
								inline={false}
								defaultValue={photoUrl}
								/>
						</CircleStyleTwo>
						<CircleStyleTwo num="2" info="群组信息" circle="bottom">
							<KrField
								style={{width:260}}
								name="clusterName"
								type="text"
								component="input"
								label="群组名称"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginLeft:25}}
								name="clusterType"
								component="select"
								options={groupList}
								label="群组类型"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260}}
								type="text"
								name="city"
								component="select"
								options={cityList}
								label="所属城市"
								requireLabel={true}
								onChange={this.selectCity}

						 	/>
						 	<KrField
								style={{width:260,marginLeft:25}}
								name="cmtId"
								cityId={cityId}
								component="searchCityCommunity"
								label="所属社区"
								requireLabel={true}
						 	/>
						 	<KrField 
						 		style={{width:260,marginBottom:10}}
						 		name="follow" 
						 		component="group" 
						 		label="允许退出群组"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="follow" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value={1}
				                    />
				                    <KrField 
				                    		name="follow" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value={0}
				                    />
							</KrField>
							<KrField 
						 		style={{width:260,marginLeft:25,marginBottom:10}}
						 		name="allow" 
						 		component="group" 
						 		label="允许发帖"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="allow" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value={1}
				                    />
				                    <KrField 
				                    		name="allow" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value={0}
				                    />
							</KrField>
							<KrField 
						 		style={{width:260,marginBottom:10}}
						 		name="recommend" 
						 		component="group" 
						 		label="是否推荐"
						 		requireLabel={true} 
							 >
				                    <KrField 
				                    		name="recommend" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value={1}
				                    />
				                    <KrField 
				                    		name="recommend" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value={0}
				                    />
							</KrField>
							<KrField
								style={{width:260,marginLeft:25}}
								name="sort"
								type="text"
								component="input"
								label="排序号"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:548}}
								name="intro"
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


		if (!values.headUrl) {
			errors.headUrl = '请上传头像';
		}

		if (!values.clusterName) {
			errors.clusterName = '请输入群组名称';
		}

		if (!values.clusterType) {
			errors.clusterType = '请选择群组类型';
		}
		if (!values.city) {
			errors.city = '请选择所属城市';
		}
		
		if (!values.cmtId) {
			errors.cmtId = '请选择所属社区';
		}
		
		if (!values.sort) {
			errors.sort = '请输入排序号';
		}
		if (!values.intro) {
			errors.intro = '请输入群组描述';
		}

		return errors
}

export default reduxForm({
		form: 'editGroup',
		 validate,
		// enableReinitialize: true,
		// keepDirtyOnReinitialize: true,
	})(EditGroup);
