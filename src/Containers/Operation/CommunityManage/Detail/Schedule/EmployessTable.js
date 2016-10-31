import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

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
	BreadCrumbs,
	Form,
	KrField,
	IframeContent,
} from 'kr-ui';

class Distribution extends Component {

	constructor(props,context){
		super(props,context);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);

		
	}

	onCancel (){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	onSubmit(form){
		
		const {onSubmit} = this. props;
		onSubmit && onSubmit(form);
	}

	render(){

		let { optionValues,stationId,customerId,communityId} = this.props;
		console.log(this.props)
		let initialValues = {};
			initialValues.stationId=stationId;
			initialValues.customerId=customerId;
			initialValues.communityId=communityId;
		
		
			return (

			<Form name="jyayayoinForm"  initialValues={initialValues} onSubmit={this.onSubmit}>
				<KrField name="id" type="hidden"/>
				<KrField name="customerId" type="hidden"/>
				<KrField name="communityId" type="hidden"/>
				<div style={{textAlign:"center",marginBottom:'20px'}}>
					XX公司10001序号员工为<KrField name="memberId"component="select" grid={2/3}  options={optionValues.member}/>
				</div>	
				<Grid>
					<Row style={{marginTop:30,marginBottom:100}}>
					<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true}  onSubmit={this.onSubmit}/> </Col>
					<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
			</Form>
									
									
			 );
		
		
		
	}

}

class ChangeStation extends Component{

	constructor(props,context){
		super(props,context);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);
		
	}
	onCancel (){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	onSubmit(form){
		const {onSubmit} = this. props;
		onSubmit && onSubmit(form);
	}

	render(){
		let { optionValues,stationId,customerId,communityId} = this.props;
		let initialValues = {};
			initialValues.stationId=stationId;

		initialValues.customerId=customerId;
		initialValues.communityId=communityId;
		
	return (

		<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit}>
			<KrField name="id" type="hidden"  />
			<KrField name="customerId" type="hidden"/>
			<KrField name="communityId" type="hidden"/>
			<div style={{textAlign:"center",marginBottom:100}}>
				XX公司10001序号员工为XXX,变更为员工<KrField name="memberId"component="select" grid={2/3}  options={optionValues.members}/>
			</div>	
			<Grid>
				<Row style={{marginTop:30}}>
				<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true}  onSubmit={this.onSubmit}/> </Col>
				<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
			</Grid>
		</Form>
								
								
		 );

	}


}





export default  class EmployessTable extends Component {

	 static defaultProps = {
		 activity:false,
		 params:{
		 	mainBillId:290,
		 	communityIds:1,
		 	customerId:97
		},
		
		
	 }

	 static PropTypes = {
		 params:React.PropTypes.object,
		 activity:React.PropTypes.bool,
	 }

	constructor(props,context){
		super(props, context);
		this.openChangeStation = this.openChangeStation.bind(this);
		this.openDistributionStation = this.openDistributionStation.bind(this);
		this.onChangeCancel = this.onChangeCancel.bind(this);
		this.onDistributionCancel = this.onDistributionCancel.bind(this);
		this.onDistributionSubmit = this.onDistributionSubmit.bind(this);
		this.onChangeSubmit = this.onChangeSubmit.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		
		this.state={
			openChangeStation:false,
			openDistribution:false,
 			optionValues:{},
 			itemDetail:{},
 			stationId:1,
 			openNewmeber:false,
 			customerId:1,
 			communityId:1,

		}

	}

	componentDidMount(){
		

	}

	openChangeStation(itemDetail){
		var _this=this;
		this.setState({
			openChangeStation:!this.state.openChangeStation,
			stationId:itemDetail.stationId,
			customerId:itemDetail.customerId,
			communityId:itemDetail.communityId
		})
		let optionValues = {};
		console.log('itemDetail',itemDetail)
		const formValues={
			customerId:itemDetail.customerId,
			communityId:itemDetail.communityId
		}
		Store.dispatch(Actions.callAPI('getmembers',{},formValues)).then(function(response){
			
			optionValues.members = response.map(function(item,index){
				item.value = item.id;
				item.label = item.memberName;
				return item;
			});
			_this.setState({
				optionValues
			});

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});
		
	}

	openDistributionStation(itemDetail){
		console.log('itemDetail',itemDetail)
		var _this=this;
		this.setState({
			openDistribution:!this.state.openDistribution,
			stationId:itemDetail.stationId,
			customerId:itemDetail.customerId,
			communityId:itemDetail.communityId
		})
		let optionValues = {};
		const formValue={
			customerId:itemDetail.customerId,
			communityId:itemDetail.communityId
		}

		Store.dispatch(Actions.callAPI('getmembers',{},formValue)).then(function(response){
			
			optionValues.member = response.map(function(item,index){
				item.value = item.id;
				item.label = item.memberName;
				return item;
			});
			_this.setState({
				optionValues
			});

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});
	}

	onChangeCancel(){
		this.setState({
			openChangeStation:!this.state.openChangeStation
		})
		
	}

	onDistributionCancel(){
		this.setState({
			openDistribution:!this.state.openDistribution
		})
	}

	onChangeSubmit(form){
		
		if(form.memberId==-1){
			this.setState({
				openNewmeber:!this.state.openNewmeber
			});

			console.log('nnnnn',from)
			this.onChangeCancel();
		}else{

			Store.dispatch(Actions.callAPI('changeStation',{},form)).then(function(response){
				Notify.show([{
					message:'操作成功！',
					type: 'success',
				}]);
						
			}).catch(function(err){
				console.log('000e',err);
				Notify.show([{
					message:err.message,
					type: 'danger',
				}]);
			});
		}

	}

	onIframeClose(response){
		
		// response.data == 'cancel'  ok
		if(response.data == 'ok'){
			this.setState({
				openNewmeber:!this.state.openNewmeber
			});
			window.location.reload()
		}else if(response.data == 'cancel'){
			this.setState({
				openNewmeber:!this.state.openNewmeber
			});
		}

		
	}

	getStationUrl(){
		let {customerId,communityId}=this.state
		console.log('customerId',customerId,'communityId',communityId)
	    let url = `http://optest.krspace.cn/krspace_member_web/member/toAddMember?companyId=${customerId}&communityId=${communityId}`;
	    console.log('url',url)
		return url ;
	}

	



	onDistributionSubmit(form){

		if(form.memberId==-1){
			this.setState({
				openNewmeber:!this.state.openNewmeber,

			});
			this.onDistributionCancel()
		}else{
			Store.dispatch(Actions.callAPI('changeStation',{},form)).then(function(response){
				Notify.show([{
					message:'操作成功！',
					type: 'success',
				}]);
						
			}).catch(function(err){
				console.log('000e',err);
				Notify.show([{
					message:err.message,
					type: 'danger',
				}]);
			});
		}

	}
	
	

	//操作相关
	onOperation(type,itemDetail){
		this.setState({
			itemDetail
		});

		if(type == 'Distribution'){
			this.setState({stationId:itemDetail.stationId},function(){
				this.openDistributionStation(itemDetail)
			})
			
		}else if(type == 'ChangeStation'){
			this.setState({stationId:itemDetail.stationId},function(){
				this.openChangeStation(itemDetail)
			})
			
		}
	}



  render() {

	  let {activity} = this.props;

	  if(!activity){
		  return null;
	  }
	let {optionValues} = this.state;
    return (

		 <div className="employees-content">
		 	<Table  style={{marginTop:10}} displayCheckbox={false} ajax={true}  ajaxUrlName='getStation' ajaxParams={this.props.params} pagination={false} onOperation={this.onOperation} >
				<TableHeader>
						<TableHeaderColumn>工位编号</TableHeaderColumn>
						<TableHeaderColumn>租赁起始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						<TableHeaderColumn>员工</TableHeaderColumn>
						<TableHeaderColumn>电话</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
					<TableRow displayCheckbox={true}>
						<TableRowColumn name="stationCode" ></TableRowColumn>
						<TableRowColumn name="leaseBeginDate" ></TableRowColumn>
						<TableRowColumn name="leaseEndDate"></TableRowColumn>
						<TableRowColumn name="memberName" ></TableRowColumn>
						<TableRowColumn name="memberPhone" ></TableRowColumn>
						<TableRowColumn name="status"></TableRowColumn>
						<TableRowColumn>
							  <Button label="分配"  type="operation" operation="Distribution"   />
							  <Button label="变更" type="operation" operation="ChangeStation"   />
						 </TableRowColumn>
					</TableRow>
				</TableBody>

				<TableFooter></TableFooter>
			</Table>


			<Dialog
				title="分配工位"
				modal={true}
				open={this.state.openDistribution}
			>
				
				<Distribution  onCancel={this.onDistributionCancel} onSubmit={this.onDistributionSubmit} optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>	
			</Dialog>
			<Dialog
				title="变更工位"
				modal={true}
				open={this.state.openChangeStation}
			>
				<ChangeStation  onCancel={this.onChangeCancel} onSubmit={this.onChangeSubmit}  optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>
						
			</Dialog>
			<Dialog
				title="新增员工"
				modal={true}
				open={this.state.openNewmeber}
			>
				
				<IframeContent src={this.getStationUrl()}  onClose={this.onIframeClose}  />	
			</Dialog>

		</div>
	);
  }
}





