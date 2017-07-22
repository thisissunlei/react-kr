import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
} from 'kr-ui';
import React, { PropTypes } from 'react';
export default class ZhangChi extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
			inputValue:'',
			expandedKeys:[],
      		autoExpandParent: true,
			sel: '',
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
	onChange=(event)=> {
    this.filterKeys = [];
    this.setState({
      inputValue: event.target.value,
    });
  }
  onVisibleChange=(visible)=> {
    this.setState({
      visible,
    });
  }
  onSelect=(selectedKeys, info)=> {
    this.setState({
      visible: false,
      sel: info.node.props.title,
    });
  }
  onExpand=(expandedKeys)=> {
    this.filterKeys = undefined;
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  filterTreeNode=(treeNode)=> {
    // 根据 key 进行搜索，可以根据其他数据，如 value
    return this.filterFn(treeNode.props.eventKey);
  }
  filterFn=(key)=> {
    if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
      return true;
    }
    return false;
  }
	render() {
		let expandedKeys = this.state.expandedKeys;
		let autoExpandParent = this.state.autoExpandParent;
		if (this.filterKeys) {
		expandedKeys = this.filterKeys;
		autoExpandParent = true;
		}
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
						<input type="text" value={this.state.inputValue} placeholder="ddd" onChange={this.onChange} />
						<span className="searching">

						</span>
					</div>

					<SliderTree 
						onExpand={this.onExpand} 
						expandedKeys={expandedKeys}
        				autoExpandParent={autoExpandParent}
        				onSelect={this.onSelect} 
						filterTreeNode={this.filterTreeNode}
						
					/>


			</Section>

		);
	}
}
