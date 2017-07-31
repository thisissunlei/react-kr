import React from 'react';
import {	
	TabCs,
	TabC
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import RoleOrgaList from './RoleOrgaList/index.js';
import './index.less';

export default class EditOrganization  extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    
	 onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    
	onSubmit=(values)=>{
	   const {onSubmit}=this.props;
        onSubmit && onSubmit(values);	
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
				    <TabCs
					  activeClass='ui-line-active'
					  initClass='ui-line-init'
			        >
						<TabC label='基本信息'> 
							<BasicInfo
							  id={this.props.id}
							  onCancel={this.onCancel}
							  onSubmit={this.onSubmit}
							/>
						</TabC> 
						
						<TabC label='分配角色及机构'> 
							<RoleOrgaList
							 id={this.props.id}
							/>
						</TabC> 
				  </TabCs>
			  </div>
			</div>
		);
	}
}
