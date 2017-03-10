import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
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
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';


class Createdialog extends Component {
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
			methodId: []
		}
		this.getModuleList();
		this.getAllController();
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
		var _this = this;
		var idlist = this.state.ControllerId;
		idlist.push(item.methodId)
		this.setState({
			ControllerItem: item,
			ControllerId: idlist,
		})
	}
	getAllController = () => {
		var _this = this;
		Store.dispatch(Actions.callAPI('getAllController', {}, {})).then(function(response) {
			var ControllerList = response.controllerList.map((item, index) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			_this.setState({
				ControllerList: ControllerList
			})
		}).catch(function(err) {

		});
	}
	getModuleList = () => {
		let {
			Params
		} = this.state;
		var _this = this;
		Store.dispatch(Actions.callAPI('getModule', Params, {})).then(function(response) {
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
			Store.dispatch(Actions.callAPI('getModule', _this.state.Params, {})).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					ModuleList = response.ssoModuleList.map((item, index) => {
						item.value = item.id;
						item.label = item.name;
						return item;
					})
					_this.setState({
						childModule: ModuleList
					})
				} else {
					_this.setState({
						ModuleId: item.id
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
			Store.dispatch(Actions.callAPI('getModule', _this.state.Params, {})).then(function(response) {
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
						ModuleId: item.id
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
			ControllerId
		} = this.state;

		var controller = `${ControllerItem.controllerName} ${ControllerItem.methodName}`;
		var item = {
			controller: controller
		}
		var arr = ControllerRender;
		arr.push(item)
		this.setState({
			ControllerRender: arr,
			ControllerId: ControllerId
		})

	}
	renderController = () => {
		let {
			ControllerRender
		} = this.state;
		var list;
		if (ControllerRender.length > 0) {
			list = ControllerRender.map((item, index) => {
				return (
					<div className="u-add-list" key={index}>{item.controller}<span className="u-add-delete" onTouchTap={this.controllerDelete.bind(this,index)}>移除</span></div>
				)
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
			<div className="g-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}  >
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}} 
							name="name" type="text" 
							component="input" label="名称"  
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'名称为必填项'}}
							inline={true}
					/>
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}} 
							name="code" type="text" 
							component="input" label="编号"  
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'编码为必填项'}}
							inline={true}
					/>
					<KrField style={{width:300,marginLeft:40,marginBottom:16}}  name="type" component="group" label="类型" inline={true} requireLabel={true}>
	                	<KrField name="type" label="菜单" type="radio" value="MENU" checked={true}/>
	               		 <KrField name="type" label="操作" type="radio" value="OPERATION" />
	              	</KrField>
					<div className="u-operations">
						<KrField name="module"  style={{width:220,marginLeft:40}}  component="select" label="模块" options={ModuleList} inline={true} requireLabel={true} onChange={this.onSelect}/>
						{this.renderModule()}
						{this.renderchildModule()}
					</div>
					<div className="u-method">
						<div className="u-method-title"><span className="require-label">*</span>方法配置</div>
						<div className="u-method-content">
							<KrField name="controller"  style={{width:600,marginLeft:70}}  component="searchMethod" label="" options={ControllerList} inline={true}  onChange={this.onSelectController}/>
							<Button label="Add" className="u-method-add" height={34} onTouchTap={this.controllerAdd}/>
						</div>
						<div className="u-method-content-list">
							{this.renderController()}
						</div>
					</div>
					<div style={{marginLeft:140,marginTop:30}}><Button  label="确定" type="submit"   height={34} width={90}/></div>
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
		errors.module = '请选择模块';
	}
	if (!values.controller) {
		errors.controller = '请选择方法';
	}


	return errors
}
export default Createdialog = reduxForm({
	form: 'createdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Createdialog);