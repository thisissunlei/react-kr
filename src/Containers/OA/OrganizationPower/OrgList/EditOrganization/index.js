import React from 'react';
import {	
	Tabs,
	Tab
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import RoleorgaList from './RoleorgaList';
import './index.less';

export default class EditOrganization  extends React.Component{

	constructor(props,context){
		super(props, context);
	}



	render(){

		return(

			<div>
				 <div className='m-or-role'>
				    <div className="title">
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">编辑机构分权</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                    </div>
			    </div>
				<div className='role-tab'>    
					<Tabs className="tabs"
						inkBarStyle={{background:"#499df1",top:0}}
						>
							<Tab label="基本信息" >
									<BasicInfo/>
							</Tab>

							<Tab label="分配角色及机构" >
									<RoleorgaList/>
							</Tab>
			       </Tabs>
			  </div>
			</div>
		);
	}
}
