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


class EditNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			groupType:[],
			infoList:[]
		}
		this.getType();
		
	}
	
	componentDidMount() {
		var _this=this;
		setTimeout(function(){
			_this.getInfo();
		},1000)
		
	}
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		Http.request('get-notice-detail',{id:detail.id}).then(function(response) {
			if(response.type==0){
				_this.setState({
					ifCity:true
				})
			}else{
				_this.setState({
					ifCity:false
				})
			}

			_this.setState({
				infoList:response
			})
			response.type=String(response.type)
			Store.dispatch(initialize('editNotice', response));
			
			
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}
   	getType=()=>{
   		var _this=this;
		Http.request('get-findCmtRight').then(function(response) {
			if(response.hasRight==1){
				_this.setState({
					groupType:[
						{label:'全国群组',value:"1"},
						{label:'社区群组',value:"0"}
					]
				})
			}else if(response.hasRight==0){
				_this.setState({
					groupType:[
						{label:'社区群组',value:"0"}
					]
				})
			}
			
		}).catch(function(err) {
			Message.error(err.message);
		});	

   	}
	selectType=(item)=>{
		console.log()
		Store.dispatch(change('editNotice', 'cmtId', ''));
		if(item.value==0){
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
				ifCity,
				groupType,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
						<div className="title-text">编辑公告</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
								style={{width:548}}
								name="title"
								type="text"
								component="input"
								label="公告标题"
								requireLabel={true}
						 	/>
							<KrField
								style={{width:260,marginRight:25,margintop:20}}
								component="select"
								name="type"
								options={groupType}
								label="公告类型"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
						 	{ifCity?<KrField  
					 			style={{width:262}} 
					 			name="cmtId"
					 			component='searchCommunityAll'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 	/>:''}
						 	<KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="publishTime"
								component="date"
								label="发布时间"
								requireLabel={true}
						 	/>
						 	<KrField 
								component="editor" 
								name="richText" 
								label="公告内容" 
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue={infoList.richText}
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
			errors.groupType = '请选择公告类型';
		}

		if (!values.cmtName) {
			errors.cmtName = '请选择所属社区';
		}

		
		if (!values.content) {
			errors.content = '请输入公告内容';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'editNotice',
		 validate,
		
	})(EditNotice);
