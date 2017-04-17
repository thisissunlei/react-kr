import React from 'react';
import { connect } from 'react-redux';
import {Actions,Store} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Drawer,
	Section,
	Grid,
	Row,
	Col,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import {
	observer,
} from 'mobx-react';
import State from './State';
import './index.less';
import NewAddCode from './NewAddCode';
import EditAddCode from './EditAddCode';
@observer
class  CodeClassification extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	//查看相关操作
	onOperation=(type,itemDetail)=>{
		let {searchParams}=State;
		State.oldPid=searchParams.pid;
		if(type=='edit'){
      State.editCodeOpen();
			State.editData=itemDetail;
		}else if(type=='next'){
			State.searchParams={
				 pid:itemDetail.pid,
				 time:+new Date()
			}
			State.lastFlag=true;
			State.parentName=itemDetail.pname;
		}
	}
  //编辑取消
	cancelAddCode=()=>{
    State.editCodeOpen();
	}

 //打开关闭新建代码弹窗
	openAddCode=()=>{
		State.addCodeOpen();
	}

	//新建代码提交
	codeSubmit=(params)=>{
    State.addCodeSubmit(params);
	}

	//数据加载完
	onLoaded=(params)=>{
	 if(params.items.length>=1){
		 State.searchParams={
			 pid:params.items[0].pid
		 }
	 }
	}

 //全关
	whiteClose=()=>{
		State.openCode=false;
		State.openCodeEdit=false;
	}


	//导出
onExport=(values)=> {
 let {searchParams} = State;
 let defaultParams = {
	 noOrName:'',
	 pid:''
 }
 searchParams = Object.assign({},defaultParams,searchParams);

	 let ids = [];
	 if (values.length != 0) {
		 values.map((item, value) => {
			 ids.push(item.id)
		 });
	 }
	 var where=[];
	 for(var item in searchParams){
		 if(searchParams.hasOwnProperty(item)){
				where.push(`${item}=${searchParams[item]}`);
		 }
	 }
	 where.push(`ids=${ids}`);
	 var url = `/api/krspace-finance-web/cmt/codeCategory/action/export?${where.join('&')}`
	 window.location.href = url;
}

//搜索
onSearchSubmit=(params)=>{
	let {searchParams}=State;
	State.searchParams={
		noOrName:params.content,
		pid:searchParams.pid
	}
}

//上一级
lastGoTo=()=>{
 State.searchParams={
	 pid:State.oldPid,
	 time:+new Date()
 }
}


	render(){


		return(
       <div className='m-code-list'>
				<Title value="代码分类列表"/>
				<Section title="代码分类列表" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="新建代码"
											type='button'
											onTouchTap={this.openAddCode}
									/></div>
									{State.lastFlag&&<Button
											label="上一级"
											type='button'
											onTouchTap={this.lastGoTo}
									/>}
					  </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='代码编码/名称'  onSubmit={this.onSearchSubmit}/></ListGroupItem>
				          </ListGroup>
			          </Col>

	          </Row>

	         <Table
			    style={{marginTop:8}}
              ajax={true}
              onOperation={this.onOperation}
							onLoaded={this.onLoaded}
	            displayCheckbox={true}
	            exportSwitch={true}
			        onExport={this.onExport}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='codeCategoryList'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>代码编码</TableHeaderColumn>
		              <TableHeaderColumn>代码名称</TableHeaderColumn>
                  <TableHeaderColumn>父类名称</TableHeaderColumn>
		              <TableHeaderColumn>排序号</TableHeaderColumn>
		              <TableHeaderColumn>创建人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="codeNo"></TableRowColumn>
                      <TableRowColumn name="codeName"></TableRowColumn>
			                <TableRowColumn name="pname" component={(value,oldValue)=>{
                                State.parentName=value;
																return (<div>{value}</div>)
													 }}></TableRowColumn>
                      <TableRowColumn name="sort"></TableRowColumn>
			                <TableRowColumn name="createName"></TableRowColumn>
			                <TableRowColumn name="createDate"  component={(value,oldValue)=>{
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
													 }}  ></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'启用',value:'ENABLE'},{label:'禁用',value:'DISENABLE'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
													<Button label="下一级"  type="operation"  operation="next" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>

								 {/*新建代码*/}
								 <Drawer
										open={State.openCode}
										width={750}
						        onClose={this.whiteClose}
						        openSecondary={true}
						        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
										>
                  <NewAddCode
									  onCancel={this.openAddCode}
										onSubmit={this.codeSubmit}
									/>
					       </Drawer>

								 {/*编辑代码*/}
								 <Drawer
										open={State.openCodeEdit}
										width={750}
						        onClose={this.whiteClose}
						        openSecondary={true}
						        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
										>
                  <EditAddCode
									  onCancel={this.cancelAddCode}
										onSubmit={this.codeSubmit}
										editData={State.editData}
									/>
					       </Drawer>
	 </div>
		);
	}
}
export default CodeClassification;
