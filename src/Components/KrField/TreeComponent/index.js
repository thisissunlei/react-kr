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
			prevValue:"All"
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
	seover=(data,newValue,oldValue,oldParent,event)=>{
		let treeArr=this.state.tree;
		// console.log(event,currentValue,"mmm")
		let newParent=event.target.attributes[1].value;
		let newValue=currentValue;
		
		
		if(this.state.prevValue!=parent&&treeArr.length>=1){
			treeArr.length=treeArr.length-1;
		}
		if(data.length==0){
			return;
		}
		treeArr.push(this.selectList(data,newValue,newParent));
		this.setState({
			tree:treeArr,
			prevValue:currentValue


		})
	}
	imitateInputClick=()=>{
		let treeArr=this.state.tree;
		if(treeArr.length==0){

		
			treeArr.push(this.selectList(TreeAll,"All","All"))
			this.setState({
				showTreeList:!this.state.showTreeList,
				tree:treeArr
			})
		}
		

		
	}


	selectList=(data,oldValue,oldParent)=>{
		var _this=this;
		let newParent=oldValue;
		let oldParent=oldParent;
		let list=data.map(function(item,index){
			return (<span 
						className="ui-everyTree"
						data-parent={newParent}
						onClick={
							_this.clicks.bind(_this,item.codeName)
						}
						onMouseOver={
							_this.seover.bind(_this,item.children,item.codeName,oldValue,oldParent)
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
