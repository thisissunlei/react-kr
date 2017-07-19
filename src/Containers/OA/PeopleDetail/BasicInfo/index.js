import React from 'react';
import {	
	
} from 'kr-ui';
import './index.less';

export default class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		let infoName=[
			 {name:'姓名',
			  detail:123},
			 {name:'性别',
			  detail:123},
			 {name:'手机号',
			  detail:123},
			 {name:'编码',
			  detail:123},
			 {name:'部门',
			  detail:123},
			 {name:'直接上级',
			  detail:123},
			 {name:'职务',
			  detail:123},
			 {name:'职级',
			  detail:123},
			 {name:'入职时间',
			  detail:123},
			 {name:'员工属性',
			  detail:123},
			 {name:'员工类别',
			  detail:123}
			];

		return(
			<div className='info-wrap'>
				  <div className='title'>
						<span className='title-blue'></span>
						<span className='title-name'>基本信息</span>
						<span className='title-right'>编辑</span>
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
			</div>
		);
	}

}
