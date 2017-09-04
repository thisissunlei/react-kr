import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	Tooltip,
	SearchForms,
	ButtonGroup,
	Notify,
} from 'kr-ui';
import './index.less';


class Createdialog extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ModuleList: [],
			resourceIds: [],
			errorTip: false,
			childModule: [],
			childModuleList: [],
			Params: {
				parentId: 0
			},
			ControllerList: [],
			ControllerId: [],
			ControllerItem: {},
			ModuleId: '',
			ControllerRender: [],
			methodId: [],
			idlist:[],
		},
		this.timeOut = 0,
		this.getModuleList();
		//this.getAllController();
	}

	componentDidMount(){
		this.getAllController('');
	}

	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onSubmit = (form) => {
			let {
				ModuleId,
				ControllerId
			} = this.state;
			
			var params = {
				code: form.code,
				methodIds: ControllerId,
				moduleId: ModuleId,
				name: form.name,
				type: form.type
			}
			let {
				onSubmit
			} = this.props;
			
			if (ControllerId.length > 0) {
				
				onSubmit && onSubmit(params);
			}



		}
		//存储模块Id
	onSetModuleId = (item) => {
		this.setState({
			ModuleId: item.id
		})
	}

	onSelectController = (item) => {
		this.setState({
			ControllerItem: item,
			idlist:item.methodId
		})
	}
	getAllController = (value) => {
		let {detail} = this.props;
		let _this = this;
		Http.request('getMethodByName', {name:value}).then(function(response) {
			
			response.methodList.forEach((item, index) => {
				item.value = item.methodId;
				var comKrspaceStart = /^com.krspace./.test(item.controllerName);
				var str = item.controllerName+"";
				if(comKrspaceStart){
					str = str.replace(/com.krspace./,"")
				}

				item.label = `${str}#${item.methodName}`;
			});
			_this.setState({
				ControllerList: response.methodList
			})
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	getModuleList = () => {
		let {
			Params
		} = this.state;
		var _this = this;
		Http.request('getModule', Params, {}).then(function(response) {
			var ModuleList = response.ssoModuleList.map((item, index) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			_this.setState({
				ModuleList: ModuleList
			})
		}).catch(function(err) {

		});
	}
	getValue = (e) => {
		var check = e.target.checked;
		var id = e.target.value;
		var idList = this.state.resourceIds;
		if (check) {
			idList.push(id);
			this.setState({
				resourceIds: idList
			})

		} else {
			var index = idList.indexOf(id);
			if (index > -1) {
				idList.splice(index, 1);
			}
			this.setState({
				resourceIds: idList
			})
		}
		if (this.state.resourceIds.length > 0) {
			this.setState({
				errorTip: false
			})
		}
	}
	onSelect = (item) => {
		var _this = this;
		var ModuleList;
		this.setState({
			Params: {
				parentId: item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					ModuleList = response.ssoModuleList.map((item, index) => {
						item.value = item.id;
						item.label = item.name;
						return item;
					})
					_this.setState({
						childModule: ModuleList,
						childModuleList: []
					})
				} else {
					_this.setState({
						ModuleId: item.id,
						childModule: response.ssoModuleList,
						childModuleList: []
					})
				}



			}).catch(function(err) {

			});
		})

	}
	onSelectChild = (item) => {
		var _this = this;
		var ModuleList;
		this.setState({
			Params: {
				parentId: item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					ModuleList = response.ssoModuleList.map((item, index) => {
						item.value = item.id;
						item.label = item.name;
						return item;
					})
					_this.setState({
						childModuleList: ModuleList
					})
				} else {
					_this.setState({
						ModuleId: item.id,
						childModuleList: response.ssoModuleList
					})
				}


			}).catch(function(err) {

			});
		})

	}
	renderModule = () => {
		let {
			childModule
		} = this.state;
		if (childModule.length > 0) {
			return (
				<KrField name="moduleChild"  style={{width:220}}  component="select" label="" options={childModule} inline={true} onChange={this.onSelectChild}/>
			)
		}
	}
	renderchildModule = () => {
		let {
			childModuleList
		} = this.state;
		if (childModuleList.length > 0) {
			return (
				<KrField name="moduleChildList"  style={{width:220}}  component="select" label="" options={childModuleList} inline={true}  onChange={this.onSetModuleId}/>
			)
		}
	}
	controllerAdd = () => {
		let {
			ControllerItem,
			ControllerRender,
			ControllerId,
			idlist
		} = this.state;
		if(!ControllerItem.controllerName){
			return;
		}

		var comKrspaceStart = /^com.krspace./.test(ControllerItem.controllerName);
		var strTime = ControllerItem.controllerName+"";
		if(comKrspaceStart){
			strTime = strTime.replace(/com.krspace./,"")
		}
		var strTimes= `${strTime}#${ControllerItem.methodName}`;
		var controller = strTimes;

		var item = {
			controller: controller
		}
		var arr = ControllerRender;
		var arr1 = [];
		Store.dispatch(change('createdialog', 'controller', ''));
		

		ControllerId.push(idlist);
		if(arr.length>0){
			arr.map((items,index)=>{
				arr1.push(items.controller);

			})
				if(arr1.indexOf(controller)==-1){
					arr.push(item);
					Notify.show([{
						message: '添加成功',
						type: 'success',
					}]);
				}

		}else {
			arr.push(item);
			Notify.show([{
						message: '添加成功',
						type: 'success',
					}]);
		}
		this.setState({
			ControllerRender: arr,
			ControllerId: ControllerId,
			ControllerItem:{},
		},function(){
			Store.dispatch(change('createdialog', 'controller', ''));
			
		})

	}
	renderController = () => {
		let {
			ControllerRender
		} = this.state;
		var list;
		if (ControllerRender.length > 0) {
				list = ControllerRender.map((item, index) => {
					// if (item.controller.length>67) {
					// 	return (

					// 		<div className="u-add-list" key={index}>{`...${item.controller.slice(-66)}`}<Tooltip offsetTop={5} place='top'>{item.controller}</Tooltip><span className="u-add-delete" onTouchTap={this.controllerDelete.bind(this,index)}>移除</span></div>
					// 	)
					// }else {
						return (
							<div className="u-add-list" key={index}>{item.controller}<span className="u-add-delete" onTouchTap={this.controllerDelete.bind(this,index)}>移除</span></div>
						)
					// }
				})
		}
		return list;
	}
	controllerDelete = (index) => {
		let {
			ControllerRender,
			ControllerId
		} = this.state;
		var Controller = ControllerRender;
		Controller.splice(index, 1)
		var id = ControllerId;
		id.splice(index, 1)
		this.setState({
			ControllerRender: Controller,
			ControllerId: id
		})
		


	}


	onMethodValueClick=(value)=>{

		let _this = this;
		this.timeOut = this.timeOut+1;

		setTimeout(function(){
			_this.timeOut = 0;
		},500)
		
			
		if(_this.timeOut==2){
			_this.setState({
				ControllerItem: value,
				idlist:value.methodId
			},function(){
				_this.controllerAdd();
				
			})
		}
		
	}
	inputValue=(value)=>{
		console.log("value",value);
		this.getAllController(value);
	}


	render() {
		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			changeValues,
			optionValues
		} = this.props;
		let {
			ModuleList,
			ControllerList,
		} = this.state;
		return (
			<div className="g-operations-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{width:1000,marginTop:30,paddingLeft:40,paddingRight:40,boxSizing:"border-box"}}  >
					<span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
					<div className="u-operations-edit-title">
						<span>新建操作项</span>
					</div>
					<KrField
							style={{width:260,marginLeft:40,marginBottom:16}}
							name="name" type="text"
							component="input" label="名称"
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'名称为必填项'}}
							inline={true}
					/>
					<KrField
							style={{width:260,marginLeft:40,marginBottom:16}}
							name="code" type="text"
							component="input" label="编码"
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'编码为必填项'}}
							inline={true}
					/>
					<KrField style={{width:360,marginLeft:40,marginBottom:16}}  name="type" component="group" label="类型" inline={true} requireLabel={true}>
	                	<KrField
	                			name="type"
	                			label="菜单"
	                			type="radio"
	                			value="MENU"
	                			checked={true}
	                	/>
	               		 <KrField
	               		 		name="type"
	               		 		label="操作"
	               		 		type="radio"
	               		 		value="OPERATION"
	               		 />
	              	</KrField>
					<div className="u-operations">
						<KrField
								name="module"
								style={{width:310,marginLeft:40}}
								component="select"
								label="所属菜单"
								options={ModuleList}
								inline={true}
								requireLabel={true}
								onChange={this.onSelect}
						/>
						{this.renderModule()}
						{this.renderchildModule()}
					</div>
					<div className="u-method">
						<div className="u-method-title"><span className="require-label-method">*</span>方法</div>
						<div className="u-method-content u-method-contentE">
							
							<KrField  name="controller" style={{width:700,marginLeft:70}} component="selectOperation" label="" options={ControllerList}  multi={true} onChangeOneOperation={true} onChangeOne={this.onMethodValueClick} onInputValue={this.inputValue}/>
							<span style={{display:"inline-block",margin: "50px  0 0 104px",fontSize:12,color:"#ff6868"}}>双击下拉框选项选择方法</span>

						</div>
						<div className="u-method-content-list">
							{this.renderController()}
						</div>
					</div>
					<Row style={{marginTop:30,marginBottom:15}}>
					<Col md={12} align="center">
						<ButtonGroup>
							<div  className='ui-btn-center'>
								<Button
										label="确定"
										type="submit"
										height={34}
										width={90}
								/>
							</div>
							<Button
									label="取消"
									type="button"
									onTouchTap={this.onCancel}
									cancle={true}
									height={33}
									width={90}
							/>
						</ButtonGroup>

					 </Col>
					 </Row>
				</form>

			</div>
		);
	}

}
const validate = values => {
	const errors = {}
	if (!values.name) {
		errors.name = '请输入名称';
	}

	if (!values.code) {
		errors.code = '请输入编号';
	}
	if (!values.type) {
		errors.type = '请选择类型';
	}
	if (!values.module) {
		errors.module = '请选择所属菜单';
	}
	return errors
}
export default Createdialog = reduxForm({
	form: 'createdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Createdialog);
