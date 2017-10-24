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
	KrField,
    ButtonGroup,
    Button
} from 'kr-ui';
var data = {
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
		console.log("KKKKKK",values)
		onSubmit && onSubmit();
	}
	componentDidMount() {
		Store.dispatch(change('RadioBug','wsenabled',false));
	}
	attachTemplateToData = (template, data) => {
        var i = 0,
            len = data.length,
            fragment = '';
 
        // 遍历数据集合里的每一个项，做相应的替换
        function replace(obj) {
            var t, key, reg;
 　　　　　　
　　　　　　　//遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
            for (key in obj) {
                reg = new RegExp('{{' + key + '}}', 'ig');
                t = (t || template).replace(reg, obj[key]);
            }
 
            return t;
        }
 
        for (; i < len; i++) {
            fragment += replace(data[i]);
        }
 
        return fragment;
    };


	render() {


		let {handleSubmit}=this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				
				<KrField component="editor" name="summary" label="活动介绍" defaultValue=''/>
                 <ButtonGroup>
                    <Button  label="确定" type="submit"/>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                </ButtonGroup>
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  