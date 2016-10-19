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

		return(

			<div>

					<Row>
						<Col md={4} ><LabelText label="社区名称" /></Col>
						<Col md={4} ><LabelText label="客户名称" /></Col>
						<Col md={4} ><LabelText label="订单名称"/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="当前工位数" /></Col>
						<Col md={4} ><LabelText label="起始日期" /></Col>
						<Col md={4} ><LabelText label="结束日期"  type="date"/></Col>
					</Row>
					<Row>
						<Col md={4} ><LabelText label="撤场日期" type="date"/></Col>
						<Col md={4} ><LabelText label="订单总额" type="date"/></Col>
						<Col md={4} ><LabelText label="回款总额"  /></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="未回款额" /></Col>
						<Col md={4} ><LabelText label="工位回款" /></Col>
						<Col md={4} ><LabelText label="实收押金" /></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="实收定金" /></Col>
						<Col md={4} ><LabelText label="其他回款" /></Col>
						<Col md={4} ><LabelText label="营业外收入汇款" /></Col>		
					</Row>

					<Row>
						<Col md={4} ><LabelText label="生活消费收入回款"  width={150}/></Col>
						<Col md={4} ><LabelText label="工位收入"  width={160}/></Col>
						<Col md={4} ><LabelText label="其他收入" /></Col>
					</Row>

					<Row>

						<Col md={4} ><LabelText label="营业外收入" /></Col>
						<Col md={4} ><LabelText label="生活消费收入" /></Col>
						<Col md={4} ></Col>
					</Row>
					<Row>						
						<Col md={4} ><LabelText label="订单描述" /></Col>
					</Row>
			</div>		

		);

	}

}




