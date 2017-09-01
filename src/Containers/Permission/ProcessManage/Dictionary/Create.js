import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	TabelEdit,
	FRow,
} from 'kr-ui';

import {
	observer
} from 'mobx-react';

import State from './State';

import './index.less';

@observer
class NewCreateForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			beginDate:'',
			endDate:'',
			beginTime:'',
			endTime:''
		}
	}
	componentWillMount() {
		Store.dispatch(change('NewCreateForm','type','1'));

		
	}
	onSubmit=(value)=>{
		console.log('value',value)
	}
	onCancel=()=>{
		State.openCreate = false;
	}

	render(){
		const { handleSubmit} = this.props;
		// 对应功能选项
		return (
			<div className="new-create-activity">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">新建公共字典</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
								<KrField grid={1/2} name="name" type="text" label="字典名称" requireLabel={true} style={{width:252,zIndex:11}} />
								<KrField grid={1/2} name="code" type="text" left={50} label="字典编码" requireLabel={true} style={{width:252}}/>
								<KrField grid={1} name="type" component="group" label="字典类型"  requireLabel={true}>
									<KrField name="type" grid={1/2} label="静态" type="radio" value='1' style={{marginTop:10,display:"inline-block"}} onClick={this.chooseStick}/>
				              	</KrField>
								<KrField grid={1} name="remark" 
								 type="textarea" component="textarea"maxSize={100}
								label="描述"/>
								
					</div>
					<div style={{marginLeft:28,marginBottom:40}}>
					 <TabelEdit 
					 	name = "data" 
						toolbar = {true}
						checkbox = {true}
						
					 >
						 <FRow name = "age"  type = "tableEdit"  label = "选项文字" />
						 <FRow name = "name" type = "tableEdit" label = "选项值" />
						 <FRow name = "other" type = "tableEdit" label = "排序号" />
						 <FRow name = "checked" type = "checkBox" label = "是否默认" />
					 </TabelEdit>
					</div>
					<Grid style={{paddingBottom:50}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',paddingRight:15}}>
								<Button  label="确定" type="submit" />
							</ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left'}}>
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} />
							</ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

				</form>
		  	</div>
		);
	}
}
const validate = values => {
	console.log("values",values);

	let errors = {};
	if(values.name){
		errors.name = '请填写字典名称'
	}
	if(values.code){
		errors.code = '请填写字典编码'
	}
	return errors
}

export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
