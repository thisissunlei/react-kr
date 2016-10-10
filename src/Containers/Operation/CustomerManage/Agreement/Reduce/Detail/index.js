/*
 *减租协议(查看）
 *
 *
 */

import React, {Component, PropTypes} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
} from 'kr-ui';

import {KrField,LabelText} from 'kr-ui/Form';


import { Button } from 'kr-ui/Button';
import {Actions,Store} from 'kr/Redux';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';

export default  class ReduceDetail extends Component {


	constructor(props,context){
		super(props, context);


		this.state = {
			loading:true,
			basic:{
				payment:{
				},
				stationList:[]
			}
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('showFnaContractRentController')).then(function(response){
			_this.setState({
				basic:response
			});
		});

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},2000);


	}

	componentWillMount(){

	}


  render() {

  	if(this.state.loading){
  		return(<Loading/>);
  	}

	 const orderBaseInfo = {};
	 const contractList = [];


	  const {basic} = this.state;

	  const BasicRender = (props)=>{

		  return (
				  <div>

								<KrField component="labelText" grid={1/2} label="出租方" value={basic.lessorName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.lessorAddress}/>

								<KrField component="labelText" grid={1/2} label="联系人" value={basic.lessorContactName}/>
								<KrField component="labelText" grid={1/2} label="电话" value={basic.lessorContacttel}/>

								<KrField component="labelText" grid={1/2} label="承租方" value={basic.customerName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.leaseAddress}/>

								<KrField component="labelText" grid={1/2} label="联系人" value={basic.leaseContact}/>
								<KrField component="labelText" grid={1/2} label="电话" value={basic.leaseContacttel}/>

								<KrField component="labelText" grid={1/2} label="所属社区" value={basic.communityName}/>
								<KrField component="labelText" grid={1/2} label="地址" value={basic.communityAddress}/>

								<KrField component="labelText" grid={1/2} label="合同编号" value={basic.contractcode}/>
								<KrField component="labelText" grid={1/2} label="减租金额" value={basic.rentamount}/>

								<KrField component="labelText" label="签署日期" value={basic.signdate}/>

								<KrField component="labelText"  label="备注" value={basic.contractmark}/>

								<KrField component="labelText" label="上传附件" value={basic.contractfile}/>

											
			<Section title="租赁明细" description=""> 

											<Table>
															<TableHeader>
																	<TableHeaderColumn>类别</TableHeaderColumn>
																	<TableHeaderColumn>编号／名称</TableHeaderColumn>
																	<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
																	<TableHeaderColumn>起始日期</TableHeaderColumn>
																	<TableHeaderColumn>结束日期</TableHeaderColumn>
															</TableHeader>
															<TableBody>

															{basic.list && basic.list.map((item,index)=>{
																return (
																	 <TableRow key={index}>
																	<TableRowColumn>{item.stationtype}</TableRowColumn>
																	<TableRowColumn>
																		{item.stationid}
																	</TableRowColumn>
																	<TableRowColumn>
																		{item.unitprice}
																	</TableRowColumn>
																	<TableRowColumn><Date.Format value={item.leaseBegindate}/></TableRowColumn>
																	<TableRowColumn><Date.Format value={item.leaseEnddate}/></TableRowColumn>
																   </TableRow>
																	);
															})}
																
														   </TableBody>
													 </Table>		



						  

											  </Section>
				  </div>
		  );

	  }

    return (

      <div>

			<BreadCrumbs children={['社区运营',,'合同详情','入驻合同查看']}/>

			<Section title="入驻合同(查看)" description=""> 
				<BasicRender/>
			</Section>

      </div>

    );
  }
}





