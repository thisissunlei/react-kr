import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
	
	Section,

} from 'kr-ui';

export default class Leave  extends React.Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	render(){

		return(

			<div>
					<Section title="订单账单列表" description="" >
					  123
					</Section>
			</div>
		);
	}

}
