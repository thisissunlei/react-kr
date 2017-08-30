import React from 'react';
import {
	TabC,
	TabCs,
	Dictionary,
	Dialog
} from 'kr-ui';
import { observer,inject } from 'mobx-react';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import BasicInfo from './BasicInfo';
import PersonalInfo from './PersonalInfo';
import WorkInfo from './WorkInfo';
import './index.less';
import UserImage from './UserImage';

@inject("NavModel")
@observer
export default class PeopleDetail  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			personId:this.props.params.personId,
			detail:'',
			showInfoEdit:false,
			showInfoPerson:false,
			showInfoWorkInfo:false
		}
	}

	//我的权限
	myPermission=(personId)=>{
		var _this=this;
		Http.request('permissionTab',{userId:personId}).then(function(response) {
				_this.setState({
					 showInfoEdit:response.showInfoEdit,
					 showInfoPerson:response.showInfoPerson,
					 showInfoWorkInfo:response.showInfoWorkInfo
				})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

  componentWillMount(){
		let {personId}=this.state;
		this.leftData(personId);
		this.myPermission(personId);
	}

	componentDidMount(){
		 let {personId}=this.state;
		 if(personId!=0){
			 const {NavModel} = this.props;
			 NavModel.setSidebar(false);
		 }
	}

	chengLeft=(id)=>{
     this.leftData(id);
	}


	//获取图片下方信息
	leftData=(personId)=>{
		var _this=this;
		Http.request('new-pic-next',{userId:personId}).then(function(response) {
				_this.setState({
					 detail:response
				})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}




	render(){

		let {personId,detail,showInfoEdit,showInfoPerson,showInfoWorkInfo}=this.state;

		return(

			<div className='people-detail'>
			  <div className='detail-left'>
				<div className='left-pic'>
					 <UserImage
					  personId={personId}
						url={detail.avatarUrl}
					 />
				</div>
				<div className='left-text'>

					<div className = "left-intro">
						<div style={{fontSize:'16px',color:'#333',marginBottom:'3px',marginTop:'3px'}}>{detail.name}</div>
						<div style={{width:'120px'}}><span style={{display:'inline-block',marginRight:'5px'}}>{detail.statusStr}</span>
						<span style={{display:'inline-block',marginRight:'5px'}}> | </span>
						<span style={{display:'inline-block'}}>{detail.jobName}</span></div>
						<div style={{color:'#333',fontSize:'12px',marginTop:"5px",width:'120px'}}>
							{detail.orgPathName}
						</div>
					</div>
				</div>
			  </div>
			  <div className='detail-right'>
				  <TabCs
					  isDetail='detail'
			      >
				  {showInfoEdit&&<TabC label='基本信息'>
					  <BasicInfo
					    personId={personId}
							chengLeft={this.chengLeft}
					  />
				  </TabC>}

				  {showInfoPerson&&<TabC label='个人信息'>
					  <PersonalInfo
					    personId={personId}
					  />
				  </TabC>}

				  {showInfoWorkInfo&&<TabC label='工作信息'>
					  <WorkInfo
					   personId={personId}
					  />
				  </TabC>}
			  </TabCs>

			  </div>

			</div>
		);
	}
}
