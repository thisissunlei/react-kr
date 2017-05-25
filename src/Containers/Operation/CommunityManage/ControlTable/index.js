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
			listData:['','','','','','',''],
			communityIdList:[],
			moveStyle:{},
			contentStyle:{}
		}
		this.getcommunity();

	}

	componentDidMount(){
		var _this = this;
		window.onscroll = function () {
			var left = document.getElementById("m-control-table-width").getBoundingClientRect().left;
			var t = document.documentElement.scrollTop || document.body.scrollTop;
			console.log(left,"LLLL");
			if(t>150){
				_this.setState({
					moveStyle:{
						position:"fixed",
						top:60,
						left:left,
						right:39,
						width:"auto",
						zIndex:99
			
					},
					contentStyle:{
						marginTop:145
					}
				})
				
			} else{
				_this.setState({
					moveStyle:{
						position:"relative"
					},
					contentStyle:{
						marginTop:0
					}
				})
				
			}
		}
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
	   let {moveStyle} = this.state;
		return (
			<div className = "m-control-table-head clearfix" style = {moveStyle}>
				<div className = "m-control-table-head-td head-td1">
					<div className= "m-control-table-head-tr">创业大街</div>
					<div className= "m-control-table-head-tr">当前出租率</div>
					<div className= "m-control-table-head-tr">
						<div className = "m-control-table-head-tr-td">编号</div>
						<div className = "m-control-table-head-tr-td">类型</div>
						<div className = "m-control-table-head-tr-td">容纳人数</div>
					</div>

				</div>
				<div className = "m-control-table-head-td ">
					<div className= "m-control-table-head-tr">总面积:50</div>
					<div className= "m-control-table-head-tr">本月收入：0</div>
					<div className= "m-control-table-head-tr">建筑面积</div>

				</div>
				<div className = "m-control-table-head-td ">定价</div>
				<div className = "m-control-table-head-td "><span>实际成交价</span></div>
				<div className = "m-control-table-head-td "><span>每工位实际</span><span>成交价</span><span>(元/月)</span></div>
				<div className = "m-control-table-head-td "><span>在租状态</span></div>
				<div className = "m-control-table-head-td "><span>客户名称</span></div>
				<div className = "m-control-table-head-td "><span>当前租金</span><span>（元/月）</span></div>
				<div className = "m-control-table-head-td ">租期</div>
			</div>
		)
   }
   //生成表格
   generateContent = () =>{
	   const {listData} = this.state;
	   let elem = listData.map(function(){
		   return (
				<div className = "m-control-table-content-tr clearfix">
						<div className="m-control-table-content-td clearfix">
							<div className="m-control-table-one-td">ggg</div>
							<div className="m-control-table-one-td">ggg</div>
							<div className="m-control-table-one-td">ggg</div>
						</div>
						
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>
						<div className="m-control-table-content-td">fdf</div>

				</div>
		   )

	   })
	   return elem;
   }


	render(){
		const {communityIdList,contentStyle} = this.state;

		return(
			<div className="m-control-table" style={{minHeight:'1510'}}>
				<Title value="访客记录"/>
				<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>
					<SearchFormControlTable />
					{this.generateHead()}
					<div className = "m-control-table-content clearfix" style = {contentStyle}>
						{this.generateContent()}

					</div>
					<div id = "m-control-table-width"></div>
				</Section>

	     </div>

		);
	}
}

export default ControlTable;
