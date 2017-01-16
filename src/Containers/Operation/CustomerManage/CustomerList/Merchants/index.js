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
import SearchForm from '../SearchForms';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import './index.less'
@observer
class Merchants extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{
				page:1,
				pageSize:15
			},
			//控制复选框的选中与否
			openDialog:false,
			//选中的数量
			dialogNum:0
		}
	}


	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchNewCustomerList();
	}
    
    //选中几项领取，转移等
    onSelect=(value)=>{
      if(value.length>0){
        this.setState({
         openDialog:true,
         dialogNum:value.length	
        })	
      }else{
      	this.setState({
         openDialog:false,
        })	
      }
    }
    //领取浮框的关闭
    merClose=()=>{
        this.setState({
         openDialog:false,
        })		
    }

    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	State.switchLookCustomerList();
      }
    }
	//新建提交按钮
	onNewMerchants=(params)=>{

	}
	
	//搜索
	onSearchSubmit=(params)=>{
		console.log('bbbbb',params);
        let obj = {
			company: params.content,
		}
		this.setState({
			searchParams: obj
		});
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


	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}

	render(){
      
      let {dataReady,searchParams}=this.props;
      var blockStyle={};
      if(this.state.openDialog==true){
        blockStyle={
        	display:'inline-block'
        }
      }else{
      	blockStyle={
        	display:'none'
        }
      }
      
		return(
      <div className="m-merchants" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <Button  label="领取" type="button"/>
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
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	        </Row>

            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            onSelect={this.onSelect}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='shareCustomers'
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
			              <TableRow >
			                <TableRowColumn name="customerCompany" ></TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn name="intentionCommunityName"></TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName"></TableRowColumn>
			                <TableRowColumn name="levelName"></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="receiveTime" type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
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
								/>

		           </Drawer>


					{/*查看*/}
					<Drawer
							open={State.openLookMerchants}
							width={700}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
								<LookCustomerList
				                 dataReady={dataReady}						
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
						    flag='招商'
						    searchParams={searchParams}
						/>
				    </Dialog>


					{
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants
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
export default Merchants;
