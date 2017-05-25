import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import SearchFormControlTable from './SearchForm';
import './index.less';
class ControlTable  extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
		
			communityIdList:[]
		}
		this.getcommunity();
   
	}

	componentDidMount(){

	}
	getcommunity = () => {
		let _this = this;
		let {communityIdList} = this.state;
		Http.request('getCommunity').then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {



		});
	}
 
  getEidtData = (id,itemDetail) =>{
    let _this= this;
    const {FormModel} = this.props;


    Http.request("visit-record-edit-deatil",{id:id}).then(function(editData){
     
    }).catch(function(err) {
      Message.error(err.message);
    });
  }
   //搜索列表
   onSearchSubmit = (value) =>{
   	
   }

   //打开新增访客
   openNewVisitors = () =>{
      const {FormModel} = this.props;
   		this.setState({
   			openNewVisitors:true,
   		});
      FormModel.getForm("NewVisitorsToRecord")
  		.changeValues({
        communityId:"",
        typeId:"",
        interviewTypeId:"",
        activityTypeId:"",
        name:"",
        tel:"",
        wechat:"",
        num:'',
        email:"",
        purposeId:'',
        interviewRoundId:'',
        vtime:'',
      })

   }
   //生成头部
   generateHead = () =>{
		return (
			<div className = "m-control-table-head">
				<div className = "m-control-table-head-td head-td1">
					<div className= "m-control-table-head-tr">创业大街</div>
					<div className= "m-control-table-head-tr">当前出租率</div>
					<div className= "m-control-table-head-tr">
						<div ></div>
					</div>

				</div>
				<div className = "m-control-table-head-td ">
					<div className= "m-control-table-head-tr">总面积:50</div>
					<div className= "m-control-table-head-tr">本月收入：0</div>
					<div className= "m-control-table-head-tr">建筑面积</div>

				</div>
				<div className = "m-control-table-head-td ">定价</div>
				<div className = "m-control-table-head-td ">调整成交价</div>
				<div className = "m-control-table-head-td ">调整成交价每工位</div>
				<div className = "m-control-table-head-td ">在租状态</div>
				<div className = "m-control-table-head-td ">客户名称</div>
				<div className = "m-control-table-head-td ">当前租金（元/月）</div>
				<div className = "m-control-table-head-td ">租期</div>
			</div>
		)
   }
	render(){
		const {communityIdList} = this.state;

		return(
			<div className="m-control-table" style={{minHeight:'910'}}>
				<Title value="访客记录"/>
      		<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>
           <SearchFormControlTable />
		   {this.generateHead()}
          </Section>
          
	     </div>

		);
	}
}

export default ControlTable;
