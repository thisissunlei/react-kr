import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


export default  class ConfirmBillDetail extends Component{

	 static PropTypes = {
		 detail:React.PropTypes.object,
		 onCancel:React.PropTypes.func,
	 }
    
	constructor(props){
		super(props);
		this.onCancel = this.onCancel.bind(this);
    this.state={
      item:{}
    }
   
	}

  componentDidMount(){
    const {detail}  = this.props;
     //发送获取基本信息的请求
      var _this = this;
    Store.dispatch(Actions.callAPI('getFinaDataDetailAdd')).then(function(response){
      _this.setState({
        items:response,
        item:response.finaContractMainbillVOMap,
        loading:false
      });
    }).catch(function(err){
      Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    });
  }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }

	render(){

        let list=this.state.item;
        let lists=this.state.items;

        
        let listC=list.finaFinaflowModelVOLists;
        if(!listC){
           listC=[];
        }
       
        
        if(listC.propcode=="1"){
           listC.propcode="收入"
        }else if(listC.propcode=="2"){
           listC.propcode="回款"
        }else{
           listC.propcode='出错'
        }

        var myDate = new Date();
        let year=myDate.getYear();
        let month=myDate.getMonth();
         if(month<10){

         }
        let day=myDate.getDate();  

		return (

			<div>
               <KrField grid={1} label="对账单" component="labelText" value={list.corporationName}/>
                
              
               <KrField grid={1/2} label="公司名称" component="labelText" value={list.customername}/>
               <KrField grid={1/2} label="操作日期" component="labelText" />
               

        <KrField grid={1/2} label="对账期间" component="group">
						<KrField  grid={1/2} label="起始日期" type="labelText" /> 
						<KrField  grid={1/2} label="结束日期" type="labelText" /> 
				</KrField>

				<KrField grid={1/2} label="订单编号" component="labelText" value={list.mainbillcode}/>

				<KrField label="类别" component="labelText" grid={1/3}/>
				<KrField label="款项" component="labelText" grid={1/3}/>
				<KrField label="金额" component="labelText" grid={1/3}/>

                 {listC.map((item,index)=>{
					 return (
                        <div>
                          <KrField  grid={1/3} component="labelText" value={listC.propcode}/>
                          <KrField grid={1/3} component="labelText" value={item.propname}/>
                          <KrField  grid={1/3} component="labelText" value={item.finaflowAmount}/>
                        </div>                        
					 );
				 })}       
               <Row style={{marginTop:30}}>    
					  <Col md={4}><KrField  label="其他缴费" component="labelText"/></Col>
					  <Col md={4}>
						  <KrField  label="定金" component="labelText" />
						  <KrField  label="押金" component="labelText" />
					  </Col>
						<Col md={4}>
						  <KrField  component="labelText" value={list.paidrent}/>
						  <KrField  component="labelText" value={list.realdeposit}/>
						</Col>
						<Col><KrField label="余额" component="labelText" value={list.mount}/></Col>
                </Row> 

              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                   <Col md={2}></Col>
                  <Col md={3}><Button  label="打印" type="button"  /> </Col>
                  <Col md={3}><Button  label="导出" type="button" /> </Col>
                  <Col md={3}><Button  label="关闭" type="button"  onTouchTap={this.onCancel}/></Col>
                  <Col md={1}></Col>
                </Row>
              </Grid>
			</div>
			
		);
	}
}
