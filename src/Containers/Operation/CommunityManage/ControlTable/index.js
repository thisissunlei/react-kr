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
			contentStyle:{},
			searchParams:{
               communityId:'',
			   customerName:'',
            },
			communityName:'',
			otherData:{
				incomeMonth:'',
				rentalRateStr:'',
				totalArea:'',
			},

		}
		this.getcommunity();

	}

	componentDidMount(){
		var _this = this;
		window.onscroll = function () {
			var left = document.getElementById("m-control-table-width").getBoundingClientRect().left;
			var t = document.documentElement.scrollTop || document.body.scrollTop;
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
		let {searchParams} = this.state;
		Http.request('control-table',searchParams).then(function(response) {

			_this.setState({
				otherData:{
					incomeMonth:response.incomeMonth,
					rentalRateStr:response.rentalRateStr,
					totalArea:response.totalArea,
				},
				listData:response.items
			})


		}).catch(function(err) {



		});
	}

   //搜索框确定
   onSubmit = (values) =>{
	   const {searchParams} = this.state;
		this.setState({
			searchParams:{
               communityId:searchParams.communityId,
			   customerName:values.content,
            }
		})

   }
   //搜索下拉
   communityChange = (values) =>{
	   const {searchParams} = this.state;
		this.setState({
			searchParams:{
               communityId:values.value,
			   customerName:searchParams.customerName,
            },
			communityName:values.label,

		})
   }
   //生成头部
   generateHead = () =>{
	   let {moveStyle,communityName} = this.state;
		return (
			<div className = "m-control-table-head clearfix" style = {moveStyle}>
				<div className = "m-control-table-head-td head-td1">
					<div className= "m-control-table-head-tr">{communityName}</div>
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
				<div className = "m-control-table-head-td "><span className="m-control-table-head-span"><span>每工位实际</span><span>成交价</span><span>(元/月)</span></span></div>
				<div className = "m-control-table-head-td "><span>在租状态</span></div>
				<div className = "m-control-table-head-td "><span>客户名称</span></div>
				<div className = "m-control-table-head-td "><span className="m-control-table-head-span"><span>当前租金</span><span>（元/月）</span></span></div>
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
			<div className="m-control-table" style={{minHeight:'910'}}>
				<Title value="访客记录"/>
				<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>
					<SearchFormControlTable 
						communityChange = {this.communityChange}
						onSubmit = {this.onSubmit}
					 />
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
