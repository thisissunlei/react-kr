import React from 'react';
import {	
	Drawer
} from 'kr-ui';
import './index.less';
import EditWork from './EditWork';

export default class WorkInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false
		}
	}
   
    //编辑打开
	basicEdit=()=>{
       this.setState({
		 openEdit:!this.state.openEdit
	   })
	}
    
	//编辑提交
	editSubmit=(params)=>{
      
	}
    
	//关闭所有
	allClose=()=>{
      this.setState({
		 openEdit:false
	   })
	}
    

	render(){

		let infoName=[
			 {name:'工资卡号',
			  detail:123},
			 {name:'核算单位',
			  detail:123},
			 {name:'试用期到期时间',
			  detail:123},
			 {name:'劳动合同终止时间',
			  detail:123},
			 {name:'入职来源',
			  detail:123},
			 {name:'名片title',
			  detail:123},
			 {name:'公司邮箱',
			  detail:123},
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
