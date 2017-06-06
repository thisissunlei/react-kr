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
	Message,
	Nothing,
	Loading,
	Tooltip
} from 'kr-ui';
import SearchFormControlTable from './SearchForm';
import './index.less';
class ControlTable  extends React.Component{

	constructor(props){
		super(props);

		this.state={
			listData:[],
			communityIdList:[],
			moveStyle:{},
			contentStyle:{},
			searchParams:{
               communityId:'',
			   customerName:'',
			   page:1,
			   pageSize:15,
            },
			communityName:'',
			otherData:{
				incomeMonth:'',
				rentalRateStr:'',
				totalArea:'',
			},
			loading:true,
			newPage:1,
			allPage:0

		}
		

	}

//浏览器视口的高度
getWindowHeight = () => {
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
//文档的总高度
getScrollHeight = () => {
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//滚动条在Y轴上的滚动距离
getScrollTop = () => {
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
	componentDidMount(){
		var _this = this;
		
		window.onscroll = function () {

			var left = document.getElementById("m-control-table-width").getBoundingClientRect().left;
			var t = document.documentElement.scrollTop || document.body.scrollTop;

			if(_this.getScrollTop() + _this.getWindowHeight() == _this.getScrollHeight()){
				let {allPage,newPage,searchParams} = _this.state;
		　　　　if(allPage != newPage){
					console.log(newPage,">>>>");
					_this.setState({
						newPage:newPage+1,
						searchParams:{
							communityId:searchParams.communityId,
							customerName:searchParams.customerName,
							page:newPage+1,
							pageSize:searchParams.pageSize,
						},
					},function(){
						
						_this.getcommunity();
					})
					
			   }
		　　}
			if(t>145){
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
						marginTop:140
					}
				})
				
			}else{
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
		let {searchParams,listData,newPage} = this.state;
		if(newPage==1){
			this.setState({
				loading:true,
			})
		}
		
		
		let data = Object.assign({},searchParams)
		let arr = [].concat(listData);
		Http.request('control-table',data).then(function(response) {

			_this.setState({
				otherData:{
					incomeMonth:response.incomeMonth,
					rentalRateStr:response.rentalRateStr,
					totalArea:response.totalArea,
				},
				allPage:Math.ceil(response.totalCount),
				newPage:response.page,
				listData:arr.concat(response.items),
				loading:false
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
			   page:1,
			   pageSize:15
            },
			newPage:1,
			allPage:0,
			listData:[]
		},function(){
			this.getcommunity();
		})

   }
   //搜索下拉
   communityChange = (values) =>{
	   const {searchParams} = this.state;
		this.setState({
			searchParams:{
               communityId:values.value,
			   customerName:searchParams.customerName,
			   page:1,
			   pageSize:15,
			   
            },
			communityName:values.label,
			newPage:1,
			allPage:0,
			listData:[]

		},function(){
			this.getcommunity();
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
				<div className = "m-control-table-head-td " style = {{width:"5%"}}>报价</div>
				<div className = "m-control-table-head-td "><span>实际成交价</span></div>
				<div className = "m-control-table-head-td " style = {{width:"5%"}}>折扣</div>
				<div className = "m-control-table-head-td "><span className="m-control-table-head-span"><span>每工位实际</span><span>成交价</span><span>(元/月)</span></span></div>
				<div className = "m-control-table-head-td " style = {{width:"5%"}}><span>在租状态</span></div>
				<div className = "m-control-table-head-td " style = {{width:"17.5%"}}><span>客户名称</span></div>
				<div className = "m-control-table-head-td " style = {{width:"17.5%"}}>租期</div>
			</div>
		)
   }
   tooltip=(value)=>{
		var show=true;
		if(!value){
			return;
		}
		if(value == "-"){
			show=false;

		}
		return (<div>
					{value}
					{
					   show &&(<Tooltip 
							className="tooltipTextStyle" 
							style={{padding:10, maxWidth:224,}} 
							offsetTop={5} 
							place='top'
						>
							<div 
								style={{width:160,minHeight:20,wordWrap:"break-word",padding:"10px",whiteSpace:"normal",lineHeight:"22px"}}
							>
							{value}
							</div>
						</Tooltip>)

					}
				</div>
				)
	}
   //生成表格
   generateContent = () =>{
	   const {listData} = this.state;
	   const _this = this;
	   if(listData && !listData.length){
			return <Nothing style = {{marginTop:50}}/>
	   }else{
		let elem = listData.map(function(item,index){
			return (
					<div className = "m-control-table-content-tr clearfix">
							<div className="m-control-table-content-td clearfix">
								<div className="m-control-table-one-td">{item.codeName}</div>
								<div className="m-control-table-one-td">{item.stationType=="STATION"?"工位":"独立空间"}</div>
								<div className="m-control-table-one-td">{item.capacity}</div>
							</div>
							
							<div className="m-control-table-content-td" >{item.area}</div>
							<div className="m-control-table-content-td" style = {{width:"5%"}}>{item.quotedPrice}</div>
							<div className="m-control-table-content-td" >{item.actualPrice}</div>
							<div className="m-control-table-content-td" style = {{width:"5%"}}>{item.discountStr}</div>
							<div className="m-control-table-content-td">{item.unitActualPrice}</div>
							<div className="m-control-table-content-td" style = {{width:"5%"}}>{item.rentalStatusStr}</div>
							<div className="m-control-table-content-td" style = {{width:"17.5%"}}>{item.company}</div>
							<div className="m-control-table-content-td" style = {{width:"17.5%"}}>{_this.tooltip(
								
								!item.leaseBegindate ?"-": DateFormat(item.leaseBegindate,"yyyy-mm-dd")+"至"+DateFormat(item.leaseEnddate,"yyyy-mm-dd")
								)
								}</div>

					</div>
			)

		})
		return elem;
	   }
   }


	render(){
		const {communityIdList,contentStyle,loading} = this.state;

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
						{loading?<Loading />:this.generateContent()}

					</div>
					<div id = "m-control-table-width"></div>
				</Section>

	     </div>

		);
	}
}

export default ControlTable;
