import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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
	Dialog,
	KrField
} from 'kr-ui';


class Basic extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
		detailResult:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);
		this.ReceivedMoney = this.ReceivedMoney.bind(this);
        this.onCancel = this.onCancel.bind(this);
		  this.state = {
			openReceive:false,
			
	     }
   }

	componentDidMount() {

	}
    
    ReceivedMoney(){
        this.setState({
			openReceive:!this.state.openReceive
		});
    }
    
     onCancel(){
		this.setState({
			openReceive:!this.state.openReceive
		});	 
	 }

	  onSubmit(params){  //获取提交时的params
 		 const {detail} = this.props;
 		 params.id = detail.id;  
         params.startDate=detail.actualEntrydate;
         this.setState({  
			params
		});
	 }


	render(){

		let {params,type,detailResult,handleSubmit} = this.props;

		let items=detailResult.items;

		if(params.childType != type){
			return  null;
		}

		if(!items){
			items=[];
		}

		
        
        console.log(",,,,,",detailResult.items);
		return(

			 <div>
                  <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.ReceivedMoney}/></Col>
					<Col md={2}><Button label="退款" primary={true}/></Col>
                  </Row>
       
                  <Table displayCheckbox={false}>
			          <TableHeader>
			          <TableHeaderColumn>序号</TableHeaderColumn>
			          <TableHeaderColumn>交易日期</TableHeaderColumn>
			          <TableHeaderColumn>代码</TableHeaderColumn>
			           <TableHeaderColumn>类别</TableHeaderColumn>
			          <TableHeaderColumn>款项</TableHeaderColumn>
			          <TableHeaderColumn>金额</TableHeaderColumn>
			           <TableHeaderColumn>备注</TableHeaderColumn>
			           <TableHeaderColumn>操作</TableHeaderColumn>
			         </TableHeader>
			         <TableBody>        
                       {items.map((item,index)=><TableRow key={index}>
			              <TableRowColumn>{index+1}</TableRowColumn>
			              <TableRowColumn>{item.occurday}</TableRowColumn>
			              <TableRowColumn>{item.accountname}</TableRowColumn>
			              <TableRowColumn>{item.proptypename}</TableRowColumn>
			              <TableRowColumn>{item.propname}</TableRowColumn>
			              <TableRowColumn>{item.finaflowAmount}</TableRowColumn>
			               <TableRowColumn>{item.finaflowdesc}</TableRowColumn>
			              <TableRowColumn>
							  <Button label="查看" component="labelText" type="link"/>
						 </TableRowColumn>
			            </TableRow>
			         )}
           </TableBody>
       </Table> 

                 <Dialog
						title='添加回款'
						modal={true}
						open={this.state.openReceive}
					>
					   <div>
					      <form onSubmit={handleSubmit(this.onSubmit)}>
 
						    <KrField type="select" label="代码名称" name="accountId"/>
						    <KrField type="date" label="回款日期" name="receiveDate"/>
						    <KrField label="交易编号" name="dealCode" />
						    <KrField label="是否自动拆分" name="autoSplit" type="select" options={
						    	[{label:"是",value:"1"},{label:"不是",value:"0"}]
						    }/>
                            <KrField name="sumSign" component="group" label="金额正负" >
				                <KrField name="sumSign" label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign" label="负" component="radio" type="radio" value="1" />
			                </KrField>
                            <KrField label="金额（元）" name="sum" />
                            <KrField label="备注" name="remark" />
                            <KrField label="上传附件" name="fileids" />

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
						   </Row> 
					   
                         </form>
					  </div>

				  </Dialog>



			</div>		

		);

	}

}


export default reduxForm({ form:'Basic'})(Basic);




