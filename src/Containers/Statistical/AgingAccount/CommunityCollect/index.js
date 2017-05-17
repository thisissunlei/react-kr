

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	KrField,

} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

import SearchDetailForm from "./SearchDetailForm";
import TableIndex from "./TableIndex";

import {
	observer
} from 'mobx-react';

import State from './State';

import $ from 'jquery';

@observer



export default class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			communityBoxStyle:{},
      		
		}
	}


	componentDidMount() {
		
		State.getStatical({page:1});
		
	}

	onChangeTime=()=>{

	}

	renderTbody=()=>{
		let _this =this;
		return(
				<tbody>
					<tr className="tbody-first-tr">
			          	<td>全国</td>
			          	<td>全部</td>
			          	<td>全国</td>
			          	<td>全部</td>
			          	<td>全国</td>
			          	<td>全部</td>
			          	<td>全国</td>
			          	<td>全部</td>
			          	<td>全国</td>
			          	<td>全部</td>
					</tr>
					{
						_this.renderTbodySecondPart()
					}
				</tbody>
			)
	}

	renderTbodySecondPart=()=>{

		return(

			State.items.map((item,index)=>{
				return(
					<tr key={index}>

						<td>{item.address}</td>
						<td>{item.countyName}</td>
						<td>{item.pcCoverPic}</td>


					</tr>
				)

			})

		)
		
	}

	

	render(){
		let _this = this;
		const rows = [
			  ['a1', 'b1', 'c1'],
			  ['a2', 'b2', 'c2'],
			  ['a3', 'b3', 'c3'],
			  // .... and more
			];
		let {dataList} = this.state;
		return(
			<div className="community-collect">
				<div className="community-collect-box">
					<div className="search-form-community-collect">
						
							<SearchDetailForm/>
						
					</div>
					<div className="community-collect-table-box">
						<TableIndex/>
						{/*<table className="community-collect-table" style={{tableLayout:"fixed"}}>

							<thead>
								<tr className="first-tr">
									<th rowSpan="2">城市</th>
				                  	<th rowSpan="2">社区</th>
				                  	<th colSpan="2">应收账款</th>
				                  	<th colSpan="2">实收账款</th>
				                  	<th colSpan="2">欠费情况</th>
				                  	<th rowSpan="2">应缴滞纳金</th>
				                  	<th rowSpan="2">应催缴金额合计</th>
								</tr>
								<tr className="second-tr">

				                  	<th className="deep-blue">工位服务费</th>
				                  	<th className="deep-blue">履约保证金</th>
				                  	<th className="light-blue">工位服务费</th>
				                  	<th className="light-blue">履约保证金</th>
				                  	<th className="deep-blue">工位服务费</th>
				                  	<th className="deep-blue">履约保证金</th>
								</tr>

							</thead>
							
								

							{_this.renderTbody()}
								
							

						</table>*/}
						

						
					</div>
				</div>
			</div>

		);
	}
}
