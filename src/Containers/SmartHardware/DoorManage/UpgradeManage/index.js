import React from 'react';
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
	Grid,
	Row,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import NewCreateUpgrade from './NewCreateUpgrade';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
		}
	}

	componentDidMount(){
		State.getDicOptions();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		State.itemDetail = itemDetail;
		let _this = this;
		if (type == 'delete') {
			_this.closeConfirmDeleteFun();
		}
	}

	//确认删除提示窗口是否打开
	closeConfirmDeleteFun =()=>{
		State.closeConfirmDelete = !State.closeConfirmDelete
	}

	//确认删除
	confirmDelete = ()=>{
		State.confirmDeleteAction();
		this.closeConfirmDeleteFun();
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}


	openNewCreateUpgradeDialog=()=>{
		State.openNewCreateUpgrade = !State.openNewCreateUpgrade;
	}
	render() {
		let {
			list,seleced
		} = this.state;
		
		return (
		    <div className="member-list-div" style={{minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="升级包管理"/>
				<Section title={`升级包管理`} description="" >
					<div>
						<Button label="新增"  onTouchTap={this.openNewCreateUpgradeDialog} className="button-list"/>
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
						onOperation={this.onOperation}
						ajaxFieldListName='items'
						ajaxUrlName='upgradeInfoListUrl'
						ajaxParams={State.upgradeListParams}
						onPageChange={this.onPageChange}
						displayCheckbox={false}
					>
						<TableHeader>
							<TableHeaderColumn>创建时间</TableHeaderColumn>
							<TableHeaderColumn>升级类型</TableHeaderColumn>
							<TableHeaderColumn>升级包地址</TableHeaderColumn>
							<TableHeaderColumn>版本信息</TableHeaderColumn>
							<TableHeaderColumn>版本编号</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
							
						</TableHeader>
						<TableBody style={{position:'inherit'}}>
							<TableRow>

							<TableRowColumn name="ctime" type="date" format="yyyy-mm-dd HH:MM:ss">
							</TableRowColumn>

							<TableRowColumn name="upgradeTypeName"
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>

							<TableRowColumn name="url"
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>
							
							<TableRowColumn name="version"
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							 ></TableRowColumn>

							 <TableRowColumn name="versionCode"
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							 ></TableRowColumn>

							<TableRowColumn type="operation">
								<Button  label="删除"  type="operation" operation="delete"/>
							</TableRowColumn>

						</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
					<Dialog
			          title="新增升级包"
			          open={State.openNewCreateUpgrade}
			          onClose={this.openNewCreateUpgradeDialog}
			          contentStyle={{width:687}}
			        >
			          <NewCreateUpgrade
			            onCancel={this.openNewCreateUpgrade}
			            style ={{paddingTop:'35px'}}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			          />
			        </Dialog>
			        <Dialog
			          title="删除升级版本提示"
			          open={State.closeConfirmDelete}
			          onClose={this.closeConfirmDeleteFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除升级版本吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmDelete} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeConfirmDeleteFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                </Row>
			            </Grid>
			          </div>
		        	</Dialog>
				</Section>
			</div>
		);

	}

}
