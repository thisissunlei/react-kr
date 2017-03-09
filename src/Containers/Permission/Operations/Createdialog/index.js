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
			ControllerChild: [],
			ControllerId: '',
			ModuleId: '',
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
				resourceIds
			} = this.state;

			if (resourceIds.length > 0) {
				form.resourceIds = resourceIds;

				let {
					onSubmit
				} = this.props;
				onSubmit && onSubmit(form);

			} else {
				this.setState({
					errorTip: true
				})
			}

		}
		//存储模块Id
	onSetModuleId = (item) => {
			this.setState({
				ModuleId: item.id
			})
		}
		//存储ControllerId
	onSetController = (item) => {
		this.setState({
			ControllerId: item.id
		})
	}
	onSelectController = (item) => {
		var _this = this;
		Store.dispatch(Actions.callAPI('getMethodByControllerId', {
			controllerId: item.id
		}, {})).then(function(response) {
			var ControllerChild = response.methodList.map((item, index) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			_this.setState({
				ControllerChild: ControllerChild
			})

		}).catch(function(err) {

		});
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
		this.setState({
			Params: {
				parentId: item.id
			}
		}, function() {
			Store.dispatch(Actions.callAPI('getModule', _this.state.Params, {})).then(function(response) {
				var ModuleList = response.ssoModuleList.map((item, index) => {
					item.value = item.id;
					item.label = item.name;
					return item;
				})
				_this.setState({
					childModule: ModuleList
				})

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
			Store.dispatch(Actions.callAPI('getModule', _this.state.Params, {})).then(function(response) {
				var ModuleList = response.ssoModuleList.map((item, index) => {
					item.value = item.id;
					item.label = item.name;
					return item;
				})
				_this.setState({
					childModuleList: ModuleList
				})

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
			resourceIds,
			errorTip,
			ControllerList,
			ControllerChild
		} = this.state;

		return (
			<div className="g-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}  >
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}} 
							name="name" type="text" 
							component="input" label="姓名"  
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'姓名为必填项'}}
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
					<KrField style={{width:300,marginLeft:40,marginBottom:16}}  name="enableflag" component="group" label="类型" inline={true} requireLabel={true}>
	                	<KrField name="enableflag" label="菜单" type="radio" value="MENU" checked={true}/>
	               		 <KrField name="enableflag" label="操作" type="radio" value="OPERATION" />
	              	</KrField>
					<div className="u-operations">
						<KrField name="module"  style={{width:220,marginLeft:40}}  component="select" label="模块" options={ModuleList} inline={true} requireLabel={true} onChange={this.onSelect}/>
						{this.renderModule()}
						{this.renderchildModule()}
					</div>
					<div className="u-method">
						<div className="u-method-title"><span className="require-label">*</span>方法配置</div>
						<div className="u-method-content">
							<KrField name="controller"  style={{width:220,marginLeft:70}}  component="select" label="" options={ControllerList} inline={true}  onChange={this.onSelectController}/>
							<KrField name="controllerChild"  style={{width:220}}  component="select" label="" options={ControllerChild} inline={true} onChange={this.onSetController} />
							<Button label="Add" className="u-method-add" height={34} onTouchTap=''/>
						</div>
						<div className="u-method-content-list">

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
		errors.name = '请输入姓名';
	}

	if (!values.code) {
		errors.code = '请输入编号';
	}


	return errors
}
export default Createdialog = reduxForm({
	form: 'createdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Createdialog);