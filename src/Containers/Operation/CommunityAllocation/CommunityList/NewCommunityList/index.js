import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class NewCommunityList extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	


	
	componentDidMount(){
      State.searchDataHere();
	}
   

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
           <div>
			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建社区</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">

									 <KrField grid={1/2} label="社区名称" name="name" component="input" style={{width:262,marginLeft:15}}  requireLabel={true} onChange={this.corpNameChange} />

                                     <KrField grid={1/2} label="社区编码" name="code" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>

                                    <div className="krFlied-box"><KrField grid={1/2} label="社区面积" name="area" style={{width:239,marginLeft:16}} component="input" requireLabel={true}></KrField><span className="unit">m</span></div>
                                    <KrField  grid={1/2}  name="businessAreaId" style={{width:262,marginLeft:32}} component='select'  label="所属商圈" inline={false} onChange={this.onChangeIntend} options={State.searchData}/>

                                    <KrField grid={1/2} label="所属区县" name="countyId"  style={{width:262,marginLeft:16,zIndex:2}} component="city" onSubmit={this.cityValue} requireLabel={true} />
									
									<KrField grid={1/2} label="详细地址" name="address" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>
									<KrField grid={1/2} label="社区坐标" name="company" component="input" style={{width:262,marginLeft:16}}  requireLabel={true} onChange={this.corpNameChange} />
									<KrField grid={1/2} label="大厦名称" name="buildName" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="装修情况" name="decoration"  style={{width:262,marginLeft:16,zIndex:2}} component="select" 
									  options={[{label:'毛坯',value:'ROUGHCAST'},{label:'简装',value:'PAPERBACK'},{label:'精装',value:'HARDCOVER'},{label:'豪装',value:'LUXURIOUS'}]}
									/>
									<KrField  grid={1/2}  name="orientation" style={{width:262,marginLeft:28}} component='select'  label="社区朝向" inline={false} 
                                      options={[{label:'东',value:'EAST'},{label:'南',value:'SOUTH'},{label:'西',value:'WEST'},{label:'北',value:'NORTH'},{label:'东南',value:'SOUTHEAST'},{label:'东北',value:'NORTHEAST'},{label:'西南',value:'SOUTHWEST'},{label:'西北',value:'NORTHWEST'}]}
									/>

									<div className="krFlied-box"><KrField grid={1/2} label="标准层高" name="floorHeight" style={{width:239,marginLeft:16}} component="input" ></KrField><span className="unit">m</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="社区入口" name="entryNum" style={{width:239,marginLeft:33}} component="input" ></KrField><span className="unit">个</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="客梯数量" name="elevatorNum" style={{width:239,marginLeft:16}} component="input" ></KrField><span className="unit">部</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="货梯数量" name="cargoNum" style={{width:239,marginLeft:33}} component="input" ></KrField><span className="unit">部</span></div>

									<div className="krFlied-box"><KrField grid={1/2} label="得房率" name="efficientRate" style={{width:239,marginLeft:16}} component="input" ></KrField><span className="unit">%</span></div>
									<div className="krFlied-box"><KrField grid={1/2} label="绿化率" name="greenRate" style={{width:239,marginLeft:36}} component="input" ></KrField><span className="unit">%</span></div>	
                                    <div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">运营信息</label></div>
						<div className="small-cheek">
	
								<KrField grid={1/2} label="社区状态" name="opened" style={{width:262,marginLeft:15}} component="select" requireLabel={true} options={[{label:'已开业',value:true},{label:'未开业',value:false}]}/>
								<KrField grid={1/2} label="开业时间" name="openDate" style={{width:260,marginLeft:29}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="签约开始时间" name="signStartDate" style={{width:260,marginLeft:15}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="签约结束时间" name="signEndDate" style={{width:260,marginLeft:29}} component="date" requireLabel={true}/>
                                <div className="krFlied-box"><KrField grid={1/2} label="工位总数" name="stationNum" style={{width:239,marginLeft:16}} component="input" requireLabel={true}></KrField><span className="unit">个</span></div>
								<div className="krFlied-box"><KrField grid={1/2} label="会议室总数" name="meetNum" style={{width:239,marginLeft:32}} component="input" requireLabel={true}></KrField><span className="unit">间</span></div>	
								<div className="krFlied-box"><KrField grid={1/2} label="所在楼层" name="floor" style={{width:239,marginLeft:16}} component="input" requireLabel={true}></KrField><span className="unit">层</span></div>

								<div className="krFlied-box"><KrField grid={1/2} label="可出租工位数" name="stationCount" style={{width:201,marginLeft:33}} component="input" requireLabel={true}></KrField><span className="unit">个</span><span className="m-add">+</span></div>	
								<KrField grid={1/2} label="营业时间" name="amount" style={{width:262,marginLeft:16}} component="input" requireLabel={true}/>					

								<KrField grid={1/2} label="联系方式" name="contract" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>
								<div className="krFlied-box"><KrField grid={1/2} label="社区亮点" name="brightPoints" style={{width:227,marginLeft:16}} component="input" requireLabel={true}></KrField><span className="unit">+</span></div>	
						        <div className="middle-round"></div>		
						        
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">官网信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							 <KrField grid={1/2} label="排序" name="orderNum" component="input" style={{width:262,marginLeft:15}} onChange={this.corpNameChange} />	
							 <KrField grid={1/2} label="官网显示状态" name="portalShow" style={{width:262,marginLeft:28,marginRight:13}} component="group" requireLabel={true}>
					              	<KrField name="portalShow" label="显示" type="radio" value=true onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					             	<KrField name="portalShow" label="不显示" type="radio" value=false onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					         </KrField>	
					         <KrField grid={1/2} label="工位类型" name="type" component="input" style={{width:262,marginLeft:15}} onChange={this.corpNameChange} />
					         <div className="krFlied-box"><KrField grid={1/2} label="工位价格" name="price" style={{width:153,marginLeft:30}} component="input" ></KrField><span className="unit">元/工位/月</span><span className="m-add">+</span></div>
					         <div className='speakInfo'><KrField grid={1} label="社区简介" name="companyIntroduce" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="textarea"  maxSize={200} placeholder='请输入社区简介' lengthClass='cus-length-textarea'/></div>		
						     <div className="krFlied-box"><KrField grid={1} label="基础设施" name="teamNum" style={{width:519,marginLeft:16}} component="input"></KrField><span className="unit">+</span></div>
						     <div className="krFlied-box"><KrField grid={1} label="基础服务" name="teamNum" style={{width:519,marginLeft:16}} component="input"></KrField><span className="unit">+</span></div>
						     <div className="krFlied-box"><KrField grid={1} label="特色服务" name="teamNum" style={{width:519,marginLeft:16}} component="input"></KrField><span className="unit">+</span></div>
						     <KrField grid={1/2} label="交通" name="company" component="input" style={{width:556,marginLeft:15}} onChange={this.corpNameChange} />
						     <KrField grid={1/2} label="周边" name="company" component="input" style={{width:556,marginLeft:15}} onChange={this.corpNameChange} />
						</div>
						<div className="end-round"></div>



				    </div>
						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
										<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/>
									</ButtonGroup>
								</Col>
							</Row>
						</Grid>
				 </form>
			 </div>
		);
	}
}
const validate = values =>{

		const errors = {};
		let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
		let checkTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
		let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		let RMB=/^(([1-9]\d*)|0)(\.\d{2})?$/;
		let stationN = /^([1-9][0-9]{0,7})$/;
		let staionPriceReg = /^([1-9][0-9]{0,7})$|^\d{1,8}(\.\d{1,2})?$/;
		if(!values.sourceId){
			errors.sourceId = '请填写客户来源';
		}
		if(!values.recommendName){
			errors.recommendName='请填写介绍人姓名'
		}

		if(!values.recommendTel){
			errors.recommendTel='请填写介绍人电话'
		}else if(!phone.test(values.recommendTel)||!checkTel.test(values.recommendTel)){
			errors.recommendTel='介绍人电话错误'
		}
		if(!stationN.test(values.stationNum)){
			errors.stationNum = '请输入8位以内正整数,不能以0开头';
		}
		if (!values.stationNum) {
			errors.stationNum = '请填写意向工位个数';
		}else if(isNaN(+values.stationNum)){
			errors.stationNum = '意向工位个数为数字格式';
		}else if(values.stationNum.length>8){
			errors.stationNum = '最多输入8个字符';
		}
		if (!values.name) {
			errors.name = '请填写联系人姓名';
		}else if(values.name.length>20){
			errors.name = '最多输入20个字符';
		}


		if (!values.staionTypeId) {
			errors.staionTypeId = '请填写意向工位类型';
		}

        if (!values.distinctId) {
			errors.distinctId= '请填写所属地区';
		}

		


		if (!values.tel) {
			errors.tel = '请填写联系人电话';
		}else if(!phone.test(values.tel)||!checkTel.test(values.tel)){
			errors.tel = '联系人电话格式错误';
		}

		if (!values.staionPrice) {
			errors.staionPrice = '请填写意向工位价格';
		}
		// else if(!RMB.test(values.staionPrice)){
		// 	errors.staionPrice = '工位价格不得超过1亿';
		// }

		if(!staionPriceReg.test(values.staionPrice)){
			errors.staionPrice = '小数点前8位，小数点后2位';
		}

		if(values.mail&&!email.test(values.mail)){
			errors.mail = '联系人邮箱格式错误';
		}

		if(!values.intentionCommunityId){
			errors.intentionCommunityId="意向社区类型不能为空";
		}

		if(values.wechat&&values.wechat.length>50){
			errors.wechat="最多输入50个字符";
		}

		
		if (!values.company) {
			errors.company = '请填写公司名称';
		}else if(values.company.length>20){
			errors.company = '最多输入20个字符';
		}

		if (!values.teamNum) {
			errors.teamNum = '请填写公司规模';
		}else if(isNaN(values.teamNum)){
			errors.teamNum = '请输入数字';
		}else if(values.teamNum.length>8){
			errors.teamNum = '最多输入8个字符';
		}
		if(!stationN.test(values.teamNum)){
			errors.teamNum = '请输入8位以内正整数,不能以0开头';
		}


		if(values.amount&&values.amount.length>12){
			errors.amount = '最多输入20个字符';
		}else if(values.amount&&isNaN(values.amount)){
			errors.amount = '请输入数字';
		}
        

		
		if(values.projectName&&values.projectName.length>20){
			errors.projectName = '最多输入20个字符';
		}


		if(values.detailAddress&&values.detailAddress.length>60){
			errors.detailAddress = '最多输入60个字符';
		}

		if(values.website&&values.website.length>100){
			errors.website = '最多输入50个字符';
		}

		
		return errors
	}
export default reduxForm({ form: 'NewCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCommunityList);
