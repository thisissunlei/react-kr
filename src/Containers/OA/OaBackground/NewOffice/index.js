import React from 'react';
import {	
	Section,
	IframeContent
} from 'kr-ui';

export default class Initialize  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		let url='http://www.baidu.com';

		return(

			<div>
					<Section title="订单账单列表" description="" >
					  <IframeContent src={url}  width={'100%'} height={800} scrolling="no"/>
					</Section>
			</div>
		);
	}

}
