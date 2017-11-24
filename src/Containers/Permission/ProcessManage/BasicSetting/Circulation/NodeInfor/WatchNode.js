import React from 'react';
import {	
	TabCs,
    TabC,
    DrawerTitle
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import './index.less';

export default class  WatchNode extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    
	 onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

    openEditNode=()=>{
        const {openEditNode}=this.props;
        openEditNode && openEditNode();
    }

	render(){
        
        let {basicData}=this.props;

		return(

			<div className='m-watch-node'>
                <div className='m-title-node'>
                    <DrawerTitle title='节点信息' onCancel={this.onCancel}/>
                </div>
                <div className='role-tab'>    
                        <TabCs
                        isDetail='role'
                        >
                            <TabC label='基本信息'> 
                                <BasicInfo  
                                  openEditNode={this.openEditNode}
                                  basicData={basicData}         
                                />
                            </TabC> 
                            
                            <TabC label='节点模版' readOnly={true}> 
                                
                            </TabC> 
                    </TabCs>
                </div>
			</div>
		);
	}
}
