import React from 'react';
import {	
	Drawer
} from 'kr-ui';
import './index.less';
import EditWork from './EditWork';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';

export default class WorkInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false,
			workInfo:{}
		}
	}


	componentWillMount(){
		let {personId}=this.props;
		//获取工作信息
        this.workData(personId);
	}

	//获取工作信息
	workData=(id)=>{
       Http.request('postListAdd',{id:id}).then(function(response) {
           console.log('va',response);
		   this.setState({
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
       var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           console.log('response',response);
           _this.workData(params.id);
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

		let {workInfo}=this.state;

		let infoName=[
			 {name:'工资卡号',
			  detail:workInfo.wageCard},
			 {name:'核算单位',
			  detail:workInfo.w},
			 {name:'试用期到期时间',
			  detail:workInfo.probationEndDate},
			 {name:'劳动合同终止时间',
			  detail:workInfo.contractEndDate},
			 {name:'入职来源',
			  detail:workInfo.entrySource},
			 {name:'名片title',
			  detail:workInfo.cardTitle},
			 {name:'公司邮箱',
			  detail:workInfo.w},
			];

		return(
			<div className='info-wrap-w'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>工作信息</span>
						<span className='title-right' onClick={this.basicEdit}>编辑</span>
				  </div>
                  <ul className='info-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li key={index}>
							<span className='name'>{item.name}</span>
							<span className='info'>{item.detail}</span>
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
			               onCancel={this.basicEdit}
						   onSubmit={this.editSubmit}   
						/>
					</Drawer>
			</div>
		);
	}

}
