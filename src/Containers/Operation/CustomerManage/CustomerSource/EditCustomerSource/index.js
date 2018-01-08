import React, { Component, PropTypes } from 'react';
import { Actions, Store, connect } from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	FieldArray
} from 'redux-form';


import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
	DrawerTitle
} from 'kr-ui';
import './index.less';
import { Http } from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer
class EditCustomerSource extends Component {
	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			typeValue: this.props.typeValue,
		}
	}

	componentWillUnmount() {
		State.isOrderName = true;
		State.isName = true;
		State.isCode = true;
	}

	onCancel = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}

	onSubmit = (values) => {
		let { onSubmit } = this.props;
		onSubmit && onSubmit(values);
	}

	allRepeat = (arr, type) => {
		var yesList = [];
		for (var i = 0; i < arr.length; i++) {
			var hasRead = false;
			for (var k = 0; k < yesList.length; k++) {
				if (i == yesList[k]) {
					hasRead = true;
				}
			}
			if (hasRead) { break; }
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[i] == arr[j] && arr[i] != "" && arr[i] != "") {
					yesList.push(j);


					document.getElementById(type + (j - 1)).innerHTML = "该名称已存在"
				} else {
					document.getElementById(type + (j - 1)).innerHTML = ""
				}
			}
		}
		return yesList;
	}



	//删除储存数据
	remove = (index) => {
		var names = Object.assign({}, State.names);
		var codes = Object.assign({}, State.codes);
		var orders = Object.assign({}, State.orders);
		var childs = Object.assign({}, State.child)


		if (names[index]) {
			delete names[index];
		}

		if (codes[index]) {
			delete codes[index];
		}

		if (orders[index]) {
			delete orders[index];
		}

		var nameData = this.conversion(names);
		var codeData = this.conversion(codes);
		var orderData = this.conversion(orders);
		childs.splice(index, 1);

		State.names = nameData;
		State.codes = codeData;
		State.orderData = orderData;
		State.childs = childs;
		console.log(childs, "KKKKKKK");
	}
	//jsonToArr
	jsonToArr = (names) => {
		var arr = [];
		for (var key in names) {
			arr.push(names[key])
		}
		arr.unshift(arr.splice(arr.length - 1, 1)[0]);
		return arr;
	}
	//转换数据格式
	conversion = (names) => {
		var arr = [];
		var obj = {};
		for (var key in names) {
			arr.push(names[key])
		}

		arr.map((item, index) => {
			obj[index] = item;
		})
		return obj;
	}

	//监听name发生变化
	nameChange = (data, index) => {
		let { sourceId } = this.props;
		var names = Object.assign({}, State.names);
		var self = this;
		if (data != "") {
			names[index] = data;
		}

		State.names = names;
		var value = { id: sourceId || '', code: data }
		Http.request('check-name-source', value).then(function (response) {

			if (index == "no" && response.code == "-1") {
				State.isName = false;
			}
			if (index == "no" && response.code == "1") {
				State.isName = true;
			}
			if (index != "no" && response.code == "-1") {
				document.getElementById("child-prompt-edit").innerHTML = "该编码已存在"

			}
			if (index != "no" && response.code == "1") {
				if (self.flog(index, names, data)) {
					document.getElementById("child-prompt-edit").innerHTML = "该名称已存在"
				} else {
					document.getElementById("child-prompt-edit").innerHTML = ""

				}
			}

		}).catch(function (err) {

		});
	}
	//监听code发生变化
	codeChange = (data, index) => {
		const { sourceId } = this.props;
		const self = this;
		var codes = Object.assign({}, State.codes);
		if (data != "") {
			codes[index] = data;
		}
		State.codes = codes;

		var value = { id: sourceId || '', code: data }
		Http.request('check-code-source', value).then(function (response) {
			if (index == "no" && response.code == "-1") {
				State.isCode = false;
			}
			if (index == "no" && response.code == "1") {
				State.isCode = true;
			}
			if (index != "no" && response.code == "-1") {
				document.getElementById("child-prompt-edit").innerHTML = "该编码已存在"

			}
			if (index != "no" && response.code == "1") {
				if (self.flog(index, codes, data)) {
					document.getElementById("child-prompt-edit").innerHTML = "该编码已存在"
				} else {
					document.getElementById("child-prompt-edit").innerHTML = ""

				}

			}
		}).catch(function (err) {

		});
	}

	//排序校验
	orderChange = (data, index) => {
		const { sourceId } = this.props;
		const self = this;
		var orderNums = Object.assign({}, State.orderNums);
		if (data != "") {
			orderNums[index] = data;
		}
		State.orderNums = orderNums;
		if (index == "no") {
			var value = { id: sourceId || '', orderNum: data }
			Http.request('check-order-source', value).then(function (response) {
				if (response.code == "-1") {
					State.isOrderName = false;
				}
				if (response.code == "1") {
					State.isOrderName = true;
				}
			}).catch(function (err) {

			});
		} else { //本地排序的存储
			if (this.flog(index, orderNums, data)) {
				document.getElementById("child-prompt-edit").innerHTML = "该序号已存在"
			} else {
				document.getElementById("child-prompt-edit").innerHTML = ""

			}
		}

	}

	renderField = ({ input, label, placeholder, meta: { touched, error } }) => (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={label || placeholder} />
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	)
	componentWillReceiveProps(nextProps) {


	}

	/*
	*	判断是否有重复
	*	返回true 存在重复
	*	返回false 不存在重复
	*/
	flog = (index, datas, value) => {

		var judge = false;
		for (let i in datas) {
			if (i != index && datas[i] == value) {
				judge = true;
				break;
			}
		}
		return judge;
	}
	renderBrights = ({ fields, meta: { touched, error } }) => {
		const self = this;
		var krStyle = {};


		krStyle = { width: 228, marginLeft: 18, marginRight: 3 }
		let promptStyle = { marginLeft: 25, color: "red" };
		let columnStyle = { display: "inline-block", verticalAlign: "top" };


		var brights = fields.map(function (brightsStr, index) {

			return (<li key={index} style={{ width: 600, listStyle: 'none' }}>
				<div style={columnStyle}>
					<KrField
						style={{ width: 190, marginLeft: 18, marginRight: 3, }}
						grid={1 / 3}
						name={`${brightsStr}.name`}
						type="text"
						component={self.renderField}
						label={index ? '' : '子项名称'}
						placeholder='子项名称'
						onChange={(data) => {

							self.nameChange(data, index);
						}}

					/>
					<div id={"customerSourceName" + index} style={promptStyle}></div>
				</div>
				<div style={columnStyle}>
					<KrField
						style={{ width: 100, marginLeft: 0, marginRight: 3, }}
						grid={1 / 3}
						name={`${brightsStr}.code`}

						type="text"
						component={self.renderField}
						label={index ? '' : '子项编码'}
						placeholder='子项编码'
						onChange={(data) => {
							self.codeChange(data, index)
						}}

					/>
					<KrField
						style={{ width: 100, marginLeft: 0, marginRight: 3, }}
						grid={1 / 3}
						name={`${brightsStr}.brokerage`}
						type="text"
						component={self.renderField}
						label={index ? '' : '佣金'}
						placeholder='佣金'
						onChange={(data) => {
							self.codeChange(data, index)
						}}

					/>
					<div id={"customerSourceCode" + index} style={promptStyle}></div>
				</div>
				<div style={columnStyle}>
					<KrField
						style={{ width: 90, marginLeft: 0, marginRight: 3, }}
						grid={1 / 3}
						name={`${brightsStr}.orderNum`}
						type="text"
						component={self.renderField}
						label={index ? '' : '子项顺序'}
						placeholder='子项顺序'
						onChange={(data) => {
							self.orderChange(data, index)
						}}
					/>

					<div id={"customerSourceOrder" + index} style={promptStyle}></div>

				</div>
				<span
					className='minusBtn'
					style={!index ? { marginTop: 32, marginLeft: 8 } : { marginTop: 16, marginLeft: 8 }}

					onClick={() => {

						if (!State.childs[index]) {
							fields.remove(index)
							self.remove(index);
						} else {
							console.log(index, State.childs[index]);
							Http.request('del-child-source', { id: State.childs[index].id }).then(function (response) {
								if (response.code == 1) {
									fields.remove(index)
									self.remove(index);


								} else {
									Message.error("该子项不可删除");
								}
							}).catch(function (err) {

							});
						}


					}}
				/>
			</li>)
		})
		return (
			<ul style={{ padding: 0, margin: 0 }}>

				{brights}
				<div style={{ marginLeft: 20, marginBottom: 20 }}>
					<Button label="添加子项" onTouchTap={() => {

						fields.push();

					}} />
				</div>
			</ul>

		)
	}
	render() {
		const { handleSubmit, select } = this.props;
		const { typeValue } = this.state;
		let fieldStyle = { width: 262, marginLeft: 28 };
		let promptStyle = { marginLeft: 25, color: "red" };
		let columnStyle = { display: "inline-block", verticalAlign: "top" };
		return (

			<form className='edit-source-from' onSubmit={handleSubmit(this.onSubmit)} style={{ padding: " 35px 45px 45px 45px" }}>
				<div className="title">
					<DrawerTitle title='新建客户来源' onCancel={this.onCancel} />
				</div>
				<div className="cheek">
					<div className="titleBar">
						<span className="order-number">1</span>
						<span className="wire"></span>
						<label className="small-title">基本信息</label>
					</div>
					<div className="small-cheek">
						<div style={columnStyle}>
							<KrField
								grid={1 / 2} label="来源名称"
								name="name"
								style={{ width: 262, marginLeft: 15 }}
								component="input"
								requireLabel={true}
								onChange={(data) => {
									this.nameChange(data, "no")
								}}
							/>
							{!State.isName && <div style={promptStyle}>来源名称已存在</div>}
						</div>
						<div style={columnStyle}>
							<KrField
								grid={1 / 2}
								label="来源编码"
								name="code"
								style={{ width: 262, marginLeft: 15 }}
								component="input"
								requireLabel={true}
								onChange={(data) => {
									this.codeChange(data, "no")
								}}

							/>
							{!State.isCode && <div style={promptStyle}>来源编码已存在</div>}
						</div>
						<div style={columnStyle}>
							<KrField
								grid={1 / 2}
								label="来源顺序"
								name="orderNum"
								style={{ width: 262, marginLeft: 15 }}
								component="input"
								requireLabel={true}
								onChange={(data) => {
									this.orderChange(data, "no")
								}}


							/>
							{!State.isOrderName && <div style={promptStyle}>来源编码已存在</div>}

						</div>

						<KrField
							grid={1 / 2}
							label="佣金比例"
							name="brokerage"
							style={{ width: 262, marginLeft: 15 }}
							component="input"
							requireLabel={true}
						/>
						<KrField
							grid={1 / 2}
							label="全员开放"
							name="enabled"
							style={{ width: 262, marginLeft: 15, marginRight: 13 }}
							component="group"
							requireLabel={true}
						>
							<KrField
								name="enabled"
								label="是"
								type="radio"
								value="true"
								style={{ marginTop: 5, display: 'inline-block', width: 84 }}
							/>
							<KrField
								name="enabled"
								label="否"
								type="radio"
								value="false"
								style={{ marginTop: 5, display: 'inline-block', width: 53 }}
							/>
						</KrField>
						<div className="middle-round"></div>
					</div>

					<div className="titleBar">
						<span className="order-number">2</span>
						<span className="wire"></span>
						<label className="small-title">子来源信息</label>
					</div>
					<div className="small-cheek" style={{ paddingBottom: 0 }}>
						<div id="child-prompt-edit" style={{ textAlign: "center", color: "red", marginBottom: 20 }}></div>

						<FieldArray name="subListStr" component={this.renderBrights} />

					</div>

					<div className="end-round"></div>
				</div>
				<Grid style={{ marginTop: 30 }}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style={{ display: "inline-block", marginRight: 30 }}><Button label="确定" type="submit" /></div>
								<Button label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}
const validate = values => {

	let errors = {};
	let decimal = /^-?\d{0,6}\.?\d{0,4}$/;
	//正整数
	let numberNotZero = /^[0-9]*[1-9][0-9]*$/;

	if (!values.name) {
		errors.name = '来源名称必填';
	} else if (values.name.length > 20) {
		errors.name = "来源名称最多20个文字";
	}

	if (!values.code) {
		errors.code = '来源编码必填';
	} else if (values.code.length > 30) {
		errors.code = "来源名称最多30个字符";
	}

	if (!values.orderNum) {
		errors.orderNum = "序号为必填项"
	} else if (values.orderNum.toString().trim() && !numberNotZero.test(values.orderNum.toString().trim())) {
		errors.orderNum = "序号必须为正整数"
	}
	if (values.brokerage === '') {
		errors.brokerage = '拥金比例为必填项';
	} else if (!decimal.test(values.brokerage)) {
		errors.brokerage = '佣金的整数部分最多6位，小数部分最多4位';
	} else if (values.brokerage.length > 6) {
		errors.brokerage = '佣金比例最多6位';
	}



	if (!values.subListStr || !values.subListStr.length) {

	} else {
		let membersArrayErrors = []

		values.subListStr.forEach((porTypes, memberIndex) => {

			let memberErrors = {};
			let must = false;

			if (!porTypes) {
				return;
			}

			if (porTypes.name || porTypes.code || porTypes.orderNum || porTypes.brokerage) {
				must = true;
			}

			if (must && !porTypes.name) {
				memberErrors.name = '该子项名称必填';
			}
			if (must && !porTypes.code) {
				memberErrors.code = '编码必填';
			}
			if (must && !porTypes.orderNum) {
				memberErrors.orderNum = '排序必填';
			}
			if (must) {
				if (!decimal.test(porTypes.brokerage)) {
					memberErrors.brokerage = '佣金的整数部分最多6位，小数部分最多4位';
				} else if (porTypes.brokerage.length > 6) {
					memberErrors.brokerage = '佣金比例最多6位';
				}
			}

			if (porTypes.name && porTypes.name.length > 20) {
				memberErrors.name = '子项名称最多20个字';
			}
			if (porTypes.code && porTypes.code.length > 30) {
				memberErrors.code = '子项编码最多30个字符';
			}
			if (porTypes.orderNum && porTypes.orderNum.toString().trim() && !numberNotZero.test(porTypes.orderNum.toString().trim())) {
				memberErrors.orderNum = '序号必须为正整数';
			}
			membersArrayErrors[memberIndex] = memberErrors
		})

		if (membersArrayErrors.length) {
			errors.subListStr = membersArrayErrors
		}
	}
	return errors;
}
export default reduxForm({ form: 'editCustomerSource', validate })(EditCustomerSource);
