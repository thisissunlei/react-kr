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
class  ContractOwn extends React.Component{

	constructor(props,context){
		super(props, context);

	}
    

	render(){
		return(

			<div>
				<ContractList treeUrl='my-request-tree' listUrl='my-request-list'/>
			</div>
		);
	}

}
export default ContractOwn;
