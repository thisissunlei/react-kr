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
			listValue:props.placeholder||"请选择项目类型"
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
		let {label,style,requireLabel,inline,search}=this.props;
		let imitateInputStyle="ui-imitateInput";
		let showTreeList=this.state.showTreeList;

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div ref="ui-imitateInput" className={imitateInputStyle} onClick={this.imitateInputClick}>
					<input readOnly="true" className="ui-treeInput" value={this.state.listValue} onChange={this.onChange} />
					<span className="ui-treeArrow"></span>
				</div>
				
					{this.state.showTreeList&&<div className="ui-treeList">
						<ProjectType data={TreeAll} num={true} treeClose={this.imitateInputClick} />
					</div>}
				
			</WrapComponent>
		);
	}

}
