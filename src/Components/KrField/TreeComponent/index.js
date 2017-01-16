import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';
import WrapComponent from '../WrapComponent';
import TreeAll from './TreeData.json';

export default class TreeComponent extends React.Component {

	static displayName = 'DateComponent';


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		defaultValue: React.PropTypes.string,
		onSubmit: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
	}

	constructor(props) {
		super(props)


		this.isInit = false;
		this.state = {
			showTreeList:false,
			tree:[],
			oldValue:"All",
			oldParent:"window"
		}
		

	}

	

	componentWillReceiveProps(nextProps) {
		// if (!this.isInit && nextProps.input.value) {
		// 	this.setDefaultDate(nextProps.input.value);
		// }
	}
	clicks=(value)=>{

		// console.log("tree"+value,"pppp")

	}
	seover=(data,newValue,event)=>{
		let treeArr=this.state.tree;
		let newParent=event.target.attributes[1].value;
		let {oldValue,oldParent}=this.state;
		console.log(newValue,newParent,oldValue,oldParent,"mmm")

		if(data.length==0){
			return;
		}
		if(newParent==oldValue){
			treeArr.length=treeArr.length;
		}
		if(newValue==oldParent){
			treeArr.length=treeArr.length-2;
		}else if(newParent==oldParent){
			treeArr.length=treeArr.length-1
		}
		treeArr.push(this.selectList(data,newValue));
		this.setState({
			tree:treeArr,
			oldValue:newValue,
			oldParent:newParent
		})
	}
	imitateInputClick=()=>{
		let treeArr=this.state.tree;
		if(treeArr.length==0){

		
			treeArr.push(this.selectList(TreeAll,"All"))
			this.setState({
				showTreeList:!this.state.showTreeList,
				tree:treeArr
			})
		}
		

		
	}


	selectList=(data,parent)=>{
		var _this=this;
		let list=data.map(function(item,index){
			return (<span 
						className="ui-everyTree"
						data-parent={parent}
						onClick={
							_this.clicks.bind(_this,item.codeName)
						}
						onMouseOver={
							_this.seover.bind(_this,item.children,item.codeName)
						}
					>
						{item.codeName}
					</span>)
		})
		
		return (<div style={{float:"left"}}>{list}</div>);
		
	}
	
	render() {
		let {label,style,requireLabel,inline,search}=this.props;
		let imitateInputStyle="ui-imitateInput";
		let showTreeList=this.state.showTreeList;

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div ref="ui-imitateInput" className={imitateInputStyle} onClick={this.imitateInputClick}>
					<input readOnly="true" className="ui-treeInput" />
					<span className="ui-treeArrow"></span>
				</div>
				{this.state.showTreeList && <div className="ui-treeList">
					{this.state.tree} 
				</div>}
			</WrapComponent>
		);
	}

}
