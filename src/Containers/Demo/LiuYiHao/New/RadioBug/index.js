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
	motto:"宠辱不惊，看庭前花开花落；去留无意，望天空云卷云舒。"
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
		
		
		this.box.innerHTML = values.summary;
		var htmlData =this.box.innerHTML;
		
		// console.log('lLLLLLL',this.typeJudgment(values.summary))
		// onSubmit && onSubmit();
		this.setState({
			child:dataToTemplate(values.summary,[allkkdata])
		})
	}
	componentDidMount() {
		Store.dispatch(change('RadioBug','wsenabled',false));
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
				{ReactHtmlParser(child)}
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  