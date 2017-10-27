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
import { observer, inject } from 'mobx-react';

import './index.less';
@inject("NavModel")
@observer
class TemplatePrint extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child:""
		}
    }
    componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
        // this.getDetail();
	}

	onSubmit = (value) =>{
		var params = Object.assign({},value);
		console.log(value,">.>>>>>>>");
        Http.request("get-home-dynamics-list",params).then(function (response) {
           
          
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	onCancel = ()=>{
        // window.open(`./#/publicPage/${id}/dynamicsDetail`,'_blank');
	}

	render() {


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
							style={{width:262,marginLeft:15,display:'block'}} 
							component="input" 
							inline={true}
							requireLabel={true}
						/>	
						<KrField component="editor" style={{width:"210mm",height:'297mm'}}  name="summary" label="" defaultValue=''/>
						
					</div>
				</Section>
				
			</form>

		);
	}
}

export default reduxForm({
	form: 'TemplatePrint'
})(TemplatePrint);

  