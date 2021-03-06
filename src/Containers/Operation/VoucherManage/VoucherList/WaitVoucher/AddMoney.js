import React from 'react';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {Http} from 'kr/Utils';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo,
	DrawerTitle,
	Message
} from 'kr-ui';

import './index.less';

class AddMoney extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			flowAmount: 0,
			accountList: [],
			mainbillInfo: {},
			finaflowInfo: {},
			AddInfo:{},
			mainBillList:[],
			//我司账户名称
			accountNum:''
		}
		this.receivedBtnFormChangeValues = {};
    this.getAddInfo();
	}
  //获取基本数据
  getAddInfo=()=>{
    var _this = this;
    var id=this.props.detail.id;
     Http.request('findReceiptData',{id:id}).then(function(response) {
       response.mainBillList.map((item)=>{
         item.label=item.mainBillName;
         item.value=item.id;
         return item;
       })
         _this.setState({
           AddInfo: response.evidenceData,
           mainBillList:response.mainBillList
         })
     })
  }

  accountChange=(param)=>{
        this.setState({
			accountNum:param.accountNum
		})
	}

	trim = (str) => {
		return str.replace(/\s+/g, "");
	}

	argreementChecked = (options) => {
		var name = [];
		var	input = {
				value: 0
			};
		var	nameList = [];
		let {
			finaflowInfo
		} = this.state;
		var _this = this;
		var len = options.length - 1;
		options.map((item) => {
			name.push(`fix-${item.detailid}-${item.depositId}`);
			name.push(`fix-${item.detailid}-${item.totalrentId}`);
			if (options[len].checked != false && item.checked == false) {
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.depositId}-1`, ''));
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.totalrentId}-2`, ''));
				_this.getCount(input, name);
			}
			if (!options[len].checked) {
				finaflowInfo.scvList.map((item) => {
					nameList.push(`no-${item.id}`)
					Store.dispatch(change('addMoney', `no-${item.id}`, ''));
				})
				_this.getCount(input, '', nameList);
			}

		})

	}

	calcBalance = (item, value, input) => {
		var lastValue = value.split('.')[1];
		var val = this.trim(value)
		var name = input.name.split('-')[3];
		var deposit = 1;//押金
		var totalrent = 2;//定金
			val=val.replace(/,/gi,'');
			var nDeposit,nTotalrent,nFrontmoney;
				if (name == deposit) {
						var str=new String(item.nDeposit);
								nDeposit=str.replace(/,/gi,'');
						if(value*100 > nDeposit*100){
								Message.error('金额不能大于未回款额');
								return
						}

				}
				if (name == totalrent) {
						var str=new String(item.nTotalrent);
								nTotalrent=str.replace(/,/gi,'');
						if(item  && value*100 > nTotalrent*100){
							Message.error('金额不能大于未回款额');
							return
						}
				}
				if (name == deposit) {
					var str=new String(item.nFrontmoney)
						nFrontmoney=str.replace(/,/gi,'');
						if(item  && value*100 > nFrontmoney*100){
							Message.error('金额不能大于未回款额');
							return
						}

				}

		if (/[^0-9]+.[^0-9]+/.test(value)) {
			Message.error('金额只能为数字');
			return;
		}
		if (lastValue && lastValue.length > 2) {
			Message.error('最多到小数点后两位');
			return;
		}
		input.value = val;
		this.getCount(input)
	}

	getCount = (input, name, nameList) => {
		input.value = Math.round((input.value * 100))
		this.receivedBtnFormChangeValues[input.name] = input.value;
		let receivedBtnFormChangeValues = this.receivedBtnFormChangeValues;
		let liveMoneyValue = 0;
		if (input.value == 0 && !input.name) {
			var deposit = name[0];
			var totalrent = name[1];
			var name1 = `${deposit}-1`;
			var	name2 = `${totalrent}-2`;
			receivedBtnFormChangeValues[name1] = 0;
			receivedBtnFormChangeValues[name2] = 0;
			if (nameList && nameList.length > 0) {
				nameList.map((item, index) => {
					receivedBtnFormChangeValues[item] = 0;
				})
			}

		}
		for (var item in receivedBtnFormChangeValues) {
			if (receivedBtnFormChangeValues.hasOwnProperty(item)) {
				liveMoneyValue += receivedBtnFormChangeValues[item] * 1;
			}
		}


		liveMoneyValue = liveMoneyValue / 100;
		this.setState({
			flowAmount: liveMoneyValue
		});


	}


  //根据订单获取公司，主体，账户及合同
	getMainbillInfo = (form) => {
		var _this = this;
    let {AddInfo}=this.state;
    Http.request('get-mainbill-info',{mainBillId: form.value}).then(function(response) {
      _this.setState({
        mainbillInfo: response,
      })
      var form={
        payWay:AddInfo.payWay,
        corporationId:response.corporationId
      }
      _this.getAccount(form);
    })

		Http.request('get-finaflow-info', {
			mainBillId: form.value
		}, {}).then(function(response) {
			var obj = {
				label: "无合同",
				contactType: '0',
				value: '0'
			}
			response.cimbList.map((item) => {
				item.value = item.detailid;
				item.label = item.contactName;
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.depositId}-1`, ''));
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.totalrentId}-2`, ''));
				return item;
			})
			response.cimbList.push(obj)
			response.scvList.map((item) => {
				Store.dispatch(change('addMoney', `no-${item.id}`, ''));
			})
			_this.setState({
				finaflowInfo: response
			})

		}).catch(function(err) {});
	}
  //通过付款方式获取我司账户
	getAccount = (form) => {
		form = Object.assign({},form);
		var accountList;
		var _this = this;
		Http.request('get-account-info', {
			accountType: form.payWay,
			corporationId:form.corporationId
		}).then(function(response) {
			accountList = response.map((item, index) => {
				item.label = item.accountNum;
				item.value = item.accountId;
				return item;
			})
			_this.setState({
				accountList: accountList
			})

		});
	}

	onSubmit = (form) => {
		let {accountNum}=this.state;
		if (!form.contract) {
			Message.error('请选择对应合同');
			return;
		}
    var id=this.props.detail.id;
		var parentIdList = form.contract.split(',');
		var childrenList = [];
		var reg = /^fix/;
		var noReg = /^no/;
		var fixList = [];
		var valueList = [];
		var noList = []
		var key;
		var _this = this;
		for (key in form) {
			if (reg.test(key)) {
				fixList.push(key);
				valueList.push(form[key])
			}

			if (noReg.test(key)) {
				var arr = key.split('-');
				var obj = {
					"id": arr[1],
					"value": _this.trim(form[key])
				}
				noList.push(obj)
			}
		}
		parentIdList.map((item) => {
			var obj = {
				"id": item,
				"value": []
			}

			fixList.map((items, index) => {

				var arr = items.split('-');
				if (arr[1] == item) {
					var obj2 = {
						"id": arr[2],
						"value": _this.trim(valueList[index])
					}
					obj.value.push(obj2)
				}

			})
			childrenList.push(obj)
		})
		childrenList.map((item) => {
			if (item.id == 0) {
				childrenList.pop();
			}
		})

		let {
			onSubmit
		} = this.props;
		var params = {
			accountNum:accountNum,
			accountId: form.accountId,
			dealTime: form.dealTime,
			mainBillId: form.mainBillId,
			remark: form.remark || "",
			uploadFileIds: form.uploadFileIds || [],
			conJasonStr: JSON.stringify(childrenList) || '',
			propJasonStr: JSON.stringify(noList),
			flowAmount: this.state.flowAmount,
      		id:id
		}
      Http.request('add-receipt',{},params).then(function(response) {
		onSubmit && onSubmit();
      })


	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	joinInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	increaseInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/>
			< KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	renewInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	adminInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = {
				`定金（未回款额：${item.nFrontmoney}）`
			}
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.frontId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/>

			< /div>
		)
	}



	renderPayList = () => {
		let {
			finaflowInfo,

		} = this.state;

		if (!finaflowInfo.cimbList) {
			return (
				<div className="u-audit-content-null">
					<div className="u-audit-content-null-icon"></div>
					<div className="u-audit-content-null-title">暂时还没有数据呦亲~</div>
				</div>
			)
		}

		var _this = this;
		if (finaflowInfo.cimbList && finaflowInfo.cimbList.length > 0) {

			finaflowInfo.cimbList.map(function(item, index) {

				//意向书
				if (item.contactType == '1') {
					item.component = _this.adminInputRender.bind(this, item);

				}
				//入驻协议书
				if (item.contactType == '2') {
					item.component = _this.joinInputRender.bind(this, item);

				}

				//增租协议书
				if (item.contactType == '3') {

					item.component = _this.increaseInputRender.bind(this, item);
				}
				//续租协议书
				if (item.contactType == '4') {

					item.component = _this.renewInputRender.bind(this, item);
				}
				//
				if (item.contactType == '0') {

					item.component = _this.receiveInputRender;
				}
			})

			return (
				<div  className="u-audit-orderlist">
					<KrField label="对应合同" name='contract' grid={1 / 2} component="groupCheckbox" defaultValue={finaflowInfo.cimbList} requireLabel={true} onChange={this.argreementChecked}/>

				</div>

			)
		}


	}

	//无合同
	receiveInputRender = () => {
		let {
			finaflowInfo
		} = this.state;
		var _this = this;

		return ( < div style = {
				{
					marginBottom: -7,
					width: 650
				}
			} > {
				finaflowInfo.scvList.map(function(item, index) {
					if (index % 2 == 0) {
						return <div className='leftBottomValue'><KrField key={index} style={{
                            marginBottom: 5,
                            width: 261,
                            marginLeft: -9
                        }} grid={1 / 2}  label={item.categoryName} component="input" name={`no-${item.id}`} type="text" onChange={_this.calcBalance.bind(this, item)} onBlur={_this.moneyCheck}/></div>
					} else {
						return <div className='rightBottomValue'><KrField key={index} style={{
                            marginBottom: 5,
                            width: 261
                        }} grid={1 / 2}  label={item.categoryName} component="input" name={`no-${item.id}`} type="text" onChange={_this.calcBalance.bind(this, item)} onBlur={_this.moneyCheck}/></div>
					}
				})
			} < /div>)

		}

    getThumbnailContent = (item) => {
    return (
      <img src={item.thumbnail} width={90} height={90}/>
    );
  	}


		render() {

			const {
				error,
				handleSubmit,
				pristine,
				reset,
				detail
			} = this.props;
			let {
				accountList,
				mainbillInfo,
				flowAmount,
		        AddInfo,
		        mainBillList
			} = this.state;
        let items = [];
        if(AddInfo.urls){
          items = AddInfo.urls.map((item,value) => {
          	item.src=item.src;
          	item.thumbnail=item.src;
          	item.w= 900;
            item.h= 900;
            return item;
          });
        }

			return (
				<div className="u-audit-add">
			     	<DrawerTitle title ="添加回款" onCancel = {this.onCancel}/>
			     <form onSubmit={handleSubmit(this.onSubmit)} >
           <CircleStyleTwo num="1" info="付款凭证">
             <div style={{marginTop:28}}>
               <PhotoSwipeGallery items={items} options={{index:detail.id}}  thumbnailContent={this.getThumbnailContent}/>
             </div>
           </CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款信息" style={{marginTop:45}}>
						<KrField
								style={{width:260}}
								component="labelText"
								label="客户名称"
                inline={false}
                value={AddInfo.customerName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="mainBillId"
								component="select"
								label="所属订单"
								requireLabel={true}
                options={mainBillList}
								onChange={this.getMainbillInfo}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false}
								label="订单起止"
								defaultValue="-"
								value={mainbillInfo.mainBillDate}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText"
								inline={false}
								label="公司主体"
								defaultValue="-"
								value={mainbillInfo.corporationName}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								label="收款方式"
                inline={false}
                value={AddInfo.payWayName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="accountId"
								component="select"
								label="我司账户"
								options={accountList}
								requireLabel={true}
								onChange={this.accountChange}
						/>
						<KrField
								style={{width:260}}
								name="payAccount"
								type="text"
								component="labelText"
								label="付款账户"
                inline={false}
								value={AddInfo.paymentAccount}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime"
								component="date"
								label="收款日期"
								requireLabel={true}
						/>
						<KrField
								style={{width:548}}
								name="remark"
								component="textarea"
								label="备注"
								maxSize={100}
						/>
						<KrField
							 	name="contractFileList"
							 	component="input"
							 	type="hidden"
							 	label="合同附件"
						/>
						<KrField
							style={{width:548}}
							name="uploadFileIds"
							component="file"
							label="上传附件"
							defaultValue={[]}
							onChange={(files)=>{
								Store.dispatch(change('AddMoney','contractFileList',files));
							}}
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="3" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span>{flowAmount}</span>
						</div>
						{this.renderPayList()}
						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"  />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
					</CircleStyleTwo>
				</form>
			</div>


			);
		}
	}
	const validate = values => {

		const errors = {};
		if (!values.mainBillId) {
			errors.mainBillId = '请选择所属订单';
		}

		if (!values.accountId) {
			errors.accountId = '请选择我司账户';
		}

		if (!values.dealTime) {
			errors.dealTime = '请选择收款日期';
		}


		return errors
	}


	export default reduxForm({
		form: 'addMoney',
		validate,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	})(AddMoney);
