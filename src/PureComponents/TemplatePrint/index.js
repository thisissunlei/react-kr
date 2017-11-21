import React from 'react';
import ReactDOM from 'react-dom';
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
	ReactHtmlParser,
	Http,
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
import { observer, inject } from 'mobx-react';

import './index.less';
import { window } from 'rxjs/operator/window';
// @inject("NavModel")
// @observer
var  textArr=[
	{
			name:'money',
			label:'金额',
			value:'小写',
			showValue:'大写'
	},
	{
			name:'city',
			label:'城市',
			value:'小写',
			showValue:'大写'
	}
]
class TemplatePrint extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child:"",
			nameList: [
			],
			fieldVOs:[],
			selectOpen:false,
		}
		this.content = ''
		this.editId = "edit_"+ new Date();
		this.global = {
			wWidth: document.body.clientWidth ,
			wHeight: document.body.clientHeight 
		}
	}
	componentDidMount() {
		var ue = UE.getEditor(this.editId);
		ue.ready(function () {
			ue.setHeight(400);
		});
	}	
	//编辑区域的大小修改
	changeMiddleSize = () =>{

	}
    componentWillMount(){
		let {formId}=this.props;
		let {fieldVOs}=this.state;
		var _this=this;
		Http.request("get-sql-print",{formId:formId}).then(function (response) {
			response.items.map((item,index)=>{
				fieldVOs=fieldVOs.concat(item.fieldVOs)
			})
			_this.setState({
				nameList:response.items,
				fieldVOs
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
    
	onSubmit = (value) =>{
		var params = Object.assign({},value);
		let {onSubmit,id} = this.props;
	
		params.id= id;
        Http.request("other-contract-formwork-new",{},params).then(function (response) {
			onSubmit(Object.assign(value,{printTemplateId:response.printTemplateId}));
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	onCancel = ()=>{
	   let {onCancel} = this.props;
	   onCancel && onCancel()
	}
	templateChange = (value) =>{
		this.content = value;
	}
	
    //按钮
	btnValue=(name)=>{
		let {fieldVOs}=this.state;
		var showValue={};
		fieldVOs.map((item,index)=>{
			for(var d in item){
				if(d!='label'&&d!='name'){
					showValue[d]=item[d];
				}
			}
		})
        var showBtn=[];
		for(var item in showValue){
			showBtn.push(<span 
				className= "value-btn"
				style={{padding:'0 10px',background:'#499df1',textAlign:'center',color:'#fff',borderRadius:'4px',marginLeft:'10px',display:'inline-block',height:'25px',lineHeight:'25px',cursor:'pointer'}}
				onClick={this.originClick.bind(this,item,name)}
			>{showValue[item]}</span>)
		}
		return <div style = {{float:"right",paddingRight:10}}> {showBtn}</div>
	}
	
	//列表
	btnWatch=()=>{
		let {fieldVOs}=this.state;
		var showTexts=fieldVOs.map((item,index)=>{
			       return <div>
								<span>{item.label}</span>
								{
									this.btnValue(item.name)
								}
				         </div>
		})
		return showTexts
	}

	nameListChange=(item)=>{
       this.setState({
		 fieldVOs:item.fieldVOs
	   })
	}
	
	//点击上去
	originClick=(item,bigItem)=>{
		var funcName='';
		if(item=='showValue'){
			funcName = '{{m-'+bigItem+'}}';
		}else{
			funcName = '{{m-'+bigItem+'.'+item+'}}';
		}
		UE.getEditor(this.editId).execCommand('inserthtml', funcName);
	}
	
	openSelectTop=()=>{
		this.setState({
			selectOpen:!this.state.selectOpen
		})
		const dom = ReactDOM.findDOMNode(this.introList);
		if(dom.style.display=='none'){
			dom.style.display='block';
		}else{
			dom.style.display='none';
		}
	}
    

	render() {
		let {handleSubmit,allData}=this.props;
		let {child,nameList,selectOpen} = this.state;
		let selectStyle = {
			transform: "rotateZ(0deg)"
		}

		if (selectOpen){
			selectStyle.transform = "rotateZ(180deg)";
		}
	    
        
		return (
			<form className = "edit-print-formwork"  onSubmit={handleSubmit(this.onSubmit)} >
				<Title value="合同列表"/>
				<Section title="合同列表" description="" style={{marginBottom:-5}} rightElement = {
					<div>
						<span style = {{display:'inline-block',marginRight:10}}><Button  label="确定" type="submit"/></span>
						<Button  label="关闭" type="button" cancle={true} onTouchTap={this.onCancel} />
					</div>
				}>
				  <div className='editor-middle'>
					<div className='editor-left'>
						
						<KrField 
							id={this.editId}
							component="editor" 
							name="content" 
							label="" 
							onChange ={this.templateChange}
							defaultValue={allData}
							
						/>
						
					</div>

				     <div className='print-right'>

					   <KrField 	
					        grid={1}		
							label="模板名称" 
							name="name" 
							style={{display:'inline-block',boxSizing:'border-box'}} 
							component="input" 
							inline={false}
							requireLabel={true}
						/>

					     <KrField 
						    grid={1} 		
							label="表单名称" 
							name="tableName" 
							component="select" 
							inline={false}
							options={nameList}	
							onChange={this.nameListChange}	
						/>

					    <div className='text-list'>
							<p style={{background:'#F6F6F9',fontSize:'14px',color: '#333333'}} className='text-p-style'>字段列表</p>

							<div className='btn-li-style'>
							{
								this.btnWatch()
							}
							</div>
						</div>

						<div className='text-introduction'>
							<div className = "introduction-bar">
								配置说明
								<div className="select" style={selectStyle} onClick={this.openSelectTop}></div>
							</div>

							<div 
							   ref={ul=>{this.introList = ul}}
							   className='inner-introduction' style={{display:'none'}}>
								1dsdfsdfdsfds
							</div>

						</div>

					 </div>
				  </div>
				</Section>
				
			</form>

		);
	}

	swidthSelect = () => {
		let { openSelect } = this.state;
		this.setState({
			openSelect: !openSelect
		})
	}




}
const validate = values => {
	const errors = {}
	if (!values.name) {
		errors.name = '请输入模板名称';
	} 
	if(!values.content){
		errors.content = '模板内容不可为空';
	}
	
	
	return errors
}
export default TemplatePrint = reduxForm({
	form: 'TemplatePrint',
	validate,
})(TemplatePrint);

  