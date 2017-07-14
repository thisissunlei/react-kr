import React from 'react';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Dialog,
	Tooltip,
	Drawer,
	SearchForms,
	Section,
	KrField,
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
// import NewCreateSystem from './NewCreateSystem';
// import EditSystem from './EditSystem';
// import Synchro from './Synchro';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class Journal extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=()=>{
		State.openEditSystem = true;
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=()=>{
		console.log('submit')
	}
	openSynchro=()=>{
		State.openSynchro = true;
	}
	closeSynchro=()=>{
		State.openSynchro = false;
	}
	onSubmit=()=>{
		console.log('0000')
	}
	

	render() {
		let options = [{label:'a',value:'1'},{label:'a',value:'2'},{label:'a',value:'3'},{label:'a',value:'4'},]
		let {handleSubmit} = this.props;
		return (
			    <div>

				</div>
		);

	}

}
Journal = reduxForm({
    form: 'Journal'
})(Journal);
