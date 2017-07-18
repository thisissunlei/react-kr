import React from 'react';
import {
	Title,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	Message,
	DivTitle,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {
	CommonItem
} from 'kr/PureComponents/Agreement';
import {Actions,Store} from 'kr/Redux';
import './index.less';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import {reduxForm} from 'redux-form';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import State from './State';

@observer
@ReactMixin.decorate(LinkedStateMixin)

class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.state={
		}
	}
	onSubmit=(value)=>{
	}
	componentWillMount() {
	}
	componentDidMount() {
	}



	
	
	render() {
		console.log('render',this.pages)
		return (
			    <div style={{background: '#fff',height:1400}} className="demo-Machaoyue">

			    <div style={{width:200,border:'1px solid red'}}>
			    	大叔大婶大所大所大所大所大所多打算大多的撒大大所大所多的撒大大多大大所大大所多大所大所大所多大叔大婶
			    </div>
				</div>
		);

	}

}
export default MaChaoYue = reduxForm({
	form: 'MaChaoYue',
	// validate,
})(MaChaoYue);
