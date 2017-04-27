import React from 'react';
import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
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

		var searchParams = {
			name:Date.now()
		}

		this.setState({
			searchParams
		});
	}

	render() {

		const {searchParams} = this.state;

		return (
			<Section title="demo">
					<XTable ajaxUrlName="signCustomers" ajaxParams={this.state.searchParams}>
								<XTableRow label="全选" type="checkbox" name="all"/>
								<XTableRow label="公司名称" name="signCityName"/>
								<XTableRow label="创建时间" name="company"/>
								<XTableRow label="操作" component={(scope)=>{
										return <Button onClick={this.onClick} label={scope.signCityName} type="button"/>;
									}} />
					</XTable>
			</Section>

		);
	}
}
