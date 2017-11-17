import React from 'react';
import {	
	TabCs,
	TabC,
	DrawerTitle
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import RoleOrgList from './RoleOrgList';
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
                    <DrawerTitle title ='编辑机构分权' onCancel = {this.onCancel}/>

			    </div>
				<div className='role-tab'>    
				    <TabCs
					  isDetail='role'
			        >
						<TabC label='基本信息'> 
							<BasicInfo
							  id={this.props.id}
							  onCancel={this.onCancel}
							  onSubmit={this.onSubmit}
							/>
						</TabC> 
						
						<TabC label='分配角色及机构'> 
							<RoleOrgList
							 id={this.props.id}
							/>
						</TabC> 
				  </TabCs>
			  </div>
			</div>
		);
	}
}
