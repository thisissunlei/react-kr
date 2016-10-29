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
	KrField
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
		onSubmit && onSubmit();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;

		/*if(){
			return(
				<div style={{textAlign:'center',marginBottom:20}}>
					诚意公司当前没有员工，<span style={{color:'#499df1'}}>新建员工</span>
					<Button  label="关闭" type="button"  onTouchTap={this.onCancel}/>
				</div>

				);
		}*/



		return (

		<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit}>
			<div style={{textAlign:"center",marginBottom:'20px'}}>
				XX公司10001序号员工为<KrField name="sdf"component="select" grid={2/3}  value=""/>
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
		onSubmit && onSubmit();
	}

	render(){
		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;
		
	return (

		<Form name="jyayayoinForm" initialValues={initialValues} onSubmit={this.onSubmit}>
			<div style={{textAlign:"center",marginBottom:'20px'}}>
				XX公司10001序号员工为XXX,变更为员工<KrField name="memberId"component="select" grid={2/3}  value=""/>
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

class NewAddmember extends Component{



	
}




export default  class EmployessTable extends Component {

	 static defaultProps = {
		 activity:false,
		 params:{
		 	mainBillId:1,
		 	communityIds:1
		}
		
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
		this.onChangeSubmit = this.onChangeSubmit.bind(this);
		this.onDistributionSubmit = this.onDistributionSubmit.bind(this);


		this.state={
			openChangeStation:false,
			openDistribution:false,
 			
		}

	}

	componentDidMount(){
		

	}

	openChangeStation(){
		this.setState({
			openChangeStation:!this.state.openChangeStation
		})
	}

	openDistributionStation(){
		this.setState({
			openDistribution:!this.state.openDistribution
		})
	}

	onChangeCancel(){
		this.openChangeStation()
	}

	onDistributionCancel(){
		this.openDistributionStation()
	}

	onChangeSubmit(){

	}
	
	onDistributionSubmit(){

	}



  render() {

	  let {activity} = this.props;

	  if(!activity){
		  return null;
	  }

    return (

		 <div className="employees-content">
		 	<Table  style={{marginTop:10}} displayCheckbox={false} ajax={false}  ajaxUrlName='getStation' ajaxParams={this.props.params} pagination={false} >
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
							  <Button label="分配"  type="link"  onTouchTap={this.openDistributionStation}   />
							  <Button label="变更"  type="link" onTouchTap={this.openChangeStation} />
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
				<Distribution  onCancel={this.onDistributionCancel} onSubmit={this.onDistributionSubmit}/>	
			</Dialog>
			<Dialog
				title="变更工位"
				modal={true}
				open={this.state.openChangeStation}
			>
				<ChangeStation  onCancel={this.onChangeCancel} onSubmit={this.onChangeSubmit} />
						
			</Dialog>
		</div>
	);
  }
}





