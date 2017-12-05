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
	ContractList
} from 'kr/PureComponents';
import {
	observer,
} from 'mobx-react';
@observer
class  ContractMonitor extends React.Component{

	constructor(props,context){
		super(props, context);

	}


	render(){
		return(

			<div>
				<ContractList treeUrl='contract-monitor-tree' listUrl='contract-monitor-list'/>
			</div>
		);
	}

}
export default ContractMonitor;
