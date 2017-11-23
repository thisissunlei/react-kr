import React from 'react';
import {	
	TabCs,
	TabC
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
    
	onSubmit=(values)=>{
	   const {onSubmit}=this.props;
        onSubmit && onSubmit(values);	
	}

	render(){
		

		return(

			<div>
                    <DrawerTitle title='节点信息' onCancel={this.onCancel}/>
                    <div className='role-tab'>    
                        <TabCs
                        isDetail='role'
                        >
                            <TabC label='基本信息'> 
                                <BasicInfo           
                                />
                            </TabC> 
                            
                            <TabC label='节点模版'> 
                                
                            </TabC> 
                    </TabCs>
                </div>
			</div>
		);
	}
}
