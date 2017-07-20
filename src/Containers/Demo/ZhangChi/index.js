import React from 'react';
import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
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
				{/*<PlanMap />
					<XTable ajaxUrlName="signCustomers" ajaxParams={this.state.searchParams}>
								<XTableRow label="全选" type="checkbox" name="all" width={30}/>
								<XTableRow label="公司名称" name="signCityName" width={300} tooltip="我的世界"/>
								<XTableRow label="公司" name="company" width={300}/>
								<XTableRow label="时间" name="receiveTimey" type="date" width={100}/>
								<XTableRow label="时间" name="createDate" type="date" width={200}/>
								<XTableRow label="操作" type="operation" component={(scope)=>{
										return <Button onClick={this.onClick} label={scope.signCityName} type="button"/>;
									}} />
					</XTable>*/}


					<div className="search"> 
						<input type="text" placeholder="ddd" />
						<span className="searching">

						</span>
					</div>
					
					<SliderTree />


			</Section>

		);
	}
}
