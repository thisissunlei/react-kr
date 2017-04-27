import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
	reduxForm,
  initialize,
  change
} from 'redux-form';
import {
	observer
} from 'mobx-react';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
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
//todo:城市组件值不清空，后期补上
import cityDataState from "../../../../Components/KrField/CityComponent/State";
@observer
class CommunityList  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      cityName:''
    }
	}

	componentDidMount(){
		State.searchDataHere();

	}

   //新建社区开关
   openAddCommunity=()=>{
   	  cityDataState.setCity("请选择");
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
         value.bright_basic.map((item)=>{
              if(!item){
                return ;
            }
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright);
         });
       }

   	    if(value.bright_service){
   	       value.bright_service.map((item)=>{
   	   	  if(!item){
             return ;
   	   	  }
          let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	     })
   	    }

   	    if(value.bright_special){
   	      value.bright_special.map((item,index)=>{
   	   	 if(!item){
            return ;
   	   	  }
          let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	     })
   	    }

   	    if(value.bright_bright){
   	      value.bright_bright.map((item,index)=>{
   	   	  if(!item){
             return ;
   	   	   }
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
   	     })
   	    }

   	    if(value.brightPorts){
   	      brightsStr.push({type:'TRANSPORTATION',brightPoints:value.brightPorts.brightPoints});
   	    }
   	    if(value.brightRound){
   	      brightsStr.push({type:'PERIMETER',brightPoints:value.brightRound.brightPoints});
   	    }
   	    if(brightsStr.length){
   	       value.brightsStr=JSON.stringify(brightsStr);
   	    }
        //亮点结束



        //楼层开始
   	    value.wherefloorsStr=JSON.stringify(value.wherefloors);
        //楼层结束



        //工位开始
   	    if(value.porTypes){
   	       value.porTypesStr=JSON.stringify(value.porTypes);
   	    }
        //工位结束


       //图片开始
       var photosStr=[];
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

         value.photosStr=JSON.stringify(photosStr);

         delete value.photosStr_first;
         delete value.photosStr_list;
         delete value.photosStr_detail;
         delete value.bright_basic;
         delete value.bright_service;
         delete value.bright_special;
         delete value.bright_bright;
         delete value.brightPorts;
         delete value.brightRound;
         delete value.brights;
         delete value.wherefloors;
         delete value.porTypes;
         delete value.photoVOs;

         //图片结束


   	     State.onNewCommunitySubmit(value);

   }
   //查询
   onSearchSubmit=(params)=>{
   	  let obj = {
			searchKey: params.content,
			searchType:params.filter,
      pageSize:15
		}
    if(!obj.searchType){
       Message.error('请选择搜索类型');
       return ;
    }
		State.setSearchParams(obj);
   }

   //查看
   onOperation=(type,itemDetail)=>{
      if(type=='watch'){
      	 State.getEditList(id)
      	 State.switchWatchList();
         return ;
      }
       if(type=='edit'){
      	  State.searchDataHere();
          this.ajaxSendData(itemDetail.id);    
      }
   }

    //发送ajax请求函数
      ajaxSendData=(id)=>{
        var _this=this;
        let {cityName}=this.state;
        Http.request('communityGetEdit',{id:id}).then(function(response) {

          response.openDate=DateFormat(response.openDate,"yyyy-mm-dd hh:MM:ss");
          response.signStartDate=DateFormat(response.signStartDate,"yyyy-mm-dd hh:MM:ss");
          response.signEndDate=DateFormat(response.signEndDate,"yyyy-mm-dd hh:MM:ss");

          Store.dispatch(initialize('editCommunityList',response));


          Store.dispatch(change('editCommunityList','local',response.latitude+','+response.longitude));
          
          var bright_basic=[];
          var bright_service=[];
          var bright_special=[];
          var bright_bright=[];

          var photo_First=[];
          var photo_List=[];
          var photo_Detail=[];
          response.photoVOs.map((item,index)=>{
            if(item.type=='THEFIRST'){
              item.src=item.photoUrl;
              delete item.photoUrl;
              photo_First.push(item);
            }
            if(item.type=='LIST'){
              item.src=item.photoUrl;
              delete item.photoUrl;
              photo_List.push(item);
            }
            if(item.type=='DETAILS'){
              item.src=item.photoUrl;
              delete item.photoUrl;
              photo_Detail.push(item);
            }
          })


          _this.setState({
            timeStart:response.businessBegin,
            timeEnd:response.businessEnd,
            cityId:response.cityId,
            photoF:photo_First,
            photoL:photo_List,
            photoD:photo_Detail,
            communityId:response.id,
            communityName:response.name,
            cityData:`${response.provinceName}/${response.cityName}/${response.countyName}`
          })

          response.brights.map((item,index)=>{
            if(item.type=="BRIGHTPOINTS"){
              bright_bright.push(item);
            }
            if(item.type=="INFRASTRUCTURE"){
              bright_basic.push(item);
            }
            if(item.type=="SPECIALSERVICE"){
              bright_special.push(item);
            }
            if(item.type=="BASICSERVICE"){
              bright_service.push(item);
            }
            if(item.type=="TRANSPORTATION"){
              Store.dispatch(change('editCommunityList','brightPorts.brightPoints',item.brightPoints));
            }
            if(item.type=="PERIMETER"){
              Store.dispatch(change('editCommunityList','brightRound.brightPoints',item.brightPoints));
            }
          })

          Store.dispatch(change('editCommunityList','porTypes',response.porTypes.length?response.porTypes:[{}]));
          Store.dispatch(change('editCommunityList','bright_bright',bright_bright.length?bright_bright:[{type:'BRIGHTPOINTS'}]));
          Store.dispatch(change('editCommunityList','bright_special',bright_special.length?bright_special:[{type:'SPECIALSERVICE'}]));
          Store.dispatch(change('editCommunityList','bright_service',bright_service.length?bright_service:[{type:'INFRASTRUCTURE'}]));
          Store.dispatch(change('editCommunityList','bright_basic',bright_basic.length?bright_basic:[{type:'BASICSERVICE'}]));

          if(response.opened==true){
            Store.dispatch(change('editCommunityList','opened','1'));
          }
          if(response.opened==false){
            Store.dispatch(change('editCommunityList','opened','0'));
          }


          if(response.portalShow==true){
            Store.dispatch(change('editCommunityList','portalShow','1'));
          }
          if(response.portalShow==false){
            Store.dispatch(change('editCommunityList','portalShow','0'));
          }

          State.switchEditList(); 

        }).catch(function(err) {
          Message.error(err.message);
        });
      }

   //查看取消
   onSwitchCancelWatchList=()=>{
     State.switchWatchList();
   }
   //编辑取消
   switchEditList=()=>{
   	   State.switchEditList();
   }

   //高级查询
	openSearchUpperDialog=()=>{
	  State.searchDataHere();
      var params={
       opened:'',
      openDateEnd:'',
      openDateBegin:'',
      businessAreaId:'',
      portalShow:'',
      cityId:'',
      countyId:'',
      searchKey:'',
      searchType:''
      }
      State.setSearchParams(params);
      cityDataState.setCity("请选择");
      State.searchUpperCustomer();

	}

   //高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({},State.searchParams, searchParams);
     	searchParams.time=+new Date();
		if(searchParams.openDateBegin&&searchParams.openDateEnd&&searchParams.openDateEnd<searchParams.openDateBegin){
			 Message.error('开始时间不能大于结束时间');
	         return ;
		}
		if(!searchParams.openDateBegin && searchParams.openDateEnd){
			searchParams.openDateBegin = searchParams.openDateEnd
		}
		if(searchParams.openDateBegin && !searchParams.openDateEnd){
			searchParams.openDateEnd = searchParams.openDateBegin
		}

      	State.setSearchParams(searchParams);
      	State.searchUpperCustomer();
     }

     //导出
	onExport=(values)=> {
		let {searchParams} = State;
    let defaultParams = {
      searchKey:'',
      opened:'',
      openDateEnd:'',
      openDateBegin:'',
      businessAreaId:'',
      portalShow:'',
      cityId:'',
      countyId:'',
      searchType:''
    }
    searchParams = Object.assign({},defaultParams,searchParams);

			let ids = [];
			if (values.length != 0) {
				values.map((item, value) => {
					ids.push(item.id)
				});
			}
      var where=[];
      for(var item in searchParams){
        if(searchParams.hasOwnProperty(item)){
           where.push(`${item}=${searchParams[item]}`);
        }
      }
      where.push(`ids=${ids}`);
			var url = `/api/krspace-finance-web/cmt/community/export?${where.join('&')}`
			window.location.href = url;
	}



    whiteClose=()=>{
    	State.closeAllDialog();
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

    let {cityData}=this.state;

		return(

			<div className='community-list'>
				<Title value="社区列表"/>
				<Section title="社区列表" description="" style={{marginBottom:-5,minHeight:910}}>
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
				            <ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入关键字' searchFilter={searchFilter} onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
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
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
                  <TableHeaderColumn>所属城市</TableHeaderColumn>
                  <TableHeaderColumn><span style={{fontSize:'16px',display:'inline-block',paddingBottom:'4px'}}>社区面积m</span><sup>2</sup></TableHeaderColumn>
		              <TableHeaderColumn>社区排序</TableHeaderColumn>
		              <TableHeaderColumn>官网显示状态</TableHeaderColumn>
		              <TableHeaderColumn>开业时间</TableHeaderColumn>
		              <TableHeaderColumn>开业状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="cityName"></TableRowColumn>
                      <TableRowColumn name="area"></TableRowColumn>
			                <TableRowColumn name="orderNum" component={(value,oldValue)=>{
                             return (<div>{value?value:'-'}</div>)
                           }}></TableRowColumn>
			                <TableRowColumn name="portalShow" options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="openDate" component={(value,oldValue)=>{
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
													 }}></TableRowColumn>
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
                cityData={cityData}
						/>

		            </Drawer>

                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666px',height:'458px'}}
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
								onCancel={this.onSwitchCancelWatchList}
						/>

		            </Drawer>

       </Section>

	 </div>
	 );
	}
}

export default CommunityList
