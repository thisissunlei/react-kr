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
	change,
	initialize
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


class Editdialog extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ModuleList: [],
			resourceIds: [],
			errorTip: false,
		}

	}
	componentDidMount() {
		let {
			detail,
			moduleDetail
		} = this.props;
		Store.dispatch(initialize('editdialog', detail));
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
	getChildren = (moduleDetail) => {
		var _this = this;
		let {
			resourceIds
		} = this.state;
		var id = resourceIds;
		moduleDetail.map((item, index) => {
			if (item.cModuleVo.length > 0) {
				_this.getChildren(item.cModuleVo)
			} else {
				item.resources.map((item, index) => {
					if (item.ownFlag == 1) {
						var index = id.indexOf(item.id);
						if (index == -1) {
							id.push(item.id)
						}
					}
					_this.setState({
						resourceIds: id
					})
				})
			}

		})
	}

	getValue = (item) => {
		var check = item.ownFlag
		var id = item.id;
		var idList = this.state.resourceIds;
		let {
			moduleDetail
		} = this.props;
		if (check == 1) {
			item.ownFlag = 0
			this.getChildren(moduleDetail)
			var index = idList.indexOf(id);
			if (index > -1) {
				idList.splice(index, 1);
			}
			this.setState({
				resourceIds: idList
			})

		} else {
			item.ownFlag = 1
			this.getChildren(moduleDetail)
			var index = idList.indexOf(id);
			if (index == -1) {
				idList.push(id);
			}
			this.setState({
				resourceIds: idList
			})


		}
		console.log('idList', idList)
		if (this.state.resourceIds.length > 0) {
			this.setState({
				errorTip: false
			})
		}
	}
	renderChildren = (child,index) => {
		console.log(index);
		var _this = this;
		var childlist, resources;
		if (child.length > 0) {
			return childlist = child.map((items, indexs) => {
				if (items.cModuleVo.length > 0) {
					var abc = _this.renderChildren(items.cModuleVo,index+1)
					return (
						<div className="u-operation-list" style={{left:`${(index+1)*100}px`,top:`${((index)*20)}px`}} id={items.id} key={indexs}>
								{items.name}→
								{_this.renderChildren(items.cModuleVo,index+1)}
						</div>
					)
				} else {
					return (
						<div className="u-operation-list" id={items.id} key={indexs}>
								{items.name}
								{
									items.resources.map((item, index) => {
										return (
											<div className="u-operation-lists" key={index}>
													<input type="checkbox" checked={item.ownFlag==1?'checked':''} value={items.id} onChange={this.getValue.bind(this,item,index)}/>{item.name}
											</div>
										)
									})
								}
						</div>
					)

				}

			})
		}

	}
	renderOperation = (list) => {
		var _this = this;
		var List;
		if (list.length > 0) {
			List = list.map((item, index) => {
				if (item.cModuleVo.length > 0) {
					return (
						<div className="u-operation-list"  style={{top:`${(index*40)}px`}} id={item.id} key={index}>
								{item.name}→
								{_this.renderChildren(item.cModuleVo,index)}
						</div>
					)
				} else {
					return (
						<div className="u-operation-list" id={item.id} key={index}>
								<input type="checkbox" value={item.id}/>{item.name}
						</div>
					)
				}

			})
		}
		return List;

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
			optionValues,
			moduleDetail
		} = this.props;
		let {
			ModuleList,
			resourceIds,
			errorTip
		} = this.state;

		return (
			<div className="g-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}  >
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}}
							name="name" type="text"
							component="input" label="姓名："
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'姓名为必填项'}}
							inline={true}
					/>
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}}
							name="code" type="text"
							component="input" label="编号："
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'编码为必填项'}}
							inline={true}
					/>
					<div className="u-operation">
						<div className="u-operation-label">
							操作项：
						</div>
						<div className="u-operation-content">
							{this.renderOperation(moduleDetail)}
							{errorTip?<div className="u-error-tip">请选择操作项</div>:''}
						</div>

						<KrField
								 type="hidden"
								 name="resourceIds"
								 values={resourceIds}
						/>

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
export default Editdialog = reduxForm({
	form: 'editdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Editdialog);
