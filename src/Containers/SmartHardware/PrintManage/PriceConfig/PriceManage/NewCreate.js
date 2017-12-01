
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import './index.less';

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Message,
	err
} from 'kr-ui';
class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
			
		}
	}

	
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}

  	componentDidMount(){
		this.renderListDom();
	
	}
	

	// 新增设备定义
	onSubmit=(values)=>{
		let _this = this;

	 	State.newCreatePrinter(values);

	}

	renderListDom=()=>{
		var pageType = ["A4","A3","A5","Letter","Legal","B4","B5"]
		var dom = pageType.map(function(item,index){
			
			return (
				<ListGroup >
					<ListGroupItem style={{width:"25%",padding:0}}>
						<span>{item}</span>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0}}>
						<KrField 
							name={item+"Mono"}
							type="text" 
							label="" 
							requireLabel={true} 
							style={{width:90}}
						/>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0}}>
						<KrField 
							name={item+"Color"}
							type="text" 
							label="" 
							requireLabel={true} 
							style={{width:90}}
						/>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0}}>
						<KrField 
							name={item+"White"}
							type="text" 
							label="" 
							requireLabel={true} 
							style={{width:90}}
						/>
					</ListGroupItem>
				</ListGroup>
			)
		})
		return dom;
	}


	render(){
		
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding :"10px 0 0 40px"}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<ListGroup >
						<ListGroupItem style={{marginBottom:"10"}}>
							<KrField 
								name="alias" 
								type="name" 
								label="策略名称：" 
								requireLabel={true} 
								inline={true}
								style={{width:'252px'}}
							/>
						</ListGroupItem>
					</ListGroup>
					<ListGroup style={{marginBottom:10}}>
						<ListGroupItem style={{width:"25%",padding:0}}>
							纸张类型
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0}}>
							黑白单价(元/面)
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0}}>
							黑白单价(元/面)
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0}}>
							纸张单价(元/张)
						</ListGroupItem>
					</ListGroup>	
					{
						this.renderListDom()
					}
					<ListGroup className="tip-box">
						<ListGroupItem style={{width:"100%",padding:0,margin: "0px 0 10px 0"}}>
							<span style={{color:"red"}}>
							以上价格为打印/复印每面的价格
							</span>
						</ListGroupItem>
					</ListGroup>
					<ListGroup >
						
							<ListGroupItem >
								<KrField 
									name="scanPrice" 
									type="name" 
									label="扫描价格：" 
									requireLabel={true} 
									inline={true}
									style={{width:'252px'}}
								/>
								<span className="unit-text">元/页</span>
							</ListGroupItem>
							
						
					</ListGroup>
					
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px',marginTop:20}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="确定" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	if(!values.A4Mono || !values.A4Color || !values.A4White ||
		!values.A3Mono || !values.A3Color || !values.A3White ||
		!values.A5Mono || !values.A5Color || !values.A5White ||
		!values.LetterMono || !values.LetterColor || !values.LetterWhite ||
		!values.LegalMono || !values.LegalColor || !values.LegalWhite ||
		!values.B4Mono || !values.B4Color || !values.B4White ||
		!values.B5Mono || !values.B5Color || !values.B5White ||
		!values.scanPrice || !values.name
	){
		errors.scanPrice = '所有输入框都必须填写';
	}else if((!isNaN(values.A4Mono)&&values.A4Mono<0) || (!isNaN(values.A4Color)&&values.A4Color<0) || (!isNaN(values.A4White)&&values.A4White<0) ||
	(!isNaN(values.A3Mono)&&values.A3Mono<0) || (!isNaN(values.A3Color)&&values.A3Color<0) || (!isNaN(values.A3White)&&values.A3White<0) ||
	(!isNaN(values.A5Mono)&&values.A5Mono<0) || (!isNaN(values.A5Color)&&values.A5Color<0) || (!isNaN(values.A5White)&&values.A5White<0) ||
	(!isNaN(values.LetterWhite)&&values.LetterMono<0) || (!isNaN(values.LetterColor)&&values.LetterColor<0) || (!isNaN(values.LetterWhite)&&values.LetterWhite<0) ||
	(!isNaN(values.LegalMono)&&values.LegalMono<0) || (!isNaN(values.LegalColor)&&values.LegalColor<0) || (!isNaN(values.LegalColor)&&values.LegalColor<0) ||
	(!isNaN(values.B4Mono)&&values.B4Mono<0) || (!isNaN(values.B4Color)&&values.B4Color<0) || (!isNaN(values.B4White)&&values.B4White<0) ||
	(!isNaN(values.B5Mono)&&values.B5Mono<0) || (!isNaN(values.B5Color)&&values.B5Color<0) || (!isNaN(values.B5White)&&values.B5White<0) ||
	(!isNaN(values.scanPrice)&&values.scanPrice<0) ){
		errors.scanPrice = '价格必须为正数';
	}

	if(values.name &&values.name.length>20){
		errors.name ="价格策略必填"
	}
	
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
