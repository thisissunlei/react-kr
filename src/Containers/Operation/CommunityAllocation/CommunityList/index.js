import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
	reduxForm,
  initialize,
  change
} from 'redux-form';
import {
	observer,inject
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
	Message,
	Tooltip,
	CheckPermission,
	DialogInner
} from 'kr-ui';

import './index.less'
import State from './State';
import NewCommunityList from './NewCommunityList';
import EditCommunityList from './EditCommunityList';
import SearchUpperForm from './SearchUpperForm';
import WatchCommunityList from './WatchCommunityList';
import StagingCommunity from './StagingCommunity';
import EditRole from './EditRole';
import SetClose from './SetClose';
import SetSystemClose from './SetSystemClose';


//todo:城市组件值不清空，后期补上
import cityDataState from "../../../../Components/KrField/CityComponent/State";

@observer
class CommunityList  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      cityData:'',
      timeStart:'',
      timeEnd:'',
      communityId:'',
			cityId:'',
			floor:[],
			itemDetail:'',
			openRoleEdit:false,
			openSetClose:false,
			SetSystemClose:false,
    }
	}

	componentDidMount(){
		State.searchDataHere();
	}

   //新建社区开关
   openAddCommunity=()=>{
   	  cityDataState.setCity("请选择");
			State.isCorpRank=false;
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

        //楼层开始
   	    value.wherefloorsStr=JSON.stringify(value.wherefloors);
        //楼层结束

         delete value.wherefloors;

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
	
	 onOperation=(type,itemDetail)=>{
     if(type=='edit'){
				State.isCorpRank=false;
				State.searchDataHere();
				this.ajaxSendData(itemDetail.id);
		 }else if(type=='watch'){
			  State.getEditList(itemDetail.id)
		   	State.switchWatchList();
		 }else if(type=='select'){
				State.openStagingFun();
				this.getFloor(itemDetail.id);
				this.setState({
					communityId:itemDetail.id
				}) 
		 }else if(type=='close'){
			this.openRoleEdit()
			this.setState({
				itemDetail:itemDetail
			}) 
	 	}
	 }

	

	 getFloor=(id)=>{
		var _this=this;
		Http.request('getCommunityFloors',{communityId:id}).then(function(response) {
				_this.setState({
						floor:response.floors
				})
		}).catch(function(err) {
				Message.error(err.message);
		});   
}
	 
	 stagingCancel=()=>{
			var searchParams={
				other:new Date()
			}

		State.searchParams=Object.assign({},State.searchParams,searchParams);
			State.openStagingFun(); 
			
	 }

    //发送ajax请求函数
      ajaxSendData=(id)=>{
        var _this=this;
				var selectHas=false;
        Http.request('communityGetEdit',{id:id}).then(function(response) {

          response.openDate=DateFormat(response.openDate,"yyyy-mm-dd hh:MM:ss");
          response.signStartDate=DateFormat(response.signStartDate,"yyyy-mm-dd hh:MM:ss");
          response.signEndDate=DateFormat(response.signEndDate,"yyyy-mm-dd hh:MM:ss");

          Store.dispatch(initialize('editCommunityList',response));

          Store.dispatch(change('editCommunityList','local',response.longitude+','+response.latitude));



          _this.setState({
            timeStart:response.businessBegin,
            timeEnd:response.businessEnd,
            communityId:response.id,
						cityId:response.cityId,
            cityData:`${response.provinceName}/${response.cityName}/${response.countyName}`
          })

          if(response.opened==true){
            Store.dispatch(change('editCommunityList','opened','1'));
          }
          if(response.opened==false){
            Store.dispatch(change('editCommunityList','opened','0'));
          }

          State.switchEditList();

        }).catch(function(err) {
          Message.error(err.message);
        });
			}
				// 关闭二级 系统关闭  
				SetSystemClose = ()=>{
					this.setState({
						SetSystemClose: !this.state.SetSystemClose
					})
				}
			// 二级提交 关闭时间 
			openSetCloseSubmit = ()=>{
				let {page} = this.state;
				page = page || 1;
				this.setState({
					openSetClose: !this.state.openSetClose
				},()=>{
					this.onPageChange(page)
				})
			}
			// 二级提交 系统关闭  
			openSetSystemSubmit = ()=>{
				let {page} = this.state;
				page = page || 1;
				this.setState({
					SetSystemClose: !this.state.SetSystemClose
				},()=>{
					this.onPageChange(page)
				})
			}
			// 关闭二级 关闭社区  
			openSetClose = ()=>{
				this.setState({
					openSetClose: !this.state.openSetClose
				})
			}
			// 关闭社区弹框 
			openRoleEdit = ()=>{
				this.setState({
					openRoleEdit: !this.state.openRoleEdit
				})
			}
				// 关闭社区弹框提交  
				onRoleEditSubmit = (type)=>{
					switch(type){
						case 'closeDown':
						// 停业
						setTimeout(()=>{
							this.openSetClose()
						},0)
						break; 
						case 'system':
						// 系统关闭 
						setTimeout(()=>{
							this.SetSystemClose()
						},0)
						break; 
						case 'website':
						// 官网 
						window.open('/new/#/WebBackstage/communityAllocation')
						break; 
						case 'program':
						// 小程序 
						window.open('/krmeeting-seat')
						break; 
					}	
					this.openRoleEdit();
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
			closed:'',
      openDateEnd:'',
      openDateBegin:'',
      businessAreaId:'',
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
			closed:'',
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
			var searchParams={
        other:new Date()
      }

      State.searchParams=Object.assign({},State.searchParams,searchParams);
			State.closeAllDialog();
    }

    onPageChange=(page)=>{
      var searchParams={
				page:page,
				time: new Date()
			};
			this.setState({page:page})
      State.searchParams=Object.assign({},State.searchParams,searchParams);
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
    let {cityData,timeStart,timeEnd,communityId,cityId,floor,itemDetail}=this.state;

		return(

			<div className='community-list'>
				<Title value="社区-氪空间后台管理系统"/>
				<Section title="社区列表" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			  <Col
					     style={{float:'left'}}
					   >
								<Button
										label="新建社区"
										type='button'
										onTouchTap={this.openAddCommunity}
										operateCode="oper_cmt_community_edit"
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
              onPageChange={this.onPageChange}
	            ajaxUrlName='communitySearch'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>社区编码</TableHeaderColumn>
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
                  <TableHeaderColumn>所属城市</TableHeaderColumn>
                  <TableHeaderColumn><span style={{fontSize:'16px',display:'inline-block',paddingBottom:'4px'}}>社区面积m</span><sup>2</sup></TableHeaderColumn>
		              <TableHeaderColumn>社区排序</TableHeaderColumn>
		              <TableHeaderColumn>开业时间</TableHeaderColumn>
		              <TableHeaderColumn>开业状态</TableHeaderColumn>
									<TableHeaderColumn>是否分期</TableHeaderColumn>
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
			                <TableRowColumn name="openDate" component={(value,oldValue)=>{
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
													 }}></TableRowColumn>

									 <TableRowColumn name="opened" 
										component={(value,oldValue,itemDetail)=>{
																		let TooltipStyle="block";
																		let hover='';
																		let display=false;
																		let isClose = false;
																		if(itemDetail.closed){
																			isClose = itemDetail.sysClosed;
																			value = '已停业';
																			hover = (<div style={{textAlign:'left'}}>
																							<p>停业时间：{<KrDate value={ itemDetail.closeDate} format="yyyy-mm-dd"/>}</p>	
																							<p>{isClose?'已系统关闭':''}</p>	
																						</div>)
																			display = true;			
																		}else{
																			value = value?'已开业':'未开业'
																		}
				                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
				                           {display && <Tooltip offsetTop={8} place='top'>{hover}</Tooltip> } </div>)
				                      }}>
										</TableRowColumn>


			                {/* <TableRowColumn name="opened" options={[{label:'已开业',value:'true'},{label:'未开业',value:'false'}]}></TableRowColumn> */}
											<TableRowColumn name="hasZoneStr" component={(value,oldValue)=>{
                              return <div style={value=='是'?{color:'red'}:{}}>{value}</div>
                           }}></TableRowColumn>
			                <TableRowColumn type="operation">
													     <Button label="编辑"  type="operation"  operation="edit" operateCode='oper_cmt_community_edit'/>
															 <Button label="查看"  type="operation"  operation="watch"/>
															 <Button label="分期"  type="operation"  operation="select"/>
															 <Button label="关闭"  type="operation"  operation="close"/>
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
														communityId={communityId}
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
												cityData={cityData}
												timeStart={timeStart}
												timeEnd={timeEnd}
												communityId={communityId}
												cityId={cityId}
										/>

									</Drawer>

                    {/*高级查询*/}
                    <Dialog
										title="高级查询"
										onClose={this.openSearchUpperDialog}
										open={State.openSearchUpper}
										contentStyle ={{ width: '666px',height:'385px'}}
										overflow="auto"
										>
											<SearchUpperForm
													onCancel={this.openSearchUpperDialog}
													onSubmit={this.onSearchUpperSubmit}
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


											{/*分期*/}
											<Drawer
														open={State.openStaging}
														width={750}
														onClose={this.whiteClose}
														openSecondary={true}
														containerStyle={{top:60,paddingBottom:48,zIndex:20}}
													>
												<StagingCommunity
														onCancel={this.stagingCancel}
														whiteClose={this.whiteClose}
														communityId={communityId}
														floor={floor}
												/>

											</Drawer>
										{/*关闭社区 */}
											<Dialog
												title="关闭社区"
												modal={true}
												onClose={this.openRoleEdit}
												open={this.state.openRoleEdit}
												contentStyle={{width:580}}
												>
												<EditRole detail={itemDetail} onCancel={this.openRoleEdit} onSubmit={this.onRoleEditSubmit} />
											</Dialog>
									
										{/*关闭社区第二步--关闭社区时间 */}
										<Dialog
												title="关闭社区（设置停业）"
												modal={true}
												onClose={this.openSetClose}
												open={this.state.openSetClose}
												contentStyle={{width:580}}
												>
												<SetClose detail={itemDetail} onCancel={this.openSetClose} onSubmit={this.openSetCloseSubmit} />
										</Dialog>
											
													{/*关闭社区第二步--系统关毕 */}
										<Dialog
												title="关闭社区（系统关闭）"
												modal={true}
												onClose={this.SetSystemClose}
												open={this.state.SetSystemClose}
												contentStyle={{width:580}}
												>
												<SetSystemClose detail={itemDetail} onCancel={this.SetSystemClose} onSubmit={this.openSetSystemSubmit} />
										</Dialog>
       </Section>

	 </div>
	 );
	}
}

export default CommunityList
