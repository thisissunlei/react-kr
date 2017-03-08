import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	initialize,
	reset
} from 'redux-form';
import {
	observer
} from 'mobx-react';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	Notify,
	SearchForms,
	Button,
	KrField,
	Form,
	Loading,
	BreadCrumbs,
	Title,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';

import './index.less'
import State from './State';
import NewCommunityList from './NewCommunityList'; 
import EditCommunityList from './EditCommunityList'; 
import SearchUpperForm from './SearchUpperForm'; 
@observer
class CommunityList  extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			
		}
	}

   //新建社区开关
   openAddCommunity=()=>{
      State.switchNewCommunityList();
   }
   //新建社区提交
   onNewCommunitySubmit=(value)=>{
   	   console.log('---00000--',value);
   	   delete value.local;
   	   var brights=[];
   	    value.bright1.map((item,index)=>{
   	   	 if(item.type&&item.brightPoints){
           brights.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	     })
   	    value.bright2.map((item,index)=>{
   	   	 if(item.type&&item.brightPoints){
           brights.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	   })
   	    value.bright3.map((item,index)=>{
   	   	 if(item.type&&item.brightPoints){
           brights.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	   })
   	    value.bright4.map((item,index)=>{
   	   	 if(item.type&&item.brightPoints){
           brights.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	   })
   	    if(value.bright5){
   	      brights.push({type:'TRANSPORTATION',brightPoints:value.bright5.brightPoints});
   	    }
   	    if(value.bright6){	    	
   	      brights.push({type:'PERIMETER',brightPoints:value.bright6.brightPoints});
   	    }
   	    delete value.bright1;
   	    delete value.bright2;
   	    delete value.bright3;
   	    delete value.bright4;
   	    delete value.bright5;
   	    delete value.bright6;
   	    value.brights=brights;
   	    State.onNewCommunitySubmit(value);
   }
   //查询
   onSearchSubmit=(params)=>{
   	  let obj = {
			searchKey: params.content,
			searchType:params.filter
		}	
		State.searchParams=obj	
   }

   //编辑
   onOperation=(type,itemDetail)=>{
      if(type=='watch'){
      	 State.getEditCustomerList(itemDetail.id);
      	 State.switchEditList();
      }
   }

   switchEditList=()=>{
   	   State.switchEditList();
   }
   
   //高级查询
	openSearchUpperDialog=()=>{
	  State.searchDataHere();
      State.searchParams.opened='';
      State.searchParams.openDateEnd='';
      State.searchParams.openDateBegin='';
      State.searchParams.businessAreaId='';
      State.searchParams.portalShow='';
      State.searchParams.cityId='';
      State.searchParams.countyId='';
      State.searchParams.searchKey='';
      State.searchParams.searchType='';
      State.searchUpperCustomer();
      
	}


	componentDidMount(){
		
	}

   //高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({},State.searchParams, searchParams);
     	searchParams.time=+new Date();
		if(searchParams.openDateBegin!=''&&searchParams.openDateEnd!=''&&searchParams.openDateEnd<searchParams.openDateBegin){
			 Message.error('开始时间不能大于结束时间');
	         return ;
		}
		if(searchParams.openDateBegin==''&&searchParams.openDateEnd!=''){
			searchParams.openDateBegin=searchParams.openDateEnd
		}
		if(searchParams.openDateBegin!=''&&searchParams.openDateEnd==''){
			searchParams.openDateEnd=searchParams.openDateBegin
		}
      	
      	State.searchParams=searchParams;
      	State.searchUpperCustomer();
     }
     
     //导出
	onExport=(values)=> {
		let {searchParams} = State;
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/cmt/community/export?searchParams=${searchParams}&ids=${ids}`
		window.location.href = url;
	}


	render(){

		let searchFilter=[
            {
            	label:'社区名称',
            	value:'NAME'
            },
            {
            	label:'社区编码',
            	value:'CODE'
            },

		]

        let {cityNull}=this.state;

		return(

			<div className='community-list'>
				<Title value="社区列表"/>
				<Section title="社区排序" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<Button
											label="新建社区"
											type='button'
											onTouchTap={this.openAddCommunity}
									/>
					  </Col>
           
                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入关键字' searchFilter={searchFilter} onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
			    onExport={this.onExport}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='communitySearch'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>社区名编码</TableHeaderColumn>
		              <TableHeaderColumn>所属城市</TableHeaderColumn>
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
		              <TableHeaderColumn>社区排序</TableHeaderColumn>
		              <TableHeaderColumn>官网显示状态</TableHeaderColumn>
		              <TableHeaderColumn>开业时间</TableHeaderColumn>
		              <TableHeaderColumn>社区面积m</TableHeaderColumn>
		              <TableHeaderColumn>开业状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="code"></TableRowColumn>
			                <TableRowColumn name="cityName"></TableRowColumn>
			                <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="orderNum"></TableRowColumn>
			                <TableRowColumn name="portalShow" options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="openDate"></TableRowColumn>
			                <TableRowColumn name="area"></TableRowColumn>
			                <TableRowColumn name="opened" options={[{label:'已开业',value:'true'},{label:'未开业',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="watch" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>

                   {/*新建*/}
					<Drawer
				        open={State.openNewCommunity}
				        width={750}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						<NewCommunityList
								onSubmit={this.onNewCommunitySubmit}
								onCancel={this.openAddCommunity}
								open={State.openNewCommunity}
						/>

		            </Drawer>

		             {/*编辑*/}
					<Drawer
				        open={State.openEditCommunity}
				        width={750}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						<EditCommunityList
								onSubmit={this.onNewCommunitySubmit}
								onCancel={this.switchEditList}
								open={State.openEditCommunity}
						/>

		            </Drawer>
 
                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						operType="SHARE"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666',height:'458px',overflow:'visible'}}
					>
						<SearchUpperForm  
						    onCancel={this.openSearchUpperDialog}
						    onSubmit={this.onSearchUpperSubmit}
						/>
				    </Dialog>


       
       </Section>

	 </div>
	 );
	}

}

export default CommunityList
