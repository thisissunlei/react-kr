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
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message
} from 'kr-ui';
import './../index.less';


class CreateBanner extends React.Component {


	constructor(props, context) {
		super(props, context);
		
		
	}
	
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		Http.request('create-banner',{},form).then(function(response) {
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
			
			
		
		return (
			<div className="g-create-advert">
				<div className="u-create-title">
						<div className="title-text">新建广告图</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form ref="form" onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
								style={{width:548}}
								name="title"
								type="text"
								component="input"
								label="标题"
								requireLabel={true}
						 	/>
							<KrField
								style={{width:548}}
								name="targetUrl"
								type="text"
								component="input"
								label="跳转地址"
						 	/>
						 	<KrField
								style={{width:260}}
								name="orderNum"
								type="text"
								component="input"
								label="排序号"
						 	/>
							<KrField
 								label="广告图片"
 								name="imgUrl"
 								component="newuploadImage"
 								innerstyle={{width:370,height:223,padding:16}}
 								sizePhoto
 								photoSize={'16:9'}
 								pictureFormat={'JPG,PNG,GIF'}
 								pictureMemory={'300'}
 								requestURI = '/api/krspace-finance-web/activity/upload-pic'
 								inline={false}
 								merthd="Url"
								requireLabel={true}
 							/>
						 	<KrField 
						 		grid={1} 
						 		label="图片描述" 
						 		name="remark" 
						 		heightStyle={{height:"78px",width:'538px'}}  
						 		component="textarea"  
						 		maxSize={100} 
						 		placeholder='请输入图片描述' 
						 		style={{width:548}} 
						 		lengthClass='list-len-textarea' 
						 		requireLabel={true}/>   

						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit" />
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
			errors.title = '标题不能为空';
		}
		if (values.title && values.title.length>50) {
			errors.title = '标题不能超过50字';
		}
		if (!values.imgUrl) {
			errors.imgUrl = '启动图片不能为空';
		}
		if (!values.remark) {
			errors.remark = '图片描述不能为空';
		}
		

		return errors
}

export default reduxForm({
		form: 'createBanner',
		 validate,
	})(CreateBanner);
