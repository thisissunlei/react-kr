import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

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
	Notify,
	List,
 	ListItem,
 	KrField,
	LabelText,
} from 'kr-ui';


export default class BasicInfo extends Component{

	static defaultProps = {
		detail:{

		},
	}

	static PropTypes = {
		detail:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {
        
	}

	render(){
          
         const {detail} =this.props;
		 

		return(

			<div>   

			           <KrField grid={1/3} label="社区名称" component="labelText" value={detail.communityname}/>
			           <KrField grid={1/3} label="客户名称" component="labelText" value={detail.customername}/>
			           <KrField grid={1/3} label="订单名称" component="labelText" value={detail.mainbillname}/>

                        <KrField grid={1/3} label="当前工位数" component="labelText" value={detail.totalstationnum}/>
			           <KrField grid={1/3} label="起始日期" component="labelText" value={detail.startdate}/>
			           <KrField grid={1/3} label="结束日期" component="labelText" value={detail.enddate}/>

			            <KrField grid={1/3} label="撤场日期" component="labelText" value={detail.leavedate}/>
			           <KrField grid={1/3} label="订单总额" component="labelText" value={detail.totalamount}/>
			           <KrField grid={1/3} label="回款总额" component="labelText" value={detail.totalPayment}/>

			            <KrField grid={1/3} label="未回款额" component="labelText" value={detail.notPaymentAmount}/>
			           <KrField grid={1/3} label="工位回款" component="labelText" value={detail.gonweihuikuan}/>
			           <KrField grid={1/3} label="实收押金" component="labelText" value={detail.yajin}/>


			            <KrField grid={1/3} label="实收定金" component="labelText" value={detail.dinjin}/>
			           <KrField grid={1/3} label="其他回款" component="labelText" value={detail.qitahuikuan}/>
			           <KrField grid={1/3} label="营业外收入汇款" component="labelText" value={detail.yingshouhuikuan}/>


			            <KrField grid={1/3} label="生活消费收入回款" component="labelText" value={detail.shenghuoxiaofeihuikuan}/>
			           <KrField grid={1/3} label="工位收入" component="labelText" value={detail.gonweishouru}/>
			           <KrField grid={1/3} label="其他收入" component="labelText" value={detail.qitashouru}/>

			            <KrField grid={1/3} label="营业外收入" component="labelText" value={detail.yingshoushouru}/>
			           <KrField grid={1/3} label="生活消费收入" component="labelText" value={detail.shenghuoxiaofeishouru}/>
			           <KrField grid={1/3} component="labelText"/>
			           <KrField grid={1} label="订单描述" component="labelText" value={detail.mainbilldesc}/>
		
			</div>		

		);

	}

}




