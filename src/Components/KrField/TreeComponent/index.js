import React from 'react';

import ReactDOM from 'react-dom';

import './index.less';
import WrapComponent from '../WrapComponent';
import TreeAll from './TreeData.json';
import ProjectType from "./ProjectType";
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';


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
		placeholder:React.PropTypes.string
	}

	constructor(props) {
		super(props)


		this.isInit = false;
		this.state = {
			showTreeList:false,
			listId:"",
			listValue:props.placeholder||"请选择项目类型",
		}
	}
	imitateInputClick=(value,listId)=>{
			let {input}=this.props;
			if(typeof(value)=="string"){
				this.setState({
					listId:listId,
					listValue:value,
					showTreeList:!this.state.showTreeList,
				})
				// return;
			}
			this.setState({
				
				showTreeList:!this.state.showTreeList,
			})
			input.onChange(listId);

			
	}


	
	
	render() {
		let {label,style,requireLabel,inline,search,listValueName,placeholder,treeAll,meta: {
				touched,
				error
			}}=this.props;
		if(!treeAll){
			treeAll='';
		}
		let imitateInputStyle="ui-imitateInput";
		let {listValue,showTreeList}=this.state;
		if(listValue=="请选择项目类型"||listValue==placeholder){
			if(!listValueName){

			}else if(listValueName.length!=0){
				listValue=listValueName;

			}
		}
		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div ref="ui-imitateInput" className={imitateInputStyle} onClick={this.imitateInputClick}>
					<input readOnly="true" className="ui-treeInput" value={listValue} onChange={this.onChange} />
					<span className="ui-treeArrow"></span>
				</div>
				
					{this.state.showTreeList&&<div className="ui-treeList">
						<ProjectType data={treeAll} num={true} treeClose={this.imitateInputClick} />
					</div>}
				{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>
		);
	}

}
