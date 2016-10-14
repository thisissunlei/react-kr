import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Dialog,
	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	LabelText,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	BreadCrumbs,
} from 'kr-ui';


  //生成对账单
let LessorUpdateForm= function(props){  

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

	return (

			<form onSubmit={handleSubmit(onSubmit)}>
                             
							<KrField component="group" label="对账期间:">
								<KrField name="startDate" label="起始日期" type="Date" />
								<KrField name="endDate" label="结束日期" type="Date" />
							</KrField>
	
							<Grid style={{marginTop:30}}>
								<Row style={{marginTop:30}}>
									<Col md={8}></Col>
									<Col md={2}><Button  label="确定" type="submit" primary={true} /> </Col>
									<Col md={2}><Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
								</Row>
							</Grid>
			</form>
	);
}



//账单确定页
let SureWatchForm= function(props){  

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;
    let {basic} = this.state.sureWatch;
	return (
            
			<form onSubmit={handleSubmit(onSubmit)}>

                            <Section></Section>
                            

							<KrField component="group" label="期间:">
								<KrField name="startDate" label="起始日期" type="Date" />
								<KrField name="endDate" label="结束日期" type="Date" />
							</KrField>
	
							<Grid style={{marginTop:30}}>
								<Row style={{marginTop:30}}>
									<Col md={8}></Col>
									<Col md={2}><Button  label="确定" type="submit" primary={true}/> </Col>
									<Col md={2}><Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
								</Row>
							</Grid>
			</form>
	 );
  }







 export default class RenderTable extends Component {

  constructor(props,context){
    super(props, context);

	  this.confirmUpdateSubmit = this.confirmUpdateSubmit.bind(this);
	  this.cancelUpdateSubmit = this.cancelUpdateSubmit.bind(this);
      this.cancelViewSubmit=this.cancelViewSubmit.bind(this);

	  this.state = {
		  openView:false,  //先要初始化定义弹窗们
		  openUpdate:false,
		  sureWatch:''
	  }   
  }

	 componentWillReceiveProps(nextProps){

	 }


    

	 confirmUpdateSubmit(values){
        var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataDetailAdd',{ 
			  endDate:'',
			  id:'',
			  startDate:''
		})).then(function(response){
			  console.log(response);
			_this.setState({
				sureWatch:response
			})
            
			  
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});
		this.openUpdateDialog() //先把生成对账单的弹窗关掉
		this.setState({   
			openView:!this.state.openView //通过此参数就可以控制对应弹窗的开启
		  });
		
	 }




	 cancelUpdateSubmit(){
		this.setState({
			openUpdate:!this.state.openUpdate
		});
	  }

	  cancelViewSubmit(){
		this.setState({
			openView:!this.state.openView
		});
	  }

	  openUpdateDialog(index){ 
	    const list = this.props.items;
		this.setState({
			openUpdate:!this.state.openUpdate
		});


		

		LessorUpdateForm= reduxForm({
		  form: 'orderUpdateForm',
			initialValues:list[index]
		})(LessorUpdateForm);



		SureWatchForm= reduxForm({
		  form: 'orderUpdateForm',    //?
			initialValues:list[index]
		})(SureWatchForm);

	}


       openViewDialog(index){          
	     const list = this.props.items; //?
		 this.setState({
			item:list[index],
			openView:!this.state.openView
		});

    }


	render() {

		let items = this.props.items || [];

		 const actions = [
			  <Button
				label="关闭"
				primary={true}
				 style={{marginLeft:10}}
				onTouchTap={this.openViewDialog.bind(this)}
			  />,
			];

		if(!items.length){  
			return (

			<div>
				<Table  style={{marginTop:10}} displayCheckbox={true}>
					<TableHeader>
					<TableHeaderColumn>公司名称</TableHeaderColumn>
					<TableHeaderColumn>订单类型</TableHeaderColumn>
					<TableHeaderColumn>所在社区</TableHeaderColumn>
					<TableHeaderColumn>起始日期</TableHeaderColumn>
					<TableHeaderColumn>结束日期</TableHeaderColumn>
					<TableHeaderColumn>收入总额</TableHeaderColumn>
					<TableHeaderColumn>回款总额</TableHeaderColumn>
					<TableHeaderColumn>余额</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>


				<TableBody style={{paddingTop:10}}>
					<TableRow displayCheckbox={false}>
								<TableRowColumn colSpan={8} >
									<div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
									暂无数据
									</div>
								</TableRowColumn>
					</TableRow>
				</TableBody>

				</Table>
   			</div>
				);
		}

		return (

			<div>
				<Table  style={{marginTop:10}} displayCheckbox={true}>
					<TableHeader>
					<TableHeaderColumn>公司名称</TableHeaderColumn>
					<TableHeaderColumn>订单类型</TableHeaderColumn>
					<TableHeaderColumn>所在社区</TableHeaderColumn>
					<TableHeaderColumn>起始日期</TableHeaderColumn>
					<TableHeaderColumn>结束日期</TableHeaderColumn>
					<TableHeaderColumn>收入总额</TableHeaderColumn>
					<TableHeaderColumn>回款总额</TableHeaderColumn>
					<TableHeaderColumn>余额</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
					  {this.props.items.map((item,index)=> <TableRow key={index} displayCheckbox={true}>
							<TableRowColumn>{item.customername}</TableRowColumn>
							<TableRowColumn>{item.mainbilltype}</TableRowColumn>
							<TableRowColumn>{item.community}</TableRowColumn>
							<TableRowColumn>{item.actualEntrydate}</TableRowColumn>
							<TableRowColumn>{item.actualLeavedate}</TableRowColumn>
							<TableRowColumn>{item.come}</TableRowColumn>
							<TableRowColumn>{item.backMount}</TableRowColumn>
							<TableRowColumn>{item.mount}</TableRowColumn>
							<TableRowColumn>
								  <Button label="查看"  type="link" onClick={this.openViewDialog.bind(this,index)}/>
								  <Button label="生成对账单"  type="link" onClick={this.openUpdateDialog.bind(this,index)} />
							 </TableRowColumn>
						 </TableRow>

				  )}
				</TableBody>

				<TableFooter></TableFooter>

				</Table>


				

				<Dialog
			title="生成对账单"
			modal={true}
			open={this.state.openUpdate} //通过不同弹窗来区分
				>
				<LessorUpdateForm onSubmit={this.confirmUpdateSubmit} onCancel={this.cancelUpdateSubmit}/>
	      </Dialog>
			<Dialog
			title=""
			modal={true}
			open={this.state.openView} //通过不同弹窗来区分
				>				
				<SureWatchForm onSubmit={this.confirmUpdateSubmit} onCancel={this.cancelViewSubmit}/>
	      </Dialog>
          
           


   </div>
  );
 }
}

