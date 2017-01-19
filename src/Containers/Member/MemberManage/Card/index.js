import React, { Component } from 'react';
import ImportCard from './ImportCard';
import UsingCard from './UsingCard';
import DeleteCard from './DeleteCard';
import ViewCard from './ViewCard';
import { Title,Dialog, Section,Grid,Row,Col, ListGroup,ListGroupItem,Form, KrField, Table,SearchForms, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter, Button, } from 'kr-ui';
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
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				jobId:'',
				companyId:0,
				cityId:'',
				type:'COMP_NAME',
				value:'',
				status:false,
			}
		}
    }
    onSearchSubmit=(value)=>{
    	console.log('value',value);
    }
    openImportCardDialog=()=>{
    	this.setState({
    		openImportCard:!this.state.openImportCard
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
    deleteItem(item){
    	this.setState({
    		item:item
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
		        value: 1
		    },
		    {
		        label: '社区',
		        value: 2
		    },
		    {
		        label: '领用人',
		        value: 3
		    },
		    {
		        label: '客户名称',
		        value: 4
		    },
		]


        return (

            <div >
				<Section title="会员卡管理" description="" style={{minHeight:'920px'}}>
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row >
						<Col  align="left" style={{marginLeft:0,float:'left'}}> <Button label="入库" type='button' joinEditForm onTouchTap={this.openImportCardDialog}  /> </Col>
						<Col  align="left" style={{marginLeft:20,float:'left'}}> <Button label="领用" type='button' joinEditForm onTouchTap={this.openUsingCardDialog}  /> </Col>
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
							ajaxUrlName='membersList'
							ajaxParams={this.state.searchParams}
						>
						<TableHeader>
							<TableHeaderColumn>卡号</TableHeaderColumn>
							<TableHeaderColumn>社区</TableHeaderColumn>
							<TableHeaderColumn>领用状态</TableHeaderColumn>
							<TableHeaderColumn>领用人</TableHeaderColumn>
							<TableHeaderColumn>客户</TableHeaderColumn>
							<TableHeaderColumn>销售状态</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody style={{position:'inherit'}}>
							<TableRow displayCheckbox={true}>
							<TableRowColumn name="phone"></TableRowColumn>
							<TableRowColumn name="name"></TableRowColumn>
							<TableRowColumn name="checkStatus" options={[{label:'true',value:'true'},{label:'false',value:'false'}]}
							component={(value,oldValue,itemData)=>{
								var fontColor="";
								if(value=="true"){
									return (
										<span>已领用</span>
									)
								}else if(value=="false"){
									return (
										<span>未领用</span>
									)
								}
								}}></TableRowColumn>
							<TableRowColumn name="email"></TableRowColumn>
							<TableRowColumn name="jobName"></TableRowColumn>
							<TableRowColumn name="cityName"></TableRowColumn>
							<TableRowColumn name='checkStatus'
								options={[{label:'isLeader',value:'true'},{label:'setLeader',value:'false'}]}
								component={(value,oldValue,itemData)=>{
								var fontColor="";
								if(value=="isLeader"){
									return (
										<Button label="查看"  type="operation" onTouchTap={this.getDetailData.bind(this,itemData)}/>
									)
								}else if(value=="setLeader"){
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
					<ImportCard onSubmit={this.onAdvanceSearchSubmit} onCancel={this.openImportCardDialog} />
			    </Dialog>
			    <Dialog
					title="会员卡领用"
					modal={true}
					open={this.state.openUsingCard}
					onClose={this.openUsingCardDialog}
					contentStyle={{width:480}}
				>
					<UsingCard onSubmit={this.onAdvanceSearchSubmit} onCancel={this.openUsingCardDialog} />
			    </Dialog>
			    <Dialog
					title="删除"
					modal={true}
					open={this.state.openDelete}
					onClose={this.openDeleteDialog}
					contentStyle={{width:400}}
				>
					<DeleteCard onSubmit={this.onAdvanceSearchSubmit} onCancel={this.openDeleteDialog} />
			    </Dialog>
			    <Dialog
					title="查看"
					modal={true}
					open={this.state.openView}
					onClose={this.openViewDialog}
					contentStyle={{width:400}}
				>
					<ViewCard onSubmit={this.onAdvanceSearchSubmit} onCancel={this.openViewDialog} detail={this.state.detailItem}/>
			    </Dialog>
			</div>
            );

    }

}
