import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
import './index.less'
@observer
class Personal extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{}
		}

	}



	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchNewMerchants();
	}
	//编辑页面的开关
	switchEditMerchants=()=>{
		State.switchEditMerchants();
	}
	//查看页的开关
	switchLookPersonal=()=>{
		State.switchLookPersonal();
	}

	render(){

		return(
      <div className="m-merchants" style={{paddingTop:45}}>
      		<Title value="会员配置"/>
	        <Row >
			        <Col
									align="left"
									style={{marginLeft:0,float:'left'}}
							>

									<Button
											label="查看"
											type='button'
										 	joinEditForm
											onTouchTap={this.switchLookPersonal}
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
	            ajaxUrlName='shareCustomers'
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



					{/*查看*/}
					<Drawer
							open={State.openLookPersonal}
							width={900}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
					 		
					</Drawer>
					{State.openLookPersonal&&
							<
								div className="mask"
								onClick={this.switchLookPersonal}
							>
							</div>
					}
      </div>
		);
	}

}
export default Personal;
