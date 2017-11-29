import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	DrawerTitle,
  Message
} from 'kr-ui';
import './index.less'
import {
	observer,
	inject
} from 'mobx-react';
import {Http} from "kr/Utils";
@inject("CommunityDetailModel")
@inject("NewIndentModel")
@observer
 class NewIndent extends Component{



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
		this.state={
			showSection:false
		}

	}
	onSubmit = (values) => {
		delete values.cityid;
		let listId=this.props.listId;
		let _this=this;
		if(!values.mainbilldesc){
			values.mainbilldesc="";
		}
		values.customerid=listId;
		console.log('submit',values)
		values.mainbillname=_this.props.NewIndentModel.orderName;
		Http.request('enter-order',{},values).then(function(response) {
			_this.props.CommunityDetailModel.orderList(_this.props.listId);
			_this.props.NewIndentModel.searchParams={
				page:1,
				time:+new Date()
			 }
    	_this.onCancel();
			_this.props.NewIndentModel.openContract=false;
			Message.success('新建成功');
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
			this.props.NewIndentModel.showMatureTime();
		}else if(params.value=="NOHAS"){
			this.props.NewIndentModel.noShowMatureTime();

		}
	}

	componentWillReceiveProps(nextProps){

			if(typeof(nextProps.orderReady)=="function"){
				return;
			}
			if(this.props.NewIndentModel.isInit){
				return;
			}
			this.props.NewIndentModel.orderReady(nextProps.orderReady)
	}
	communityChange=(value)=>{
		if(!value){
			return;
		}
		var community=this.props.NewIndentModel.orderReady.communityCity
		for(var i=0;i<community.length;i++){
			if(community[i].communityName==value.label){
				Store.dispatch(change('NewIndent','cityid',community[i].cityId));
				this.props.NewIndentModel.cityLableChange(community[i].cityName)
			}

		}
	}
	mainbilltypeChange=(value)=>{
		this.props.NewIndentModel.orderName=this.props.customerName+value.label+this.props.orderCount;
		if(value.value == 16 || value.value == 23 || value.value == 18){
			this.setState({
				showSection:false
			})
		}else{
			this.setState({
				showSection:true
			})
		}

	}


	render(){
		const { error, handleSubmit, pristine, reset,companyName,isOpenIndent,customerName,orderCount} = this.props;

		let city=this.props.NewIndentModel.cityLable;
			city=!city?"无":city;
		// if(!isOpenIndent){
		// 	city="无"
		// }
		let options = [{value:'VC_SERVICE',label:'创投服务部'},{value:'PROJECT_GROUP',label:'项目组'},{value:'SALES_MARKET',label:'市场部'}]

		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
			     	<DrawerTitle title ={companyName+'-新建订单'} onCancel = {this.onCancel}/>
				</div>

				<div className="kk" style={{marginTop:30,paddingLeft:20,fontSize:'14px'}}>
					<KrField grid={1/2} label="订单类型" name="mainbilltype" style={{width:262,marginLeft:15}} component="select"
							options={this.props.NewIndentModel.orderFound}
							requireLabel={true}
							onChange={this.mainbilltypeChange}
					/>
					<KrField grid={1/2} label="所在社区" name="communityid" component="searchCommunityAll" style={{width:262,marginLeft:30}}
							onChange={this.communityChange}
							inline={false}
							requireLabel={true}
					/>
					<KrField grid={1/2} label="销售员" name="saleId" style={{width:262,marginLeft:15}} component="searchPersonel"
							requireLabel={true}
					/>
					<KrField grid={1/2} label="销售时间" name="saleTime" component="date" style={{width:262,marginLeft:30}}
							inline={false}
							requireLabel={true}
					/>

					

					<KrField grid={1/2} label="所在城市" name="cityid" component="labelText" style={{width:262,marginLeft:15}} value={city} inline={false}/>
					<KrField grid={1} label="订单名称" name="mainbillname" style={{width:262,marginLeft:30}} component="labelText" value={this.props.NewIndentModel.orderName?this.props.NewIndentModel.orderName:customerName+orderCount} requireLabel={true} inline={false}/>
					{this.state.showSection && <KrField grid={1/2} label="部门" name="departmentId" style={{width:262,marginLeft:15}} component="select"
							options={options}
					/>}
					<KrField grid={1} label="订单描述" name="mainbilldesc" style={{width:555,marginLeft:15,marginTop:-5}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
				</div>
				<Grid style={{marginTop:0,marginRight:40}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" /></div>
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
export default reduxForm({ form: 'NewIndent',validate})(NewIndent);
