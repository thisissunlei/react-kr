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
	DrawerTitle,
	Message
} from 'kr-ui';
import './index.less';


class CreateNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
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
	
	componentWillReceiveProps(nextProps) {
        this.setState({
        	flag:nextProps.flag
        })
    }
	
   	getType=()=>{
   		var _this=this;
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
		let {richTextValue,cmtName,title,type,publishTime}=this.state;
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
				groupType,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
					<DrawerTitle title ='新建公告' onCancel = {this.onCancel}/>
				</div>
				<form ref="form" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:42}}>
							<KrField  
					 			style={{width:262}} 
					 			name="cmtId"
					 			component='searchAllCommunity'  
					 			label="所属社区" 
					 			inline={false}  
					 			placeholder='请输入社区名称' 
						 		requireLabel={true}
						 		onChange={this.selectCommunity}
						 	/>
							 <KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="publishTime"
								component="date"
								label="发布时间"
								onChange={this.selectTime}
						 	/>
							 <KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="endTime"
								component="date"
								label="过期时间"
								onChange={this.selectTime}
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
						 	
						 	<KrField
								style={{width:260,marginRight:25,margintop:20}}
								name="publishTime"
								component="date"
								label="发布时间"
								requireLabel={true}
								onChange={this.selectTime}
						 	/>
						 	<KrField 
								component="textarea" 
								name="text" 
								label="公告内容" 
								style={{width:560,marginTop:20,position:'relative',zIndex:'1'}}
								requireLabel={true}
								defaultValue=''
								onChange={this.viewChange}
								/>


						 <div  className="u-view" >
						 	<Button  label="点击预览" type="submit" onClick={this.viewRichText}/>
						 </div>
							
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
		form: 'createNotice',
		 validate,
		
	})(CreateNotice);
