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
	Section,
	CheckPermission
} from 'kr-ui';
import Todo from './Tododialog';
// import './index.less';
export default class TypeList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {
				page:1,
				pageSize:15,
				nameKey:"",
			},
			other:"",
		}
		this.allConfig = {
			openDelete : false,
			openDone : false,
		}
	}
	toDo=(item)=>{
		let {openDone} = this.allConfig;
		this.allConfig.openDone = !openDone;
		this.isRender();
	}
	//废除开关
	deleteItem=(item)=>{
		let {openDelete} = this.allConfig;
		this.allConfig.openDelete = !openDelete;
		this.isRender();
	}



	// //是否要渲染
	isRender = () =>{
		this.setState({
			other : new Date,
		})
	}
	

	render(){

		const {openDelete,openDone} = this.allConfig;
		return(
      	<div className="g-sql-list">
	        <Row style={{marginBottom:21,marginTop:22}}>
				<Col
					align="right"
					style={{
							marginTop:0,
							float:"right",
							marginRight:-10
						}}
				>
				<ListGroup>
					<ListGroupItem>
						<SearchForms
							placeholder='请输入表单名称'
							onSubmit={this.onSearchSubmit}
						/>
					</ListGroupItem>
				</ListGroup>
				</Col>
	        </Row>


            <Table
				style={{marginTop:8}}
				ajax={true}
              	onOperation={this.onOperation}
	            displayCheckbox={false}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName="form-list-search"
	            ajaxFieldListName="items"
			    onPageChange = {this.pageChange}
              	hasBorder={true}
			>
				<TableHeader>
					<TableHeaderColumn>表单类型</TableHeaderColumn>
					<TableHeaderColumn>表单名称</TableHeaderColumn>
					<TableHeaderColumn>SQL</TableHeaderColumn>
					<TableHeaderColumn>创建人</TableHeaderColumn>
					<TableHeaderColumn>创建时间</TableHeaderColumn>
					<TableHeaderColumn>执行状态</TableHeaderColumn>
					<TableHeaderColumn>执行人</TableHeaderColumn>
					<TableHeaderColumn>执行时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="orderNum" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="descr" component={(value,oldValue)=>{
								var maxWidth=10;
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
							}}></TableRowColumn>
						<TableRowColumn name="updatorName" 
						  style={{wordWrap:'break-word',whiteSpace:'normal'}}
						></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd  HH:MM:ss"/>)
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="purposeStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="created" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="enabledStr" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn  name="uTime"
							component={(value,oldValue,itemData)=>{
								if(itemData.created){
									return (<span>--</span>)
								}else{
									return (
										<span>
											<Button label="执行"  type="operation" onClick={this.toDo.bind(this,itemData)}/>
											<Button label="作废"  type="operation" onClick={this.deleteItem.bind(this,itemData)}/>
										</span>

									)
								}
								
						}}>
						</TableRowColumn>
					</TableRow>
				 </TableBody>
				<TableFooter></TableFooter>
      </Table>
		   {/*新建用户*/}
			<Dialog
				title="提示"
				onClose={this.deleteItem}
				open={openDelete}
				contentStyle ={{ width: '446px',height:'236px'}}
			>
				<div>
					<p style={{marginTop:52,marginBottom:50,width:'100%',textAlign:'center',fontSize:'14px',lineHeight:'22px',color:"#333"}}>是否确定作废本条sql？</p>
					<span style={{width:'100%',textAlign:'center',display:'inline-block'}}>
						<Button label="执行"  type="button"/>
						<span style={{display:'inline-block',width:30}}></span>
						<Button label="作废"  type="button" cancle={true} onClick={this.deleteItem}/>
					</span>
				</div>
			</Dialog>
			<Dialog
				title="提示"
				onClose={this.toDo}
				open={openDone}
				contentStyle ={{ width: '665px',height:'368px'}}
			>
				<Todo onCancel={this.toDo}/>
			</Dialog>
        </div>
		);
	}

}
;
