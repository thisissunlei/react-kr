import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import {
	XTable,
	XTableRow,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	Drawer,
	Dialog
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
				cmtId:''
			},
			openNewCreat:false,
			openEdit:false,
			openView:false,
			openDele:false
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
		console.log('form11111----',form)
	}

	render() {
		
		return (
		<div className="g-group-manages">
			<Button  label="删除" onClick={this.openView} />
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
			<XTable ajaxUrlName="cluster-list" ajaxParams={this.state.searchParams}>
	            <XTableRow label="全选" type="checkbox" name="all" width={30}/>
	            <XTableRow label="群组名称" name="clusterName" width={200} tooltip="我的世界"/>
	            <XTableRow label="群组类型" name="clusterTypeName" width={100}/>
	            <XTableRow label="成员数" name="mbrCount" type="date" width={100}/>
	            <XTableRow label="所属社区" name="cmtName" type="date" width={200}/>
	            <XTableRow label="所属城市" name="city" type="date" width={100}/>
	            <XTableRow label="创建人" name="creater" type="date" width={100}/>
	            <XTableRow label="创建时间" name="createTime" type="date" width={200} />
	            <XTableRow label="操作" type="operation" width={300} component={(scope)=>{
	                    return <Button onClick={this.onClick} label={scope.signCityName} type="button"/>;
	                }} />
   			</XTable>
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
             	<EditGroup   onCancel={this.openEdit}  />
           </Drawer>
           <Drawer
             modal={true}
             width={750}
             open={this.state.openView}
             onClose={this.openView}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             	<ViewGroup  onCancel={this.openView}  />
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
