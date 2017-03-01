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
	KrDate,
} from 'kr-ui';
import './index.less';
import Deletedialog from './Deletedialog';
class SearchForm extends Component {
	constructor(props) {
		super(props);

	}


	onSubmit(form) {
		console.log('form', form)
			/*let {
				page,
				pageSize,
				communityids,
				ids,
				formValues,
				istip
			} = this.state

			formValues = {
				type: form.filter || 'BILL',
				value: form.content,
				communityids: communityids || 0,
				page: page,
				pageSize: pageSize

			}

			const {
				onSubmit
			} = this.props;
			onSubmit && onSubmit(formValues, istip);*/



	}


	onFilter = (value) => {
		let {
			onFilter
		} = this.props;
		onFilter && onFilter(value);
	}



	render() {



		let options = [{
				label: '名称',
				value: 'name'
			}, {
				label: '类型',
				value: 'MEMBER'
			}, {
				label: '编码',
				value: 'PHONE'
			},

		];

		return (
			<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45,zIndex:100}}>
				<SearchForms 
						onSubmit={this.onSubmit} 
						searchFilter={options} 
						style={{marginTop:5}} 
						onFilter={this.onFilter}
				/>
			</form>

		);
	}
}

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);

class Operations extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15
			},
			itemDetail: '',
			openDeleteDialog: false
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {

		this.setState({
			itemDetail
		});

		if (type == 'delete') {
			this.openDeleteDialog();
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}
	openDeleteDialog = () => {
		this.setState({
			openDeleteDialog: !this.state.openDeleteDialog
		})
	}


	render() {
		let {
			openDeleteDialog
		} = this.state;
		return (
			<div className="g-operation">
				<Section title="操作项" >
					<SearchForm  /> {/*onSubmit={this.onSubmit} Ids={communityids} onChange={this.onChange} onFilter={this.onFilter}*/}
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='findPage'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							  >
						<TableHeader>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>名称</TableHeaderColumn>
						<TableHeaderColumn>类型</TableHeaderColumn>
						<TableHeaderColumn>编码</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>所属模块</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn style={{overflow:'hidden'}} name="id"></TableRowColumn>
							<TableRowColumn name="name" ></TableRowColumn>
							<TableRowColumn 
									name="type" 
									options={[
										{label:'菜单',value:'MENU'},
										{label:'操作',value:'OPERATION'}
									]}
							></TableRowColumn>
							<TableRowColumn name="code"></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
							<TableRowColumn name="moduleName"></TableRowColumn>
							<TableRowColumn type="date" name="createTime" component={(value)=>{
								return (
									<KrDate value={value} />
								)
							}}> </TableRowColumn>
							<TableRowColumn>
									<Button label="编辑" onTouchTap=''  type="operation" operation="edit"/>
									<Button label="删除"  type="operation" operation="delete"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
					{openDeleteDialog?<Deletedialog />:''}
				</Section>
					
			</div>
		);
	}

}
export default reduxForm({
	form: 'operations',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Operations);