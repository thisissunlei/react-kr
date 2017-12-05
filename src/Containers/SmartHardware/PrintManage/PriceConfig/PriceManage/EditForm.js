
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
		this.detail = this.props.detail;
		this.state={
			
			
		}
	}

	
	onCancel=()=>{
		State.openEditDialog = false;
	}

  	componentDidMount(){
  		

		Store.dispatch(initialize('NewCreateDefinitionForm', this.detail));
		
	}
	

	// 新增设备定义
	onSubmit=(values)=>{
		let _this = this;

		
		var colorPrice_var = {"A4":values.A4Color,"A3":values.A3Color,"A5":values.A5Color,"LETTER":values.LETTERColor,"LEGAL":values.LEGALColor,"B4":values.B4Color,"B5":values.B5Color}
		var monoPrice_var = {"A4":values.A4Mono,"A3":values.A3Mono,"A5":values.A5Mono,"LETTER":values.LETTERMono,"LEGAL":values.LEGALMono,"B4":values.B4Mono,"B5":values.B5Mono}
		var paperPrice_var = {"A4":values.A4White,"A3":values.A3White,"A5":values.A5White,"LETTER":values.LETTERWhite,"LEGAL":values.LEGALWhite,"B4":values.B4White,"B5":values.B5White}
		
		colorPrice_var = 	JSON.stringify(colorPrice_var)
		monoPrice_var = 	JSON.stringify(monoPrice_var)
		paperPrice_var = 	JSON.stringify(paperPrice_var)


		var newCreatePriceP = {
			id :_this.detail.id,
			colorPriceYuan : colorPrice_var,
			monoPriceYuan : monoPrice_var,
			name : values.name,
			paperPriceYuan : paperPrice_var,
			scanPriceYuan : values.scanPriceYuan
		}
		let {editPriceSubmit} = this.props;
		editPriceSubmit && editPriceSubmit(newCreatePriceP);


	}

	renderListDom=()=>{
		var pageType = ["A4","A3","A5","LETTER","LEGAL","B4","B5"]
		var dom = pageType.map(function(item,index){
			return (
				<ListGroup key={index}>
					<ListGroupItem style={{width:"25%",padding:0,textAlign:"center",height:'50px',lineHeight:"50px"}}>
						<span>{item}</span>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0,textAlign:"center",height:'50px',lineHeight:"50px"}}>
						<KrField 
							name={item+"Mono"}
							type="text" 
							label="" 
							requireLabel={true} 
							style={{width:90}}
						/>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0,textAlign:"center",height:'50px',lineHeight:"50px"}}>
						<KrField 
							name={item+"Color"}
							type="text" 
							label="" 
							requireLabel={true} 
							style={{width:90}}
						/>
					</ListGroupItem>
					<ListGroupItem style={{width:"25%",padding:0,textAlign:"center",height:'50px',lineHeight:"50px"}}>
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
			<div style={{padding :"10px 0 0 0px"}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<ListGroup >
						<ListGroupItem style={{marginBottom:"20",marginLeft:40}}>
							<KrField 
								name="name" 
								type="text" 
								label="策略名称：" 
								requireLabel={true} 
								inline={true}
								style={{width:'252px'}}
							/>
						</ListGroupItem>
					</ListGroup>
					<ListGroup style={{marginBottom:10}}>
						<ListGroupItem style={{width:"25%",padding:0,textAlign:"center"}}>
							纸张类型
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0,textAlign:"center"}}>
							黑白单价(元/面)
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0,textAlign:"center"}}>
							caise单价(元/面)
						</ListGroupItem>
						<ListGroupItem style={{width:"25%",padding:0,textAlign:"center"}}>
							纸张单价(元/张)
						</ListGroupItem>
					</ListGroup>	
					{
						this.renderListDom()
					}
					<ListGroup className="tip-box">
						<ListGroupItem style={{width:"100%",padding:0,margin: "0px 0 10px 0"}}>
							<span style={{color:"red",borderTop:"solid 1px #eee",display:"inline-block",padding:"10px 0",width:550,margin:"20px 0 0 55px"}}>
							以上价格为打印/复印每面的价格
							</span>
						</ListGroupItem>
					</ListGroup>
					<ListGroup >
							<ListGroupItem style={{marginLeft:40}}>
								<span className="scan-print">
									<KrField 
										name="scanPriceYuan" 
										type="text" 
										label="扫描价格：" 
										requireLabel={true} 
										inline={true}
										style={{width:'300px'}}
									/>
								</span>
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
	var reg = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;

	if(!values.A4Mono || !values.A4Color || !values.A4White ||
		!values.A3Mono || !values.A3Color || !values.A3White ||
		!values.A5Mono || !values.A5Color || !values.A5White ||
		!values.LETTERMono || !values.LETTERColor || !values.LETTERWhite ||
		!values.LEGALMono || !values.LEGALColor || !values.LEGALWhite ||
		!values.B4Mono || !values.B4Color || !values.B4White ||
		!values.B5Mono || !values.B5Color || !values.B5White ||
		!values.scanPrice || !values.name
	){
		errors.scanPrice = '所有输入框都必须填写';
	}else if(!reg.test(values.A4Mono) || !reg.test(values.A4Color) || !reg.test(values.A4White) ||
	!reg.test(values.A3Mono) || !reg.test(values.A3Color) || !reg.test(values.A3White) ||
	!reg.test(values.A5Mono) || !reg.test(values.A5Color) || !reg.test(values.A5White) ||
	!reg.test(values.LETTERWhite) || !reg.test(values.LETTERColor) || !reg.test(values.LETTERWhite) ||
	!reg.test(values.LEGALMono) || !reg.test(values.LEGALColor) || !reg.test(values.LEGALColor) ||
	!reg.test(values.B4Mono) || !reg.test(values.B4Color) || !reg.test(values.B4White) ||
	!reg.test(values.B5Mono) || !reg.test(values.B5Color) || !reg.test(values.B5White)||
	!reg.test(values.scanPrice)){

		errors.scanPrice = '价格应为正数,小数点后最多两位';
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
