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
  Loading
} from 'kr-ui';


export default  class ConfirmBillDetail extends Component{

	 static PropTypes = {
		 params:React.PropTypes.object, 
		 onCancel:React.PropTypes.func,
	 }
    
	constructor(props){
		super(props);
		this.onCancel = this.onCancel.bind(this);
    this.getData = this.getData.bind(this);
    this.state={
      detail:{},
      isLoading:true,  
    }
   
	}

  componentDidMount(){
     this.getData(); 
  }

  componentWillReceiveProps(nextProps){
    this.getData(nextProps.params); 
   
  }


  getData(params = this.props.params){ 
    
     if(!params.startDate){
       params.startDate=''
     }
     if(!params.endDate){
       params.endDate=''
     }
      
     
      console.log("ccc",params) 
    
     //发送获取基本信息的请求
      var _this = this;
     
      Store.dispatch(Actions.callAPI('getFinaDataDetailAdd',params)).then(function(response){
      
      let data = response.finaContractMainbillVOMap;

      _this.setState({
          detail:data,
          isLoading:false,
      });


    }).catch(function(err){
        _this.setState({
          isLoading:false,
      });

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

       

       const {params}  = this.props;
        
       

       let {detail,isLoading}  = this.state;
        
        
        /*if(isLoading){
          return <Loading/>
        }*/
        
       
        
        
        let listC=detail.finaFinaflowModelVOLists;
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
        let year=myDate.getFullYear();

        let month=myDate.getMonth()+1;
         if(month<10){
            month='0'+month;
         }
        let day=myDate.getDate();  
          if(day<10){
            day='0'+day;
          }

		return (

			<div>
            <Grid style={{marginTop:30}}>
              <KrField grid={1/3} component="labelText" type="text"/>
              <KrField grid={1/3} label="对账单" component="labelText" value={detail.corporationName} />
              <KrField grid={1/3} component="labelText" type="text"/>
            </Grid>  
              
            <KrField grid={1/2} label="公司名称" component="labelText" value={detail.customername}/>
            <KrField grid={1/2} label="操作日期" component="labelText" value={year+'年'+month+'月'+day+'日'}/>
               

           <KrField grid={1/2} label="对账期间" component="group">
  						<KrField  grid={1/2}  type="labelText" value={params.startDate}/> 
  						<KrField  grid={1/2}  type="labelText" value={params.endDate}/> 
				  </KrField>

				<KrField grid={1/2} label="订单编号" component="labelText" value={detail.mainbillcode}/>

				<KrField label="类别" component="labelText" grid={1/3}/>
				<KrField label="款项" component="labelText" grid={1/3}/>
				<KrField label="金额" component="labelText" grid={1/3}/>

                 {listC.map((item,index)=>{
					   return (
                        <div>
                          <KrField  grid={1/3} component="labelText" value={listC.propcode}/>
                          <KrField  grid={1/3} component="labelText" value={item.propname}/>
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
						  <KrField  component="labelText" value={detail.paidrent}/>
						  <KrField  component="labelText" value={detail.realdeposit}/>
						</Col>
						<Col><KrField label="余额" component="labelText" value={detail.mount}/></Col>
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
