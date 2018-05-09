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
	IconTip
} from 'kr-ui';
import './index.less';

class EditActivity extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			groupType:[
				
			],
			timeEndNum:'',
			timeStartNum:'',
			richText:'',
			imgUrl:'',
			startDate:'',
			startHour:'',
			endDate:'',
			endHour:'',
			timeStart:'',
			timeEnd:'',
			cost:'',
		}
		
		
		this.getType();
	}
	
	componentDidMount() {
		this.getInfo();
	}
	
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		Http.request('activity-detail',{id:detail.id}).then(function(response) {
			
			if(response.type==0){
				_this.setState({
					ifCity:true
				})
			}else{
				_this.setState({
					ifCity:false
				})
			}
			response.stick=String(response.stick);
			response.type=String(response.type);
			response.startTime=DateFormat(response.begin_time, 'yyyy-mm-dd HH:MM:ss');
			response.endTime=DateFormat(response.end_time, 'yyyy-mm-dd HH:MM:ss');
			response.StartTimeStr=DateFormat(response.begin_time, 'yyyy-mm-dd HH:MM:ss').substring(11,16);
			response.EndTimeStr=DateFormat(response.end_time, 'yyyy-mm-dd HH:MM:ss').substring(11,16);
			
			_this.setState({
					timeStartNum:response.StartTimeStr,
					timeEndNum:response.EndTimeStr,
					startHour:`${response.StartTimeStr}:00`,
					endHour:`${response.EndTimeStr}:00`,
					timeStart:new Date(response.startTime).getTime(),
					timeEnd:new Date(response.endTime).getTime(),
					richText:response.richText,
					imgUrl:response.imgUrl,
					cost:response.cost
				})
			Store.dispatch(initialize('editActivity', response));

		}).catch(function(err) {
			Message.error(err.message);
		});	
	}
   	getType=()=>{
   		var _this=this;
		Http.request('activity-findCmtRight').then(function(response) {
			if(response.hasRight==1){
				_this.setState({
					groupType:[
						{label:'全国活动',value:'1'},
						{label:'社区活动',value:'0'}
					]
				})
			}else if(response.hasRight==0){
				_this.setState({
					groupType:[
						{label:'社区活动',value:'0'}
					]
				})
			}
			
		}).catch(function(err) {
			Message.error(err.message);
		});	                                                                                                                      

   	}
	selectType=(item)=>{
		Store.dispatch(change('editActivity', 'cmtId', ''));
		if(item.value=="0"){
			this.setState({
				ifCity:true
			})                                                                                                   
		}else{
			this.setState({
				ifCity:false
			})
			Store.dispatch(change('editActivity', 'address', ''));
			
		}
	}
	selectCommunity=(item)=>{
		Http.request('activity-findCmtAddres',{cmtId:item.id}).then(function(response) {
			this.
			Store.dispatch(change('editActivity', 'address', response.address));
		}).catch(function(err) {
			Message.error(err.message);
		});	                                                                                                                      

	}
	
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		form.cost=0;
		var stime=form.startTime.substring(0,10);
		var etime=form.endTime.substring(0,10);
		form.begin_time=`${stime} ${form.StartTimeStr}:00`;
		form.end_time=`${etime} ${form.EndTimeStr}:00`;
		
		Http.request('edit-activity',{},form).then(function(response) {
			Message.success('修改成功')
			onSubmit && onSubmit();
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	checkTime=()=>{
		let {
			timeEnd,
			timeStart
		}=this.state;
		if(timeEnd-timeStart<0){
			Message.error('结束时间不能小于开始时间');
		}
	}
	startDate=(item)=>{
		let {
			startHour,
			startDate,
			timeEnd
		}=this.state;
		let date=item.substring(0,10);
		
		if(startHour){
			let time=`${date} ${startHour}:00`;
			this.setState({
				timeStart:new Date(time).getTime()
			},function(){
				if(timeEnd){
					this.checkTime()
				}
			})
			
		}
		this.setState({
			startDate:date
		})
	}

	startHour=(item)=>{
		let {
			startHour,
			startDate,
			timeEnd
		}=this.state;
		if(startDate){
			let time=`${startDate} ${item}:00`;
			this.setState({
				timeStart:new Date(time).getTime()
			},function(){
				if(timeEnd){
					this.checkTime()
				}
			})
			
		}
		this.setState({
			startHour:`${item}:00`
		})
	}
	endDate=(item)=>{
		let {
			endHour,
			endDate,
			timeStart
		}=this.state;
		let date=item.substring(0,10);
		if(endHour){
			let time=`${date} ${endHour}:00`;
			this.setState({
				timeEnd:new Date(time).getTime()
			},function(){
				if(timeStart){
					this.checkTime()
				}
			})
			
		}
		this.setState({
			endDate:date
		})
	}
	endHour=(item)=>{
		let {
			endHour,
			endDate,
			timeStart
		}=this.state;
		if(endDate){
			let time=`${endDate} ${item}:00`;
			this.setState({
				timeEnd:new Date(time).getTime()
			},function(){
				if(timeStart){
					this.checkTime()
				}
			})
			
		}
		this.setState({
			endHour:`${item}:00`
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
				timeStartNum,
				timeEndNum,
				richText,
				imgUrl,
				cost
			}=this.state;
		
		return (
			<div className="g-create-activity">
				<div className="u-create-title"  style={{padding:'0 83px',paddingBottom:30,paddingLeft:40}}>
					<DrawerTitle title ='编辑活动' onCancel = {this.onCancel}/>
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
							{/* <KrField
								style={{width:260,marginRight:25}}
								component="labelText"
								name="cost"
								label="费用"
								inline={false} 
								value={cost=='0'?'免费':cost}
						 	/> */}
							<div className="u-icon-tip">
								<IconTip tipStyle = {{width:200}}>
										<div style={{textAlign:'left'}}>
											<p>①费用仅支持填写数字，如“42”“38.8”；</p>
											<p>②若免费活动，费用请填写0；</p>
											<p>③APP暂不支持会员直接缴纳活动费用，请在活动内容中详细描述会员线下缴费流程；</p>
										</div>
								</IconTip>
							 </div>
							 <KrField
								style={{width:260,marginRight:25}}
								name="cost"
								type="text"
								component="input"
								label="费用"
								requireLabel={true}
						 	 />
						 	<KrField
								style={{width:260,marginRight:25}}
								component="select"
								name="type"
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
								name="site"
								label="地点"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="address"
								label="地址"
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
						 	<div className="u-meet-setting">
									<div className="u-meet-setTime">
									<KrField name="startTimes" component="group" label="开始时间" requireLabel={true} style={{width:280}} >
											<KrField
													style={{width:120,marginLeft:'-10px'}}
													name="startTime"
													component="date"
													onChange={this.startDate}
											/>
											<KrField 
													component="timeSelect"
													style={{width:108,marginLeft:40}} 
													name='StartTimeStr'
													timeNum={timeStartNum}
													onChange={this.startHour}
											/>
									</KrField>
									<KrField name="endTimes" component="group" label="结束时间" requireLabel={true}  style={{width:280,marginRight:20}}>
											<KrField
													style={{width:120,marginLeft:'-10px'}}
													name="endTime"
													component="date"
													onChange={this.endDate}
											/>
											<KrField 
													component="timeSelect"  
													style={{width:108,marginLeft:40}} 
													name='EndTimeStr'
													timeNum={timeEndNum}
													onChange={this.endHour}
											/>
									</KrField>
									</div>
							</div>
							<KrField
								style={{width:260,marginRight:25}}
								component="input"
								name="maxPerson"
								label="最大人数限制"
						 	/>
						 	
							<KrField
 								label="活动封面（推荐图片宽高比例 3:4）"
 								name="imgUrl"
 								component="newuploadImage"
 								innerstyle={{width:300,height:400,padding:16}}
 								merthd='Url'
 								pictureFormat={'JPG,PNG,GIF'}
 								pictureMemory={'300'}
 								requestURI = '/api/krspace-finance-web/activity/upload-pic'
 								inline={false}
 								defaultValue={imgUrl}
								
 							/>
						 	<KrField 
								component="editor" 
								name="richText" 
								label="活动内容"
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue={richText}
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
		if (!values.site) {
			errors.site = '请输入活动地点';
		}
		// if (!values.cost) {
		// 	errors.cost = '请输入费用';
		// }

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
		

		if (!values.richText) {
			errors.richText = '请输入活动内容';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'editActivity',
		 validate,
		
	})(EditActivity);
