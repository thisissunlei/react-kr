import React from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http,
	DateFormat
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
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
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	KrDate,
	Message,
    Chip
} from 'kr-ui';
import './index.less';
export default class FirstMenu extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			item:this.props.detail,
			editState:false,
			itemDetail:{},
		}
	}
	renderApply=(item,index)=>{
		let {editStyle,editState} = this.state;
		return (
			<div className="apply" key={index}>
				<div className="left">
                    {item.name}
                </div>
                <div className="right">

                </div>
			</div>
		)
	}
	
	
	render() {
        let {item,editStyle,editState,itemDetail} = this.state;
		console.log("detail",this.state.item);		
		return (
			<div className="item-two">
                <div className="title">
                    {item.name}
                </div>
               {item.children.map((item,index)=>{
                    return this.renderApply(item,index)
                })}
                
			</div>
		);
	}

}
