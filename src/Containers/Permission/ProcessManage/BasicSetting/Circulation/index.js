import React from 'react';
import {
	TabC,
	TabCs,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import NodeInfor from './NodeInfor';
import './index.less';


export default class Circulation  extends React.Component{

	
	constructor(props,context){
		super(props, context);
	}
    
	render(){


		let {wfId,formId}=this.props;


		return(

			  <div className='m-wrap-circulation'>

				  <TabCs
				     isDetail='process'
			      >
                    <TabC label='节点信息'>
                       <NodeInfor wfId={wfId} formId={formId}/>
                    </TabC>
			    </TabCs>


			  </div>
		);
	}
}
