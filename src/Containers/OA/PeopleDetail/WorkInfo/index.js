import React from 'react';
import {
	Drawer,
	KrDate,
	Message,
	Dictionary
} from 'kr-ui';
import './index.less';
import EditWork from './EditWork';
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
export default class WorkInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false,
			workInfo:{},
			isEdit:false
		}
	}

	componentDidMount() {
		var {checkOperate} = this.props.NavModel;
		var _this=this;
		setTimeout(function() {
		   _this.setState({
			 isEdit :checkOperate("hrm_resource_workinfo_edit"),
		   })
		},500);
	}


	componentWillMount(){
		let {personId}=this.props;
		if(!personId){
			//获取我的卡片工作信息

		}else{
			//获取工作信息
	    this.workData(personId);
		}
	}

	//获取工作信息
	workData=(id)=>{
	   var _this=this;
       Http.request('people-work-watch',{resourceId:id}).then(function(response) {
		   _this.setState({
			   workInfo:response
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

    //编辑打开
	basicEdit=()=>{
	   let {workInfo}=this.state;
	   Store.dispatch(initialize('EditWork',workInfo));
       this.setState({
		 openEdit:!this.state.openEdit
	   })
	}

	//编辑提交
	editSubmit=(params)=>{
	   let {personId}=this.props;
	   delete params.uTime;
	   params.probationEndDate = DateFormat(params.probationEndDate,"yyyy-mm-dd hh:MM:ss");
	   params.contractEndDate = DateFormat(params.contractEndDate,"yyyy-mm-dd hh:MM:ss");
	   params.resourceId=personId;
       var _this=this;
	   Http.request('people-workinfo-edit',{},params).then(function(response) {
		   _this.workData(params.resourceId);
	       _this.basicCancel();
        }).catch(function(err) {
          Message.error(err.message);
        });
	}

	basicCancel=()=>{
		this.setState({
		  openEdit:!this.state.openEdit
	   })
	}

	//关闭所有
	allClose=()=>{
      this.setState({
		 openEdit:false
	   })
	}


	render(){

		let {workInfo,isEdit}=this.state;

		let infoName=[
			 {name:'工资卡号',
			  detail:workInfo.wageCard},
			 {name:'核算单位',
			  detail:workInfo.calculateCompany},
			 {name:'试用期到期时间',
			  detail:workInfo.probationEndDate?<KrDate value={workInfo.probationEndDate} format="yyyy-mm-dd"/>:"-"},
			 {name:'劳动合同终止时间',
			  detail:<KrDate value={workInfo.contractEndDate} format="yyyy-mm-dd"/>},
			 {name:'入职来源',
			  type:'ERP_EntryResource',
			  isSwitch:true,
			  detail:workInfo.entrySource},
			 {name:'名片title',
			  detail:workInfo.cardTitle?workInfo.cardTitle:'-'}
			];

		return(
			<div className='info-wrap-w'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>工作信息</span>
						{isEdit&&<span className='title-right' onClick={this.basicEdit}>编辑</span>}
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

				   {/*编辑工作信息*/}
					<Drawer
							open={this.state.openEdit}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditWork
			               onCancel={this.basicCancel}
						   onSubmit={this.editSubmit}
						/>
					</Drawer>
			</div>
		);
	}
}
