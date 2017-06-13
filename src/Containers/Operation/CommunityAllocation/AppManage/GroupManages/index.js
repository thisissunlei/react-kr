import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import {
	Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	Drawer,
	Dialog,
	KrDate
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import ViewGroup from './ViewGroup';


export default class GroupManages extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				clusterName:'',
				cmtId:'',
			},
			openNewCreat:false,
			openEdit:false,
			openView:false,
			openDele:false,
			itemDetail:'',
		}

	}
	
	//操作相关
  	onOperation = (type, itemDetail) => {

      this.setState({
        itemDetail
      });
      switch (type){
        case  'view':{
         this.openView();
          break;
        }
        case  'edit':{
         this.openEdit();
          break;
        }
        case  'delete':{
         this.openDele(itemDetail);
          break;
        }
      }
    }

	//删除
	onDeleteData=()=>{
		this.openDele();
	}
	openDele=()=>{
		this.setState({
			openDele:!this.state.openDele
		})
	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}
	openEdit=()=>{
		this.setState({
			openEdit:!this.state.openEdit
		})
	}
	openNewCreat=()=>{
		this.setState({
			openNewCreat:!this.state.openNewCreat
		})
	}

	searchSubmit=(form)=>{
		console.log('form----',form)

	}
	selectCommunity=(form)=>{
		this.setState({
			searchParams:{
				cmtId:form.id,
			}
		})
	}
	

	render() {
		let {itemDetail}=this.state;
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
				        <SearchForm onSubmit={this.searchSubmit}  onChange={this.selectCommunity}/>
			          </Col>
		        </Row>
			</div>
			<Table
                  style={{marginTop:10}}
                  ajax={true}
                  ajaxUrlName='cluster-list'
                  ajaxParams={this.state.searchParams}
                  onOperation={this.onOperation}
              >
              <TableHeader>
                  <TableHeaderColumn>群组名称</TableHeaderColumn>
                  <TableHeaderColumn>群组类型</TableHeaderColumn>
                  <TableHeaderColumn>成员数</TableHeaderColumn>
                  <TableHeaderColumn>所属社区</TableHeaderColumn>
                  <TableHeaderColumn>所属城市</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
              </TableHeader>
			  <TableBody>
					<TableRow>
						  <TableRowColumn name="clusterName"></TableRowColumn>
				   		  <TableRowColumn name="clusterTypeName"></TableRowColumn>
						  <TableRowColumn name="mbrCount"></TableRowColumn>
						  <TableRowColumn name="cmtName"></TableRowColumn>
						  <TableRowColumn name="city"></TableRowColumn>
						  <TableRowColumn name="creater"></TableRowColumn>
						  <TableRowColumn 
								  name="createTime" 
								  component={(value) => {
			                          return (<KrDate value={value} format="yyyy-mm-dd"/>)
			                      }}
	                      ></TableRowColumn>
						  <TableRowColumn>
						  	 <Button label="查看"  type="operation"  operation="view"/>
						  	 <Button label="编辑"  type="operation"  operation="edit"/>
						  	 <Button label="删除"  type="operation"  operation="delete"/>
						  </TableRowColumn>
				   	</TableRow>
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
			<Drawer
             modal={true}
             width={750}
             open={this.state.openNewCreat}
             onClose={this.openNewCreat}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             	<CreateGroup   onCancel={this.openNewCreat}  />
           </Drawer>
           <Drawer
             modal={true}
             width={750}
             open={this.state.openEdit}
             onClose={this.openEdit}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             	<EditGroup detail={itemDetail}  onCancel={this.openEdit}  />
           </Drawer>
           <Drawer
             modal={true}
             width={750}
             open={this.state.openView}
             onClose={this.openView}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             	<ViewGroup detail={itemDetail} onCancel={this.openView}  />
           </Drawer>
           <Dialog
              title="删除"
              modal={true}
              contentStyle ={{ width: '444',overflow:'visible'}}
              open={this.state.openDele}
              onClose={this.openDele}
            >
            <div className='u-list-delete'>
              	<p className='u-delete-title' style={{textAlign:'center'}}>删除群组后，相关帖子会员都会被删除，确认删除该群组？</p>
				<div style={{textAlign:'center',marginBottom:10}}>
                      <div  className='ui-btn-center'>
	                      <Button  label="确定" onClick={this.onDeleteData}/></div>
	                      <Button  label="取消" type="button" cancle={true} onClick={this.openDele} />
                      </div>
            	</div>
            </Dialog>
		</div>
		);
	}
}
