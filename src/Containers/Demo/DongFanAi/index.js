import React from 'react';

import {
	CheckPermission,
	Button
} from 'kr-ui';

import './index.less';

export default class DongFanAi extends React.Component {

	constructor(props, context) {
		super(props, context);
		
		
	}



	 
	render() {
		
		return (
			<div className="u-dongf">
				111
				<CheckPermission  menusCode="fina_account_list" >
					<Button  label="确定" type="submit"  />
				</CheckPermission>
				<CheckPermission  operateCode="fina_account_export" >
					<Button  label="取消" type="submit"  />
				</CheckPermission>
			</div>

		);
	}
}

