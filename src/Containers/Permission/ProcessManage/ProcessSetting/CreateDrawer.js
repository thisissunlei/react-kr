import React from 'react';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo,
	Message
} from 'kr-ui';
import './CreateDrawer.less';


class CreateDrawer extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			flowAmount: 0,
			accountList: [],
			mainbillInfo: {},
			showName: false,
			finaflowInfo: {},
			customerId: " ",
			billInfo: " ",
			corporationId: "",
			
		}
	}
	componentDidMount(){
		Store.dispatch(change('CreateDrawer','newRequestShow',"true"));
		Store.dispatch(change('CreateDrawer','allowRequest',"true"));
		if(this.props.detail.typeId!='0'){
			Store.dispatch(change('CreateDrawer','wfTypeId',this.props.detail.typeId))
		}
	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	commonSubmit=()=>{
		this.submitType = 1;
	}
	basicSubmit=()=>{
		this.submitType = 2;
	}
	onSubmit = (form) => {
		let {
			onSubmit,
			toBasicSetting
		} = this.props;
		if(this.submitType==1){
			onSubmit && onSubmit(form);
		}else{
			toBasicSetting && toBasicSetting(form);
		}
		
	}
	

		render() {

			const {
				error,
				handleSubmit,
				reset
			} = this.props;
		
			return (
				<div className="u-creat-drawer">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>新建流程</span>
			     	<span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
			     </div>
			     <form ref="creatDrawer" onSubmit={handleSubmit(this.onSubmit)} >
					<CircleStyleTwo num="1" info="基本信息">
						<KrField
								style={{width:260}}
								name="name"
								label="流程名称"
								component="input"
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="code"
								component="input"
								label="流程编码"
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginTop:4}}
								name="wfTypeId"
								type="text"
								component="SearchProcessType"
								label="流程类型"
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25,marginTop:4}}
								name="orderNum"
								type="text"
								component="input"
								label="排序号"
								requireLabel={true}
						/>
						
						<KrField
                            grid={1/2}
                            style={{width:262,marginTop:6}}
                            name="formId"
                            component="formTypeTree"
                            label="表单名称"
                            ajaxUrlName = "get-department-tree"
                            requireLabel={true}
                        />
					
						<KrField
                            grid={1/2}
                            style={{width:260,marginLeft:25,marginTop:4}}
                            name="hrmResourceId"
                            component="treePersonnel"
                            label="对接人"
                            requireLabel={true}
                            ajaxUrlName = "get-personnel-tree"
                        />
						
						<KrField
								style={{width:548,marginTop:4}}
								name="baseDesc"
								component="textarea"
								label="描述"
								maxSize={200}
						/>
					
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="开关设置" circle="bottom">
						<Grid style={{marginTop:50,width:'81%'}}>
							<KrField style={{width:220,marginBottom:16}}  name="allowRequest" component="group" label="发起流程请求" inline={false} requireLabel={true}>
								<KrField
										name="allowRequest"
										label="允许"
										type="radio"
										value="true"
										style={{marginRight:24,marginLeft:4}}
								/>
								<KrField
										name="allowRequest"
										label="不允许"
										type="radio"
										value="false"
								/>
							</KrField>
							<KrField style={{width:220,marginLeft:66,marginBottom:16}}  name="newRequestShow" component="group" label="新办是否显示" inline={false} requireLabel={true}>
								<KrField
										name="newRequestShow"
										label="显示"
										type="radio"
										value="true"
										style={{marginRight:24,marginLeft:4}}
								/>
								<KrField
										name="newRequestShow"
										label="不显示"
										type="radio"
										value="false"
								/>
							</KrField>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit" onTouchTap={this.commonSubmit}/>
								<Button  label="保存并进入流程配置" width={178} cancle={true} type="submit" onTouchTap={this.basicSubmit}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
					</CircleStyleTwo>
				</form>
			</div>


			);
		}
	}
	const validate = values => {

		const errors = {};

		if (!values.name) {
			errors.name = '请输入流程名称';
		}else if (values.name.length>20) {
			errors.name = '流程名称最多20个字符！';
		}   
		if (!values.code) {
			errors.code = '请输入流程编码';
		}
		if (!values.wfTypeId) {
			errors.wfTypeId = '请选择流程类型';
		}
		if (!values.orderNum) {
			errors.orderNum = '请输入排序号';
		}

		if (!values.hrmResourceId) {
			errors.hrmResourceId = '请选择对接人';
		}
		if (!values.formId) {
			errors.formId = '请输入表单名称';
		}else if (values.formId.length>50) {
			errors.formId = '表单名称最多50个字符！';
		} 


		return errors
	}


	export default reduxForm({
		form: 'CreateDrawer',
		validate,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	})(CreateDrawer);
