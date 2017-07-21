import React from 'react';
import {	
   Drawer	
} from 'kr-ui';
import './index.less';
import EditBasic from './EditBasic';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';

export default class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false,
			basicInfo:{}
		}
	}


	componentWillMount(){
		let {personId}=this.props;
		//获取基本信息
        this.basicData(personId);
	}

	//获取基本信息
	basicData=(id)=>{
       Http.request('postListAdd',{id:id}).then(function(response) {
           console.log('va',response);
		   this.setState({
			   basicInfo:response
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
    
    
    //编辑打开
	basicEdit=()=>{
	   let {basicInfo}=this.state;
	   Store.dispatch(initialize('EditBasic',basicInfo));
       this.setState({
		 openEdit:!this.state.openEdit
	   })
	}
    
	//编辑提交
	editSubmit=(params)=>{
	   var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           console.log('response',response);
           _this.basicData(params.id);
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

		let {basicInfo}=this.state;

		let infoName=[
			 {name:'姓名',
			  detail:basicInfo.name},
			 {name:'性别',
			  detail:123},
			 {name:'手机号',
			  detail:basicInfo.mobilePhone},
			 {name:'编码',
			  detail:basicInfo.code},
			 {name:'部门',
			  detail:123},
			 {name:'直接上级',
			  detail:basicInfo.leader},
			 {name:'职务',
			  detail:123},
			 {name:'职级',
			  detail:123},
			 {name:'入职时间',
			  detail:basicInfo.entryDate},
			 {name:'员工属性',
			  detail:basicInfo.status},
			 {name:'员工类别',
			  detail:basicInfo.type},
			 {name:'公司邮箱',
			  detail:basicInfo.type},  
			];

		return(
			<div className='info-wrap-b'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>基本信息</span>
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

				  {/*编辑基本信息*/}
					<Drawer
							open={this.state.openEdit}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditBasic
			               onCancel={this.basicEdit}
						   onSubmit={this.editSubmit}   
						/>
					</Drawer>
			</div>
		);
	}

}
