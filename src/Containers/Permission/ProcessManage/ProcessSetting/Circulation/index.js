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


		return(

			  <div className='m-wrap-circulation'>

				  <TabCs
					  isDetail='detail'
			      >
                    <TabC label='节点信息'>
                       <NodeInfor />
                    </TabC>
			    </TabCs>


			  </div>
		);
	}
}
