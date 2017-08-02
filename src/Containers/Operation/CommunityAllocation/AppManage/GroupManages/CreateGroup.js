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
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message
} from 'kr-ui';
import './index.less';


class CreateGroup extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[
				{label:'全国群组',value:'COUNTRYWIDE'},
				{label:'社区群组',value:'COMMUNITY'}
			],
			cityList:[],
			requestURI :'/api/krspace-finance-web/activity/upload-pic',
			cityId:'',
			ifCity:false,
			showUrl:false,
			groupStatus:[
				{label:'非强制',value:'0'},
				{label:'强制可离开',value:'2'},
				{label:'强制不可离开',value:'1'}
			]
		}
		this.getcity();
	}
	
	componentDidMount() {
        Store.dispatch(change('createGroup', 'follow', '0'));
        Store.dispatch(change('createGroup', 'allow', '0'));
        Store.dispatch(change('createGroup', 'recommend', '0'));
    }
    selectCity=(item)=>{
    	this.setState({
    		cityId:item.cityId
    	})
	}
	selectType=(item)=>{
		if(item.value=="COMMUNITY"){
			this.setState({
				ifCity:true
			})
		}else{
			this.setState({
				ifCity:false
			})
		}
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

			}).catch(function(err) {});
	}
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
			Http.request('cluster-insert',{},form).then(function(response) {
				Message.success('新建成功')
				onSubmit && onSubmit(form);
			}).catch(function(err) {
				Message.error(err.message);
			});
		
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	showUrl=(item)=>{
		if(item.value=='1'){
			this.setState({
				showUrl:true
			})
		}else{
			this.setState({
				showUrl:false
			})
		}
		
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
				cityId,
				ifCity,
				showUrl,
				groupStatus
			}=this.state;
			
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div className="title-text">新建群组</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
							<KrField 
								name="headUrl"
								style={{width:548}}
								component="newuploadImage"
								innerstyle={{width:120,height:120,padding:10}}
								photoSize={'1:1'}
								sizePhoto
								merthd='Url'
								pictureFormat={'JPG,PNG'}
								pictureMemory={'100'}
								requestURI = {this.state.requestURI}
								requireLabel={true}
								label="群组头像"
								inline={false}
								/>
								
							<KrField
								style={{width:260,margintop:20}}
								name="clusterName"
								type="text"
								component="input"
								label="群组名称"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginLeft:25,margintop:20}}
								name="clusterType"
								component="select"
								options={groupList}
								label="群组类型"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
							{ifCity?(
									<KrField
										style={{width:260}}
										type="text"
										name="city"
										component="select"
										options={cityList}
										label="所属城市"
										requireLabel={true}
										onChange={this.selectCity}
								 	/>):''
							}
							{ifCity?(
								<KrField
										style={{width:260,marginLeft:25}}
										name="cmtId"
										inline={false}
										cityId={cityId}
										component="searchCityCommunity"
										label="所属社区"
										requireLabel={true}

								 	/>):''
							}
						 	<KrField
								style={{width:260,margintop:20}}
								name="follow"
								component="select"
								options={groupStatus}
								label="群组状态"
								requireLabel={true}
								
						 	/>
							<KrField
								style={{width:260,marginLeft:25}}
								name="sort"
								type="text"
								component="input"
								label="排序号"
								requireLabel={true}
						 	/>
						 	
							<KrField 
						 		style={{width:548,marginBottom:10}}
						 		name="allow" 
						 		component="group" 
						 		label="允许发帖"
						 		requireLabel={true} 
						 		inline={true}
							 >
				                    <KrField 
				                    		style={{marginLeft:52}}
				                    		name="allow" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value="1"
				                    />
				                    <KrField 
				                    		name="allow" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value="0"
				                    />
							</KrField>
							<KrField 
						 		style={{width:548,marginBottom:10}}
						 		name="recommend" 
						 		component="group" 
						 		label="是否推荐"
						 		requireLabel={true} 
						 		inline={true}
							 >
				                    <KrField 
				                    		style={{marginLeft:52}}
				                    		name="recommend" 
				                    		grid={1 / 2} 
				                    		label="是" 
				                    		type="radio" 
				                    		value="1"
				                    		onClick={this.showUrl}

				                    />
				                    <KrField 
				                    		name="recommend" 
				                    		grid={1 / 2} 
				                    		label="否" 
				                    		type="radio" 
				                    		value="0"
				                    		onClick={this.showUrl}
				                    />
				           
							</KrField>
							{showUrl&&(<KrField 
									name="listUrl"
									style={{width:548}}
									component="newuploadImage"
									innerstyle={{width:320,height:200,padding:10}}
									photoSize={'16:9'}
									sizePhoto
									merthd="Url"
									pictureFormat={'JPG,PNG'}
									pictureMemory={'200'}
									requestURI = {this.state.requestURI}
									requireLabel={true}
									title='上传推荐图片'
									label="列表图片"
									inline={false}
								/>)}
							
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
		form: 'createGroup',
		 validate,
		// enableReinitialize: true,
		// keepDirtyOnReinitialize: true,
	})(CreateGroup);