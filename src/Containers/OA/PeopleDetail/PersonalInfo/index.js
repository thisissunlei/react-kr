import React from 'react';
import {	
	
} from 'kr-ui';
import './index.less';

export default class PersonalInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		let infoName=[
			 {name:'身份证号码',
			  detail:123},
			 {name:'出生日期',
			  detail:123},
			 {name:'星座',
			  detail:123},
			 {name:'血型',
			  detail:123},
			 {name:'民族',
			  detail:123},
			 {name:'籍贯',
			  detail:123},
			 {name:'户口',
			  detail:123},
			 {name:'政治面貌',
			  detail:123},
			 {name:'入团时间',
			  detail:123},
			 {name:'入党时间',
			  detail:123},
			 {name:'毕业院校',
			  detail:123},
              {name:'专业',
			  detail:123},
              {name:'学历',
			  detail:123},
              {name:'学位',
			  detail:123},
              {name:'参加工作时间',
			  detail:123},
              {name:'现居住地',
			  detail:123},
              {name:'暂/居住证号码',
			  detail:123},
              {name:'个人邮箱',
			  detail:123},
              {name:'微信号',
			  detail:123},
              {name:'联系电话',
			  detail:123},
              {name:'身高(cm)',
			  detail:123},
              {name:'体重(公斤)',
			  detail:123},
              {name:'健康状况',
			  detail:123},
              {name:'婚姻状况',
			  detail:123},
              {name:'紧急联系人姓名',
			  detail:123},
              {name:'紧急联系人电话',
			  detail:123},
              {name:'紧急联系人关系',
			  detail:123},
			];

		return(
			<div className='info-wrap'>
				  <div className='title'>
						<span className='title-blue'></span>
						<span className='title-name'>个人资料</span>
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

                 <div className='title family'>
						<span className='title-blue'></span>
						<span className='title-name'>家庭资料</span>
						<span className='title-right'>编辑</span>
				 </div>

			</div>
		);
	}

}
