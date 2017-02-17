import React,{Component} from 'react';
import { connect } from 'react-redux';
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
	Paper,
	Dialog,
} from 'kr-ui';
import './index.less';

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			open:false
		}
	}
     
     slideClick=()=>{
       this.setState({
       	  open:!this.state.open
       }) 
     }


	render(){
        let {open}=this.state;
		return(

			<div style={{marginTop:'100px'}}>
               <div onClick={this.slideClick}>123</div>
               {open&&<div className='slideGo'>策划</div>}
			</div>
		);
	}

}
