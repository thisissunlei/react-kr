import React from 'react';
import {
	IframeContent
} from 'kr-ui';

export default class Initialize  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		let url='/hz7rest/workflow/manager/embed/index.jsp#workcenter/todo/haddone.list';


		return(

			<div style={{marginLeft:'-20px',marginTop:'-20px',marginRight:'-15px'}}>
				<IframeContent src={url}  width={'100%'} height={800} scrolling="no"/>
			</div>
		);
	}

}
