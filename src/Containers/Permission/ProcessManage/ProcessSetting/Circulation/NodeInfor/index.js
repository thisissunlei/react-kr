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
export default class NodeInfor extends Component{


	constructor(props,context){
		super(props, context);
		this.state={
            searchParams:{},
            openAdd:false
		}
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
        </div>
		);
    }
    
    openAddNode=()=>{
        this.setState({
            openAdd:!this.state.openAdd
        })
    }



}

