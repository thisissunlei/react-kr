import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';

import ProjectType from './ProjectType';
import {
	observer
} from 'mobx-react';
import State from './State';

@observer

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
	componentDidMount() {
		
		let {treeAll}=this.props;
		$(".ui-list1 .ui-treeItem span").hover(function(){  
			
			let every=$(this).html();
			treeAll.map(function(item,index){
				if(every==item.codeName){
					State.uiList2=item.children;
					
				}
			})

            // $(".ui-list2").show();  
            State.uiList3=[];
            State.uiList4=[];
            State.isUiList2=true;
        },function(){  
            // $(".ui-list2").hide();  
             State.isUiList3=false; 
             State.isUiList4=false;
            
        })   
		$(".ui-list2 .ui-treeItem span").hover(function(){  
			let every=$(this).html();
			for(let i=0;i<State.uiList2.length;i++){
				if(every==State.uiList2[i].codeName){
					State.uiList3=State.uiList2[i].children;
					break;
				}
			}

            // $(".ui-list3").show();  
            State.uiList4=[];
            State.isUiList3=true;
        },function(){  
        	State.isUiList4=false;

            // $(".ui-list3").hide(); 

        })    
        $(".ui-list3 .ui-treeItem span").hover(function(){  
			let every=$(this).html();
			for(let i=0;i<State.uiList3.length;i++){
				if(every==State.uiList3[i].codeName){
					State.uiList4=State.uiList3[i].children;
					break;
				}
			}
            // $(".ui-list2").show(); 
            State.isUiList4=true;
        },function(){  
        	State.uiList4=[];
            // $(".ui-list2").hide();  
            // State.uiList4=[]; State.uiList2=[];

        })    
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
			    <span data-tree={data}>{value}</span>
				
			</div>
		)
	}
		
}
