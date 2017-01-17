import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
	Section,
	Grid,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer
} from 'kr-ui';

import State from './State';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import NewCustomerIndent from '../NewCustomerIndent';
import SwitchPerson from '../SwitchPerson';
import QuitContinue from './QuitContinue';

import './index.less'
@observer
class Personal extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{
				page:1,
				pageSize:15
			},			
			//选中的数量
			dialogNum:0,
			//加载后的数据
			loadData:[],
			//选中的值
			arrItem:[]
		}
	}


	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchLookCustomerList();
	}

	//查看页面开关
	switchLookCustomerList=() => {
      	State.switchLookCustomerList();
	}
	//客户编辑页面开关
	switchEditCustomerList=() => {
		State.switchEditCustomerList();
	}
	//新增拜访记录的开关
	switchCustomerIndent = () =>{
		State.switchCustomerIndent();
	}
    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	State.MerchantsListId(itemDetail.id)
      	State.switchLookCustomerList();
      }
    }
	//新建提交按钮
	onNewMerchants=(params)=>{

	}

	 //选中几项领取，转移等
    onSelect=(value)=>{
    	var arrItem=[]
    	let {loadData}=this.state;
        for(var i=0;i<value.length;i++){
        	var allId=value[i];
        	arrItem.push(loadData[allId].id)
        }
      if(value.length>0){
      	State.openPersonDialog=true;
        this.setState({
         dialogNum:value.length,
         arrItem
        })	
      }else{
        State.openPersonDialog=false;
      }
    }

    //加载所有数据
    onLoaded=(value)=>{
       let loadData = value.list;
	   this.setState({
			 loadData
		 })
    }

    //领取浮框的关闭
    merClose=()=>{
       State.openPersonDialog=false; 	
    }

	//搜索
	onSearchSubmit=(params)=>{
		console.log('gggggg',params);
        let obj = {
			company: params.content,
		}
		this.setState({
			searchParams: obj
		});
	}
    //转移确定
     switchPersonSubmit=(params)=>{
       let {arrItem}=this.state;
       var switchData={
         receiveId:params.receiveId,
         ids:arrItem
       }
       State.switchSureSubmit(switchData);
    }
	//高级查询
	openSearchUpperDialog=()=>{
      State.searchUpperCustomer();
	}
	//高级查询提交
     onSearchUpperSubmit=(value)=>{
      	this.setState({
      	  searchParams:value
      	})
      	State.searchUpperCustomer();
     }
	//导出
	onExport=(value)=>{
	    State.exportData(value);	
	}

	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}

	//转移客户
	openSwitchDialog=()=>{
		State.openSwitchGoDialog();
	}
	//取消客户跟进
	openQuitDialog=()=>{
        State.openQuitContinue();
	}
	//取消跟进确定
	quitContinueSubmit=()=>{
		let {arrItem}=this.state;
		State.quitSubmit(arrItem);
	}
    
	render(){
		let {dataReady,searchParams}=this.props;

       var blockStyle={};
      if(State.openPersonDialog==true){
        blockStyle={
        	display:'inline-block'
        }
      }else{
      	blockStyle={
        	display:'none'
        }
      }

		return(

      <div className="m-personal" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <div style={{marginRight:20,display:'inline-block'}}><Button  label="转移" type="button" onTouchTap={this.openSwitchDialog}/></div>
      		  <Button  label="取消跟进" type="button" cancle={true} style={{height:29,minWidth:80}} onTouchTap={this.openQuitDialog}/>
      		  <span className='mer-close' onClick={this.merClose}></span>
      		</div>
	        <Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left'}}
					   >
						<Button
								label="新建客户"
								type='button'
								onTouchTap={this.switchNewMerchants}
						/>
					  </Col>

			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' onSubmit={this.onSearchSubmit} nameFlag='123'/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	        </Row>

            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            exportSwitch={true}
	            onSelect={this.onSelect}
	            onLoaded={this.onLoaded}
	            onExport={this.onExport}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='personalCustomers'
	            ajaxFieldListName="list"
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>意向城市</TableHeaderColumn>
		              <TableHeaderColumn>意向社区</TableHeaderColumn>
		              <TableHeaderColumn>意向工位数</TableHeaderColumn>
		              <TableHeaderColumn>来源</TableHeaderColumn>
		              <TableHeaderColumn>客户分类</TableHeaderColumn>
		              <TableHeaderColumn>领取人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody >
			              <TableRow displayCheckbox={true}>
			                <TableRowColumn name="customerCompany" ></TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn name="intentionCommunityName"></TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName"></TableRowColumn>
			                <TableRowColumn name="levelName"></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="createDate"></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="查看"  type="operation"  operation="watch" />
			                 </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
           </Table>


					{/*新建*/}
					<Drawer
				        open={State.openNewMerchants}
				        width={700}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:228,zIndex:20}}
			        >
								<NewCustomerList
										onSubmit={this.onNewMerchants}
										onCancel={this.switchNewMerchants}
										dataReady={dataReady}
										come={"2"}
								/>

		           </Drawer>


					{/*查看*/}
					<Drawer
							open={State.openLookMerchants}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
							<LookCustomerList
				                 comeFrom="Personal"
								 onCancel={this.switchLookCustomerList}
				                 listId={State.listId}
				                 dataReady={dataReady}
				                 editsSwitch={this.switchEditCustomerList}
				                 IndentSwitch={this.switchCustomerIndent}
							/>
					</Drawer>

                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666'}}
					>
						<SearchUpperForm  
						    onCancel={this.openSearchUpperDialog}
						    onSubmit={this.onSearchUpperSubmit}
						    flag='个人'
						    searchParams={searchParams}
						/>
				    </Dialog>

				     {/*转移*/}
                    <Dialog
						title="转移客户"
						modal={true}
						onClose={this.openSwitchDialog}
						open={State.openSwitch}
						contentStyle ={{ width: '444',height:'284'}}
					>
						<SwitchPerson 
						  onSubmit={this.switchPersonSubmit}
						  onCancel={this.openSwitchDialog}
						  customerIds={this.state.dialogNum}
						/>
				    </Dialog>

				     {/*取消跟进*/}
                    <Dialog
						title="取消客户跟进"
						modal={true}
						onClose={this.openQuitDialog}
						open={State.openQuit}
						contentStyle ={{ width: '445',height:'230'}}
					>
						<QuitContinue 
						  onSubmit={this.quitContinueSubmit} 
						  onCancel={this.openQuitDialog}
						  />
				    </Dialog>



					{
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants||
							State.openEditCustomerList||
							State.openNewCustomerIndent
						)&&
							<div className="mask"
								onClick={this.closeAllMerchants}
							>
							</div>
					}
        </div>
		);
	}

}
export default Personal;
