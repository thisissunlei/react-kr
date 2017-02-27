import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';
import ItemSingle from './ItemSingle';
import TreeAll from './TreeData.json';

export default class ProjectType extends React.Component {

	static displayName = 'DateComponent';


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		
	}

	constructor(props) {
		super(props)
		this.state={
			isProjectType:true
		}
	}

	

	componentWillReceiveProps(nextProps) {

	}

	itemonMouseOut=(event)=>{
		this.setState({
			isProjectType:false
		})
	}

	itemList=()=>{
		let {data,num,treeClose}=this.props;
		
		if(data.length==0){
			return;
		}

		let arr=data.map(function(item,index){
			return (<ItemSingle value={item.codeName} data={item.children} listId={item.id} treeClose={treeClose}/>);
		})
		return arr;
	}

	
	
	
	render() {
		let {num,data}=this.props;
		let projectType={};
		if(num){
			projectType={display:"block",left:0}
		}else{
			projectType={top:-27}
		}
		if(data.length==0){
			projectType.display="none";
		}
		
		return(
			<div className="ui-projectType" style={projectType}>
				{this.itemList()}
			</div>

		)
	}
		
}
