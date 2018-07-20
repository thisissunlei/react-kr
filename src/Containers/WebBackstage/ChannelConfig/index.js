
import React from 'react';

import {Http,DateFormat} from 'kr/Utils';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
    TableRowColumn,
    TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Notify,
	CheckPermission,
	Tooltip,
	Grid,
	Row,
	ListGroup,
	ListGroupItem

} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';

import NewCreate from './NewCreate';
import EditForm from './EditForm';
import './index.less';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer
export default class Channel extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
            realPage:1,
			itemDetail : {}
		}
    }
	componentDidMount(){

    }
    onPageChange=(page)=>{
        var houseConifigListParams = Object.assign({},State.houseConifigListParams);
		houseConifigListParams.page = page;
        State.houseConifigListParams = houseConifigListParams;
        State.page = page;
	}
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
    }
	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
    }
	editList=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openEditDialog = true;
		})
    }
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}
	onClickDelete=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openConfirmDelete = true;
		})
    }
	confirmDelete=()=>{
        let {itemDetail} = this.state;
		State.deleteChannelConfig(itemDetail.id)
	}
	openDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}
	render() {
        let {itemDetail} = this.state;
		return (
			    <div className='house-config-box'>
					<Title value="渠道接口配置"/>
					<Section title={`渠道接口配置`} description="" >
						<div>
							<Button label="新增"  onTouchTap={this.openNewCreateDialog}/>
						</div>
						<Table
							className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
							}}
							exportSwitch={false}
							ajaxFieldListName='items'
                            ajaxUrlName='channel-list'
                            ajaxParams={State.channelConfigListParams}
                            onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								<TableHeaderColumn>渠道名称</TableHeaderColumn>
								<TableHeaderColumn>渠道来源</TableHeaderColumn>
								<TableHeaderColumn>传参姓名</TableHeaderColumn>
								<TableHeaderColumn>传参电话</TableHeaderColumn>
								<TableHeaderColumn>传参社区</TableHeaderColumn>
								<TableHeaderColumn>社区ID</TableHeaderColumn>
								<TableHeaderColumn>传参规则(社区)</TableHeaderColumn>
                                <TableHeaderColumn>传参次数</TableHeaderColumn>
                                <TableHeaderColumn>传参城市</TableHeaderColumn>
                                <TableHeaderColumn>操作</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
		              			<TableRowColumn name="sourceKey" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="csrSourceName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="matchName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="matchPhone" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="matchCommunityName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                               <TableRowColumn name="matchCommunityId" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="matchCommunitySplit" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="parsingNum" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="matchCityName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn type="operation"
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
                                                <div>
                                                    <Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value)}/>
                                                    <Button  label="删除"  type="operation" operation="delete" onTouchTap={this.onClickDelete.bind(this,value,itemData)}/>
                                                </div>
											)
										}
									}
								> 
								</TableRowColumn>
							 </TableRow>
						</TableBody>
                        <TableFooter></TableFooter>
						</Table>
						<Dialog
				            title="新建"
				            open={State.openNewCreate}
				            onClose={this.openNewCreateDialog}
				            contentStyle={{width:410}}
				        >
					        <NewCreate
					            onCancel={this.openNewCreateDialog}
					            style ={{paddingTop:'35px'}}
					        />
			       		</Dialog>
			       		<Dialog
				            title="删除提示"
				            open={State.openConfirmDelete}
				            onClose={this.openDeleteFun}
				            contentStyle={{width:443,height:236}}
				        >
				        <div style={{marginTop:45}}>
				            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
				            <Grid style={{marginTop:60,marginBottom:'4px'}}>
				                <Row>
				                    <ListGroup>
				                        <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
				                            <Button  label="确定" type="submit" onClick={this.confirmDelete} />
				                        </ListGroupItem>
				                        <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
				                            <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openDeleteFun} />
				                        </ListGroupItem>
				                    </ListGroup>
				                </Row>
				            </Grid>
				        </div>
				        </Dialog>
				        <Dialog
				            title="编辑"
				            open={State.openEditDialog}
				            onClose={this.openEditDialogFun}
				            contentStyle={{width:410}}
				        >
				        <EditForm
				            detail={itemDetail}
				            closeEditEquipment = {this.openEditDialogFun}
				        />
				        </Dialog>
					</Section>
				</div>
		);

	}

}
