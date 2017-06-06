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
	SelectCity
} from 'kr/PureComponents';
import {
	observer,
} from 'mobx-react';
@observer
class  CommunityPlanList extends React.Component{

	constructor(props,context){
		super(props, context);

	}



	render(){
		return(

			<div>
				<SelectCity type='GRAPH'/>
			</div>
		);
	}

}
export default CommunityPlanList;
