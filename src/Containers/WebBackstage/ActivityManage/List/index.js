import React, {
	Component
} from 'react';
import {
	Title,
	DatePicker,
	Form,
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
	DotTitle,
	BraceWidth,
	SelfAdaption,
	LineText,
	SplitLine,
	SearchForms,
	Dialog,
	Message,
	Notify,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import NewCreateForm from './NewCreateForm';
import MemeberEditMemberForm from './MemeberEditMemberForm';
import AdvancedQueryForm from './AdvancedQueryForm';
import './index.less';

export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		// this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onOperation = this.onOperation.bind(this);
		// this.onExport = this.onExport.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openAdvancedQuery :false,
			status:false,
			submit:false,
			itemDetail: {},
			item: {},
			list: {},
			content:'',
			filter:'COMP_NAME',
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				jobId:'',
				companyId:0,
				cityId:'',
				type:'COMP_NAME',
				value:'',
				status:false,
			}
		}
	}






	
	
	render() {
		let {
			list,itemDetail,seleced
		} = this.state;
		// console.log("list",list);
		if (!list.totalCount) {
			list.totalCount = 0;
		}
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'WECHAT'
		}, {
			label: '姓名',
			value: 'NAME'
		}];
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
							1111
				</div>
		);

	}

}
