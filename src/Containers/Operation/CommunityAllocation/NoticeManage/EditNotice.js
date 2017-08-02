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


class CreateNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[],
			ifCity:false,
			requestURI :'/api/krspace-finance-web/activity/upload-pic',
			groupType:[],
		}
		this.getType();
	}
	
	componentDidMount() {
        
    }

   	getType=()=>{
   		var _this=this;
		Http.request('get-findRight').then(function(response) {
			if(response.hasRight==1){
				_this.setState({
					groupType:[
						{label:'全国群组',value:'COUNTRYWIDE'},
						{label:'社区群组',value:'COMMUNITY'}
					]
				})
			}else if(response.hasRight==0){
				_this.setState({
					groupType:[
						{label:'社区群组',value:'COMMUNITY'}
					]
				})
			}
			
		}).catch(function(err) {
			Message.error(err.message);
		});	

   	}
	selectType=(item)=>{
		Store.dispatch(change('createNotice', 'clusterId', ''));
		Store.dispatch(change('createNotice', 'cmtName', ''));
		if(item.value=="COMMUNITY"){
			this.setState({
				ifCity:true
			})
		}else{
			this.setState({
				ifCity:false
			})
			this.getGrouo();
		}
	}
	getGrouo=()=>{
		var _this=this;
		Http.request('country-cluster-list').then(function(response) {
			response.clusterList.map((item)=>{
				item.label=item.clusterName;
				item.value=item.id;
				return item;
			})
			_this.setState({
				groupList:response.clusterList
			})
			
			
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}

	selectGroup=(item)=>{
		var _this=this;
		Http.request('topic-cluster-list',{cmtId:item.id}).then(function(response) {
			response.clusterList.map((item)=>{
				item.label=item.clusterName;
				item.value=item.id;
				return item;
			})
			_this.setState({
				groupList:response.clusterList
			})
			
			
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}

	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		var params={
			clusterId:form.clusterId,
			content:form.content,
			imgUrl:form.imgUrl  || ''
		}
		Http.request('create-cmt-topic',{},params).then(function(response) {
			Message.success('新建成功')
			onSubmit && onSubmit();
		}).catch(function(err) {
			Message.error(err.message);
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
				ifCity,
				groupType,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
						<div className="title-text">新建公告</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
								style={{width:260,marginRight:25,margintop:20}}
								component="select"
								name="groupType"
								options={groupType}
								label="公告类型"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
						 	{ifCity?<KrField  
					 			style={{width:262}} 
					 			name="cmtName"
					 			component='searchCommunityAll'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 		onChange={this.selectGroup}
						 	/>:''}
						 	<KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="publishedTime"
								component="date"
								label="发布时间"
								requireLabel={true}
						 	/>
						 	<KrField 
								component="editor" 
								name="content" 
								label="公告内容" 
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue=''
								/>


						 <div  className="u-view">
						 	点击预览
						 </div>
							
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


		if (!values.groupType) {
			errors.groupType = '请选择群组类型';
		}

		if (!values.cmtName) {
			errors.cmtName = '请选择所属社区';
		}

		if (!values.clusterId) {
			errors.clusterId = '请选择所属群组';
		}
		if (!values.content) {
			errors.content = '请输入帖子内容';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'createNotice',
		 validate,
		
	})(CreateNotice);
