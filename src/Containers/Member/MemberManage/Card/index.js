import React, { Component } from 'react';
import {Actions,Store} from 'kr/Redux';
import ImportCard from './ImportCard';
import UsingCard from './UsingCard';
import DeleteCard from './DeleteCard';
import ViewCard from './ViewCard';
import ChangeCard from './ChangeCard';
import { Title,Message,Dialog, Section,Grid,Row,Col, ListGroup,ListGroupItem,Form, KrField, Table,SearchForms, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter, Button, } from 'kr-ui';
export default class Card extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
			openImportCard: false,
			openUsingCard:false,
			item:{},
			detailItem:{},
			openDelete:false,
			openView:false,
			openChange:false,
			searchParams: {
				page: 1,
				pageSize: 15,
				type:'CARD',
				value:'',
			}
		}
    }
    onSearchSubmit=(value)=>{
    	let params = {
	        type: value.filter,
	        value:value.content,
	        page:1,
	        pageSize:15,
	        time:new Date().getTime()
	    }
	    this.setState({
	    	searchParams:params
	    })
    	console.log('value',value);
    }
    openImportCardDialog=()=>{
    	this.setState({
    		openImportCard:!this.state.openImportCard
    	})
    }
    openChangeDialog=()=>{
    	this.setState({
    		openChange:!this.state.openChange
    	})
    }
    openUsingCardDialog=()=>{
    	this.setState({
    		openUsingCard:!this.state.openUsingCard
    	})
    }
    openViewDialog=()=>{
    	this.setState({
    		openView:!this.state.openView
    	})
    }
    openDeleteDialog=()=>{
    	this.setState({
    		openDelete:!this.state.openDelete
    	})
    }
    submitUsingCardDialog=()=>{
    	let {searchParams} = this.state;
    	let params = {
	        type: searchParams.type,
	        value:searchParams.value,
	        page:searchParams.page,
	        pageSize:15,
	        time:new Date().getTime()
	    }
	    Message.success("操作成功");
	    this.setState({
	    	searchParams:params,
	    	openUsingCard:!this.state.openUsingCard
	    })
    }
    onCardSubmit=()=>{
    	let {searchParams} = this.state;
    	let params = {
	        type: searchParams.type,
	        value:searchParams.value,
	        page:searchParams.page,
	        pageSize:15,
	        time:new Date().getTime()
	    }
	    Message.success("操作成功");
	    this.setState({
	    	searchParams:params,
	    	openImportCard:!this.state.openImportCard
	    })
    }
    submitDeleteDialog=()=>{
    	let {searchParams} = this.state;
    	let params = {
	        type: searchParams.type,
	        value:searchParams.value,
	        page:searchParams.page,
	        pageSize:15,
	        time:new Date().getTime()
	    }
	    Message.success("操作成功");
	    this.setState({
	    	searchParams:params,
	    	openDelete:!this.state.openDelete
	    })
    }
    deleteItem(item){
    	this.setState({
    		detailItem:item
    	},function(){
    		this.openDeleteDialog()
    	})
    }
    getDetailData(item){
    	this.setState({
    		detailItem:item
    	},function(){
    		this.openViewDialog()
    	})
    }

    render() {
    	let options = [
		    {
		        label: '卡号',
		        value: 'CARD'
		    },
		    {
		        label: '社区',
		        value: 'COMMUNITY'
		    },
		    {
		        label: '领用人',
		        value: 'RECEIVE'
		    },
		    {
		        label: '客户名称',
		        value: 'CUSTOMER'
		    },
		]


        return (

            <div >
				<Section title="会员卡管理" description="" style={{minHeight:'920px'}}>
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row >
						<Col  align="left" style={{marginLeft:0,float:'left'}}> <Button label="入库" type='button'  onTouchTap={this.openImportCardDialog}  /> </Col>
						<Col  align="left" style={{marginLeft:20,float:'left'}}> <Button label="领用" type='button'  onTouchTap={this.openUsingCardDialog}  /> </Col>
						<Col  align="left" style={{marginLeft:20,float:'left'}}> <Button label="转移" type='button'  onTouchTap={this.openChangeDialog}  /> </Col>
						<Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
							<ListGroup>
								<ListGroupItem> <SearchForms placeholder='请输入' searchFilter={options} onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
							</ListGroup>
						</Col>
						</Row>
					</Grid>
					<Table
						className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							onOperation={this.onOperation}
							ajaxFieldListName='items'
							ajaxUrlName='memberCardList'
							ajaxParams={this.state.searchParams}
						>
						<TableHeader>
							<TableHeaderColumn>卡号</TableHeaderColumn>
							<TableHeaderColumn>社区</TableHeaderColumn>
							<TableHeaderColumn>领用状态</TableHeaderColumn>
							<TableHeaderColumn>领用人</TableHeaderColumn>
							<TableHeaderColumn>客户</TableHeaderColumn>
							{/*<TableHeaderColumn>销售状态</TableHeaderColumn>*/}
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>
						<TableBody style={{position:'inherit'}}>
							<TableRow displayCheckbox={true}>
							<TableRowColumn name="foreignCode"></TableRowColumn>
							<TableRowColumn name="communityName" 
								component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}></TableRowColumn>
							<TableRowColumn name="receiveStatus"
							component={(value,oldValue,itemData)=>{
								var fontColor="";
								if(value!="UNRECEIEVE"){
									return (
										<span>已领用</span>
									)
								}else{
									return (
										<span>未领用</span>
									)
								}
								}}></TableRowColumn>
							<TableRowColumn name="receiveName"
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}></TableRowColumn>
							<TableRowColumn name="customerName" 
								component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}></TableRowColumn>
							{/*<TableRowColumn name="sellStatus" 
								component={(value,oldValue,itemData)=>{
								var fontColor="";
								if(value=="UNSELL"){
									return (
										<Button label="未销售"  type="operation" onTouchTap={this.getDetailData.bind(this,itemData)}/>
									)
								}else{
									return (
										<Button label="已销售"  type="operation" onTouchTap={this.deleteItem.bind(this,itemData)}/>
									)
								}
								}}></TableRowColumn>*/}
							<TableRowColumn name='receiveStatus'
								component={(value,oldValue,itemData)=>{
								var fontColor="";
								if(value!="UNRECEIEVE"){
									return (
										<Button label="查看"  type="operation" onTouchTap={this.getDetailData.bind(this,itemData)}/>
									)
								}else{
									return (
										<Button label="删除"  type="operation" onTouchTap={this.deleteItem.bind(this,itemData)}/>
									)
								}
								}}>
									
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>
				<Dialog
					title="会员卡入库"
					modal={true}
					open={this.state.openImportCard}
					onClose={this.openImportCardDialog}
					contentStyle={{width:480}}
				>
					<ImportCard onSubmit={this.onCardSubmit} onCancel={this.openImportCardDialog} />
			    </Dialog>
			    <Dialog
					title="会员卡领用"
					modal={true}
					open={this.state.openUsingCard}
					onClose={this.openUsingCardDialog}
					contentStyle={{width:480}}
				>
					<UsingCard onSubmit={this.submitUsingCardDialog} onCancel={this.openUsingCardDialog} />
			    </Dialog>
			    <Dialog
					title="删除"
					modal={true}
					open={this.state.openDelete}
					onClose={this.openDeleteDialog}
					contentStyle={{width:400}}
				>
					<DeleteCard onSubmit={this.submitDeleteDialog} onCancel={this.openDeleteDialog} detail={this.state.detailItem}/>
			    </Dialog>
			    <Dialog
					title="查看"
					modal={true}
					open={this.state.openView}
					onClose={this.openViewDialog}
					contentStyle={{width:400}}
				>
					<ViewCard onSubmit={this.openViewDialog} onCancel={this.openViewDialog} detail={this.state.detailItem}/>
			    </Dialog>
			    <Dialog
					title="转移"
					modal={true}
					open={this.state.openChange}
					onClose={this.openChangeDialog}
					contentStyle={{width:400}}
				>
					<ChangeCard onSubmit={this.openViewDialog} onCancel={this.openChangeDialog}/>
			    </Dialog>
			</div>
            );

    }

}
