import React from 'react';
import {Http} from 'kr/Utils';
import {
	Title,
	Section,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Drawer,
	Dialog,
	Tooltip,
	KrDate,
	Message
} from 'kr-ui';
import SearchForm from './SearchForm';
import Recharge from './Recharge';
import CheckForm from './CheckForm';
import ViewIntegration from './ViewIntegration';
import GiveList from "./GiveList";
import './index.less';
export default class Integration extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			},
			openGive:false,
			openView:false,
			submitGive:false,
			itemDetail:{},
			rechargeDetail:{},
			customerName:'',
			cmtId:'',
			openList:false,

		}

	}

	
	//操作相关
  	onOperation = (type, itemDetail) => {
      this.setState({
        itemDetail
      });
      switch (type){
        case  'view':{
         this.openView();
          break;
        }
        case  'give':{
         this.openGive(itemDetail);
          break;
		}
		case 'list':{
			this.openList();
			break;
		}
      }
    }
   
	rechargeSubmit=(form)=>{
		form=Object.assign({}, form);
		this.setState({
			rechargeDetail:form
		})
		this.openGive();
		this.submitGive();
	}
	checkSubmit=()=>{
		var {itemDetail}=this.state;
		itemDetail.info=null;
		this.submitGive();
		this.setState({
			searchParams:{
				page:1,
				pageSize:15,
				time:new Date(),
			},

		})
	}
	onCloseCheck=(info)=>{
		var {itemDetail}=this.state;
		itemDetail.info=info;
		this.setState({
			itemDetail
		})
		this.submitGive();
		this.openGivetwo();


	}
	submitGive=()=>{
		this.setState({
			submitGive:!this.state.submitGive,
		})
	}
	openList=()=>{
		this.setState({
			openList:!this.state.openList,
			
		})
	}
	openGivetwo=()=>{
		this.setState({
			openGive:!this.state.openGive
		})
	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}

	openGive=()=>{
		var {itemDetail}=this.state;
		if(itemDetail.info){
			itemDetail.info=null;
			this.setState({
				itemDetail
			})
		}
		this.setState({
			openGive:!this.state.openGive
		})
	}
	searchSubmit=(form)=>{

		this.setState({
			searchParams:{
				customerName:form.content,
				cmtId:this.state.cmtId || '',
				pageSize:15,
				
			},
			customerName:form.content
			
		})

	}
	selectCommunity=(form)=>{
		var cmtId=form.id?form.id:'';
		this.setState({
			searchParams:{
				cmtId:cmtId,
				pageSize:15,
				customerName:this.state.customerName || '',

			},
			cmtId:cmtId
		})
	}
	
	
	render() {
		let {
			  itemDetail,
			  rechargeDetail,
			  info
			}=this.state;
		return (

			<div className="g-integration" >
			<Title value="积分管理"/>
				<Section title="积分列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<SearchForm onSubmit={this.searchSubmit}  onChange={this.selectCommunity}/>
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-point'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                 
					  >
				            <TableHeader>
				              <TableHeaderColumn>客户名称</TableHeaderColumn>
				              <TableHeaderColumn>所在社区</TableHeaderColumn>
				              <TableHeaderColumn>积分总数</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="customerName" ></TableRowColumn>
					                <TableRowColumn name="cmtName"></TableRowColumn>
					                <TableRowColumn name="remainPoint" ></TableRowColumn>
					                <TableRowColumn>
					                	<Button label="消费记录"  type="operation"  operation="view"/>
										<Button label="充值记录"  type="operation"  operation="list"/>
									  	<Button label="充值"  type="operation"  operation="give"/>
					                </TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
				</Section>
				
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openView}
	             onClose={this.openView}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:28,paddingBottom:48,zIndex:20}}
	           >
	             	<ViewIntegration 
	             			onCancel={this.openView} 
	             			detail={itemDetail}
	             	 />
	           </Drawer>
	           <Dialog
	              title="充值"
	              modal={true}
	              contentStyle ={{ width: 400}}
	              open={this.state.openGive}
	              onClose={this.openGive}
	            >
	           		<Recharge 
	           				detail={itemDetail} 
	           				onCancel={this.openGive} 
	           				onSubmit={this.rechargeSubmit}
	           		/>
	           </Dialog>
			   <Dialog
	              title="校验"
	              modal={true}
	              contentStyle ={{ width: 400}}
	              open={this.state.submitGive}
	              onClose={this.onCloseCheck}
	            >
	           		<CheckForm 
	           			info={rechargeDetail} 
	           			onCancel={this.onCloseCheck} 
	           			onSubmit={this.checkSubmit}
	           		/>
	            </Dialog>
	            <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openList}
	             onClose={this.openList}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:28,paddingBottom:48,zIndex:20}}
	           >
	             	<GiveList
	             			onCancel={this.openList} 
	             			detail={itemDetail}
	             	 />
	           </Drawer>
			</div>
		);
	}
}
