
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
		console.log("values",values);

		
		var colorPrice_var = {"A4":values.A4Color,"A3":values.A3Color,"A5":values.A5Color,"Letter":values.LetterColor,"Legal":values.LegalColor,"B4":values.B4Color,"B5":values.B5Color}
		var monoPrice_var = {"A4":values.A4Mono,"A3":values.A3Mono,"A5":values.A5Mono,"Letter":values.LetterMono,"Legal":values.LegalMono,"B4":values.B4Mono,"B5":values.B5Mono}
		var paperPrice_var = {"A4":values.A4White,"A3":values.A3White,"A5":values.A5White,"Letter":values.LetterWhite,"Legal":values.LegalWhite,"B4":values.B4White,"B5":values.B5White}
		
		colorPrice_var = 	JSON.stringify(colorPrice_var)
		monoPrice_var = 	JSON.stringify(monoPrice_var)
		paperPrice_var = 	JSON.stringify(paperPrice_var)


		var newCreatePriceP = {
			id :_this.detail.id,
			colorPrice : colorPrice_var,
			monoPrice : monoPrice_var,
			name : values.name,
			paperPrice : paperPrice_var,
			scanPrice : values.scanPrice
		}
	 	State.editPrice(newCreatePriceP);


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
						<ListGroupItem style={{marginBottom:"20"}}>
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
							<span style={{color:"red",borderTop:"solid 1px #eee",display:"inline-block",padding:"10px 0",width:550}}>
							以上价格为打印/复印每面的价格
							</span>
						</ListGroupItem>
					</ListGroup>
					<ListGroup >
							<ListGroupItem >
								<KrField 
									name="scanPrice" 
									type="text" 
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
	var reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
	console.log("values",values);
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
	}else if(!reg.test(values.A4Mono) || !reg.test(values.A4Color) || !reg.test(values.A4White) ||
	!reg.test(values.A3Mono) || !reg.test(values.A3Color) || !reg.test(values.A3White) ||
	!reg.test(values.A5Mono) || !reg.test(values.A5Color) || !reg.test(values.A5White) ||
	!reg.test(values.LetterWhite) || !reg.test(values.LetterColor) || !reg.test(values.LetterWhite) ||
	!reg.test(values.LegalMono) || !reg.test(values.LegalColor) || !reg.test(values.LegalColor) ||
	!reg.test(values.B4Mono) || !reg.test(values.B4Color) || !reg.test(values.B4White) ||
	!reg.test(values.B5Mono) || !reg.test(values.B5Color) || !reg.test(values.B5White)||
	!reg.test(values.scanPrice)){

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
