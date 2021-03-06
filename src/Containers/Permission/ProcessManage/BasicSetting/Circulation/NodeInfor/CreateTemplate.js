import React from 'react';
import {reduxForm,initialize,change} from 'redux-form';
import {Store} from 'kr/Redux';
import mobx, {
	observable,
	action,
	toJS
} from 'mobx';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	CircleStyleTwo,
	ButtonGroup,
	CheckTable,
	DrawerTitle,
	FdRow,
} from 'kr-ui';
import State from '../../State';
import {
	observer
} from 'mobx-react';
import '../../index.less';
@observer
class CreateNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	componentWillMount() {
	}

	componentDidMount() {
		Store.dispatch(change('createNewList','mainT',toJS(State.mainT.mainT)));

		toJS(State.detailT).map((item,index)=>{
			Store.dispatch(change('createNewList',`fieldList${index}`,item.fields));
		})
	}

	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	onSubmit=(form)=>{
		let value = this.formData(form);
		if (!value.comment){
			value.comment = '';
		}
		State.saveTemplate(value);

		
	}
	formData=(form)=>{
		let formValue = form;
		let mainT = toJS(State.mainT);
		let detailT = toJS(State.detailT);
		mainT.fields = formValue.mainT ;
		mainT.fieldList = formValue.mainT ;
		mainT.lineNum = formValue.lineNum;
		mainT.templateTableId = mainT.id;
		let demo = [];
		demo.push(mainT);

		detailT = detailT.map((item,index)=>{
			let obj = item;
			obj.fieldList = formValue[`fieldList${index}`];
			obj.hasEditButton = formValue[`hasEditButton${index}`] || false;
			obj.templateTableId = item.id;
			obj.lineNum=0;
			obj.isMain=false;
			return obj;
		})
		demo = demo.concat(detailT);

		let submitForm = {
			mainTemplate:JSON.stringify(demo),
			name:formValue.name,
			formId:State.formId,
			comment:formValue.comment
		}
		return submitForm;
	}
	onSave=()=>{
		State.saveAndUse = true;
	}

	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-create-template">
					<div className="u-title-box">
                    	<DrawerTitle title ="新建模板——普通模式" onCancel = {this.onCancel}/>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
						<KrField
							name="name"
							type="text"
							component="input"
							label="模板名称"
							requireLabel={true}
							grid={1/2}
					 	/>


                         <KrField 
							grid={1} 
							label="提示性文字" 
							name="comment" 
							heightStyle={{height:"178px",width:'550px'}}  
							component="textarea"  
							maxSize={500} 
							style={{width:560,marginTop:10}} 
							placeholder='请输入提示性文字' 
							lengthClass='list-len-textarea'
						 />

					 	<div className='main-name'>
							<span style={{fontSize:'16px',color:'#666',lineHeight:'24px;'}}>主表-</span>
							<span>{State.mainT.name}</span>
						</div>
					 	<div className="select-line-num">
					 	<KrField
							name="lineNum"
							type="text"
							component="select"
							label="每行显示字段数"
							grid={1/2}
							inline={true}
							options={[{label:'2',value:2},{label:'1',value:1}]}
					 	/>
					 	</div>
							<div className='main-form'>
									     <CheckTable
												name ={`mainT`}
												isFold = {false}
												initFoldNum={1000}
												isSingle={true}
											>

											<FdRow name = "label" label = "字段显示名" />
											<FdRow name = "display" label = "是否显示" checkbox={true}/>
											<FdRow name = "editable" label = "是否编辑"  checkbox={true}/>
											<FdRow name = "required" label = "是否必填" checkbox={true}/>
											<FdRow name = "wholeLine" label = "是否整行" checkbox={true}/>
										</CheckTable>
								</div>
						 {
							toJS(State.detailT).map((item,index)=>{

								return <div className='main-form' style={{marginTop:20}} key={index}>

									<div className='main-name'>
									<span style={{fontSize:'16px',color:'#666',lineHeight:'24px;'}}>明细表-</span>
									<span>{item.name}</span>
									</div>
									<KrField 
								 		name={`hasEditButton${index}`}
								 		component="checkBox" 
								 		grid={1}
								 		inline={true}
								 		label="是否显示添加删除按钮"
									 />


									     <CheckTable
												name ={`fieldList${index}`}
												isFold = {false}
												initFoldNum={1000}
												isSingle={true}
											>

											<FdRow name = "label" label = "字段显示名" />
											<FdRow name = "display" label = "是否显示" checkbox={true}/>
											<FdRow name = "editable" label = "是否编辑"  checkbox={true}/>
											<FdRow name = "required" label = "是否必填" checkbox={true}/>
											<FdRow name = "wholeLine" label = "是否整行" checkbox={true}/>
										</CheckTable>
								</div>
							})
						}

						<Grid style={{marginTop:50,width:'100%'}}>
							<Row >
								<Col md={12} align="center">
									<ButtonGroup>
										<Button  label="确定" type="submit"  />
										<Button  label="保存并选择" type="submit"  width={131} onTouchTap={this.onSave}/>
										<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
				</form> 
			</div>


		);
	}
}
const validate = values => {
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	if(!values.name){
		errors.name = '请输入模板标题';

		
	}
	if(values.name){
		if(values.name.length>20){
			errors.name = '模板名称不能超过20字';
		}
	}
	if(!values.lineNum){
		errors.lineNum = '请选择主表显示字段数';
	}
	
	
	

	return errors
}

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

