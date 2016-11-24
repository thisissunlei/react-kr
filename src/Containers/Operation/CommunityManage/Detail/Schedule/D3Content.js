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

export default class D3Content extends Component {


	static defaultProps = {
		detail: [],
		finaBluePointVo: [],
		finaRedPointVo: [],
		whiteBar:[]
	}

	static PropTypes = {
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

	}

	componentDidMount() {

	}

	// 计算第几天
	countDays(date) {
			var initial = (new Date('2016-1-1')).getTime();

			var offset = date - initial;
			return Math.floor(offset / 24 / 3600 / 1e3) + 1;
		}
		// 处理时间段
	dealTime() {
			var {
				detail
			} = this.props;
			var _this = this;
			var timeList = detail.map(function(item) {
				item.start = _this.countDays(item.begindate);
				item.end = _this.countDays(item.enddate);
				item.Begindate = dateFormat(item.begindate, "yyyy.mm.dd");
				item.Enddate = dateFormat(item.enddate, "yyyy.mm.dd");
				// item.width = parseInt((item.end - item.start) / 365 * width); //时间段的长度
				item.width = (item.end - item.start) / 365; //时间段的长度
				item.width = Math.round(item.width*100)/100;
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
				end: timeList[0].start - 1,
				width: Math.round(whiteWidth*100)/100
			}
			// whiteLength = $("<div class='white'></div>").css( {'width':whiteLength-1,});
		return whiteNode;
	}
	appendDiv(list, time) {
			var nowNode;
			list && list.map((item, index) => {
				if (index === 0 && item.start > time) {
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

			list.map((item) => {
				item.red = [];
				finaRedPointVo.map((value) => {
					if (item.installmentBegindate <= value.pointDate && item.installmentEnddate >= value.pointDate) {
						var obj = {};
						obj.pointDate = dateFormat(value.pointDate, "yyyy.mm.dd");
						item.red.push(obj);
					}
				})
			})
			return list;

		}
		// 获取相同时间节点天数(天)
	getSameTime() {
		var that = this;
		var {
			finaBluePointVo,
			finaRedPointVo
		} = this.props;
		let sameNode = [];
		finaBluePointVo.map((item) => {
			var blueNode = that.countDays(item.pointDate);
			finaRedPointVo.map((value) => {
				var redNode = that.countDays(value.pointDate);
				if (redNode === blueNode) {
					sameNode.push(redNode);
				}
			});

		})
		return sameNode;
	}

	renderBlueNode() {
		let sameNode = this.getSameTime();
		const {
			finaBluePointVo
		} = this.props;
		const that = this;
		var finaBluePointVoList = finaBluePointVo.map((item) => {
			return that.countDays(item.pointDate);
		});
		if (sameNode.length) {
			sameNode.map((item) => {
				finaBluePointVoList.map((value, index) => {
					if (item === value) {
						finaBluePointVoList.splice(index, 1);
					}
				})
			})

		}
		return finaBluePointVoList;

	}

	renderRedNode() {
		var sameNode = this.getSameTime();
		const {
			finaRedPointVo
		} = this.props;
		const that = this;
		var finaRedPointVoList = finaRedPointVo.map((item) => {
			return that.countDays(item.pointDate);
		});
		if (sameNode.length) {
			sameNode.map((item) => {
				finaRedPointVoList.map((value, index) => {
					if (item === value) {
						finaRedPointVoList.splice(index, 1);
					}
				})
			})
		}
		return finaRedPointVoList;

	}
	renderwhiteBar(){
		let {whiteBar} = this.props;
		let that = this;
		whiteBar = whiteBar.map((item)=>{
			let days = that.countDays(item);
			let num = Math.round((days/365)*100)/100;
			return num*100;
		})
		return whiteBar;
	}

	render() {
		var {
			finaBluePointVo,
			finaRedPointVo,
			id,
			detail
		} = this.props;
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
			var sameNode = this.getSameTime();
			list = this.getRedInfo(list);
			// console.log(list);
			// return false;
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
								<div className='grey' data-tip data-for={`${id}${index}`} data-event='mouseover' data-event-off='mouseleave' style={{'width':`${item.width*100}%`}} key={index}>
									<ReactTooltip id={`${id}${index}`} place="top" type="dark" effect="solid">
									{item.width && item.planTableModelList && item.planTableModelList.map((value, i)=>{
										return (
											<div key={i}>
												<p>{dateFormat(value.installmentReminddate, "yyyy.mm.dd")}日催款</p>
												<p>{value.stationnum}个位置({dateFormat(value.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(value.installmentEnddate, "yyyy.mm.dd")})</p>
												<p>负责人：{value.name}</p>
												<p>电话：{value.phone}</p>
												<p>催款金额：{value.installmentAmount}</p>
											</div>
										)
									})

									}
									</ReactTooltip>
								</div>
							)
						}else{
							return (
								<div className='blue' data-tip data-for={`${id}${index}`} style={{'width':`${item.width*100}%`}} key={index}>
									<ReactTooltip id={`${id}${index}`} place="top" type="dark" effect="solid">
									{item.planTableModelList && item.planTableModelList.map((value, i)=>{
										return (
											<div key={i}>
												<p>{dateFormat(value.installmentReminddate, "yyyy.mm.dd")}日催款</p>
												<p>{value.stationnum}个位置({dateFormat(value.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(value.installmentEnddate, "yyyy.mm.dd")})</p>
												<p>负责人：{value.name}</p>
												<p>电话：{value.phone}</p>
												<p>催款金额：{value.installmentAmount}</p>
											</div>
										)
									})

									}
									</ReactTooltip>
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
							<span className='blue-node' key={index} style={{marginLeft:`${(Math.round((item/365)*100)/100)*100}%`}}></span>
						)
					})
				}
				{
					redNodeList && redNodeList.map((item,index)=>{
						return (
							<span className='red-node' key={index} style={{marginLeft:`${(Math.round((item/365)*100)/100)*100}%`}}></span>
						)
					})
				}
				{
					sameNode && sameNode.map((item,index)=>{
						return (
							<span className='same-node' key={index} style={{marginLeft:`${(Math.round((item/365)*100)/100)*100}%`}}></span>
						)
					})
				}
				

			</div>

			
		</div>
		);
	}
}