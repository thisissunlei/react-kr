import React from 'react';
import {
   Drawer,
   Dictionary,
   KrDate,
   Message
} from 'kr-ui';
import './index.less';
import EditBasic from './EditBasic';
import {Http,DateFormat} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';
import {
	observer,
	inject
} from 'mobx-react';
@inject("NavModel")
@observer
export default class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false,
			basicInfo:{
				orgName:''
			},
			isEdit:false,
		}
	}


	componentDidMount() {
		var {checkOperate} = this.props.NavModel;
		var _this = this;
		setTimeout(function() {
			_this.setState({
				isEdit : checkOperate("hrm_resource_edit")
			})

		},500);

	}
	componentWillMount(){
		let {personId}=this.props;
      this.basicData(personId);
	}

	//获取基本信息
	basicData=(id)=>{
	   var _this=this;
       Http.request('people-basic-watch',{id:id}).then(function(response) {
		   _this.setState({
			   basicInfo:response
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}


    //编辑打开
	basicEdit=()=>{
	   let {basicInfo}=this.state;
	   Store.dispatch(initialize('editPerson',basicInfo));
       this.setState({
		 openEdit:!this.state.openEdit
	   })
	}

	cancelEdit=()=>{
	  this.setState({
		 openEdit:!this.state.openEdit
	   })
	}

	//编辑提交
	editSubmit=(params)=>{
	   let {personId}=this.props;
	   const {chengLeft}=this.props;
	   let subParams = Object.assign({},params);

	   subParams.depId=(subParams.depId[0] && subParams.depId[0].orgId)?subParams.depId[0].orgId:subParams.depId;
	   delete subParams.uTime;
	   delete subParams.cTime;
	   delete subParams.leaveDate;
	   subParams.entryDate = DateFormat(subParams.entryDate,"yyyy-mm-dd hh:MM:ss")
	   subParams.id=personId;
	   var _this=this;
       Http.request('people-basic-edit',{},subParams).then(function(response) {
           _this.basicData(params.id);
		   chengLeft && chengLeft(params.id);
		   _this.cancelEdit();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

	//关闭所有
	allClose=()=>{
      this.setState({
		 openEdit:false
	   })
	}


	render(){

		let {basicInfo,isEdit}=this.state;

		let infoName=[
			 {name:'姓名',
			  detail:basicInfo.name},
			 {name:'性别',
			  detail:basicInfo.sex=='MALE'?'男':'女'},
			 {name:'手机号',
			  detail:basicInfo.mobilePhone},
			 {name:'编码',
			  detail:basicInfo.code},
			 {name:'部门',
			  detail:basicInfo.depName},
			 {name:'直接上级',
			  detail:basicInfo.leaderName},
			 {name:'职务',
			  detail:basicInfo.jobName},
			 {name:'入职时间',
			  detail:<KrDate value={basicInfo.entryDate} format="yyyy-mm-dd"/>},
			 {name:'员工属性',
			  detail:basicInfo.status,
			  type:'ERP_ResourceStatus',
			  isSwitch:true},
			 {name:'员工类别',
			  detail:basicInfo.type,
			  type:'ERP_ResourceType',
			  isSwitch:true},
			 {name:'公司邮箱',
			  detail:basicInfo.email},
			];

		return(
			<div className='info-wrap-b'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>基本信息</span>
						{isEdit && <span className='title-right' onClick={this.basicEdit}>编辑</span>}
				  </div>
                  <ul className='info-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li key={index}>
							<span className='name'>{item.name}</span>
							<span className='info'>
								{item.isSwitch?<Dictionary type={item.type} value={item.detail}/>:item.detail}
							</span>
					   </li>)
					  })
					}
				  </ul>

				  {/*编辑基本信息*/}
					<Drawer
							open={this.state.openEdit}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditBasic
			               onCancel={this.cancelEdit}
						   onSubmit={this.editSubmit}
						   basicInfo = {[basicInfo]}
						/>
					</Drawer>
			</div>
		);
	}

}
