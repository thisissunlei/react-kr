import React from 'react';
import {reduxForm} from 'redux-form';
import {
	Button,
	Grid,
	Row,
	Col,
	KrField,
	ListGroup,
	ListGroupItem,
	ButtonGroup,
	form,
} from 'kr-ui';
import './index.less';

class SearchForm extends React.Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
        codeList:React.PropTypes.arr,
        typeList:React.PropTypes.arr,
        initialValues:React.PropTypes.object,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(forms){

		const {onSubmit} = this.props;
		onSubmit && onSubmit(forms);
	}



	render(){


		let {typeList,codeList,initialValues,handleSubmit}=this.props;



		return(


            <div className='ui-search'>
				<form  onSubmit={handleSubmit(this.onSubmit)}  initialValues={initialValues}>

					<KrField grid={1} name="orderId" type="hidden"/>
					<KrField grid={1} name="accountType" type="hidden"/>

					<KrField grid={1/2} name="accountId" right={39} component="select" label="支付方式" options={codeList}/>
					<KrField grid={1/2} name="propertyId" right={39} type="select" label="款项" options={typeList} style={{marginLeft:-11}}/>

                    <KrField grid={1/2} name="tradingCode" component="input" type="text" label="交易编号" right={40} style={{marginTop:5}}/>




					<KrField grid={1/1}  component="group" label="日期" style={{marginTop:3}}>
					<div className='ui-listDate'><ListGroup>
							<ListGroupItem><div className='ui-date-start'><KrField  right={6} style={{marginLeft:-10}} name="startTime" component="date" /></div></ListGroupItem>
							<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
							<ListGroupItem><div className='ui-date-end'><KrField  right={6} name="endTime" component="date" /></div></ListGroupItem>
						</ListGroup>
	                    </div>
				   </KrField>


					<Grid style={{marginTop:8,marginBottom:5,marginLeft:-35}}>


						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>


				</form>
             </div>

		 );
	}

}

export default reduxForm({
	form: 'searchForm'
})(SearchForm);
