import React from 'react';
import {	
	
} from 'kr-ui';
import './index.less';

export default class WorkInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
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
			<div className='info-wrap'>
				  <div className='title'>
						<span className='title-blue'></span>
						<span className='title-name'>工作信息</span>
						<span className='title-right'>编辑</span>
				  </div>
                  <ul className='info-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li>
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
