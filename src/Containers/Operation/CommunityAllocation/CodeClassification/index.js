import React from 'react';
import { connect } from 'react-redux';
import {Actions,Store} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Drawer,
	Section,
	Grid,
	Row,
	Col,
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
import State from './State';
import './index.less';
import NewAddCode from './NewAddCode';
@observer
class  CodeClassification extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	//查看相关操作
	onOperation=(type,itemDetail)=>{
   Debug.log('[[[==]]]',type,itemDetail);
	}

 //打开关闭新建代码弹窗
	openAddCode=()=>{
		Debug.log('[[----000]]');
		State.addCodeOpen();
	}

	//新建代码提交
	codeSubmit=(params)=>{
    Debug.log('kkkk',params);
	}

	render(){

		let searchFilter=[
            {
            	label:'代码名称',
            	value:'codeName'
            },
            {
            	label:'代码编码',
            	value:'codeNo'
            },
		]

		return(
       <div className='m-code-list'>
				<Title value="代码分类列表"/>
				<Section title="代码分类列表" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<Button
											label="新建代码"
											type='button'
											onTouchTap={this.openAddCode}
									/>
					  </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入关键字'  searchFilter={searchFilter} onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            ajaxUrlName='codeCategoryList'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>代码编码</TableHeaderColumn>
		              <TableHeaderColumn>代码名称</TableHeaderColumn>
                  <TableHeaderColumn>父类名称</TableHeaderColumn>
		              <TableHeaderColumn>排序号</TableHeaderColumn>
		              <TableHeaderColumn>创建人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="codeNo"></TableRowColumn>
                      <TableRowColumn name="codeName"></TableRowColumn>
			                <TableRowColumn name="pname"></TableRowColumn>
                      <TableRowColumn name="sort"></TableRowColumn>
			                <TableRowColumn name="createName"></TableRowColumn>
			                <TableRowColumn name="createDate"  component={(value,oldValue)=>{
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
													 }}  ></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'启用',value:'ENABLE'},{label:'禁用',value:'DISENABLE'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
													<Button label="下一级"  type="operation"  operation="next" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>

								 {/*新建代码*/}
								 <Drawer
										title="新建代码分类"
										open={State.openCode}
										width={750}
						        onClose={this.whiteClose}
						        openSecondary={true}
						        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
										>
                  <NewAddCode
									  onCancel={this.openAddCode}
										onSubmit={this.codeSubmit}
									/>
					       </Drawer>
	 </div>
		);
	}
}
export default CodeClassification;
