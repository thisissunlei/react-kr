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
			childrenList: [],
			child: [],
			Params: {
				parentId: 0
			}

		}
		this.getModuleList();
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
			_this.getModuleList();
		})

	}



	renderModule = () => {
		let {
			ModuleList
		} = this.state;
		if (ModuleList.length > 0) {
			var list = ModuleList.map((item, index) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			var num = Math.random()
			return (
				<div>
					<KrField name={`module${num}`} style={{width:200,marginLeft:40}}  component="select"  options={list} inline={true}  onChange={this.onSelect}/> 
						
					
				</div>

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
			errorTip
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
					<div className="u-operation">
						<KrField name="paymodel"  style={{width:220,marginLeft:40}}  component="select" label="模块" options={ModuleList} inline={true} requireLabel={true} onChange={this.onSelect}/>
						{this.renderModule()}
						
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