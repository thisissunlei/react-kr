import React from 'react';
import {	
	TabCs,
	TabC
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import RoleorgaList from './RoleorgaList';
import './index.less';

export default class EditOrganization  extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    
	 onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }


	render(){
		
		var inStyle={
			background:'#fff',
			width: '50%',
            borderBottom: '1px solid #D7D7D7',
			padding:'10px 0'
		}

		var acStyle={
			background:'#fff',
			width: '50%',
            borderBottom:'2px solid #499df1',
			padding:'10px 0'
		}
		

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
					  inStyle={inStyle}
					  acStyle={acStyle}
			        >
						<TabC label='基本信息'> 
							<BasicInfo
							  dimName={this.props.dimName}
							  code={this.props.code}
							  onCancel={this.onCancel}
							  onSubmit={this.onSubmit}
							/>
						</TabC> 
						
						<TabC label='分配角色及机构'> 
							<RoleorgaList/>
						</TabC> 
				  </TabCs>
			  </div>
			</div>
		);
	}
}
