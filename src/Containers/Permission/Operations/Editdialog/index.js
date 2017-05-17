import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	Store
} from 'kr/Redux';
import {
	reduxForm,
	initialize,
	change
} from 'redux-form';
import {
	KrField,
	Button,
	Row,
	Col,
	Tooltip,
	ButtonGroup
} from 'kr-ui';
import './index.less';


class Editdialog extends React.Component {
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
			getDate: {},
			moduleVoList: []

		}
		this.getModuleList();
		this.getResourcesData();
	}

	getResourcesData = () => {
		let {
			detail
		} = this.props;
		var _this = this;
		var renderMethod = this.state.ControllerRender;
		var ControllerId = this.state.ControllerId;
		Http.request('getResourcesData', {
			id: detail.id
		}, {}).then(function(response) {
			var moduleVoList = response.resources.moduleVoList.map((item, index) => {
				item.label = item.name;
				item.value = item.id;
				return item;
			})
			var EditDate = detail;
			EditDate.module = moduleVoList[0];
			if (moduleVoList[1]) {
				EditDate.moduleChild = moduleVoList[1];
				var arr = [];
				arr.push(moduleVoList[1])
				_this.setState({
					childModule: arr
				})
			}

			if (moduleVoList[2]) {
				EditDate.moduleChildList = moduleVoList[2];
				var arr1 = [];
				arr1.push(moduleVoList[2])
				_this.setState({
					childModuleList: arr1
				})
			}



			Store.dispatch(initialize('editdialog', EditDate));
			response.methods && response.methods.map((item, index) => {
				var str = {
					controller: `${item.controllerName} ${item.methodName}`
				};

				var id = item.methodId;
				renderMethod.push(str);
				ControllerId.push(id);

			})
			_this.setState({
				ControllerRender: renderMethod,
				ControllerId: ControllerId,
				moduleVoList: moduleVoList,


			})
		}).catch(function(err) {

		});
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
			let {
				detail
			} = this.props;
			var moduleId = ModuleId ? ModuleId : form.moduleId;

			var params = {
				methodIds: ControllerId,
				moduleId: moduleId,
				name: form.name,
				type: form.type,
				id: detail.id,
			}

			let {
				onSubmit
			} = this.props;
			onSubmit && onSubmit(params);



		}
		//存储模块Id
	onSetModuleId = (item) => {
		this.setState({
			ModuleId: item.id
		})
	}

	onSelectController = (item) => {

		var _this = this;
		var idlist = this.state.ControllerId;
		idlist.push(item.methodId)
		this.setState({
			ControllerItem: item,
			ControllerId: idlist,
		})
	}
	// getAllController = () => {
	// 	var _this = this;
	// 	Http.request('getAllController', {}, {}).then(function(response) {
	// 		var ControllerList = response.controllerList.map((item, index) => {
	// 			item.value = item.id;
	// 			item.label = item.name;
	// 			return item;
	// 		})
	// 		_this.setState({
	// 			ControllerList: ControllerList
	// 		})
	// 	}).catch(function(err) {
	//
	// 	});
	// }
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
		this.setState({
			Params: {
				parentId: item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					var ModuleList = response.ssoModuleList.map((item, index) => {
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
		this.setState({
			Params: {
				parentId: item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					var ModuleList = response.ssoModuleList.map((item, index) => {
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
		return (
			<KrField name="moduleChild"  style={{width:220}}  component="select" label="" options={childModule} inline={true} onChange={this.onSelectChild}/>
		)


	}
	renderchildModule = () => {
		let {
			childModuleList
		} = this.state;
		return (
			<KrField name="moduleChildList"  style={{width:220}}  component="select" label="" options={childModuleList} inline={true}  onChange={this.onSetModuleId}/>
		)


	}
	controllerAdd = () => {
		let {
			ControllerItem,
			ControllerRender,
			ControllerId
		} = this.state;
		if(!ControllerItem.controllerName){
			return;
		}
		var controller = `${ControllerItem.controllerName} ${ControllerItem.methodName}`;
		var item = {
			controller: controller
		}
		var arr = ControllerRender;
		var arr1 = [];
		Store.dispatch(change('editdialog', 'controller', ''));
		if(arr.length>0){
			console.log(11111)
			arr.map((items,index)=>{
				arr1.push(items.controller);

			})
				if(arr1.indexOf(controller)==-1){
					arr.push(item);
				}

		}else {
			console.log()
			arr.push(item);
		}
		this.setState({
			ControllerRender: arr,
			ControllerId: ControllerId,
			ControllerItem:{},
		},function(){
			Store.dispatch(change('editdialog', 'controller', ''));
			console.log(this.state.ControllerRender);
		})

	}
	renderController = () => {
		let {
			ControllerRender
		} = this.state;
		var list;
		if (ControllerRender.length > 0) {
				list = ControllerRender.map((item, index) => {
					console.log(item.controller.length);
					if (item.controller.length>67) {
						return (

							<div className="u-add-list" key={index}>{`...${item.controller.slice(-66)}`}<Tooltip offsetTop={5} place='top'>{item.controller}</Tooltip><span className="u-add-delete" onTouchTap={this.controllerDelete.bind(this,index)}>移除</span></div>
						)
					}else {
						return (
							<div className="u-add-list" key={index}>{item.controller}<Tooltip offsetTop={5} place='top'>{item.controller}</Tooltip><span className="u-add-delete" onTouchTap={this.controllerDelete.bind(this,index)}>移除</span></div>
						)
					}
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
		});
	}
	render() {
		let {
			error,
			handleSubmit,
			pristine,
			reset,
			changeValues,
			optionValues,
			detail
		} = this.props;
		let {
			ModuleList,
			ControllerList,
			ControllerRender,
			childModule,
			childModuleList
		} = this.state;
		return (
			<div className="g-operations-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
					<span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
					<div className="u-operations-edit-title">
						<span>操作项编辑</span>
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
							component="labelText" label="编号"
							requireLabel={true}
							requiredValue={true}
							inline={true}
							value={detail.code}
					/>
					<KrField
							style={{width:360,marginLeft:40,marginBottom:16,marginRight:200}}
							name="type"
							component="group"
							label="类型"
							inline={true}
							requireLabel={true}
					>
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
								style={{width:310,marginLeft:14}}
								component="select"
								label="所属菜单"
								options={ModuleList}
								inline={true}
								requireLabel={true}
								onChange={this.onSelect}
						/>
						{childModule.length>0?this.renderModule():''}
						{childModuleList.length>0?this.renderchildModule():''}
					</div>
					<div className="u-method">
						<div className="u-method-title">
							<span className="require-label-method">*</span>方法
						</div>
						<div className="u-method-content u-method-contentE">
							<KrField
									name="controller"
									style={{width:300,marginLeft:70}}
									component="searchMethod"
									label=""
									options={ControllerList}
									inline={true}
									onChange={this.onSelectController}
							/>
							<Button
									label="Add"
									className="u-method-add"
									height={34}
									onTouchTap={this.controllerAdd}
							/>
						</div>
						<div className="u-method-content-list">
							{this.renderController()}
						</div>
					</div>
					<Row style={{marginTop:30,marginBottom:15}}>
					<Col md={12} align="center">
						<ButtonGroup>
							<div  className='ui-btn-center'><Button  label="确定" type="submit"   height={34} width={90}/></div>
							<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
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


	if (!values.type) {
		errors.type = '请选择类型';
	}

	return errors
}
export default Editdialog = reduxForm({
	form: 'editdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Editdialog);
