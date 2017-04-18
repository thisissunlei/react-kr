import React from 'react';
import {Http} from 'kr/Utils';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import {
	observer,
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
class  CommunityStationDetail extends React.Component{

	constructor(props,context){
		super(props, context);

	}



	render(){

		return(

			<div className='community-list'>
				<Title value="工位列表"/>
				<Section title="工位列表" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="新建"
											type='button'
											onTouchTap={this.openAddCommunity}
									/></div>
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="选择社区"
											type='button'
											onTouchTap={this.openAddCommunity}
									/></div>
									<Button
											label="导入"
											type='button'
											onTouchTap={this.openAddCommunity}
									/>
					  </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入工位编号'  onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>

	          </Row>

	         <Table
			        style={{marginTop:8}}
              ajax={true}
              onOperation={this.onOperation}
	            displayCheckbox={true}
	            exportSwitch={true}
			        onExport={this.onExport}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='station-list'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>工位编号</TableHeaderColumn>
		              <TableHeaderColumn>所在楼层</TableHeaderColumn>
                  <TableHeaderColumn>工位性质</TableHeaderColumn>
		              <TableHeaderColumn>是否属于会议室</TableHeaderColumn>
		              <TableHeaderColumn>会议室名称</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="floor"></TableRowColumn>
			                <TableRowColumn name="stationType"></TableRowColumn>
                      <TableRowColumn name="belongSpace"  options={[{label:'属于',value:'true'},{label:'不属于',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="spaceName"></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                    <Button label="删除"  type="operation"  operation="delete" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>


       </Section>

	 </div>
	 );
	}

}
export default CommunityStationDetail;
