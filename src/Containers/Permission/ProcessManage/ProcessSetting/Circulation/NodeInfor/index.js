import React,{Component} from 'react';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';
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
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message,
} from 'kr-ui';
import './index.less';
import AddNode from './AddNode';
import EditNode from './EditNode';
import WatchNode from './WatchNode';
export default class NodeInfor extends Component{


	constructor(props,context){
		super(props, context);
		this.state={
            searchParams:{
                page:1,
                pageSize:15
            },
            openAdd:false,
            openWatch:false,
            openEdit:false,
            basicData:{}
		}
    }
    
    
    submitAddNode=(params)=>{
        var _this = this;
        params.wfId=0;
        Http.request('add-node-intro', {}, params).then(function (response) {
           _this.paramsRefresh();
		   _this.openAddNode();
		}).catch(function (err) {
			Message.error(err.message)
		});
    }

    submitEditNode=(params)=>{
        var _this = this;
        Http.request('edit-node-intro', {}, params).then(function (response) {
           _this.paramsRefresh();
		   _this.openEditNode();
		}).catch(function (err) {
			Message.error(err.message)
		});
    }
  
    getEditData=(id)=>{
        var _this = this;
        Http.request('get-node-edit', {id:id}).then(function (response) {
           Store.dispatch(initialize('EditNode',response))
           _this.setState({
             basicData:response
           })
		}).catch(function (err) {
			Message.error(err.message)
		});
    }
	
    
  
	render(){
		
		return(

      	<div className="m-wrap-node">

	        <Row style={{marginBottom:21}}>
			    <Col style={{float:'left'}}>
					<Button label="新建节点" type='button' onTouchTap={this.openAddNode}/>
				</Col>
	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={false}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName="search-node-list"
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>节点名称</TableHeaderColumn>
					<TableHeaderColumn>节点类型</TableHeaderColumn>
                    <TableHeaderColumn>节点属性</TableHeaderColumn>
                    <TableHeaderColumn>显示顺序</TableHeaderColumn>
					<TableHeaderColumn>强制收回</TableHeaderColumn>
					<TableHeaderColumn>强制归档</TableHeaderColumn>
					<TableHeaderColumn>批量提交</TableHeaderColumn>
					<TableHeaderColumn>节点描述</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
				<TableRow>
                    <TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
                    <TableRowColumn name="nodeTypeName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
                    <TableRowColumn name="nodePropertyName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
                    <TableRowColumn name="orderNum" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
                    <TableRowColumn name="forceBackName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
                    <TableRowColumn name="forceFinish" style={{wordWrap:'break-word',whiteSpace:'normal'}} options={[{label:'允许',value:'true'},{label:'禁止',value:'false'}]}></TableRowColumn>
                    <TableRowColumn name="batchCommit" style={{wordWrap:'break-word',whiteSpace:'normal'}} options={[{label:'允许',value:'true'},{label:'禁止',value:'false'}]}></TableRowColumn>
                    <TableRowColumn name="descr" component={(value,oldValue)=>{
                                            var maxWidth=10;
                                            if(value.length>maxWidth){
                                                value = value.substring(0,10)+"...";
                                            }
                                            return (<div className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
                                        }} ></TableRowColumn>
                    <TableRowColumn type="operation">
                        <Button label="查看"  type="operation"  operation="watch"/>
                    </TableRowColumn>
					</TableRow>
				 </TableBody>
                </Table>

                  {/*新建节点*/} 
                    <Drawer
                            open={this.state.openAdd}
                            width={750}
                            openSecondary={true}
                            containerStyle={{top:60,paddingBottom:228,zIndex:20}}
                            onClose={this.allClose}
                        >
                            <AddNode
                                onCancel={this.openAddNode}
                                onSubmit={this.submitAddNode}
                            />
                    </Drawer>

                    {/*编辑节点*/} 
                    <Drawer
                            open={this.state.openEdit}
                            width={750}
                            openSecondary={true}
                            drawerStyle={{zIndex:110}}
                            onClose={this.allClose}
                        >
                            <EditNode
                                onCancel={this.openEditNode}
                                onSubmit={this.submitEditNode}
                            />
                    </Drawer>

                    {/*查看节点*/} 
                    <Drawer
                            open={this.state.openWatch}
                            width={750}
                            openSecondary={true}
                            drawerStyle={{zIndex:100}}
                            onClose={this.allClose}
                        >
                            <WatchNode 
                              openEditNode={this.openEditNode} 
                              basicData={this.state.basicData}
                            />
                    </Drawer>
          </div>
		);
    }
    
    openAddNode=()=>{
        this.setState({
            openAdd:!this.state.openAdd
        })
    }

    openEditNode=()=>{
        this.setState({
            openEdit:!this.state.openEdit
        })
    }

    onOperation=(type,itemDetail)=>{
        if(type=='watch'){
            this.getEditData(itemDetail.id);
            this.setState({
                openWatch:!this.state.openWatch
            })
        }
    }

    allClose=()=>{
        this.setState({
            openAdd:false,
            openEdit:false,
            openWatch:false
        })
    }

    paramsRefresh=()=>{
        let params={};
        params.other=+new Date();
        this.setState({
            searchParams:Object.assign({},params,this.state.searchParams)
        })
    }



}

