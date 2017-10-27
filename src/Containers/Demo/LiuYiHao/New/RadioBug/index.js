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
	ReactHtmlParser
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
import './index.less'
class RadioBug extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child:""
		}
	}
	openOneAgreement = () =>{

	}
	onSearchSubmit = () =>{

	}
	onSubmit = () =>{
		
	}

	openSearchUpperDialog=()=>{

	}
	onCancel = ()=>{

	}

	render() {


		let {handleSubmit}=this.props;
		let {child} = this.state;

		return (
			<form className = "edit-print-formwork"  onSubmit={handleSubmit(this.onSubmit)} >
				<Title value="合同列表"/>
				<Section title="合同列表" description="" style={{marginBottom:-5,minHeight:910}} rightElement = {
					<div>
						<span style = {{display:'inline-block',marginRight:10}}><Button  label="确定" type="submit"/></span>
						<Button  label="关闭" type="button" cancle={true} onTouchTap={this.onCancel} />
					</div>
				}>
					<div style={{width:"210mm",margin:"auto"}}>
						<KrField 
							
							label="联系人姓名" 
							name="name" 
							style={{width:262,marginLeft:15,display:'block'}} 
							component="input" 
							inline={true}
							requireLabel={true}
						/>	
						<KrField component="editor" style={{width:"210mm",height:'297mm'}}  name="summary" label="" defaultValue=''/>
						<ButtonGroup>
							<Button  label="确定" type="submit"/>
							<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
						</ButtonGroup>
					</div>
				</Section>
				
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  