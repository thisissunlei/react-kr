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
                <div className={`right ${item.click?" ":"right-unclickable"}`}>

                </div>
			</div>
		)
	}
	
	onAddThings=(item)=>{
		const {
			onSubmit,
		} = this.props;
		var _this = this;
		
		Http.request('first-second-delete', {},{
			id:itemDetail.id
		}).then(function(response) {
			onSubmit();
			Message.success("删除成功");
			_this.openDeleteFirst();
		}).catch(function(err) {
			Message.error(err.message);
			_this.openDeleteFirst();
		});
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
