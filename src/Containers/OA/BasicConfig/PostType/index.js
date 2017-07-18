import React,{Component} from 'react';
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
	Tooltip,
	Message,
	Section
} from 'kr-ui';
import AddPostType from './AddPostType';
import EditPostType from './EditPostType';
import DeletePost from './DeletePost';

export default class PostType extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openPostType:false,
			openEditType:false,
			openDelete:false
		}
	}


	onOperation=(type,itemDetail)=>{
		if(type=='edit'){
			this.setState({
			  openEditType:true	
			})
		}else if(type=='delete'){
			this.setState({
			  openDelete:true	
			})
		}
	}


	//搜索确定
	onSearchSubmit = ()=>{
       
	}
	
	//新建职务类型
	openAddPost=()=>{
      this.setState({
		  openPostType:!this.state.openPostType
	  })
	}

	//新建职务类型提交
	addPostSubmit=()=>{

	}
	
	//编辑职务类型关闭
	openEditPost=()=>{
       this.setState({
		  openEditType:!this.state.openEditType
	  })
	}

    //编辑职务类型提交
	editPostSubmit=()=>{
       
	}


	//关闭所有侧滑
	allClose = () =>{
       this.setState({
		  openEditType:false,
		  openPostType:false
	  })
	}

   //删除关闭
   cancelDelete=()=>{
     this.setState({
		 openDelete:!this.state.openDelete
	 })
   }

   //删除提交
   deleteSubmit=()=>{
     
   }
    

	render(){
		return(
      	<div className="oa-post-type">
		    <Section title="职务类型" description="" style={{marginBottom:-5,minHeight:910}}>
	        <Row style={{marginBottom:21}}>

				<Col
					style={{float:'left'}}
				>
					<Button
							label="新建"
							type='button'
							onTouchTap={this.openAddPost}
					/>
				</Col>
			        
					<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入姓名' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
								</ListGroup>
					</Col>

	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={false}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='shareCustomers'
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
			>
				<TableHeader>
					<TableHeaderColumn>职务类型名称</TableHeaderColumn>
					<TableHeaderColumn>编码</TableHeaderColumn>
					<TableHeaderColumn>描述</TableHeaderColumn>
					<TableHeaderColumn>排序号</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>更新时间</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn name="intentionCityName" ></TableRowColumn>
						<TableRowColumn name="stationNum"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn type="operation">
                            <Button label="编辑"  type="operation"  operation="edit"/>
			                <Button label="删除"  type="operation"  operation="delete" />
			            </TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
		  </Section>

		  {/*新建职务*/}
			<Dialog
					title="新增职务类型"
					onClose={this.openAddPost}
					open={this.state.openPostType}
					contentStyle ={{ width: '630px',height:'450px'}}
				>
			  <AddPostType 
			    onSubmit={this.addPostSubmit}
				onCancel={this.openAddPost}
			  />
			</Dialog>

			{/*编辑职务*/}
			<Dialog
					title="编辑职务类型"
					onClose={this.openEditPost}
					open={this.state.openEditType}
					contentStyle ={{ width: '630px',height:'520px'}}
				>
			  <EditPostType 
			    onSubmit={this.editPostSubmit}
				onCancel={this.openEditPost}
			  />
			</Dialog>

			{/*删除*/}
			<Dialog
				title="提示"
				onClose={this.cancelDelete}
				open={this.state.openDelete}
				contentStyle ={{ width: '444px',height:'190px'}}
			>
			<DeletePost
				onCancel={this.cancelDelete}
				onSubmit={this.deleteSubmit}  	
			/>
			</Dialog>
        </div>
		);
	}

}
