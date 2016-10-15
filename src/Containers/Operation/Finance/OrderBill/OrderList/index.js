import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog,

	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	LabelText,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	BreadCrumbs,
} from 'kr-ui';


import RenderTable from './Table';


//搜索模块
let OrderSearchForm = function(props){

	const { error,handleSubmit, pristine, reset, submitting,communitys,onSubmit,openSearchDialog} = props;

	return (
		<form onSubmit={handleSubmit(onSubmit)} >
				<Row>
				<Col md={7}>
					<KrField name="customername" type="text"  component="input" placeholder="请输入客户名称"/>
				</Col>
				<Col md={2} align="right" > <Button label="搜索"  type="submit" primary={true} /> </Col>
				<Col md={3} align="right" > <Button  primary={true} label="高级查询" type="link" onTouchTap={openSearchDialog}/> </Col>
				</Row>
		</form>
	);
}

OrderSearchForm= reduxForm({
  form: 'orderSearchForm',
})(OrderSearchForm);


let SearchUpForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;
    
	return (
     
       <form onSubmit={handleSubmit(onSubmit)}>

				 <KrField name="customername" type="text" label="客户名称" /> 
				
				 <KrField name="communityid" component="select"  label="所属社区">
                    <option></option>
				 </KrField>
				 <KrField name="mainbilltype" component="select"  label="订单类型">
                    <option></option>
				 </KrField>
				<KrField component="group" label="查询期间:">
					<KrField name="startDate" label="起始日期" type="Date"/>
					<KrField name="endDate" label="结束日期" type="Date" />
				</KrField>


				<Grid style={{marginTop:30}}>
					<Row style={{marginTop:30}}>
					<Col md={8}></Col>
					<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
					<Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
					</Row>
				</Grid>

	   </form>

	);

}

//这一部分有什么用?
SearchUpForm= reduxForm({
  form: 'SearchUpForm',
})(SearchUpForm);





export default class OrderCreate extends Component {

  constructor(props,context){
		super(props, context);

		this.openSearchDialog = this.openSearchDialog.bind(this);
        this.confirmSubmit=this.confirmSubmit.bind(this);
	  	this.onSearch = this.onSearch.bind(this);

		this.state = {
		  open:false,
		  basic:{}		  
		}

  }

	componentDidMount(){
		var _this = this; 
		Store.dispatch(Actions.callAPI('getFinaDataByList',{
			corporationName:'',
			page:'',
			pageSize:20,
			mainbilltype:'',
			communityid:'',
			customername:'',
			endDate:'',
		})).then(function(response){
			_this.setState({
				basic:response
			});
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});
       
	}


   confirmSubmit(values){
    var {actions} = this.props;
    actions.callAPI('getFinaDataCommunityAndMainBillType',{},values).then(function(response){
      console.log(response)
    }).catch(function(err){

    });
  }


 
	openSearchDialog(){
		this.setState({
			  openSearch:!this.state.openSearch //没有openSearch?
		});
	}


	onSearch(params){
		params.corporationName = params.corporationName || ' ';
		params.customername = '';
		params.endDate = '';
		params.mainbilltype = '';
		params.communityid = '';
		params.page = 1;
		params.pageSize = 10;

		var {actions} = this.props;
		var _this = this;


		Store.dispatch(Actions.callAPI('getFinaDataByList',params)).then(function(response){
			_this.setState({
				basic:response
			});
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});
	}

	render() {
		let {basic} = this.state;      
		return (
			<div>
				<BreadCrumbs children={['运营系统','财务管理']}/>
				<Section title="财务管理" description=""> 
					<Grid>
						<Row>
						<Col md={9}>
							<KrField grid={1/3} label="收入总额：" component="labelText" value={basic.sumCome}/>
							<KrField grid={1/3} label="回款总额：" component="labelText" value={basic.sumAmount}/>
							<KrField grid={1/3} label="余额:" component="labelText" value={basic.sumMount}/>
						</Col>
						<Col md={3} align="right"> 
							<OrderSearchForm onSubmit={this.onSearch} openSearchDialog={this.openSearchDialog}/>
						</Col> 
						</Row>
					</Grid>
					<RenderTable items={this.state.basic.finaContractMainbillVOList}/>
				</Section>


				<Dialog
					title="高级搜索"
					open={this.state.openSearch}
				>
                    <SearchUpForm  onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
			  </Dialog>


    </div>
   );
  }
}




