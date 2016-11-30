import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
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
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	BreadCrumbs
} from 'kr-ui';

import {
	findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import dateFormat from 'dateformat';
import $ from 'jquery';

export default class D3Content extends Component {


	static defaultProps = {
		detail: [],
		finaBluePointVo: [],
		finaRedPointVo: [],
		whiteBar:[]
	}

	static propTypes = {
		params: React.PropTypes.object,
		detail: React.PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		this.countDays = this.countDays.bind(this);
		this.dealTime = this.dealTime.bind(this);
		this.getSpace = this.getSpace.bind(this);
		this.appendDiv = this.appendDiv.bind(this);
		this.timeNode = this.timeNode.bind(this);
		this.getSameTime = this.getSameTime.bind(this);
		this.renderBlueNode = this.renderBlueNode.bind(this);
		this.getRedInfo = this.getRedInfo.bind(this);
		this.renderRedNode = this.renderRedNode.bind(this);
		this.renderwhiteBar = this.renderwhiteBar.bind(this);
		this.sameNode = this.getSameTime();

	}

	componentDidMount() {

	}

	// 计算第几天
	countDays(date) {
		var {currentYear} = this.props;
		let year = `${currentYear}-1-1`;
		// var initial = (new Date('2016-1-1')).getTime();
		var initial = (new Date(year)).getTime();
		var offset = date - initial;
		// console.log(date,initial);
		return (offset / 24 / 3600 / 1e3) + 1;	
		// return Math.ceil(offset / 24 / 3600) + 1;
		}
		// 处理时间段
	dealTime() {
			var {
				detail
			} = this.props;

			detail = Object.assign({},detail);

			let width;
			var _this = this;
			let newArr = [];
			
			for(let j in detail){
			  for(let prop in detail[j]){
			      if(prop!=''||detail[j][prop]!=''){
			          	newArr.push(detail[j]);	
			      }
			  }
			};
			var unique = {};
		    newArr.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
		    newArr= Object.keys(unique).map(function(u){return JSON.parse(u) });

			var timeList = newArr.map(function(item) {
				item.start = _this.countDays(item.begindate);
				item.end = _this.countDays(item.enddate);
				item.Begindate = dateFormat(item.begindate, "yyyy.mm.dd");
				item.Enddate = dateFormat(item.enddate, "yyyy.mm.dd");
				// item.width = parseInt((item.end - item.start) / 365 * width); //时间段的长度
				width = (item.end - item.start) / 365; //时间段的长度
				// item.width = Math.ceil(width*100)/100;
				// item.left = Math.ceil((item.start*10000/365)*100)/10000 ;
				item.width = (width*100)/100;
				item.left = ((item.start*10000/365)*100)/10000 ;
				item.left = item.left;
				return item;
			});
			return timeList;
		}
		// 获取分期前的空白时间段
	getSpace(timeList) {
		let whiteLength;
		// var whiteWidth = parseInt((timeList[0].start) / 365 * width);
		var whiteWidth = (timeList[0].start) / 365;
		var whiteNode = {
				start: 0,
				end: timeList[0].start,
				// width: Math.ceil(whiteWidth*100)/100
				width: (whiteWidth*100)/100
			}
			// whiteLength = $("<div class='white'></div>").css( {'width':whiteLength-1,});
		return whiteNode;
	}
	appendDiv(list, time) {
			var nowNode;
			list && list.map((item, index) => {
				if (index === 0 && item.begindate > time) {
					nowNode = 0;
				}
				if (index === list.length - 1 && item.end < time) {
					nowNode = index + 1;
				}
				if (item.start <= time && item.end >= time) {
					nowNode = index;
				}
			});
			return nowNode;
		}
		// 催款时间和工位变更时间节点位置（px）
	timeNode(date) {
			var days = this.countDays(date);
			var marginLeft = days / 365 ;
			marginLeft = Math.round(marginLeft*100)/100
			// var marginLeft = parseInt(days / 365 * width);
			return marginLeft;
		}
		// 插入催款信息
	getRedInfo(list) {
			var {
				finaRedPointVo
			} = this.props;
			let newArr = [];
			
			for(let j in finaRedPointVo){
			  for(let prop in finaRedPointVo[j]){
			      if(prop!=''||finaRedPointVo[j][prop]!=''){
			          	newArr.push(finaRedPointVo[j]);	
			      }
			  }
			};
			var unique = {};
		    newArr.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
		    newArr= Object.keys(unique).map(function(u){return JSON.parse(u) });
			newArr.map((item) => {
				item.red = [];
				finaRedPointVo.map((value) => {
					if (item.installmentBegindate <= value.pointDate && item.installmentEnddate >= value.pointDate) {
						var obj = {};
						obj.pointDate = dateFormat(value.pointDate, "yyyy.mm.dd");
						item.red.push(obj);
					}
				})
			})
			return newArr;

		}
		// 获取相同时间节点天数(天)
	getSameTime() {
		var that = this;
		var {
			finaBluePointVo,
			finaRedPointVo
		} = this.props;
		finaBluePointVo = [].concat(finaBluePointVo);
		finaRedPointVo = [].concat(finaRedPointVo);
		let sameNode = [];

		finaBluePointVo.map((item) => {
			finaRedPointVo.map((value) => {
				if (item.pointDay === value.pointDay) {
					let node = $.extend(item, value);
					sameNode.push(node);
				}
			});

		})
		var unique = {};
		    sameNode.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
		    sameNode= Object.keys(unique).map(function(u){return JSON.parse(u) });
		return sameNode;
	}

	renderBlueNode() {
		
		let {
			finaBluePointVo
		} = this.props;

		const that = this;
		let finaBluePointVoList = finaBluePointVo.map((item) => {
			item.pointDay = that.countDays(item.pointDate);
			return item;
		});
		if (this.sameNode.length) {
			this.sameNode.map((item) => {
				item.pointDay = that.countDays(item.pointDate);
				finaBluePointVoList.map((value, index) => {
					console.log('same',item,value);
					if (item.pointDay === value.pointDay) {
						finaBluePointVoList.splice(index, 1);
					}
				})
			})

		}
		console.log('finaBluePointVoList',finaBluePointVoList);
		return finaBluePointVoList;

	}

	renderRedNode() {

		// var sameNode = this.getSameTime();
		let {
			finaRedPointVo
		} = this.props;

		// finaRedPointVo = new Array(finaRedPointVo);
		let finaRedPointVoList = finaRedPointVo;

		const that = this;
		let newArr = [];
			
		for(let j in finaRedPointVo){
			if(!finaRedPointVo[j].pointDate){
				finaRedPointVoList.splice(j, 1);
			}
		};
		finaRedPointVoList = finaRedPointVoList.map((item) => {
			item.pointDay = that.countDays(item.pointDate);
			return item;
		});
		// if (this.sameNode.length) {
		// 	this.sameNode.map((item) => {
		// 		finaRedPointVoList.map((value, index) => {
		// 			if (item.pointDay === value.pointDay) {
		// 				console.log('---');
		// 				finaRedPointVoList.splice(index, 1);
		// 			}
		// 		})
		// 	})
		// }
		if (this.sameNode.length) {
			this.sameNode.map((item) => {
				item.pointDay = that.countDays(item.pointDate);
				finaRedPointVoList.map((value, index) => {
					if (item.pointDay === value.pointDay) {
						console.log('same',item,value);
						finaRedPointVoList.splice(index, 1);
					}
				})
			})

		}
		console.log('finaRedPointVoList',finaRedPointVoList,finaRedPointVo,this.sameNode);
		return finaRedPointVoList;

	}
	renderwhiteBar(){
		let {whiteBar} = this.props;
		let that = this;
		whiteBar = whiteBar.map((item)=>{
			let days = that.countDays(item);
			let num = (days*10000/365)/10000*100;
			// let num = Math.ceil((days*10000/365)/10000*100) ;
			return num;
		})
		// if(whiteBar.length>1){whiteBar.pop();}
		
		return whiteBar;
	}

	render() {
		var {
			finaBluePointVo,
			finaRedPointVo,
			id,
			detail,
			currentYear
		} = this.props;
		let that = this;
		if (detail.length) {
			// 获取当前时间
			var timestamp = new Date().getTime();
			var now = this.countDays(timestamp);
			// 处理时间段
			var list = this.dealTime();
			var whiteNode = this.getSpace(list);
			list.unshift(whiteNode);
			var nodeList = this.appendDiv(list, now);
			var redNodeList = this.renderRedNode();
			var blueNodeList = this.renderBlueNode();
			var sameNode = this.sameNode;
			// console.log(blueNodeList,redNodeList);
		} else {
			var list = [{
				width: "100%",
				content: true
			}];
		}
		let whiteBar = this.renderwhiteBar();





		return (

			<div className="d3-container">
			<div className="year">
				{list.map((item,index)=>{
						if(index === 0 ){
							return(
								<div className='white' style={{'width':`${item.width*100}%`}} key={index}>
									{item.content?<span></span>:''}
									
								</div>

								)
						}else if(index<nodeList && index !== 0){
							return(
								<div className='grey' style={{'width':`${item.width*100}%`,marginLeft:`${item.left}%`}} key={index} >
								</div>
							)
						}else{
							return (
								<div className='blue' style={{'width':`${item.width*100}%`,marginLeft:`${item.left}%`}} key={index}>
								</div>
							)
						}
					})}

				{
					whiteBar && whiteBar.map((item,index)=>{
						return(
							<span className="wihiteBar" style={{marginLeft:`${item}%`}} key={index}></span>
						)
					})
				}
				{
					blueNodeList && blueNodeList.map((item,index)=>{
						return (
							<span className='blue-node' key={index} style={{marginLeft:`${(Math.round((item.pointDay/365)*100)/100)*100}%`}} data-tip data-for={`${item.pointDate}${item.newStationNum}${index}`}>
							<ReactTooltip id={`${item.pointDate}${item.newStationNum}${index}`} place="top" type="dark" effect="solid" >
								<div key={index} className="react-tooltip-content">
									<span>工位变更</span>
									<p>{item.finaName}({dateFormat(item.leaseBeginDate, "yyyy.mm.dd")}-{dateFormat(item.leaseEndDate, "yyyy.mm.dd")})</p>
									<p>变更前工位：<span className='blue-content'>{item.oldStationNum}</span></p>
									<p>变更后工位：<span className='blue-content'>{item.newStationNum}</span></p>
								</div>
							</ReactTooltip>
							</span>
						)
					})
				}
				{
					redNodeList && redNodeList.map((item,index)=>{
						return (
							<span className='red-node' key={index} style={{marginLeft:`${(Math.round((item.pointDay/365)*100)/100)*100}%`}} data-tip data-for={`${item.pointDate}${index}red`}>
								<ReactTooltip id={`${item.pointDate}${index}red`} place="top" type="dark" effect="solid" >
											<div key={index} className="react-tooltip-content">
												<span>分期催款</span>
												<p>{dateFormat(item.plan.installmentReminddate, "yyyy.mm.dd")}日催款({dateFormat(item.plan.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(item.plan.installmentEnddate, "yyyy.mm.dd")})</p>
												<p>{item.plan.stationnum}个位置({dateFormat(item.plan.billStartDate, "yyyy.mm.dd")}-{dateFormat(item.plan.billEndDate, "yyyy.mm.dd")})</p>
												<p>负责人：<span className='red-content'>{item.plan.name}</span></p>
												<p>电话：<span className='red-content'>{item.plan.phone}</span></p>
												<p>催款金额：<span className='red-content'>{item.plan.installmentAmount}</span></p>
											</div>
									</ReactTooltip>
							</span>
						)
					})
				}
				{
					sameNode && sameNode.map((item,index)=>{
						return (
							<div className='same-div'  key={index}style={{marginLeft:`${(Math.round((item.pointDay/365)*100)/100)*100}%`}}>
								<span className='blue-node' data-tip data-for={`${item.pointDate}${item.newStationNum}${index}sameblue`}>
									<ReactTooltip id={`${item.pointDate}${item.newStationNum}${index}sameblue`} place="top" type="dark" effect="solid" >
										<div className="react-tooltip-content">
											<span>工位变更</span>
											<p>{item.finaName}({dateFormat(item.leaseBeginDate, "yyyy.mm.dd")}-{dateFormat(item.leaseEndDate, "yyyy.mm.dd")})</p>
											<p>变更前工位：<span className='blue-content'>{item.oldStationNum}</span></p>
											<p>变更后工位：<span className='blue-content'>{item.newStationNum}</span></p>
										</div>
									</ReactTooltip>
								</span>
								<span className='red-node' data-tip data-for={`${item.pointDate}${item.newStationNum}${index}samered`}>
									<ReactTooltip id={`${item.pointDate}${item.newStationNum}${index}samered`} place="top" type="dark" effect="solid" >
											<div className="react-tooltip-content">
												<span>分期催款</span>
												<p>{dateFormat(item.plan.installmentReminddate, "yyyy.mm.dd")}日催款({dateFormat(item.plan.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(item.plan.installmentEnddate, "yyyy.mm.dd")})</p>
												<p>{item.stationnum}个位置({dateFormat(item.plan.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(item.plan.installmentEnddate, "yyyy.mm.dd")})</p>
												<p>负责人：<span className='red-content'>{item.plan.name}</span></p>
												<p>电话：<span className='red-content'>{item.plan.phone}</span></p>
												<p>催款金额：<span className='red-content'>{item.plan.installmentAmount}</span></p>
											</div>
									</ReactTooltip>
							</span>
							</div>
						)
					})
				}
				

			</div>

			
		</div>
		);
	}
}