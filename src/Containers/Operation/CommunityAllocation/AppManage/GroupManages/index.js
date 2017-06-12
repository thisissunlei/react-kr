import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import {
	XTable,
	XTableRow,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';

export default class GroupManages extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				clusterName:'',
				cmtId:''
			},
			openNewCreat:false,
		}

	}
	openNewCreat=()=>{
		
	}
	searchSubmit=(form)=>{
		console.log('form----',form)
		
	}

	render() {
		
		return (
		<div className="g-group-manages">
			<div className="m-searchform">
				<Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left',marginTop: 20}}
					   >
							<Button
								label="新建群组"
								type='button'
								onTouchTap={this.openNewCreat}
							/>
					  </Col>
			          <Col  align="right" style={{marginTop:8,float:"right",marginRight:-10}}>
				        <SearchForm onSubmit={this.searchSubmit} />
			          </Col>
		        </Row>
			</div>
			<XTable ajaxUrlName="cluster-list" ajaxParams={this.state.searchParams}>
	            <XTableRow label="全选" type="checkbox" name="all" width={30}/>
	            <XTableRow label="群组名称" name="clusterName" width={200} tooltip="我的世界"/>
	            <XTableRow label="群组类型" name="clusterTypeName" width={100}/>
	            <XTableRow label="成员数" name="mbrCount" type="date" width={100}/>
	            <XTableRow label="所属社区" name="cmtName" type="date" width={200}/>
	            <XTableRow label="所属城市" name="city" type="date" width={100}/>
	            <XTableRow label="创建人" name="creater" type="date" width={100}/>
	            <XTableRow label="创建时间" name="createTime" type="date" width={200} />
	            <XTableRow label="操作" type="operation" width={300} component={(scope)=>{
	                    return <Button onClick={this.onClick} label={scope.signCityName} type="button"/>;
	                }} />
   			</XTable>

		</div>
		);
	}
}
