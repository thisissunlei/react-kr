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
	DrawerTitle,
	Message
} from 'kr-ui';
import './../index.less';


class EditStart extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
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
		Http.request('get-app-advertising-boot-detail',{id:detail.id}).then(function(response) {
			let arr=[]
			response.cityIds.map((item)=>{
				arr.push(item.id*1)
				//return arr.join(',')
			})
			let cityIds=arr.join(',')
			response.cityIds=cityIds*1;
			console.log('response.cityIds',response)
			Store.dispatch(initialize('editStart', response));
		}).catch(function(err) {
			Message.error(err.message);
		});
	
		
	}
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		Http.request('advert-edit',{},form).then(function(response) {
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
			let {imgUrl}=this.state;
		
		return (
			<div className="g-create-advert">
				<div className="u-create-title">
					<DrawerTitle title ='编辑广告图' onCancel = {this.onCancel}/>
				</div>
				<form ref="form" onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
								style={{width:548}}
								name="targetUrl"
								type="text"
								component="input"
								label="跳转地址"
						 	/>
							  <KrField  
					 			style={{width:262,marginRight:25,margintop:20}} 
					 			name="cityIds"
					 			component='searchAppCity'  
					 			label="可见城市" 
					 			inline={false}  
					 			placeholder='请输入可见城市' 
						 		requireLabel={true}
						 		
						 	/>
						 	
							<KrField
 								label="启动图片"
 								name="imgUrl"
 								component="newuploadImage"
 								innerstyle={{width:220,height:350,padding:16}}
 								pictureFormat={'JPG,PNG,GIF'}
 								pictureMemory={'300'}
 								requestURI = '/api/krspace-finance-web/activity/upload-pic'
 								inline={false}
 								merthd="Url"
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

		
		if (!values.imgUrl) {
			errors.imgUrl = '启动图片不能为空';
		}
		if (!values.remark) {
			errors.remark = '图片描述不能为空';
		}


		return errors
}

export default reduxForm({
		form: 'editStart',
		 validate,
	})(EditStart);
