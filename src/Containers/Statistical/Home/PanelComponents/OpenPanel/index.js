import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
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
	ListGroup,
	ListGroupItem,
	Form

} from 'kr-ui';
import './index.less';
import SearchDateForm from './SearchDateForm';
export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
			searchParams: {
				endDate:'2016-09-09',
				startDate:'2016-09-01',
				groupId:1
			}

		}

	}

    

	render(){

		return(

			<div className='ui-open-info'>
				   <Grid style={{height:'76'}}>
						<Row>
							<Col align="left" md={4} style={{marginTop:'25'}}> 
							 <span  className='ui-pic-open'>招商数据统计-</span>
							 <span  className='static-openCompany'>已开业</span>	
							 <span  className='static-upload'>实时更新</span>	
							</Col> 
							<Col align="right" md={8}> 
							  <SearchDateForm />
							</Col> 
						</Row>
					</Grid>

				   <div className='ui-table-wrap'>
					<Table style={{marginTop:0}}
						displayCheckbox={false}
						ajax={true}
						ajaxUrlName='openCompanyData'
						ajaxFieldListName="list"
						  >
					<TableHeader>
					<TableHeaderColumn>城市</TableHeaderColumn>
					<TableHeaderColumn>社区</TableHeaderColumn>
					<TableHeaderColumn>总工位数</TableHeaderColumn>
					<TableHeaderColumn>可出租工位数</TableHeaderColumn>
					<TableHeaderColumn>已出租工位数</TableHeaderColumn>
					<TableHeaderColumn>剩余工位数</TableHeaderColumn>
					<TableHeaderColumn>出租率</TableHeaderColumn>
					<TableHeaderColumn>上期出租率</TableHeaderColumn>
					<TableHeaderColumn>出租率变化</TableHeaderColumn>
					<TableHeaderColumn>环比</TableHeaderColumn>
					<TableHeaderColumn>新增意向工位数</TableHeaderColumn>
					<TableHeaderColumn>累计意向工位数</TableHeaderColumn>
					<TableHeaderColumn>平均单价</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow>
						<TableRowColumn name="cityName" ></TableRowColumn>
						<TableRowColumn name="communityName"></TableRowColumn>
						<TableRowColumn name="totalStation"></TableRowColumn>
						<TableRowColumn name="unUsedStation" ></TableRowColumn>
						<TableRowColumn name="usedStation"></TableRowColumn>
						<TableRowColumn name="leftStation"></TableRowColumn>
						<TableRowColumn name="rate"></TableRowColumn>
						<TableRowColumn name="lastRate"></TableRowColumn>
						<TableRowColumn name="rateChange"></TableRowColumn>
						<TableRowColumn name="chainRate"></TableRowColumn>
						<TableRowColumn name="newIntention"></TableRowColumn>
						<TableRowColumn name="totalIntention"></TableRowColumn>
						<TableRowColumn name="averagePrice"></TableRowColumn>
					 </TableRow>
				</TableBody>
				</Table>
              </div>

			</div>
		);
	}

}
