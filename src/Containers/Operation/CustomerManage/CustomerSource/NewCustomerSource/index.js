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
	DrawerTitle,
} from 'kr-ui';
import './index.less';
import { Http } from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer
class NewCustomerSource extends Component {
	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			typeValue: this.props.typeValue,
			sourceList:[
				{
					label:"slslsl",
					value:"slslsl",
				}
			]
		}
	}
	componentDidMount() {
		this.getSourceList()
		Store.dispatch(change('newCustomerSource', 'enabled', "true"));
	}

	//获取来源类型的信息
	getSourceList = () =>{
		let _this =this;
		Http.request('get-source-list',{enmuKey:'com.krspace.order.api.enums.customer.CsrChannelType'}).then(function(response) {
			var options=[];
			for(var i=0;i<response.length;i++){
				options.push({
					label : response[i].desc,
					value : response[i].value
				})
			}
			_this.setState({
				sourceList : options
			})


		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	onCancel = () => {
		const { onCancel } = this.props;

		onCancel && onCancel();
	}
	componentWillUnmount() {
		State.names = {};
		State.isOrderName = true;
		State.isName = true;
		State.isCode = true;
	}

	onSubmit = (values) => {
		
		let { onSubmit } = this.props;
		onSubmit && onSubmit(values);
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
	//操作
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
		State.names = nameData;
		State.codes = codeData;
		State.orderData = orderData;

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
	nameChange = (data, index, fields) => {

		var names = Object.assign({}, State.names);

		var self = this;
		if (data != "") {
			names[index] = data;
		}
		State.names = names;
		var value = { id: '', name: data }
		ajax.get('check-name-source', value).then(function (response) {

			if (index == "no" && response.code == "-1") {
				State.isName = false;
			}
			if (index == "no" && response.code == "1") {
				State.isName = true;
			}
			if (index != "no" && response.code == "-1") {
				document.getElementById("child-prompt-new").innerHTML = "该名称已存在";

			}
			if (index != "no" && response.code == "1") {
				if (self.flog(index, names, data)) {
					document.getElementById("child-prompt-new").innerHTML = "该名称已存在"
				} else {
					document.getElementById("child-prompt-new").innerHTML = ""

				}

			}


		}).catch(function (err) {

		});



	}
	//监听code发生变化
	codeChange = (data, index) => {
		var codes = Object.assign({}, State.codes)
		var self = this;
		if (data != "") {
			codes[index] = data;
		}
		State.codes = codes;

		var value = { id: '', code: data }
		Http.request('check-code-source', value).then(function (response) {
			if (index == "no" && response.code == "-1") {
				State.isCode = false;
			}
			if (index == "no" && response.code == "1") {
				State.isCode = true;
			}
			if (index != "no" && response.code == "-1") {
				document.getElementById("child-prompt-new").innerHTML = "该编码已存在"

			}
			if (index != "no" && response.code == "1") {
				if (self.flog(index, codes, data)) {
					document.getElementById("child-prompt-new").innerHTML = "该编码已存在"
				} else {
					document.getElementById("child-prompt-new").innerHTML = ""
				}

			}
		}).catch(function (err) {

		});
	}
	//排序校验
	orderChange = (data, index) => {
		var orderNums = Object.assign({}, State.orderNums);
		if (data != "") {
			orderNums[index] = data;
		}
		State.orderNums = orderNums;
		if (index == "no") {
			var value = { id: '', orderNum: data }
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
				document.getElementById("child-prompt-new").innerHTML = "该序号已存在"
			} else {
				document.getElementById("child-prompt-new").innerHTML = ""
			}
		}

	}
	render() {
		const { handleSubmit, select } = this.props;
		const { typeValue,sourceList } = this.state;
		let fieldStyle = { width: 262, marginLeft: 28 };
		let promptStyle = { marginLeft: 25, color: "red" };
		let columnStyle = { display: "inline-block", verticalAlign: "top" };
		console.log('sourceList===》',sourceList)

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
								grid={1 / 2} label="来源编码"
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
							{!State.isOrderName && <div style={promptStyle}>该序号已存在</div>}

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
							label="来源类型"
							name="type"
							style={{ width: 262, marginLeft: 15 }}
							component="select"
							options={sourceList}
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

	if (!values.type) {
		errors.type = "类型为必填项"
	}

	if (values.brokerage === '') {
		errors.brokerage = '拥金比例为必填项';
	} else if (!decimal.test(values.brokerage)) {
		errors.brokerage = '佣金的整数部分最多6位，小数部分最多4位';
	} else if (values.brokerage.length > 6) {
		errors.brokerage = '佣金比例最多6位';
	}
	return errors;
}
export default reduxForm({ form: 'newCustomerSource', validate })(NewCustomerSource);
