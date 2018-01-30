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
	Message,
	IconTip
} from 'kr-ui';
import './index.less';


class CreateNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			
			
		}
		
	}
	componentWillMount() {
		var initializeValues = {push:'0'};
		Store.dispatch(initialize('createNotice',initializeValues));
	}
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		var ptime,etime;
		if(form.publishtime && form.publishDate){
			ptime=form.publishtime.substring(0,10);
			form.publishTime=`${ptime} ${form.publishDate}:00`;
		}
		if(form.endtime && form.endDate){
			etime=form.endtime.substring(0,10);
			form.endTime=`${etime} ${form.endDate}:00`;
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

	
	
	
	
	
	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			// let {
			// 	groupType,
			// }=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
					<DrawerTitle title ='新建公告' onCancel = {this.onCancel}/>
				</div>
				<form className="u-form" ref="form" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:42}}>
							<KrField  
					 			style={{width:262,marginRight:25,margintop:20}} 
					 			name="cmtId"
					 			component='searchAllCommunity'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 		
						 	/>
							 <KrField name="publishTimes" component="group" label="发布时间"  style={{width:280}} >
									<KrField
											style={{width:120,marginLeft:'-10px',marginTop:'-10px'}}
											name="publishtime"
											component="date"
									/>
									<KrField 
											component="timeSelect"
											style={{width:108,marginLeft:40,marginTop:'-10px'}} 
											name='publishDate'
									/>
							</KrField>
							 <div style={{ position:'absolute',top:-2,right:235}}>
	                                <IconTip tipStyle = {{width:100}}>
	                                    <div style={{textAlign:'left'}}>不填默认为当前时间</div>
	                                </IconTip>
	                        </div>
							<KrField name="endTimes" component="group" label="过期时间"  style={{width:280}} >
									<KrField
											style={{width:120,marginLeft:'-10px',marginTop:'-10px'}}
											name="endtime"
											component="date"
									/>
									<KrField 
											component="timeSelect"
											style={{width:108,marginLeft:40,marginTop:'-10px'}} 
											name='endDate'
									/>
							</KrField>
							 
							<div  style={{ position:'absolute',top:80,left:120}}>
								<IconTip tipStyle = {{width:100}}>
									<div style={{textAlign:'left'}}>不填默认为永久有效</div>
								</IconTip>
	                        </div>
							
						 	<KrField 
								component="textarea" 
								name="text" 
								label="公告内容" 
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue=''
								maxSize={60}
								
							/>
							{/*<KrField name="push" component="group" label="同步推送" requireLabel={true} style={{width:260,marginRight:25,marginTop:25}} >
	 							 <KrField name="push" label="是" type="radio" value='1' />
	 							 <KrField name="push" label="否" type="radio" value='0' />
		 						</KrField>*/}
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

		if (!values.text) {
			errors.text = '请填写公告内容';
		}

		if (!values.cmtId) {
			errors.cmtId = '请选择所属社区';
		}
		
		
		
		

		return errors
}

export default reduxForm({
		form: 'createNotice',
		 validate,
		
	})(CreateNotice);
