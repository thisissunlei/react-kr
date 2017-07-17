import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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
	Section
} from 'kr-ui';
export default class PostType extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openPostType:false
		}
	}


	onExport = () =>{

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
	
	//关闭所有侧滑
	allClose = () =>{

	}

	render(){
		return(
      	<div className="oa-post-type" style={{paddingTop:25}}>
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
           </Table>
		  </Section>

		  {/*新建职务*/}
			<Drawer
					open={this.state.openPostType}
					width={750}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				>
				
			</Drawer>
        </div>
		);
	}

}
