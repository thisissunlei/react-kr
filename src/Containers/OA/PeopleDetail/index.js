import React from 'react';
import {	
	TabC,
	TabCs,
	Dictionary
} from 'kr-ui';
import {Http} from 'kr/Utils';
import BasicInfo from './BasicInfo';
import PersonalInfo from './PersonalInfo';
import WorkInfo from './WorkInfo';
import './index.less';
import UserImage from './UserImage';

export default class PeopleDetail  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			personId:this.props.params.personId,
			detail:'',
		}

	}

  componentWillMount(){
		let {personId}=this.state;
		//获取基本信息
        this.basicData(personId);
	}



	//获取基本信息
	basicData=(id)=>{
	  var _this=this;
		Http.request('people-basic-watch',{id:id}).then(function(response) {
				_this.setState({
					detail:response
				})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
   	

	render(){

		let {personId,detail}=this.state;
	
		return(

			<div className='people-detail'>
			  <div className='detail-left'>
				<div className='left-pic'>
				   <UserImage />			
				</div>
				<div className='left-text'>
				
					<div className = "left-intro">
						<div style={{width:'120px'}}><Dictionary type='ERP_ResourceStatus' value={detail.status} style={{display:'inline-block',marginRight:'5px'}}/>
						<span style={{display:'inline-block',marginRight:'5px'}}> | </span>
						<span style={{display:'inline-block'}}>{detail.jobName}</span></div>
						<div style={{color:'#333',fontSize:'12px',marginTop:"5px",width:'120px'}}>{detail.depName}</div>
					</div>
				</div>
			  </div>
			  <div className='detail-right'>
				  <TabCs
			      >
				  <TabC label='基本信息'> 
					  <BasicInfo
					    personId={personId} 
					  />
				  </TabC> 
				  
				  <TabC label='个人信息'> 
					  <PersonalInfo 
					    personId={personId} 
					  />
				  </TabC> 

				  <TabC label='工作信息'> 
					  <WorkInfo 
					   personId={personId} 
					  />
				  </TabC> 
			  </TabCs>
			    
			  </div>
			</div>
		);
	}
}
