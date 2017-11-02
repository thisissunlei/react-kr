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
	Button,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
	Drawer,
	Tooltip,
	Message,
	UpLoadList,
	FontIcon,
	Pagination,
	Loading,
	CheckPermission,
	ListGroup,
	ListGroupItem,
	SearchForms,
} from 'kr-ui';

var allData = {
	age:18,
	name:"刘毅豪",
	sex:"男",
	motto:"宠辱不惊,看庭前花开花落;去留无意,望天空云卷云舒;"
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
	openOneAgreement = () =>{
	}
	onSearchSubmit = () =>{
	}
	onSubmit = () =>{
		
	}


	editorChange = (values) =>{
		console.log(values,"PPPPPPP")
	}
	typeJudgment = (data) =>{
		return Object.prototype.toString.call(data);
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
		let {child} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				<KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                    <KrField name="wsenabled" label="允许" type="radio" value={true} />
                    <KrField name="wsenabled" label="禁止" type="radio" value={false} />
                </KrField>
				<KrField component="editor" name="summary" label="活动介绍" defaultValue='' change = {this.editorChange}/>
                 <ButtonGroup>
                    <Button  label="确定" type="submit"/>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                </ButtonGroup>
				{child}
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  