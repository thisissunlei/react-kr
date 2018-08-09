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
				<Title value="我发起的合同-氪空间后台管理系统"/>
				<ContractList treeUrl='my-request-tree' listUrl='my-request-list'/>
			</div>
		);
	}

}
export default ContractOwn;
