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
	Title
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
				<Title value="工位平面图-氪空间后台管理系统" />
				<SelectCity type='GRAPH'/>
			</div>
		);
	}

}
export default CommunityPlanList;
