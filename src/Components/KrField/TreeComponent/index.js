import React from 'react';

import ReactDOM from 'react-dom';
import $ from 'jquery';

import './index.less';
import WrapComponent from '../WrapComponent';
import TreeAll from './TreeData.json';
import ProjectType from "./ProjectType";
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';
import {
	observer
} from 'mobx-react';
import State from './State';
import ItemSingle from './ItemSingle';

@observer
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
			uiList1:TreeAll,
			
			uiList3:[],
			uiList4:[],
		}
		State.listValue=props.placeholder||"请选择项目类型";

	}
	componentDidMount() {
      
      let _this=this;
		let bodyElem=document.getElementsByTagName("body")[0];
		bodyElem.onclick=function(event){
			event = event || window.event;
			var target = event.target;

			while (target) {
				if (target && target.className && target.className.indexOf('tree-communityTree') !== -1) {
					return;
				}
				target = target.parentNode;
			}
			_this.setState({
				showTreeList:false,
			})
		}

	}
	// other
	imitateInputClick=(value,listId)=>{
			let {input}=this.props;
			if(typeof(value)=="string"){
				State.listValue=value;
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
	uiList1Ele=()=>{
		let {treeAll}=this.props;
		if(!treeAll){
			return ;
		}
		let _this=this;
		let arr=treeAll.map(function(item,index){
			return (<ItemSingle value={item.codeName} data={item.children} listId={item.id} treeClose={_this.imitateInputClick} treeAll={treeAll}/>);
		})
		return arr;
	}
	uiList2Ele=()=>{
		let {treeAll}=this.props;
        if(!treeAll){
			return ;
		}
		let _this=this;
		let arr=State.uiList2.map(function(item,index){
			return (<ItemSingle value={item.codeName} data={item.children} listId={item.id} treeClose={_this.imitateInputClick} treeAll={treeAll}/>);
		})
		return arr;
	}
	uiList3Ele=()=>{
		let {treeAll}=this.props;
        if(!treeAll){
			return ;
		}
		let _this=this;
		let arr=State.uiList3.map(function(item,index){
			return (<ItemSingle value={item.codeName} data={item.children} listId={item.id} treeClose={_this.imitateInputClick} treeAll={treeAll}/>);
		})
		return arr;
	}
	uiList4Ele=()=>{
		let {treeAll}=this.props;
        if(!treeAll){
			return ;
		}
		let _this=this;
		let arr=State.uiList4.map(function(item,index){
			return (<ItemSingle value={item.codeName} data={item.children} listId={item.id} treeClose={_this.imitateInputClick} treeAll={treeAll}/>);
		})
		return arr;
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
		let {showTreeList}=this.state;
		let listValue=State.listValue;
		let color="#666";
		if(listValue=="请选择项目类型"||listValue==placeholder){
			color="#ccc";
			if(!listValueName){

			}else if(listValueName.length!=0){
				listValue=listValueName;

			}
		}
        
        if(listValue!="请选择项目类型"&&listValue!=placeholder){
        	color="#666";
        }

        var blockListStyle={};
        var heightList1='0';
        var $treeUi=document.getElementsByClassName('ui-treeList')[0];
        var $Weight=document.getElementsByClassName('ui-list1')[0];
        let {uiList2,uiList3,uiList4}=State;
        if($treeUi){
            heightList1=$Weight.offsetWidth;
        }

       	
		if(uiList4.length!=0){
		 if($treeUi){
		    $treeUi.style.width=heightList1*4+5+'px';
		  }
		}else if(uiList3.length!=0){
		  if($treeUi){
		    $treeUi.style.width=heightList1*3+5+'px';
		   }
		}else if(uiList2.length!=0){
		  if($treeUi){
			$treeUi.style.width=heightList1*2+5+'px';
		   }
		}
	
		return (
         
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
			 <div className='tree-communityTree'>
				<div ref="ui-imitateInput" className={imitateInputStyle} onClick={this.imitateInputClick}>
					<input readOnly="true" className="ui-treeInput" style={{color:color}} value={listValue} onChange={this.onChange} />
					<span className="ui-treeArrow"></span>
				</div>
				
					{showTreeList && <div className="ui-treeList">
						<div className="ui-list1">
							{this.uiList1Ele()}
						</div>
						{State.uiList2.length!=0 && <div className="ui-list2">
							{this.uiList2Ele()}
						</div>}
						{State.uiList3.length!=0 && <div className="ui-list3">
							{this.uiList3Ele()}
						</div>}
						{State.uiList4.length!=0 && <div className="ui-list4">
							{this.uiList4Ele()}
						</div>}
					</div>}

				{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			 </div>
			</WrapComponent>
		);
	}

}
