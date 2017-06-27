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
			groupList:[
				{label:'全国群组',value:'COUNTRYWIDE'},
				{label:'社区群组',value:'COMMUNITY'}
			],
			ifCity:false,
			requestURI :'http://optest01.krspace.cn/api/krspace-finance-web/activity/upload-pic',
		}
		
	}
	
	componentDidMount() {
        
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
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
			// Http.request('cluster-insert',{},form).then(function(response) {
			// 	Message.success('新建成功')
			// 	onSubmit && onSubmit(form);
			// }).catch(function(err) {
			// 	Message.error(err.message);
			// });
		
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
								options={groupList}
								label="群组类型"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
						 	{ifCity?<KrField  
					 			grid={1/2}
					 			style={{width:262}} 
					 			component='searchCommunityAll'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 	/>:''}
						 	<KrField
								style={{width:260,margintop:20}}
								component="select"
								options={groupList}
								label="所属群组"
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
								
								label="公告图片"
								inline={false}
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
		form: 'createNotice',
		 validate,
		
	})(CreateNotice);
