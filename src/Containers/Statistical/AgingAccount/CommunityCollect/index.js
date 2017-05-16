

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	KrField,
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn,
	TableFooter

} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

import SearchDetailForm from "./SearchDetailForm";

export default class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			searchParams: {
				beginDate:'',
				cityId:'',
				countyId: '',
				endDate:'',
				name:'',
				page: 1,
				pageSize: 15,
				type:''
			}	
		}
	}


	componentDidMount() {
		var _this = this;
		

		
	}

	onChangeTime=()=>{

	}

	render(){
		let _this = this;
		return(
			<div className="community-collect">
				<div className="community-collect-box">
					<div className="search-form-community-collect">
						
							<SearchDetailForm/>
						
					</div>
					<div className="community-collect-table-box">
						
						<table>

							<thead>
								<tr>
									<th rowSpan="2">城市</th>
				                  	<th rowSpan="2">社区</th>
				                  	<th colSpan="2">应收账款</th>
				                  	<th colSpan="2">实收账款</th>
				                  	<th colSpan="2">欠费情况</th>
				                  	<th rowSpan="2">应缴滞纳金</th>
				                  	<th rowSpan="2">应催缴金额合计</th>
								</tr>
								<tr>

				                  	<th>工位服务费</th>
				                  	<th>履约保证金</th>
				                  	<th>工位服务费</th>
				                  	<th>履约保证金</th>
				                  	<th>工位服务费</th>
				                  	<th>履约保证金</th>
								</tr>

							</thead>
							<tbody>


							</tbody>









						</table>
						{/*<Table
			              style={{marginTop:8}}
			              ajax={true}
			              onOperation={this.onOperation}
			              displayCheckbox={true}
			              exportSwitch={false}
			              ajaxParams={this.state.searchParams}
			              ajaxUrlName='myAddressList'
			              ajaxFieldListName="items"
			              displayCheckbox={false}
					    >
		                <TableHeader>

		                  
		                 <tr>
		                  	<th>城市</th>
		                  	<th>社区</th>
		                  	<th>应收账款</th>
		                  	<th>实收账款</th>
		                  	<th>欠费金额</th>
		                  	<th>应缴滞纳金</th>
		                  	<th>应缴滞纳金</th>
		                  </tr>
		                 
		                </TableHeader>
						<tr>
		                  	<th>城市</th>
		                  	<th>社区</th>
		                  	<th>应收账款</th>
		                  	<th>实收账款</th>
		                  	<th>欠费金额</th>
		                  	<th>应缴滞纳金</th>
		                  	<th>应缴滞纳金</th>
		                  </tr>
		              <TableBody >
		                    <TableRow>
		                       <TableRowColumn name="communityName"></TableRowColumn>
		                       <TableRowColumn name="wifiName"></TableRowColumn>
		                       <TableRowColumn name="wifiPwd"></TableRowColumn>
		                       <TableRowColumn name="managerName"></TableRowColumn>
		                       <TableRowColumn name="managerPhone"></TableRowColumn>
		                      
		                    </TableRow>
		              </TableBody>
		              <TableFooter></TableFooter>
		            </Table>*/}

					</div>
				</div>
			</div>

		);
	}
}
