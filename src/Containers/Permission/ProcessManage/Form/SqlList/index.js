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
import {
	reduxForm,
	change,
} from 'redux-form';
import Todo from './Tododialog';
// import './index.less';
class TypeList extends Component{

	constructor(props,context){
		super(props, context);
		let id = this.props.type.id;
		if(id === 0){
			id = '';
		}
		this.state={
			searchParams : {
				page:1,
				pageSize:15,
				name:"",
				executed:'',
				typeId:id
			},
			other:"",

		}
		this.allConfig = {
			openDelete : false,
			openDone : false,
			itemData :{}
		}
	}
	toDo=(item)=>{
		let {openDone} = this.allConfig;
		this.allConfig.openDone = !openDone;
		this.allConfig.itemData = item;
		this.isRender();
	}
	//废除开关
	deleteItem=(item)=>{
		let {openDelete} = this.allConfig;
		this.allConfig.openDelete = !openDelete;
		this.allConfig.itemData = item;

		this.isRender();
	}
	submit=(item)=>{
		var _this=this;
		
		Http.request('form-sql-execute',{},{id:this.allConfig.itemData.id}).then(function(response) {
			_this.allConfig.openDone = false;
			Message.success('执行成功');
			_this.setState({
				searchParams:{..._this.state.searchParams,time:+new Date()}
			})
        }).catch(function(err) {
          Message.error(err.message);
        });

	}
	deleteItemSubmit=()=>{
		var _this=this;
		Http.request('form-sql-invalid',{},{id:this.allConfig.itemData.id}).then(function(response) {
			_this.allConfig.openDelete = false;
			_this.setState({
				searchParams:{..._this.state.searchParams,time:+new Date()}
			})
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
	changeType=(value)=>{
		let {searchParams} = this.state;
		let executed = '';
		if(!value){
			executed = ''
		}else{
			executed = value.value;
		}
		let search = Object.assign({},searchParams,{executed:executed})
		this.setState({
			searchParams : search
		})
	}
	onSearchSubmit=(value)=>{
		let {searchParams} = this.state;
		let name = value.content;
		let search = Object.assign({},searchParams,{name:name})
		this.setState({
			searchParams : search
		})
	}



	// //是否要渲染
	isRender = () =>{
		this.setState({
			other : new Date,
		})
	}
	pageChange=(page)=>{
		let {searchParams} = this.state;

		let search = Object.assign({},searchParams,{page:page})
		this.setState({
			searchParams : search
		})
	}
	

	render(){

		const {openDelete,openDone,itemData} = this.allConfig;
		return(
      	<div className="g-sql-list">
	        <Row style={{marginTop:22}}>
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
						<form className="sql-search-do">
						<KrField  
							grid={1/2}  
							style={{width:262}}  
							name="nameKey" 
							type="select"
							inline={true}
							options={[{label:'是',value:'true'},{label:'否',value:'false'}]}  
							label="是否已执行"
							onChange={this.changeType}
					/></form>
					</ListGroupItem>
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
	            ajaxUrlName="get-sql-list"
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
						<TableRowColumn name="typeName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="name" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="sqlContent"  component={(value,oldValue)=>{
								var maxWidth=10;
								if(value.length>maxWidth){
									value = value.substring(0,10)+"...";
								}
								return (<div className='tooltipParent' style={{wordWrap:'break-word',whiteSpace:'normal'}}><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top' style={{width:300}}>{oldValue}</Tooltip></div>)
							}}></TableRowColumn>
						<TableRowColumn name="creatorName" 
						  style={{wordWrap:'break-word',whiteSpace:'normal'}}
						></TableRowColumn>
						<TableRowColumn name="cTime" component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd  HH:MM:ss"/>)
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="executed" style={{wordWrap:'break-word',whiteSpace:'normal'}} component={(value,oldValue,itemData)=>{
							let showText = '已执行';
							let color = '#333';
							if(itemData.discarded){
								showText = '已废弃';
								color = '#C3C8CD'
							}else{
								if(!itemData.executed){
									showText = "未执行";
									color = 'red'
								}
							}
							return (<span style={{color:color}}>{showText}</span>)


							
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="executorName" style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn name="eTime" style={{wordWrap:'break-word',whiteSpace:'normal'}} component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd  HH:MM:ss"/>)
						}} style={{width:150}} style={{wordWrap:'break-word',whiteSpace:'normal'}}></TableRowColumn>
						<TableRowColumn  name="uTime"
							component={(value,oldValue,itemData)=>{
									return (
										<span>
											{(!itemData.discarded && !itemData.executed) && <Button label="执行"  type="operation" onClick={this.toDo.bind(this,itemData)}/>}
											{!itemData.discarded && !itemData.executed && <Button label="作废"  type="operation" onClick={this.deleteItem.bind(this,itemData)}/>}
											{(itemData.discarded || itemData.executed) && <span>--</span>}
										</span>

									)
								
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
					<p style={{marginTop:42,marginBottom:50,width:'100%',textAlign:'center',fontSize:'14px',lineHeight:'22px',color:"#333"}}>是否确定作废本条sql？</p>
					<span style={{width:'100%',textAlign:'center',display:'inline-block'}}>
						<Button label="确定"  type="button" onTouchTap={this.deleteItemSubmit}/>
						<span style={{display:'inline-block',width:30}}></span>
						<Button label="取消"  type="button" cancle={true} onClick={this.deleteItem}/>
					</span>
				</div>
			</Dialog>
			<Dialog
				title="提示"
				onClose={this.toDo}
				open={openDone}
				contentStyle ={{ width: '665px',height:'368px'}}
			>
				<Todo onCancel={this.toDo} itemData = {itemData} onSubmit={this.submit}/>
			</Dialog>
        </div>
		);
	}

}
;
export default reduxForm({form:'searchUpperForm'})(TypeList);
