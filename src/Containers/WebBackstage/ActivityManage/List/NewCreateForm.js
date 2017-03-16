
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	CheckboxGroup,
} from 'kr-ui';
import './index.less';

 class NewCreateForm extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}
	// 发布
	toPublish=()=>{
		console.log("你点击了发布");
	}
	// 存为草稿
	toSave=()=>{
		console.log("你点击存为草稿");
	}
	// 取消新建
	onCancel=()=>{
		console.log("你点击了取消新建");
	}
	render(){
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}];
		let partakeMan =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}];
		let checkboxOptions=[{
			label: '姓名',
			value: 1
		},{
			label: '电话',
			value: 2
		},{
			label: '公司名称',
			value: 3
		},{
			label: '职务',
			value: 4
		},{
			label: '地址',
			value: 5
		}]
		return (
			<div className="new-create-activity">
				<div className="title-box">
					<img src={require('./images/activity.svg')} className="title-img"/>
					<span className="title-text">新建活动</span>
					<span className="close-page">
						<img src={require('./images/closeIMG.svg')} className="close-page-img" />
					</span>
				</div>
				<div className="detail-info">
					<div className="activity-info">
						<div className="activity-title">
							<span>1</span>
							<span></span>
							<span>活动信息</span>
						</div>
						<div className="activity-detail-info">
							<img src={require('./images/selectOne.svg')} className="select-one"/>

							<KrField grid={1/2} name="activityName" type="text" label="活动名称" requireLabel={true} style={{width:'252px'}}/>
							<KrField name="activityType" 
								component="select" 
								options={correspondingFunction}
								label="活动类型"
								requireLabel={true} 
								 
								style={{width:'252px',marginLeft:24}}
							/>
							<KrField grid={1/2} name="activityLinkMan" type="text" label="活动联系人" style={{width:'252px'}}/>
							<KrField grid={1/2} name="linkManPhone" type="text" label="活动联系人电话" style={{width:'252px',marginLeft:24}}/>
							<KrField name="functionId" 
								component="select" 
								options={partakeMan}
								label="活动参与人"
								style={{width:'252px'}}
							/>
							<KrField grid={1/2} name="totalNum" type="text" label="人数限制" style={{width:'252px',marginLeft:24}}/>
							<KrField grid={1/2} name="stick" component="group" label="是否置顶"  style={{width:'252px'}} >
									<KrField name="stick" grid={1/2} label="置顶" type="radio" value="1" style={{marginRight:'50'}}/>
									<KrField name="stick" grid={1/2} label="不置顶" type="radio" value="0" />
			              	</KrField>
			              	<KrField name="newuploadImage" 
								component="newuploadImage" 
								innerstyle={{width:524,height:159,padding:10}} 
								photoSize={'1920*520'} 
								pictureFormat={'JPG,PNG,GIF'} 
								pictureMemory={'500'}
								requestURI = {this.state.requestURI}
								requireLabel={true}
								label="上传轮播图"
								inline={false}
							/>
							<KrField name="newuploadImage" 
								component="newuploadImage" 
								innerstyle={{width:390,height:228,padding:10}} 
								photoSize={'650*365'} 
								pictureFormat={'JPG,PNG,GIF'} 
								pictureMemory={'200'}
								requestURI = {this.state.requestURI}
								requireLabel={true}
								label="上传列表详情图"
								inline={false}
							/>
							<KrField name="functionId" 
								component="select" 
								options={partakeMan}
								label="富文本编辑框"
								style={{width:'252px'}}
								requireLabel={true} 
								requiredValue={true} 

							/>
							
						</div>

					</div>
					<div className="enroll-info">
						<div className="enroll-title">
							<span>2</span>
							<span></span>
							<span>报名信息</span>
						</div>
						<div className="enroll-detail-info">
							<CheckboxGroup options={checkboxOptions} name="enrollInfo" style={{height:60,lineHeight:60}}/>
							<Grid style={{marginTop:19,marginBottom:'40px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'166px',textAlign:'right',padding:0,paddingRight:15}}>
											<Button  label="发布"  onTouchTap={this.toPublish} />
										</ListGroupItem>
										<ListGroupItem style={{width:'140px',textAlign:'center',padding:0}}>
											<Button  label="存为草稿" onTouchTap={this.toSave}/>
										</ListGroupItem>
										<ListGroupItem style={{width:'166px',textAlign:'left',padding:0,paddingLeft:15}}>
											<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
										</ListGroupItem>
									</ListGroup>					
								</Row>
							</Grid>
						</div>
					</div>
				</div>
		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}
	
	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }


	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
