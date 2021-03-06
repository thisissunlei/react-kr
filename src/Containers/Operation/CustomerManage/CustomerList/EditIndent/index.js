
import React, {  PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	DrawerTitle
} from 'kr-ui';
import State from './State';
import './index.less'
import {
	observer,
	inject
} from 'mobx-react';

@inject("CommunityDetailModel")
@observer
 class EditIndent extends React.Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		let selectDatas={
			communityBaselist:[],
			customerSourceList:[],
			giveupList:[],
			levelList:[],
			roundList:[],
			stationTypeList:[],
			visitTypeList:[]
		};
		let selectData=props.selectData||selectDatas;
		State.selectDataInit(selectData);
		console.log('edit',this.props);
		let {mainbilltype} = this.props;
		this.state = {
			showSection:(mainbilltype!=16&&mainbilltype!=23&&mainbilltype!=18)?true:false
		}
	}



	onSubmit = (values) => {
		delete values.cityid;
		values.customerid=this.props.listId;
		values.id=this.props.editIndentId;
		values.mainbillname=State.orderName||this.props.mainbillname;
		values.mainbillcode="";
		console.log('value',values,DateFormat(values.saleTime,'yyyy-mm-dd'))
		values.saleTime = DateFormat(values.saleTime,'yyyy-mm-dd 00:00:00');
		let _this=this;
		Http.request('edit-order',{},values).then(function(response) {
			_this.props.CommunityDetailModel.orderList(_this.props.listId);
         	_this.onCancel();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	hasOfficeClick = (params) =>{
		if(params.value=="HAS"){
			State.showMatureTime();
		}else if(params.value=="NOHAS"){
			State.noShowMatureTime();

		}
	}
	componentWillReceiveProps(nextProps){

			if(typeof(nextProps.orderReady)=="function"){
				return;
			}
			if(this.props.mainbilltype != nextProps.mainbilltype){
				let {mainbilltype} = nextProps;
				this.setState({
					showSection:(mainbilltype!=16&& mainbilltype!=23&&mainbilltype!=18)?true:false

				})
			}
			if(State.isInit){
				return;
			}
			State.orderReady(nextProps.orderReady)
	}
	communityChange=(value)=>{
		if(!value){
			return;
		}
		var community=State.orderReady.communityCity
		for(var i=0;i<community.length;i++){
			if(community[i].communityName==value.label){
				Store.dispatch(change('EditIndent','cityid',community[i].cityId));
				State.cityLableChange(community[i].cityName)

			}

		}
	}
	mainbilltypeChange=(value)=>{
		State.orderName=this.props.customerName+value.label+this.props.orderCount;
		if(value.value == 16 || value.value == 23 || value.value == 18){
			this.setState({
				showSection:false
			},function(){
				Store.dispatch(change('EditIndent','departmentId',''));
			})
		}else{
			this.setState({
				showSection:true
			})
		}
	}


	render(){
		const { error, handleSubmit, pristine, reset,companyName,customerName,orderCount,mainbillname,cityNameIndent} = this.props;
		let citys=State.cityLable||cityNameIndent;
			citys=!citys?"无":citys;
		let options = [{value:'VC_SERVICE',label:'创投服务部'},{value:'PROJECT_GROUP',label:'项目组'},]


		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
			     	<DrawerTitle title ={'编辑'+companyName} onCancel = {this.onCancel}/>
				</div>

				<div className="kk" style={{marginTop:30,paddingLeft:20}}>
					<KrField grid={1/2} label="订单类型" name="mainbilltype" style={{width:262,marginLeft:15}} component="select"
							options={State.orderFound}
							requireLabel={true}
							onChange={this.mainbilltypeChange}
					/>
					<KrField grid={1/2} label="所在社区" name="communityid" component="searchCommunityAll" style={{width:262,marginLeft:30}}
							onChange={this.communityChange}
							inline={false}
					/>
					<KrField grid={1/2} label="销售员" name="saleId" style={{width:262,marginLeft:15}} component="searchPersonel"
							requireLabel={true} placeholder={this.props.saleName}
					/>
					<KrField grid={1/2} label="销售时间" name="saleTime" component="date" style={{width:262,marginLeft:30}}
							inline={false}
							requireLabel={true}
					/>

					

					<KrField grid={1/2} label="所在城市" name="cityid" component="labelText" style={{width:262,marginLeft:15}} value={citys} inline={false}/>
					<KrField grid={1/2} label="订单名称" name="mainbillname" style={{width:262,marginLeft:30}} component="labelText" value={State.orderName?State.orderName:mainbillname} requireLabel={true} inline={false}/>
					{this.state.showSection && <KrField grid={1/2} label="部门" name="departmentId" style={{width:262,marginLeft:15}} component="select"
							options={options}
					/>}
					<KrField grid={1/2} label="订单描述" name="mainbilldesc" style={{width:555,marginLeft:15,marginTop:-5}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
				</div>
				<Grid style={{marginTop:0,marginRight:40}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>


				</form>
		);
	}
}
const validate = values =>{

		const errors = {};

		if(!values.mainbilltype){
			errors.mainbilltype = '请选择订单类型';
		}
		if(!values.communityid){
			errors.communityid = '请选择所在社区';
		}
		if(!values.saleId){
			errors.saleId = '请选择销售员';
		}
		if(!values.saleTime){
			errors.saleTime = '请选择销售时间';
		}
		return errors
	}
export default reduxForm({ form: 'EditIndent',validate})(EditIndent);
