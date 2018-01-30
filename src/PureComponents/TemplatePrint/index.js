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
import qrCodeUrl from './images/qrCode.png'
import {
	dataToTemplate,
	ReactHtmlParser,
	Http,
} from 'kr/Utils'
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
	AirBubbles,
	KrMenu,
	InputNumber
} from 'kr-ui';
import { observer, inject } from 'mobx-react';

import './index.less';
import { window } from 'rxjs/operator/window';
// @inject("NavModel")
// @observer

class TemplatePrint extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			child: "",
			nameList: [
			],
			fieldVOs:[],
			publicFields:[],
			rowNums:{}
		}
		
		this.labellings = [
			{ name: 'img', label: '合同公章' },
			{ name: 'pagination', label: '另起一页' },
			{ name: 'qrCode' ,label:'二维码'},
			{ name: 'includeStart', label: '区块开始标签' },
			{ name: 'includeEnd', label: '区块结束标签' },
			{ name: 'allEnd', label: '文章结尾' },
			{ name: 'attachmentStart', label: '附件使用标签开始' },
			{ name: 'attachmentEnd', label: '附件使用标签结束' },
			{ name: 'produceFdfTime', label: 'pdf生成的日期' }
		]
		this.content = ''
		this.editId = "edit_" + new Date();
		this.global = {
			wWidth: document.body.clientWidth,
			wHeight: document.body.clientHeight
		}
		this.tableLabel = '所有字段';
		this.prefixes = 'm-';
		this.allFields = [];
	}
	componentDidMount() {
		var wHeight = document.body.clientHeight;
		var ue = UE.getEditor(this.editId);
		var editorHeight = wHeight - 200;

		ue.ready(function () {
			ue.setHeight(editorHeight || 600);
		});
	}
	//编辑区域的大小修改
	changeMiddleSize = () => {

	}
	componentWillMount() {
		let { formId } = this.props;
		let { fieldVOs } = this.state;
		var _this = this;
		Http.request("get-sql-print", { formId: formId }).then(function (response) {
			response.items.map((item, index) => {
				fieldVOs = fieldVOs.concat(item.fieldVOs);
				_this.allFields = fieldVOs.concat(item.fieldVOs);
			})
			_this.setState({
				nameList: response.items,
				fieldVOs,
				publicFields: response.publicFields,
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}

	onSubmit = (value) => {
		var params = Object.assign({}, value);
		let { onSubmit, id, formId } = this.props;
		params.formId = formId;
		params.id = id;
		Http.request("other-contract-formwork-new", {}, params).then(function (response) {
			onSubmit(Object.assign(value, { printTemplateId: response.printTemplateId }));
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	onCancel = () => {
		let { onCancel } = this.props;
		onCancel && onCancel()
	}
	templateChange = (value) => {
		this.content = value;
	}

	//生成按钮
	btnValue = (data, prefixes) => {
		let { fieldVOs } = this.state;
		var showBtn = [];
		
		for (var key in data) {
			if (key != 'label' && key != 'name') {
				showBtn.push(
					<span
						className="value-btn"
						onClick={this.originClick.bind(this, key, data.name, prefixes)}
					>
						{data[key]}
					</span>
				)
			}
		}
		

		return <div style={{ float: "right", paddingRight: 10 }}> {showBtn}</div>
	}

	//字段展示列表
	btnWatch = (fieldVOs, prefixes) => {
		var showTexts = fieldVOs.map((item, index) => {
			
			return (
				<div className="box" key={index}>
					<div style={{ float: "left" }} >
						<AirBubbles title={item.name} offsetTop='10'>
							<span className="text-label" onClick={()=>{
								this.btnLabelClick(item.label);
							}}>{item.label}</span>
						</AirBubbles>
					</div>
					{
						this.btnValue(item, prefixes)
					}
				</div>
			)
		})
		return showTexts
	}
	btnLabelClick = (label)=>{
		UE.getEditor(this.editId).execCommand('inserthtml', label);
	}
	//表单名称修改
	nameListChange = (item) => {
		if (!item) {
			item = { label: '所有字段', fieldVOs: this.allFields };
		}
		if (item.label == "主表") {
			this.prefixes = 'm-';
		} else {
			this.prefixes = item.name + '-';
		}
		this.tableLabel = item.label;
		this.setState({
			fieldVOs: item.fieldVOs
		})
	}

	//点击上去
	originClick = (item, bigItem, prefixes) => {
		var funcName = '';
		
		if (item == 'showValue') {
			funcName = '{{' + prefixes + bigItem + '}}';
		} else {
			funcName = '{{' + prefixes + bigItem + '$' + item + '}}';
		}
		UE.getEditor(this.editId).execCommand('inserthtml', funcName);
	}
	//便签渲染
	labellingRender = () => {
		var arr = this.labellings.map((item, index) => {
			return (
				<div className="add-btn" key={index}>
					<div style={{ float: "left" }}>
						<AirBubbles title={item.name} offsetTop='10'>
							{item.label}
						</AirBubbles>
					</div>
					<div style={{ float: "right", paddingRight: 10 }}>
						<span
							className="value-btn"
							onClick={this.labelClick.bind(this, item.name)}
						>
							添加
						</span>
					</div>
				</div>
			)
		})
		return arr;
	}
	inputChange = (data, key) => {
		var { rowNums } = this.state;
		rowNums[key] = data;
		this.setState({
			rowNums,
		});
	}
	//明细表
	detailRender = () =>{
	   let {nameList,rowNums} = this.state;
		var elems = nameList.map((item,index)=>{
			if(item.name !=="main_table"){
				return (
					<div className="add-btn" key={index}>
						<div style={{ float: "left" }}>
							<AirBubbles title={item.name} offsetTop='10'>
								{item.label}
							</AirBubbles>
						</div>
						<div style={{ float: "right", paddingRight: 10 }}>
						    <InputNumber max='20' min='2' change={this.inputChange} elemKey={index} height='27' inputWidth='50' label=''></InputNumber>
							<span
								className="value-btn"
								onClick={(event)=>{
									
									this.detailClick(item,rowNums[index]||2);
								}}
								
							>
								添加
						</span>
						</div>
					</div>
				)
			}

		})
		return elems;
	}
	labelClick = (name) => {
		let funcName = '';
		if (name == "qrCode") {
			funcName = "<img class='qrCode' style='width:80px;height:80px;' src='"+qrCodeUrl+"'/>"
			UE.getEditor(this.editId).execCommand('inserthtml', funcName);
			return;
		}
		funcName = '#{' + name + '}';
		UE.getEditor(this.editId).execCommand('inserthtml', funcName);
	}
	detailClick = (item, colNum) => {
		var th = "";
		var td = "";
		var tBottom = "";
		var tableStyle = "width:100%;border-top: 1px solid #000;border-left: 1px solid #000;border-collapse:collapse";
		var thAndTd = "border-right: 1px solid #000;border-bottom: 1px solid #000;line-height:26px;";
		var trStyle = "text-align: center;color: #333;";
		var thStyle = thAndTd + "background: #fff;";
		var tdStyle = thAndTd + trStyle;
		for (var i = 0; i < colNum; i++) {
			th += `<th style="${thStyle}"></th>`;
			td += `<td style="${tdStyle}"></td>`;
			tBottom += `<td style="${tdStyle}"></td>`;
		}

		var str = `<div id="tableTitle-${item.name}">${item.label}</div>` +
			`<table style="${tableStyle}" data-id="table-${item.name}" table-name="${item.name}">` +
			`<tr id="th-${item.name}" style="${trStyle}">${th}</tr>` +
			`<tr id="td-${item.name}" style="${trStyle}">${td}</tr>` +
			`<tr id="tBottom-${item.name}" style="${trStyle}">${td}</tr>` +
			`</table>`;
		UE.getEditor(this.editId).execCommand('inserthtml', str);

	}


	render() {
		let { handleSubmit, allData } = this.props;
		let { child, nameList, fieldVOs, publicFields } = this.state;

		return (
			<form className="edit-print-formwork" onSubmit={handleSubmit(this.onSubmit)} >
				<Title value="合同列表" />
				<Section title="合同列表" description="" style={{ marginBottom: -5 }} rightElement={
					<div>
						<span style={{ display: 'inline-block', marginRight: 10 }}><Button label="确定" type="submit" /></span>
						<Button label="关闭" type="button" cancle={true} onTouchTap={this.onCancel} />
					</div>
				}>
					<div className='editor-middle'>
						<div className='editor-left'>

							<KrField
								id={this.editId}
								component="editor"
								name="content"
								label=""
								onChange={this.templateChange}
								defaultValue={allData}
								editHeight={{ wsheight: 1000 }}
							/>

						</div>

						<div className='print-right'>

							<KrField
								grid={1}
								label="模板名称"
								name="name"
								style={{ display: 'inline-block', boxSizing: 'border-box' }}
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
								<KrMenu title="公共字段" subHeight="100px">
									<div className='btn-li-style'>
										{
											this.btnWatch(publicFields, "o-")
										}
									</div>
								</KrMenu>
							</div>
							<div className='text-list'>
								<KrMenu title={this.tableLabel} subHeight="431px">
									<div className='btn-li-style'>
										{
											this.btnWatch(fieldVOs, this.prefixes)
										}
									</div>
								</KrMenu>
							</div>
							<KrMenu title="标签" subHeight="250px" style={{ marginTop: "20px" }}>
								<div>
									{this.labellingRender()}
								</div>
							</KrMenu>
							<KrMenu title="明细表" subHeight="150px" style={{ marginTop: "20px" }}>
								<div>
									{this.detailRender()}
								</div>
							</KrMenu>

							<KrMenu title="配置说明" subHeight="200px" style={{ marginTop: "20px" }}>
								<div style={{ padding: 10 }}>{"1、添加变量应 {{变量名}} 的形式录入,或者以 {{变量名$属性名}} 的形式录入"}</div>
								<div style={{ padding: 10 }}>{"2、添加特定标签以 #{标签名} 的形式注入 例如：区块标签是成对存在"}</div>
							</KrMenu>
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
	if (!values.content) {
		errors.content = '模板内容不可为空';
	}


	return errors
}
export default TemplatePrint = reduxForm({
	form: 'TemplatePrint',
	validate,
})(TemplatePrint);

