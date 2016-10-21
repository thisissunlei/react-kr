import React, {Component, PropTypes} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
} from 'kr-ui';

import {KrField,LabelText} from 'kr-ui/Form';
import Date from 'kr-ui/Date';
import RaisedButton from 'material-ui/RaisedButton';

import { Button } from 'kr-ui/Button';
import {Actions,Store} from 'kr/Redux';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';

export default  class JoinDetail extends Component {


	constructor(props,context){
		super(props, context);


		this.state = {
			loading:true,
			basic:{
				payment:{
				},
			}
		}

		this.BasicRender = this.BasicRender.bind(this);

	}

	componentDidMount(){

		var _this = this;
		Store.dispatch(Actions.callAPI('show-checkin-agreement',{id:this.props.params.id})).then(function(response){
			_this.setState({
				basic:response,
				loading:false
			});
		});

	}

	componentWillMount(){

	}
	BasicRender(basic){

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
					<KrField component="labelText" grid={1/2} label="所属楼层" value={basic.wherefloor}/>

					<KrField component="labelText" grid={1/2} label="地址" value={basic.communityAddress}/>
					<KrField component="labelText" grid={1/2} label="合同编号" value={basic.contractcode}/>

					<KrField component="labelText" grid={1/2} label="支付方式" value={basic.payType && basic.payType.dicName}/>
								<KrField component="labelText" grid={1/2} label="租赁期限" value={basic.leaseBeginDate + '-' + basic.leaseEndDate}/>

					<KrField component="labelText" grid={1/2} label="首付款时间" value={basic.firstpaydate}/>
					<KrField component="labelText" grid={1/2} label="付款方式" value={basic.payment && basic.payment.dicName}/>

					<KrField component="labelText" label="签署日期" value={basic.signdate}/>

					<KrField component="group" label="租赁项目">
									<KrField component="labelText" label="工位" value={basic.stationnum}/>
									<KrField component="labelText" label="会议室" value={basic.boardroomnum}/>
						</KrField>

					<KrField component="labelText" label="租赁用途" value={basic.rentaluse}/>

					<KrField component="labelText" grid={1/2}  label="租金总额" value={basic.totalrent}/>
					<KrField component="labelText" grid={1/2} label="押金总额" value={basic.totaldeposit}/>

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

							{
								basic.stationList && basic.stationList.map((item,index)=>{
								
								return (
									<TableRow key={index}>
										<TableRowColumn>工位:{item.stationType}</TableRowColumn>
										<TableRowColumn>
										{item.stationId}
										</TableRowColumn>
										<TableRowColumn>
											{item.unitprice}
										</TableRowColumn>
										<TableRowColumn><Date.Format value={item.leaseBeginDate}/></TableRowColumn>
										<TableRowColumn><Date.Format value={item.leaseEnddate}/></TableRowColumn>
									</TableRow>
								);
								})
							}
									
							</TableBody>
						</Table>		

					</Section>
			</div>
		  );

	  };


  render() {

  	if(this.state.loading){
  		return(<Loading/>);
  	}

	 const orderBaseInfo = {};
	 const contractList = [];


	  const {basic} = this.state;

	function onCancel(){
		console.log('sss');
		window.history.back();
	}

    return (

      <div>

			<BreadCrumbs children={['社区运营',,'合同详情','入驻合同查看']}/>

			<Section title="入驻合同(查看)" description=""> 

			{this.BasicRender(basic)}
			  <Grid style={{marginTop:30}}>
				  <Row>
					  <Col md={4} align="center"></Col>
					  <Col md={2} align="center"> <RaisedButton  label="编辑"  type="submit" primary={true}/> </Col>
					  <Col md={2} align="center"> <RaisedButton  label="确定"  type="submit" primary={true} onTouchTap={onCancel}/> </Col>
					  <Col md={4} align="center"></Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

    );
  }
}





