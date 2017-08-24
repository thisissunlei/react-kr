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
	KrDate,
} from 'kr-ui';
import './index.less';

class EditActivity extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			groupType:[
				
			],
			richTextValue:'',
			cmtName:'',
			title:'',
			type:'',
			publishTime:'',
			flag:0
		}
		this.getType();
	}
	
	componentWillMount() {
		
	}
	
	
   	getType=()=>{
   		var _this=this;
   		//activity-findCmtRight
		Http.request('get-findCmtRight').then(function(response) {
			if(response.hasRight==1){
				_this.setState({
					groupType:[
						{label:'全国公告',value:"1"},
						{label:'社区公告',value:"0"}
					]
				})
			}else if(response.hasRight==0){
				_this.setState({
					groupType:[
						{label:'社区公告',value:"0"}
					]
				})
			}
			
		}).catch(function(err) {
			Message.error(err.message);
		});	                                                                                                                      

   	}
	selectType=(item)=>{
		Store.dispatch(change('createNotice', 'cmtId', ''));
		if(item.value=="0"){
			this.setState({
				ifCity:true
			})                                                                                                   
		}else{
			this.setState({
				ifCity:false
			})
			
		}
		this.setState({
			type:item.value
		})
	}
	
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		
		if(this.state.flag==1){
			return
		}
		Http.request('create-notice',{},form).then(function(response) {
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

	viewChange=(item)=>{
		this.setState({
			richTextValue:item
		})
	}
	viewRichText=()=>{
		let {richTextValue,ifCity,cmtName,title,type,publishTime}=this.state;
		let {viewRichText} = this.props;
		let  typetxt=type==1?'全国公告':'社区公告';
		let  time=new Date(publishTime);
		let  year=time.getFullYear();
		let  Month=time.getMonth()+1;
		let  date=time.getDate();
		let form={
			  richTextValue:richTextValue,
			  title,
			  typetxt,
			  time:`${year}年${Month}月${date}日`,
			  type
			}
		if(ifCity){
			form.cmtName=cmtName;
		}
		if(form.richTextValue &&form.title &&form.typetxt && form.time){
			this.setState({
				flag:1
			})
			viewRichText && viewRichText(form)
			return
		}
		
		
		
		
	}
	
	selectCommunity=(item)=>{
		this.setState({
			cmtName:item.label
		})
	}
	changeTitle=(item)=>{
		this.setState({
			title:item
		})
	}
	selectTime=(item)=>{
		let time=Date.parse(item)
		this.setState({
			publishTime:time
		})
	}
	
	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			let {
				
				ifCity,
				groupType,
			}=this.state;
			
		
		return (
			<div className="g-create-activity">
				<div className="u-create-title">
						<div className="title-text">新建活动</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form ref="form" onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
								style={{width:548}}
								name="title"
								type="text"
								component="input"
								label="活动标题"
								requireLabel={true}
						 	/>
							<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="cost"
								label="费用"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginRight:25}}
								component="select"
								name="type"
								ref="type"
								options={groupType}
								label="活动类型"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
						 	{ifCity?<KrField  
					 			style={{width:262,marginRight:25}} 
					 			name="cmtId"
					 			component='searchCommunityAll'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 		onChange={this.selectCommunity}
						 	/>:''}
						 	<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="address"
								label="地点"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="sponsor"
								label="主办方"
								requireLabel={true}
						 	/>
						 	<KrField name="stick" component="group" label="是否置顶" requireLabel={true} style={{width:260,marginRight:25,marginTop:25}} >
	 							 <KrField name="stick" label="置顶" type="radio" value='1' />
	 							 <KrField name="stick" label="不置顶" type="radio" value='0' />
	 						</KrField>
						 	<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="maxPerson"
								label="最大人数限制"
						 	/>
						 	<div className="u-meet-setting">
									<div className="u-meet-setTime">
									<KrField name="startTimes" component="group" label="开始时间" requireLabel={true} style={{width:280}} >
											<KrField
													style={{width:120,marginLeft:'-10px'}}
													name="startTime"
													component="date"
											/>
											<KrField 
													component="timeSelect"
													style={{width:108,marginLeft:40}} 
													name='StartTimeStr'
											/>
									</KrField>
									<KrField name="endTimes" component="group" label="结束时间" requireLabel={true}  style={{width:280,marginRight:20}}>
											<KrField
													style={{width:120,marginLeft:'-10px'}}
													name="endTime"
													component="date"
											/>
											<KrField 
													component="timeSelect"  
													style={{width:108,marginLeft:40}} 
													name='EndTimeStr'
											/>
									</KrField>
									</div>
							</div>
							<KrField
 								label="活动封面"
 								name="imgUrl"
 								component="newuploadImage"
 								innerstyle={{width:370,height:223,padding:16}}
 								sizePhoto
 								photoSize={'16:9'}
 								pictureFormat={'JPG,PNG,GIF'}
 								pictureMemory={'300'}
 								requestURI = 'http://optest01.krspace.cn/api/krspace-finance-web/cmt/space/upload-photo/type/single'
 								inline={false}
 								formfile=' '
								requireLabel={true}
 							/>
						 	<KrField 
								component="editor" 
								name="richText" 
								label="活动内容"
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue=''
								onChange={this.viewChange}
								/>

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
			errors.title = '请填写活动标题';
		}
		if (values.title && values.title.length>50) {
			errors.title = '活动标题不能超过50个字符';
		}

		if (!values.cost) {
			errors.cost = '请输入费用';
		}

		if (!values.type) {
			errors.type = '请选择活动类型';
		}
		if (!values.address) {
			errors.address = '请填写活动地址';
		}

		if (!values.cmtId) {
			errors.cmtId = '请选择所属社区';
		}
		if (!values.sponsor) {
			errors.sponsor = '请填写主办方';
		}
		if (!(values.startTime && values.StartTimeStr)) {
			errors.startTime = '请填写开始时间';
		}
		if (!(values.endTime && values.EndTimeStr)) {
			errors.endTime = '请填写结束时间';
		}
		if (!values.imgUrl) {
			errors.imgUrl = '请选择活动封面';
		}

		if (!values.richText) {
			errors.richText = '请输入活动内容';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'editActivity',
		 validate,
		
	})(EditActivity);
