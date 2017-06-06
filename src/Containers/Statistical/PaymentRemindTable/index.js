
import React from 'react';
import {

	Title,
	Section,
	Dialog,
	KrField,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
// import './index.less';
import SearchForm from "./SearchForm";
import TableIndex from "./TableIndex";
import IntroduceForm from "./IntroduceForm";


import State from './State';
import {
	observer
} from 'mobx-react';
@observer

export default class PaymentRemindTable extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {

			
		}
	}

	
	
	render() {
		return (
			    <div>
					<Title value="催款表"/>
					<Section title="催款表">
						<SearchForm/>
						<TableIndex/>
					</Section>
					<Dialog
						title="开票"
						open={State.openDialog}
						onClose={this.switchOpenDialog}
						contentStyle={{width:687}}
					>
						<IntroduceForm/>

				  	</Dialog>
				</div>
		);

	}

}

