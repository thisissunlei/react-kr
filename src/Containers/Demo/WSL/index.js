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
             <div>
			       <KrField name="uploadImageList" 
								component="uploadImageList" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>
			  </div>
		);
	}

}
