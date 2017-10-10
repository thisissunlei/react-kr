
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import "./index.less"
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	SearchForm,
	SearchForms,
	Message,
} from 'kr-ui';

import State from '../State';
import {
	observer
} from 'mobx-react';
@observer


class CardManageSearchForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchForm: false,
			floorsOptions:[{label:"",value:""}],
			propertyOption:[],
			makerOptions : []
		}
	}
	componentWillReceiveProps(){
	}
	componentDidMount(){

	}

	// 提交
	onSubmit=(values)=>{
		//console.log("values",values);
	}
	
	onSearchSubmit=(value)=>{
		var newObj ={
				    	type: value.filter || '',
				    	value: value.content || '',
				    	page:1
				    }

	    var objNewT = Object.assign({},State.cardManageSearchParams);
	    State.realPage =1;
	    State.cardManageSearchParams = Object.assign({},objNewT,newObj);

	}


	openHeavilyActivationDialog=()=>{
		let {openHeavilyActivationDialog} = this.props;
		openHeavilyActivationDialog && openHeavilyActivationDialog();
	}

	openImportCardDialog=()=>{
		let {openImportCardDialog} = this.props;
		openImportCardDialog && openImportCardDialog();
	}


	render(){
		let {floorsOptions,propertyOption,makerOptions}=this.state;
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{
		      label:"卡号",
		      value:"CARD"
		    },{
		      label:"卡内码",
		      value:"INNER_CODE"
		    },{
		      label:"客户名称",
		      value:"CUSTOMER"
		    },{
		      label:"持卡人",
		      value:"HOLDER"
		    },{
		      label:"社区名称",
		      value:"COMMUNITY"
		    }]
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="card-manage-search">
				
				<Grid style={{marginBottom:22,marginTop:2}}>
					<Row >

						<Col  align="left" style={{marginLeft:0,float:'left'}}> 
								<Button label="入库" type='button' onTouchTap={this.openImportCardDialog}  /> 
						</Col>
						<Col  align="left" style={{marginLeft:20,float:'left'}}>

							<Button label="批量激活" type='button' joinEditForm onTouchTap={this.openHeavilyActivationDialog}  />

						</Col>
						<Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>

							<SearchForms onSubmit={this.onSearchSubmit}  ref = "inputFilter"
			                    style={{marginTop:3,zIndex:10000,marginLeft:10}}
			                    content={this.state.content}
			                    searchFilter={options}
			              	/>

						</Col>
					</Row>
					
				</Grid>
				
				
		  </form>
		);
	}
}
export default CardManageSearchForm = reduxForm({
	form: 'CardManageSearchForm',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(CardManageSearchForm);
