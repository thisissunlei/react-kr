import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';
import ProjectType from './ProjectType';

export default class ItemSingle extends React.Component {

	static displayName = 'DateComponent';


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		
	}

	constructor(props) {
		super(props);
		this.state={
			value:"请选择所属地区",
			listId:"",
			isProjectType:false
		}

	}

	

	componentWillReceiveProps(nextProps) {

	}
	
	itemClick=(event)=>{
		let {treeClose}=this.props;
		event.stopPropagation();
		let {value,listId}=this.props;
		
		if(typeof(value)=="string"){
			this.setState({
				value:value,
				listId:listId,
			},function(){
				treeClose(this.state.value,this.state.listId);
			})
		}

		
	}

	// onMouseOut={this.itemonMouseOut}
	render() {
		let {value,data,treeClose}=this.props;
		return(
			<div className="ui-treeItem" onClick={this.itemClick}>
			    <span>{value}</span>
				<ProjectType data={data} num={false} treeClose={treeClose} />
			</div>
		)
	}
		
}
