import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
	Section,
	Grid,
	Row,
	Col,
	Dialog,
  Title,
  ListGroup,
  ListGroupItem,
  SearchForms,
	Drawer

} from 'kr-ui';
import State from './State';
import NewOrders from './NewOrders';

import './index.less';
@observer
class clientOrders extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{}
		}
	}
	switchNewOrders = () => {
		State.switchNewOrders();
	}
	onNewOrders = (prames) => {

	}

	render(){

		return(
      <div className="m-clientOrders" style={{paddingTop:45}}>
      		<Title value="会员配置"/>
	        <Row >
			        <Col
									align="left"
									style={{marginLeft:0,float:'left'}}
							>
									<Button
											label="新建订单"
											type='button'
										 	joinEditForm
											onTouchTap={this.switchNewOrders}
									/>
							</Col>
			        <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
			          <ListGroup>
			            <ListGroupItem> <SearchForms placeholder='请输入会员卡号码' onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
			          </ListGroup>
			        </Col>
	        </Row>
          <Table
							style={{marginTop:8}}
              ajax={true}
              onOperation={this.onOperation}
              onProcessData={(state)=>{return state;}
	            }
	            displayCheckbox={false}
	            onExport={this.onExport}
	            ajaxParams={this.state.searchParams}

	            ajaxFieldListName="items"
	            ajaxUrlName='CardActivationList'
					  >
		            <TableHeader>
		              <TableHeaderColumn style={{width:"20%"}}>卡号</TableHeaderColumn>
		              <TableHeaderColumn style={{width:"20%"}}>内码</TableHeaderColumn>
		              <TableHeaderColumn style={{width:"20%"}}>状态</TableHeaderColumn>
		              <TableHeaderColumn style={{width:"20%"}}>激活时间</TableHeaderColumn>
		              <TableHeaderColumn style={{width:"20%"}}>操作</TableHeaderColumn>

		          	</TableHeader>

			          <TableBody >
			              <TableRow >
			                <TableRowColumn name="foreignCode" ></TableRowColumn>
			                <TableRowColumn name="interCode" ></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'已激活',value:'true'},{label:'未激活',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="activeTime" type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                 </TableRowColumn>
			               </TableRow>
			          </TableBody>

          			<TableFooter ></TableFooter>
          </Table>
					{State.openNewOrders&&
						<div
								className="other-page"
						>
								<NewOrders
										onSubmit={this.onNewOrders}
										onCancel={this.switchNewOrders}
								/>
					</div>}

      </div>
		);
	}

}
export default clientOrders;
