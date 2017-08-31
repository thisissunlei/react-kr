import React from 'react';
import {
	TabCs,
	TabC
} from 'kr-ui';
import BasicInfo from './BasicInfo';
//import RoleOrgList from './RoleOrgList';
import './index.less';

export default class WatchForm  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	editOpen=()=>{
    const {editOpen}=this.props;
    editOpen && editOpen();
  }

  allClose=()=>{
    const {allClose}=this.props;
    allClose && allClose();
  }

	render(){


		return(

			<div>
				 <div className='m-or-role'>
				    <div className="title">
              <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">查看表单</label></div>
              <div className="person-close" onClick={this.allClose}></div>
            </div>
			    </div>
				<div className='role-tab'>
				    <TabCs
					  isDetail='role'
			        >
						<TabC label='基本信息'>
							<BasicInfo
								 editOpen={this.editOpen}
								 allClose={this.allClose}
							/>
						</TabC>

						<TabC label='字段信息'>

						</TabC>
				  </TabCs>
			  </div>
			</div>
		);
	}
}
