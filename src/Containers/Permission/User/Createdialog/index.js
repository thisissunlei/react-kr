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
			errorTip: false
		}
		this.getOperation();
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
	getOperation = () => {
		var _this = this;
		Store.dispatch(Actions.callAPI('getModuleData', {}, {})).then(function(response) {
			_this.setState({
				ModuleList: response.moduleAndResources
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
	renderChildren = (child) => {
		var _this = this;
		var childlist;
		if (child.length > 0) {
			return childlist = child.map((items, indexs) => {
				if (items.cModuleVo.length > 0) {
					return (
						<div className="u-operation-list" id={items.id} key={indexs}>
								{items.name}
								{_this.renderChildren(items.cModuleVo)}
						</div>
					)
				} else {
					return (
						<div className="u-operation-list"  key={indexs}>
								<input type="checkbox"  value={items.id} onChange={this.getValue}/>{items.name}
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
						<div className="u-operation-list" id={item.id} key={index}>
								{item.name}
								{_this.renderChildren(item.cModuleVo)}
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
			optionValues
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
							{this.renderOperation(ModuleList)}
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
export default Createdialog = reduxForm({
	form: 'createdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Createdialog);