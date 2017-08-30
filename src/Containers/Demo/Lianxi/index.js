import React from 'react';
import {
	Section,
	IconTip
} from 'kr-ui';
import './index.less';
export default class Initialize  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){


		return(

			<div>
				<IconTip>
				  <div>1、表单表名最长30个字，限定为字母、数字、下划线、必须以字母开头，不能以下划线结尾；</div>
					<div>2、表单表名可以不填，不填的话保存时候自动生成表名，规则为：wf_ft_主键。</div>
				</IconTip>
			</div>
		);
	}

}
