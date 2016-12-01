import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
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
	Grid,
	Row,
	Col,
	Dialog,
	Title

} from 'kr-ui';

import NotOpenPanel from './NotOpenPanel';
import OpenPanel from './OpenPanel';

export default class PanelComponents  extends Component{

	static defaultProps = {
		panels:[{label:'张三',value:''},{label:'里斯',value:'dddd'}]
	}

	static propTypes = {
		 panels:React.PropTypes.array,
		 groupId:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render(){

		let {panels}=this.props;

		console.log('ffffff',this.props.panels);

		var myDate = new Date();
		var year=myDate.getFullYear();  
		var month=myDate.getMonth()+1;  
		var day=myDate.getDate();  
		var currentDate=year+'-'+month+'-'+day

		

		return(
			<div>
			    <Title value="数据统计"/>
			     {
			    	panels.map((item,index)=>{
                      console.log(item.templateName);
                      if(index==0){
                         if(item.templateName=='第一个'){
                            return (<div key={index}><OpenPanel groupId={this.props.groupId} currentDate={currentDate}/>
				                    <NotOpenPanel groupId={this.props.groupId} currentDate={currentDate}/></div>)
                         }else if(item.templateName=='第二个'){
                             return (<div key={index}><NotOpenPanel groupId={this.props.groupId} currentDate={currentDate}/>
				              <OpenPanel groupId={this.props.groupId} currentDate={currentDate}/></div>)
                        }
                      }
			    	})
			     }
				
			</div>
		);
	}
}
