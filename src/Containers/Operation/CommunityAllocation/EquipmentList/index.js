import React from 'react';
import {DateFormat} from 'kr/Utils';
import {
	reduxForm,
	change,
  arrayPush
} from 'redux-form';
import {
	observer
} from 'mobx-react';
import {
	Actions,
  Store
} from 'kr/Redux';
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

class EquipmentList  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			id:''
		}

	}

	componentDidMount(){
		State.searchDataHere();

	}

   

	render(){

		let searchFilter=[
            {
            	label:'社区名称',
            	value:'NAME'
            },
            {
            	label:'社区编码',
            	value:'CODE'
            },

		]

		return(

			<div className='community-list'>
				<Title value="设备列表"/>
				<Section title="设备列表" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			     <Col
					   style={{float:'left'}}
					 >
									<Button
											label="新建社区"
											type='button'
											onTouchTap={this.openAddCommunity}
									/>
					  </Col>

            <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
			          <ListGroup>
			            <ListGroupItem><SearchForms placeholder='请输入设备名称' inputName='mr' onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            ajaxUrlName='communitySearch'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>ID</TableHeaderColumn>
		              <TableHeaderColumn>设备名称</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>最后操作人</TableHeaderColumn>
		              <TableHeaderColumn>最后操作时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="id"></TableRowColumn>
                      <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="createName"></TableRowColumn>
                      <TableRowColumn name="createrDate"></TableRowColumn>
			                <TableRowColumn name="updateName" ></TableRowColumn>
			                <TableRowColumn name="updateDate" ></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit"  />
			                    <Button label="删除"  type="operation"  operation="watch" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>

          {/*新建*/}
					<Drawer
				        open={false}
				        width={750}
				        
			        >
              <div>xin</div>
    					

		      </Drawer>

		             {/*编辑*/}
					<Drawer
				        open={false}
				        width={750}
			        >
  						<div>xin</div>
       </Section>

	 </div>
	 );
	}
}

export default EquipmentList
