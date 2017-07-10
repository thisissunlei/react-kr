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
			openHighSearch: false,
		}
	}
    renderSecondItem=(item,index)=>{
		return(
			<div className="second-menu" key={index}>
				<div className="second-title-row">
					<div className="second-title"><Chip editStyle={editStyle} label={item.name}/></div>
					{item.ChildList.map((itemA,indexA)=>{
						return this.renderThirdItem(itemA,indexA)
					})}
					<div className="btn">新增</div>
				</div>
			</div>
		)
    }
	renderThirdItem=(item,index)=>{
		return (
			<div key={index} style={{paddingRight:20}}>
				<Chip editStyle={editStyle} label={item.name}/>
			</div>
		)
	}
	render() {
        let item = this.state.item;
		var editStyle={
			'border':'1px solid #333',
		}
		return (
			<div className="first-menu">
				<div className="first-title-row">
					<div className="first-title"><Chip editStyle={editStyle} label={item.name}/></div>
					<div className="btn">新增分类</div>
					<div className="btn">完成</div>
				</div>
				<div className="main">
					{item.ChildList.map((itemA,index)=>{
						return this.renderSecondItem(itemA,index)
					})}
				</div>
			</div>
		);
	}

}
