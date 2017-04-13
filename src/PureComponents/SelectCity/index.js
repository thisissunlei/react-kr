import React from 'react';
import { connect } from 'react-redux';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
} from 'kr-ui';
import {
	observer,
} from 'mobx-react';
@observer
export default class  SelectCity extends React.Component{

	constructor(props,context){
		super(props, context);

	}



	render(){

		return(

			<div>
					<Section title="订单账单列表" description="" >
					  456
					</Section>
			</div>
		);
	}

}
