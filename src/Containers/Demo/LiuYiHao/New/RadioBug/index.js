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
	
	dataToTemplate,
	ReactHtmlParser
}from 'kr/Utils'
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

import {
	KrField,
    ButtonGroup,
    Button
} from 'kr-ui';
var allkkdata = {
	name:"yihao",
	age:18,
	sex:"男",
	motto:"宠辱不惊，看庭前花开花落；去留无意，望天空云卷云舒。",
	moneyDetail:[
		{name:"noe1",age:23,sex:"女"},
		{name:"shui2",age:15,sex:"男"},
		{name:"shui3",age:19,sex:"女"},
	],

}
/*
姓名：{{name}}
年龄：{{age}}
性别：{{sex}}
座右铭：{{motto}}
*/
class RadioBug extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child:""
		}
	}

	 onCancel=()=>{
		 const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	 }

    onSubmit=(values)=>{
		const {
			onSubmit
		} = this.props;
		
		console.log(values.summary,">>>>>>>>>>>>");
		
		this.box.innerHTML = this.imgParse(values.summary);
		// this.box.innerHTML = values.summary;
		// var talbe = document.querySelectorAll(".main-table")
		// this.box.onload = function(){
		// 	console.log("onload------")
		// }
		var mainTr = document.querySelectorAll(".main-table tr");
		var detailTr = document.querySelectorAll(".money-detail tr");

		// console.log(mainTr,"77777777");

		this.mianCodeParse(mainTr,allkkdata)
		this.detailCodeParse(detailTr,allkkdata.moneyDetail)
		// var htmlData = this.box.innerHTML;
		// this.setState({
		// 	child:dataToTemplate(values.summary,[allkkdata])
		// })
	}
	componentDidMount() {
		Store.dispatch(change('RadioBug','wsenabled',false));
	}

	mianCodeParse = (elems,params) =>{
		
		for(let i = 0; i<elems.length;i++){
			let everyLine = elems[i];
				
			everyLine.innerHTML = this.codeParse(everyLine.innerHTML,params)
		}
		// elems.map((item,index)=>{
		// 	console.log(999999999999)
		// 	item.innerHTML = this.codeParse(item.innerHTML,params);
		// })
	}
	detailCodeParse = (elems, params) =>{
		var text = ''+elems[0].innerHTML;
		for (var i = 0; i < params.length; i++) {
			let everyLine = params[i];
			text += `<tr>${this.codeParse(elems[1].innerHTML,params[i])}</tr>`
		}
		document.querySelectorAll(".money-detail tbody")[0].innerHTML = text;

	}
	imgParse = (template) =>{
		var t,reg;
		reg = new RegExp('`img`', 'ig');
		t = template.replace(reg, "<img src = 'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/erp_public_upload/201708/A/163113855_54.png'>");
		return t;
	}
	codeParse = (template, data) =>{
		var t, key, reg;
		　　　 //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
		  for (key in data) {
				reg = new RegExp('{{' + key + '}}', 'ig');
				t = (t || template).replace(reg, data[key]);
		  }
		  return t;
	}



	render() {


		let {handleSubmit}=this.props;
		let {child} = this.state;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				<div
					ref = {
						(ref)=>{
							this.box = ref; 
						}
					}
				></div>
				
				<KrField component="editor" name="summary" label="活动介绍" defaultValue=''/>
                 <ButtonGroup>
                    <Button  label="确定" type="submit"/>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                </ButtonGroup>
				{/*ReactHtmlParser(child)*/}
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  