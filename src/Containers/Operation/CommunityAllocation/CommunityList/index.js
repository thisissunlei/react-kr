import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import dateFormat from 'dateformat';
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
	KrDate,
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
import WatchCommunityList from './WatchCommunityList'; 

import cityData from "../../../../Components/KrField/CityComponent/State";
@observer
class CommunityList  extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			id:''
		}
	}

   //新建社区开关
   openAddCommunity=()=>{
   	  cityData.city="请选择";
   	  State.searchDataHere();
      State.switchNewCommunityList();
   }
   //新建社区关闭
   cancelAddCommunity=()=>{
   	  State.switchNewCommunityList(); 
   }
   //新建社区提交
   onNewCommunitySubmit=(value)=>{ 	
        console.log('ooohhhhh',value);
   	    value = Object.assign({},value);
   	    var brightsStr=[];

   	    if(value.bright1){
   	      value.bright1.map((item,index)=>{
   	   	 if(item){
           brightsStr.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	     })
   	     delete value.bright1;	
   	    }
            
   	    if(value.bright2){
   	       value.bright2.map((item,index)=>{
   	   	  if(item){
             brightsStr.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	     })
   	     delete value.bright2;	
   	    }

   	    if(value.bright3){
   	      value.bright3.map((item,index)=>{
   	   	 if(item){
           brightsStr.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	     })
   	      delete value.bright3;	
   	    }

   	    if(value.bright4){
   	      value.bright4.map((item,index)=>{
   	   	  if(item){
           brightsStr.push({type:item.type,brightPoints:item.brightPoints})
   	   	  }
   	     })
   	      delete value.bright4;	
   	    }

   	    if(value.bright5){
   	      brightsStr.push({type:'TRANSPORTATION',brightPoints:value.bright5.brightPoints});
   	      delete value.bright5;
   	    }
   	    if(value.bright6){	    	
   	      brightsStr.push({type:'PERIMETER',brightPoints:value.bright6.brightPoints});
   	      delete value.bright6;
   	    } 
   	    if(brightsStr.length!=0){
   	       value.brightsStr=JSON.stringify(brightsStr); 
   	    }     
   	      value.wherefloorsStr=JSON.stringify(value.wherefloors);
   	      delete value.wherefloors;
   	      
   	    if(value.porTypes){
   	      value.porTypesStr=JSON.stringify(value.porTypes); 
   	      delete value.porTypes;
   	    } 
   	      delete value.brights;

          delete value.photos;

         value.openDate=dateFormat(value.openDate,"yyyy-mm-dd hh:MM:ss");
         value.signStartDate=dateFormat(value.signStartDate,"yyyy-mm-dd hh:MM:ss");
         value.signEndDate=dateFormat(value.signEndDate,"yyyy-mm-dd hh:MM:ss");
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

   //查看
   onOperation=(type,itemDetail)=>{
      if(type=='watch'){
      	 State.getEditList(itemDetail.id)
      	 State.switchWatchList();
      }
       if(type=='edit'){
      	 this.setState({
      	 	id:itemDetail.id
      	 })
      	  State.searchDataHere();
          State.switchEditList();
      }
   }

   //查看取消
   switchCancelWatchList=()=>{
     State.switchWatchList(); 
   }
   //编辑取消
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
      cityData.city="请选择";
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
            if(!searchParams.searchKey){
               searchParams.searchKey='';
            }
            if(!searchParams.opened){
               searchParams.opened='';
            }
            if(!searchParams.openDateEnd){
               searchParams.openDateEnd='';
            }
            if(!searchParams.openDateBegin){
               searchParams.openDateBegin='';
            }
            if(!searchParams.businessAreaId){
               searchParams.businessAreaId='';
            }
            if(!searchParams.portalShow){
               searchParams.portalShow='';
            }
            if(!searchParams.cityId){
               searchParams.cityId='';
            }
            if(!searchParams.countyId){
               searchParams.countyId='';
            }
            if(!searchParams.searchType){
               searchParams.searchType='';
            }


			let ids = [];
			if (values.length != 0) {
				values.map((item, value) => {
					ids.push(item.id)
				});
			}
			var url = `/api/krspace-finance-web/cmt/community/export?searchType=${searchParams.searchType}&searchKey=${searchParams.searchKey}&cityId=${searchParams.cityId}&opened=${searchParams.opened}&openDateEnd=${searchParams.openDateEnd}&openDateBegin=${searchParams.openDateBegin}&businessAreaId=${searchParams.businessAreaId}&portalShow=${searchParams.portalShow}&countyId=${searchParams.countyId}&ids=${ids}`
			window.location.href = url;
	}

	componentDidMount(){
		State.searchDataHere();
	}
    
    whiteClose=()=>{
    	State.openNewCommunity=false;
    	State.openEditCommunity=false;
    	State.openWatchCommunity=false;
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
			                <TableRowColumn name="openDate" component={(value,oldValue)=>{
						                				
														 return (<KrDate value={value} format="yyyy-mm-dd"/>
														 	)
													 }}></TableRowColumn>
			                <TableRowColumn name="area"></TableRowColumn>
			                <TableRowColumn name="opened" options={[{label:'已开业',value:'true'},{label:'未开业',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    {State.isFlag&&<Button label="编辑"  type="operation"  operation="edit" />}
			                    <Button label="查看"  type="operation"  operation="watch" />
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
				        onClose={this.whiteClose}
			        >
						<NewCommunityList
								onSubmit={this.onNewCommunitySubmit}
								onCancel={this.cancelAddCommunity}
								open={State.openNewCommunity}
						/>

		            </Drawer>

		             {/*编辑*/}
					<Drawer
				        open={State.openEditCommunity}
				        width={750}
				        openSecondary={true}
				        onClose={this.whiteClose}
				        containerStyle={{top:60,paddingBottom:48,zIndex:21}}
			        >
						<EditCommunityList
								onSubmit={this.onNewCommunitySubmit}
								onCancel={this.switchEditList}
								open={State.openEditCommunity}
								id={this.state.id}
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
						    open={State.openSearchUpper}
						/>
				    </Dialog>


                     {/*查看*/}
					<Drawer
				        open={State.openWatchCommunity}
				        width={750}
				        onClose={this.whiteClose}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						<WatchCommunityList
								onCancel={this.switchCancelWatchList}
						/>

		            </Drawer>
       
       </Section>

	 </div>
	 );
	}
}

export default CommunityList
