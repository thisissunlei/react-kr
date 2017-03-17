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

   	    value = Object.assign({},value);

         
        //亮点开始 
   	    var brightsStr=[];
        if(value.bright_basic){
         value.bright_basic.map((item,index)=>{
              if(!item){
                return ;
            }
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright);
         });
         value.bright_basic=JSON.stringify(value.bright_basic);
       }

   	    if(value.bright_service){
   	       value.bright_service.map((item,index)=>{
   	   	  if(item){
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	   	  }
   	     })
           value.bright_service=JSON.stringify(value.bright_service);
   	    }

   	    if(value.bright_special){
   	      value.bright_special.map((item,index)=>{
   	   	 if(item){
            let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	   	  }
   	     })
          value.bright_special=JSON.stringify(value.bright_special);
   	    }

   	    if(value.bright_bright){
   	      value.bright_bright.map((item,index)=>{
   	   	  if(item){
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	   	   }
   	     })
          value.bright_bright=JSON.stringify(value.bright_bright);
   	    }

   	    if(value.brightPorts){
   	      brightsStr.push({type:'TRANSPORTATION',brightPoints:value.brightPorts.brightPoints});
   	      value.brightPorts=JSON.stringify(value.brightPorts);
   	    }
   	    if(value.brightRound){
   	      brightsStr.push({type:'PERIMETER',brightPoints:value.brightRound.brightPoints});
   	      value.brightRound=JSON.stringify(value.brightRound);
   	    }
   	    if(brightsStr.length!=0){
   	       value.brightsStr=JSON.stringify(brightsStr);
   	    }

        delete value.brights
        //亮点结束



        //楼层开始
   	    value.wherefloorsStr=JSON.stringify(value.wherefloors);
        delete value.wherefloors;
        //楼层结束
        


        //工位开始
   	    if(value.porTypes){
   	       value.porTypesStr=JSON.stringify(value.porTypes);
           delete value.porTypes;
   	    }
        //工位结束

        
        
      
       //图片开始
       var photosStr=[];     
       delete value.photoVOs;
       if(value.photosStr_first){
         	value.photosStr_first.map((item,index)=>{
            let images = Object.assign({},{type:'THEFIRST',photoId:item.photoId,first:(index?false:true)})
         	  photosStr.push(images)
          })
        }

        if(value.photosStr_list){
         	value.photosStr_list.map((item,index)=>{
         	  let images = Object.assign({},{type:'LIST',photoId:item.photoId,first:(index?false:true)})
             photosStr.push(images)
          })
         }

         if(value.photosStr_detail){
          	value.photosStr_detail.map((item,index)=>{
          	let images = Object.assign({},{type:'DETAILS',photoId:item.photoId,first:(index?false:true)})
            photosStr.push(images)
          })
         }

         value.photosStr_first=JSON.stringify(value.photosStr_first);
         value.photosStr_list=JSON.stringify(value.photosStr_list);
         value.photosStr_detail=JSON.stringify(value.photosStr_detail);
         value.photosStr=JSON.stringify(photosStr);
         //图片结束
        

         value.openDate=dateFormat(value.openDate,"yyyy-mm-dd hh:MM:ss");
         value.signStartDate=dateFormat(value.signStartDate,"yyyy-mm-dd hh:MM:ss");
         value.signEndDate=dateFormat(value.signEndDate,"yyyy-mm-dd hh:MM:ss");
   	     State.onNewCommunitySubmit(value);

   }
   //查询
   onSearchSubmit=(params)=>{
   	  let obj = {
			searchKey: params.content,
			searchType:params.filter,
      pageSize:15
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
		              <TableHeaderColumn>社区编码</TableHeaderColumn>
		              <TableHeaderColumn>所属城市</TableHeaderColumn>
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
		              <TableHeaderColumn>社区排序</TableHeaderColumn>
		              <TableHeaderColumn>官网显示状态</TableHeaderColumn>
		              <TableHeaderColumn>开业时间</TableHeaderColumn>
		              <TableHeaderColumn>社区面积m<sup>2</sup></TableHeaderColumn>
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
