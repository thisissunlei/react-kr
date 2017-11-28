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
	DrawerTitle,
	Button,
	Message
} from 'kr-ui';
import './../index.less';


class EditBanner extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			imgUrl:''
		}
		
	}
	
	componentDidMount() {
		this.getInfo();
	}
	
	
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		this.setState({
			imgUrl:detail.imgUrl
		})
		Store.dispatch(initialize('editBanner', detail));
	}
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		Http.request('edit-banner',{},form).then(function(response) {
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
				imgUrl
			}=this.state;
			
		
		return (
			<div className="g-create-advert">
				<div className="u-create-title">
					<DrawerTitle title ='编辑广告图' onCancel = {this.onCancel}/>
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
 								label="启动图片"
 								name="imgUrl"
 								component="newuploadImage"
 								innerstyle={{width:370,height:223,padding:16}}
 								sizePhoto
 								photoSize={'16:9'}
 								pictureFormat={'JPG,PNG,GIF'}
 								pictureMemory={'300'}
 								requestURI = '/api/krspace-finance-web/activity/upload-pic'
 								merthd="Url"
 								inline={false}
 								defaultValue={imgUrl}
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
		form: 'editBanner',
		 validate,
	})(EditBanner);
