import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
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



var arr=[];
class Basic extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string,
		detailResult:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);
		this.ReceivedMoney = this.ReceivedMoney.bind(this);
		this.QuitMoney = this.QuitMoney.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCancelQ = this.onCancelQ.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		  this.state = {
			openReceive:false,
			openQuit:false,
			arr:[]
	     }
   }

	componentDidMount() {

	}
    
    ReceivedMoney(){ 
		  var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	
	      })).then(function(response){  //post请求

	          console.log("ttttt",response);
 		      response.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.id=item.id;
 		      	 list.accountname=item.accountname;
 		      	 arr.push(list);		      	 	      	                                            
              })
              arr.map(function(item,index){
				 item.label=item.accountname;
                 item.value=item.id;
				 return item;
			    });

 		        _this.setState({
			      arr:arr
		       });             		   
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
        this.setState({
			openReceive:!this.state.openReceive
		});
    }

     QuitMoney(){
        this.setState({
			openQuit:!this.state.openQuit
		});
    }
    
     onCancel(){
		this.setState({
			openReceive:!this.state.openReceive,
			
		});	 
	 }

	 onCancelQ(){
		this.setState({	    
			openQuit:!this.state.openQuit,
		});	 
	 }


	  onSubmit(params){  //获取提交时的params
	  	  
	  	  //params.fileids=JSON.stringify(params.fileids);
	  	  console.log("gggg",params);
		  var _this = this;
	      Store.dispatch(Actions.callAPI('receiveMoney',{},params)).then(function(response){  //post请求   
 		    
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openReceive:!this.state.openReceive
		});	  
    }

    onSubmitQ(params){  //获取提交时的params
	  	  //params.fileids=JSON.stringify(params.fileids);
		  var _this = this;
	      Store.dispatch(Actions.callAPI('payBack',{},params)).then(function(response){  //post请求   
 		  }).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });

	    _this.setState({
			openQuit:!this.state.openQuit
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
        
        
        
        
        
       
       
        
        
		return(

			 <div>
                  <Row>
					<Col md={2}><Button label="回款" primary={true} onTouchTap={this.ReceivedMoney}/></Col>
					<Col md={2}><Button label="退款" primary={true} onTouchTap={this.QuitMoney}/></Col>
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
                            <KrField  name="mainbillid" type="hidden" component="input"/>
						    <KrField  label="代码名称" name="accountId" type="select" options={this.state.arr}/>
						    <KrField component="date" label="回款日期" name="receiveDate"/>
						    <KrField label="交易编号" name="dealCode"  component="input" type="text"/>
						    <KrField label="是否自动拆分" name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"不是",value:"0"}]
						    }/>
                            <KrField name="sumSign" component="group" label="金额正负" >
				                <KrField name="sumSign" label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign" label="负" component="radio" type="radio" value="1" />
			                </KrField>
                            <KrField label="金额（元）" name="sum" component="input" type="text"/>
                            <KrField label="备注" name="remark" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file" />

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
						   </Row> 
					   
                         </form>
					  </div>

				  </Dialog>

                   

                   <Dialog
						title='退款'
						modal={true}
						open={this.state.openQuit}
					>
					   <div>
					      <form onSubmit={handleSubmit(this.onSubmitQ)}>
 
						    <KrField  name="id" type="hidden"/>
                            <KrField label="金额（元）" name="finaflowamount" component="input" type="text"/>
                            <KrField type="date" label="退款日期" name="receiveDate"/>
                            <KrField label="备注" name="finaflowdesc" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file"/>

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancelQ} /> </Col>
						   </Row> 
					   
                         </form>
					  </div>

				  </Dialog>

			</div>		

		);

	}

}


export default reduxForm({form:'Basic'})(Basic);




