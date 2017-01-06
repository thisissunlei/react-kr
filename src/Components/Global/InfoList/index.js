import {
	Link
} from 'react-router';

import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';

import Pagination from '../../Pagination';

import './index.less';

export default class InfoList extends Component {

	PropTypes = {
		items: React.PropTypes.isArray,
		current_parent: React.PropTypes.string,
		current_child: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);
		this.state= {
			infoTab:this.props.infoTab
		}
	}
	onPageChange=()=>{
		console.log('onPageChange');
	}
	onClose=()=>{
		let {onClose} = this.props;
		onClose && onClose();
	}
	componentWillMount() {
		console.log('pppppp',this.props.infoTab);

  	}
  	getInfoData=()=>{
  		let {infoTab} = this.state;
  		console.log('getInfoData',infoTab);
  		if(!infoTab){
  			return;
  		}
  		if(infoTab == 'community'){
  			console.log('community');
  		}
  	}
  	componentWillReceiveProps(next,state){
  		if(next != this.state.infoTab){
  			this.setState({
  				infoTab:next.infoTab
  			})
  		}
  		// console.log('pppppp');
  		this.getInfoData();
  	}
	render(){
		let pagination = 10;
		let totalCount = 100;
		let pageSize = 10;
		let page = 2;
		let infoList = [
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
		]
		let {infoTab} = this.props;

		if (!pagination) {
			return null;
		}
		return (
			<div className="ui-info-list">
				<div style={{padding:'36px 30px'}}>
					<span className="close-info icon-close" onClick={this.onClose}></span>
					<p style={{marginBottom:30}}>
					<span className="icon-info ui-m-info-logo"></span>
					<span className="ui-m-info-title">合同到期信息提醒 :</span>
					</p>
					{infoList.map((item,index)=>{
						return(
							<p className="ui-m-info-content" key={index}>
								<span className="ui-m-info-contents">{item.info}</span>
								<span className="ui-m-info-date">{item.date}</span>
							</p>
						)
					})}
				</div>
				<div style={{paddingRight:'15px'}}>
				<Pagination totalCount={totalCount} page={page} pageSize={pageSize} onPageChange={this.onPageChange} pageJump={3}/>
				</div>
			</div>
		);
	}

}
