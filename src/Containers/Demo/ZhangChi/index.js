import React from 'react';
import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow
} from 'kr-ui';

export default class ZhangChi extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			}
		}
	}

	onClick = ()=>{

		console.log('clidddck');

		var searchParams = {
			name:Date.now()
		}

		this.setState({
			searchParams
		});
	}

	render() {

		const {searchParams} = this.state;
		console.log('===',searchParams);
		return (
			<div>
					<XTable ajaxUrlName="signCustomers" ajaxParams={this.state.searchParams}>
								<XTableRow label="公司名称" name="signCityName"/>
								<XTableRow label="创建时间" name="company"/>
								<XTableRow label="操作" component={(scope)=>{
										return <span onClick={this.onClick}>{scope.signCityName}</span>;
									}} />
					</XTable>
			</div>

		);
	}
}
