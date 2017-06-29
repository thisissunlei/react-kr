import React from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
	ButtonGroup,
	Col,
	Row,
	Grid,
	Button,
	ListGroupItem,
	ListGroup
} from 'kr-ui';
import './index.less';
import State from './State';
@observer
class SearchForm extends React.Component {


	constructor(props) {
		super(props);
	}


   
	//合同类型
    contractChange=(value)=>{
		   const {
		   contractChange
	     } = this.props;
	    contractChange && contractChange(value);
	 }
    //日期开始
	 onStartChange=(value)=>{
      const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(value);
    }
    //日期结束
     onEndChange=(value)=>{
      const {
			onEndChange
		} = this.props;
		onEndChange && onEndChange(value);
     }

	 isOtherChange=(value)=>{
      const {
			isOtherChange
		} = this.props;
		isOtherChange && isOtherChange(value); 
	 }

	 onCancel=()=>{
		 const {
			onCancel
		} = this.props;
		onCancel && onCancel(); 
	 }

    onSubmit=()=>{
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(); 
	}
	


	render() {


		let {handleSubmit}=this.props;

		return (
			

			<form onSubmit={handleSubmit(this.onSubmit)} className="m-agreementList-searchForm" style={{marginTop:35,marginLeft:26 ,height:"auto"}}>
                

				  <KrField grid={1/2}  style={{width:"260px",marginTop:'5px',marginRight:27}} name="contractType" type="select" label="合同类型" inline={false}
						options={[{label:'承租意向书',value:'INTENTION'},{label:'入驻协议书',value:'ENTER'},{label:'增租协议书',value:'ADDRENT'},{label:'减租协议书',value:'LESSRENT'},{label:'退租协议书',value:'QUITRENT'},{label:'续租协议书',value:'RENEW'}]}
						onChange={this.contractChange}
				   />

				   <KrField grid={1/2}  style={{width:"260px",marginTop:'5px',marginRight:5}} name="hasAgreement" type="select" label="其他约定" inline={false}
						onChange={this.isOtherChange}
						options={[{label:'有',value:'true'},{label:'无',value:'false'}]}
				  />


				<KrField grid={1/1}  component="group" label="创建时间" style={{marginTop:3}}>
				<div className='ui-listDate'>
					<ListGroup>
						<ListGroupItem><div className='ui-date-start' style={{width:260,marginTop:'-10px'}} ><KrField grid={1/2} label="" name="createDateBegin" style={{width:260,marginLeft:-10,marginTop:2}}  component="date" inline={false} onChange={this.onStartChange} placeholder='日期'/></div></ListGroupItem>
							<div style = {{display:"inline-block",marginTop:10}} className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14',marginLeft:' -5px',marginTop: '5px'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end' style={{marginTop:'-10px'}}><KrField grid={1/2} label="" name="createDateEnd" style={{width:260,marginTop:2}} component="date"  inline={false} onChange={this.onEndChange} placeholder='日期'/></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField>

						
				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>

			</form>



		);
	}
}

export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
