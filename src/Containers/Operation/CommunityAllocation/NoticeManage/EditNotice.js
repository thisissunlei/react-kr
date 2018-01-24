import React from 'react';
import {
	Http,
	DateFormat
} from 'kr/Utils';
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
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	DrawerTitle,
	KrDate,
} from 'kr-ui';
import './index.less';


class EditNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			infoList:[],
			
		}
		
		
	}
	
	componentDidMount() {
		this.getInfo();

	}
	
	
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		Http.request('get-notice-detail',{noticeId:detail.noticeId}).then(function(response) {
			
			_this.setState({
				infoList:response
			})
			
			Store.dispatch(initialize('editNotice', response));
			
			
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}
   	
	
	
	

	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		
		
		form.publishTime=DateFormat(form.publishTime, "yyyy-mm-dd hh:MM:ss");
		Http.request('edit-notice',{},form).then(function(response) {
			Message.success('编辑成功')
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
				infoList,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
					<DrawerTitle title ='编辑公告' onCancel = {this.onCancel}/>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)}  style={{paddingLeft:42}}>
							<KrField  
					 			style={{width:262,marginRight:25,margintop:20}} 
					 			name="cmtId"
					 			component='searchAllCommunity'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 		
						 	/>
							 <KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="publishTime"
								component="date"
								label="发布时间"
						 	/>
							 <KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="endTime"
								component="date"
								label="过期时间"
						 	/>
							
						 	<KrField 
								component="textarea" 
								name="text" 
								label="公告内容" 
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue=''
								maxSize={60}
								
							/>
							<KrField name="push" component="group" label="同步推送" requireLabel={true} style={{width:260,marginRight:25,marginTop:25}} >
	 							 <KrField name="push" label="是" type="radio" value='1' />
	 							 <KrField name="push" label="否" type="radio" value='0' />
	 						</KrField>
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

		if (!values.title) {
			errors.title = '请填写公告标题';
		}
		if (values.title && values.title.length>50) {
			errors.title = '公告标题不能超过50个字符';
		}

		if (!values.type) {
			errors.type = '请选择公告类型';
		}

		if (!values.cmtId) {
			errors.cmtId = '请选择所属社区';
		}
		if (!values.publishTime) {
			errors.publishTime = '请输入发布时间';
		}
		
		if (!values.richText) {
			errors.richText = '请输入公告内容';
		}
		
		return errors
}

export default reduxForm({
		form: 'editNotice',
		 validate,
		
	})(EditNotice);
