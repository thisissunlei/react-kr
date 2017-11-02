import React from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	dataToTemplate,
	ReactHtmlParser,
	Http,
}from 'kr/Utils'
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

import {
	KrField,
    ButtonGroup,
	Button,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
	Drawer,
	Tooltip,
	Message,
	UpLoadList,
	FontIcon,
	Pagination,
	Loading,
	CheckPermission,
	ListGroup,
	ListGroupItem,
	SearchForms,
} from 'kr-ui';
import { observer, inject } from 'mobx-react';

import './index.less';
// @inject("NavModel")
// @observer
class TemplatePrint extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child:""
		}
    }
    componentDidMount(){
		// const { NavModel } = this.props;
		// NavModel.setSidebar(false);
		
	}

	onSubmit = (value) =>{
		var params = Object.assign({},value);
		let {onSubmit} = this.props;
		
        Http.request("other-contract-formwork-new",{},params).then(function (response) {
		
			onSubmit(Object.assign(value,{printTemplateId:response.printTemplateId}));
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	onCancel = ()=>{
	   let {onCancel} = this.props;
	   onCancel && onCancel()
	}

	render() {

		console.log("TemplatePrint", ">>>>>>>")
		let {handleSubmit}=this.props;
		let {child} = this.state;

		return (
			<form className = "edit-print-formwork"  onSubmit={handleSubmit(this.onSubmit)} >
				<Title value="合同列表"/>
				<Section title="合同列表" description="" style={{marginBottom:-5}} rightElement = {
					<div>
						<span style = {{display:'inline-block',marginRight:10}}><Button  label="确定" type="submit"/></span>
						<Button  label="关闭" type="button" cancle={true} onTouchTap={this.onCancel} />
					</div>
				}>
					<div style={{width:"210mm",margin:"auto"}}>
						<KrField 
							
							label="模板名称" 
							name="name" 
							style={{marginLeft:15,display:'block'}} 
							component="input" 
							inline={true}
							requireLabel={true}
							
						/>	
						<KrField component="editor" style={{width:"210mm"}} resizeChange = {true} isReduxForm = {true} name="content" label="" defaultValue=''/>
						
					</div>
				</Section>
				
			</form>

		);
	}
}

export default reduxForm({
	form: 'TemplatePrint'
})(TemplatePrint);

  