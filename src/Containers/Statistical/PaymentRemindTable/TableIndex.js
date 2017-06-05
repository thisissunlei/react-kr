
import React from 'react';
import {

	// Title,
	// Section,
	
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import $ from 'jquery';

import State from './State';
import {
	observer
} from 'mobx-react';
@observer

export default class PaymentRemindTable extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			tebleWidth: 0 ,
			tableHeight: 0
			
		}
	}

	componentWillMount(){
		console.log("will window.width",$(window).width()-180-80,$(window).height()-100);

		this.setState({
			tebleWidth: $(window).width()-260,
			tableHeight: $(window).height()-60
		})
	}

	componentDidMount(){
		
		console.log("window.width",$(window).width()-180-80,$(window).height()-100);
		


	}

	
	render() {
		let {tebleWidth,tableHeight}= this.state;
		return (
			    <div className="table-index" style={{paddingBottom:20,width:"100%",}}>
			    	<div  style={{width:tebleWidth,height:tableHeight,border:"solid 1px #eee",overflow:"scroll"}} className="table-box">
			    		<div className="table-header">
			    			<div className="table-header-item">客户名称</div>
			    			<div className="table-header-item">合同编号</div>
			    			<div className="table-header-item">工位数量</div>
			    			<div className="table-header-item">起租日期</div>
			    			<div className="table-header-item">到期日期</div>
			    			<div className="table-header-item">付款周期</div>
			    			<div className="table-header-item">催款日期</div>
			    			<div className="table-header-item">款项</div>
			    			<div className="table-header-item">开始日期</div>
			    			<div className="table-header-item">结束日期</div>
			    			<div className="table-header-item">应缴款项</div>
			    			<div className="table-header-item">金额</div>
			    			<div className="table-header-item">差额</div>
			    			<div className="table-header-item">发票</div>
			    			<div className="table-header-item">操作</div>
			    		</div>
			    		<div className="table-items"></div>
			    	</div>
			    	<div className="export">导出</div>
				</div>
		);

	}

}

