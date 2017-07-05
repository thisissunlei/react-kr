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
import Recharge from './Recharge';
import CheckForm from './CheckForm';
import ViewIntegration from './ViewIntegration';
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
			rechargeDetail:{}

		}

	}

	componentDidMount() {
		var _this=this;
		
		
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
		this.submitGive();
		this.setState({
			searchParams:{
				page:1,
				pageSize:15,
				time:new Date(),
			}
		})
	}
	onCloseCheck=()=>{
		this.submitGive();
		this.openGive();
	}
	submitGive=()=>{
		this.setState({
			submitGive:!this.state.submitGive
		})

	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}

	openGive=()=>{
		this.setState({
			openGive:!this.state.openGive
		})
	}
	
	
	render() {
		let {
			  itemDetail,
			  rechargeDetail
			}=this.state;
		return (

			<div className="g-integration" >
			<Title value="积分管理"/>
				<Section title="公告列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<Button
								label="充值"
								type='button'
								onTouchTap={this.openGive}
							/>
						<Button
								label="查看"
								type='button'
								onTouchTap={this.openView}
							/>
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='notice-list'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                 
					  >
				            <TableHeader>
				              <TableHeaderColumn>客户名称</TableHeaderColumn>
				              <TableHeaderColumn>所在社区</TableHeaderColumn>
				              <TableHeaderColumn>会员数</TableHeaderColumn>
				              <TableHeaderColumn>积分总数</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="customerName" ></TableRowColumn>
					                <TableRowColumn name="cmtName"></TableRowColumn>
					                <TableRowColumn name="memberQuantity" ></TableRowColumn>
					                <TableRowColumn name="remainPoint" ></TableRowColumn>
					                <TableRowColumn>
					                	<Button label="消费记录"  type="operation"  operation="view"/>
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
	              contentStyle ={{ width: 400,overflow:'visible'}}
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
	              contentStyle ={{ width: 400,overflow:'visible'}}
	              open={this.state.submitGive}
	              onClose={this.onCloseCheck}
	            >
	           		<CheckForm 
	           			info={rechargeDetail} 
	           			onCancel={this.onCloseCheck} 
	           			onSubmit={this.checkSubmit}
	           		/>
	            </Dialog>
	            
			</div>
		);
	}
}
